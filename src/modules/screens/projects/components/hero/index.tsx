import { ArrowLeft, Heart, MapPin, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ProjectDetail } from '../../mock';

export function HeroSection({ project }: { project: ProjectDetail }) {
  return (
    <div className="relative h-[50vh] md:h-[70vh] w-full bg-gray-900 overflow-hidden">
      <Image 
        src={project.images[0]} 
        alt={project.name}
        fill
        priority
        className="object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent"/>
      
      {/* Navigation Overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-start z-20">
          <Link href="/projects" className="p-3 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-all">
              <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex gap-2">
              <button className="p-3 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition-all">
                  <Heart className="w-5 h-5" />
              </button>
              <button className="p-3 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-blue-500 transition-all">
                  <Share2 className="w-5 h-5" />
              </button>
          </div>
      </div>

      {/* Hero Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 pb-12 md:pb-16 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                  <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded mb-3">
                      {project.status}
                  </span>
                  <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-2 tracking-tight">
                      {project.name}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-300 text-sm md:text-lg">
                      <MapPin className="w-5 h-5 shrink-0" />
                      <span>{project.location}</span>
                  </div>
              </div>
              <div className="hidden md:block text-right">
                  <p className="text-gray-400 text-xs uppercase font-bold tracking-widest mb-1">Giá tham khảo</p>
                  <p className="text-3xl font-bold text-white">{project.priceRange}</p>
              </div>
          </div>
      </div>
    </div>
  );
}