import { notFound } from 'next/navigation';
import { FC } from 'react';
import { Amenities } from '../components/amenities';
import { FactSheet } from '../components/fact-sheet';
import { HeroSection } from '../components/hero';
import { InventoryList } from '../components/inventory-list';
import { LegalTimeline } from '../components/legel-timeline';
import { MobileActionBar } from '../components/mobile-actions';
import { Overview } from '../components/overview-text';
import { Sidebar } from '../components/side-bar';
import { getProjectBySlug } from '../mock';

type ProjectDetailScreenProps = {
  slug: string;
};
const ProjectDetailScreen: FC<ProjectDetailScreenProps> = async ({ slug }) => {
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }
  return (
    <div className='min-h-screen bg-white pb-24 md:pb-12'>
      <HeroSection project={project} />

      <div className='container mx-auto px-4 py-8 md:px-6 md:py-12'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-12 xl:gap-12'>
          {/* Main Content (Left) */}
          <div className='space-y-12 lg:col-span-8'>
            <FactSheet project={project} />
            <Overview description={project.description} />
            <LegalTimeline timeline={project.legalTimeline} />
            <Amenities features={project.features} />
            <InventoryList inventory={project.inventory} />
          </div>

          {/* Sidebar (Right) */}
          <div className='hidden lg:col-span-4 lg:block'>
            <Sidebar expert={project.expert} />
          </div>
        </div>
      </div>

      <MobileActionBar />
    </div>
  );
};

export default ProjectDetailScreen;
