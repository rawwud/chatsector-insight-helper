import React, { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import VideoSection from '../components/VideoSection';
import WorkflowSection from '../components/WorkflowSection';
import Features from '../components/Features';
import Demo from '../components/Demo';
import IndustrySelector from '../components/IndustrySelector';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    document.title = 'Chatsector - AI-Powered Sector Research Assistant';
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <VideoSection />
        <WorkflowSection />
        <Features />
        <Demo />
        <IndustrySelector />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
