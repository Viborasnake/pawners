import prisma from '../utils/prismaClient.js';

export const createListing = async (req, res) => {
  try {
    const { title, description, services, pet_types_accepted, zones, prices } = req.body;
    
    // El middleware de Auth ya verificó requireRole(['caregiver', 'both']) y requireIdentityVerified
    const caregiverProfile = await prisma.caregiverProfile.findUnique({
      where: { user_id: req.user.id }
    });

    if (!caregiverProfile) return res.status(404).json({ error: 'Perfil no encontrado' });

    const listing = await prisma.listing.create({
      data: {
        caregiver_id: caregiverProfile.id,
        title,
        description,
        services,
        pet_types_accepted,
        zones,
        prices: {
          create: prices // array de { service_type, price_clp, unit }
        }
      },
      include: { prices: true }
    });

    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear anuncio' });
  }
};

export const searchListings = async (req, res) => {
  try {
    // LÓGICA DE NEGOCIO CRÍTICA 5: Visibilidad y orden
    const { comuna, petType } = req.query;

    const whereClause = {
      active: true,
      caregiver_profile: {
        user: { profile_visibility: 'public' }
      }
    };

    if (comuna) whereClause.zones = { has: comuna };
    if (petType) whereClause.pet_types_accepted = { has: petType };

    const listings = await prisma.listing.findMany({
      where: whereClause,
      orderBy: [
        { featured: 'desc' },
        { caregiver_profile: { average_rating: 'desc' } }
      ],
      include: {
        caregiver_profile: {
          include: { user: { select: { full_name: true, avatar_url: true } } }
        },
        prices: true
      }
    });

    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: 'Error en la búsqueda' });
  }
};
