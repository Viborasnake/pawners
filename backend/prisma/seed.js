import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seeder de datos de demostración para Pawners...');

  const password_hash = await bcrypt.hash('password123', 12);

  // Advertencia: esto limpia la BD (útil solo en entorno de desarrollo local)
  await prisma.user.deleteMany({});

  // 1. Crear un Dueño de prueba
  const owner = await prisma.user.create({
    data: {
      email: 'owner@test.com',
      password_hash,
      role: 'owner',
      full_name: 'Familia González',
      identity_verified: true,
      email_verified: true,
      pets: {
        create: [
          {
            name: 'Max',
            species: 'dog',
            size: 'medium',
            behavior_notes: 'Muy juguetón, le encanta correr por el parque.'
          }
        ]
      }
    }
  });
  console.log(`✅ Creado perfil Dueño: ${owner.full_name}`);

  // 2. Crear Cuidadores de prueba
  const caregiversData = [
    {
      email: 'maria@test.com',
      name: 'María J.',
      comuna: 'Providencia',
      bio: 'Soy estudiante veterinaria y me encantan los perros y gatos. Tengo un patio grande donde podrán jugar.',
      price: 15000,
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      email: 'carlos@test.com',
      name: 'Carlos V.',
      comuna: 'Las Condes',
      bio: 'Paseador profesional con 5 años de experiencia. Especialista en perros grandes y enérgicos.',
      price: 12000,
      avatar: 'https://i.pravatar.cc/150?img=11'
    },
    {
      email: 'ana@test.com',
      name: 'Ana P.',
      comuna: 'Santiago Centro',
      bio: 'Tu mascota estará segura, relajada y feliz en mi casa. Ofrezco paseos diarios y cuidados especiales.',
      price: 18000,
      avatar: 'https://i.pravatar.cc/150?img=5'
    }
  ];

  for (const cg of caregiversData) {
    await prisma.user.create({
      data: {
        email: cg.email,
        password_hash,
        role: 'caregiver',
        full_name: cg.name,
        comuna: cg.comuna,
        avatar_url: cg.avatar,
        identity_verified: true,
        email_verified: true,
        profile_visibility: 'public',
        caregiver_profile: {
          create: {
            bio: cg.bio,
            experience_years: 3,
            average_rating: 4.8,
            total_reviews: Math.floor(Math.random() * 30) + 5,
            listings: {
              create: [
                {
                  title: `Cuidado VIP por ${cg.name}`,
                  description: cg.bio,
                  services: ['boarding', 'walking'],
                  pet_types_accepted: ['dog', 'cat'],
                  zones: [cg.comuna],
                  featured: true,
                  prices: {
                    create: [
                      { service_type: 'boarding', price_clp: cg.price, unit: 'night' },
                      { service_type: 'walking', price_clp: Math.floor(cg.price * 0.6), unit: 'hour' }
                    ]
                  }
                }
              ]
            }
          }
        }
      }
    });
    console.log(`✅ Creado perfil Cuidador: ${cg.name}`);
  }

  console.log('\n=========================================');
  console.log('✅ Base de datos poblada exitosamente.');
  console.log('Credenciales de prueba disponibles:');
  console.log('🔹 Dueño:    owner@test.com / password123');
  console.log('🔹 Cuidador: maria@test.com / password123');
  console.log('=========================================');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
