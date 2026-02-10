'use client';
import { SectionWrapper } from '@/modules/layout/section';
import { FC } from 'react';
import { CallToAction } from './components/call-to-actions';
import { EventsSection } from './components/events';
import { FAQSection } from './components/faqs';
import { Hero } from './components/hero';
import { InvestmentSection } from './components/investment';
import { LocationHighlights } from './components/locations';
import { NewsSection } from './components/news';
import { ProjectGrid } from './components/projects';
import { StatsSection } from './components/stats';
import { StorySection } from './components/stories';
import { Testimonials } from './components/testimonial';
import { ToolsSection } from './components/tools';
import { WhyChooseUs } from './components/why-choose-us';

type HomeScreenProps = object;

const HomeScreen: FC<HomeScreenProps> = () => {
  return (
    <div className='flex grow flex-col'>
      <Hero />
      <SectionWrapper>
        <ToolsSection />
      </SectionWrapper>
      <SectionWrapper>
        <LocationHighlights />
      </SectionWrapper>
      <SectionWrapper>
        <ProjectGrid />
      </SectionWrapper>
      <SectionWrapper>
        <InvestmentSection />
      </SectionWrapper>
      <SectionWrapper>
        <WhyChooseUs />
      </SectionWrapper>
      <SectionWrapper>
        <EventsSection />
      </SectionWrapper>
      <SectionWrapper>
        <StorySection />
      </SectionWrapper>
      <SectionWrapper>
        <NewsSection />
      </SectionWrapper>
      <SectionWrapper>
        <Testimonials />
      </SectionWrapper>
      <SectionWrapper>
        <FAQSection />
      </SectionWrapper>
      <SectionWrapper>
        <StatsSection />
      </SectionWrapper>
      <SectionWrapper>
        <CallToAction />
      </SectionWrapper>
    </div>
  );
};

export default HomeScreen;
