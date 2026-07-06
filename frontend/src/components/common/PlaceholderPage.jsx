import { Wrench } from 'lucide-react';

export default function PlaceholderPage({ title }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-500 bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
      <div className="bg-gray-100 p-4 rounded-full mb-4">
        <Wrench size={48} className="text-gray-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-center max-w-md">
        Esta sección de <strong>{title}</strong> está siendo desarrollada. Pronto podrás disfrutar de todas estas funcionalidades en tu panel.
      </p>
    </div>
  );
}
