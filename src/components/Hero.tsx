
import React from 'react';
import PrimaryButton from './PrimaryButton';
import ChatDemo from './ChatDemo';
import Logo from './Logo';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/signup');
  };

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-block px-3 py-1 mb-6 text-sm font-medium text-chatsector-orange bg-chatsector-orange/10 rounded-full animate-fade-in">
              Your AI-Powered Industry Research Assistant
            </div>
            
            <h1 className="font-libre text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Chatsector: <span className="text-chatsector-orange">Deep Research</span> for Your Industry
            </h1>
            
            <p className="text-lg md:text-xl text-chatsector-dark-gray/80 mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Access comprehensive industry research, market analysis, and competitive intelligence through intuitive AI-powered conversations.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <PrimaryButton size="lg" onClick={handleExploreClick}>
                Explore Your Sector
              </PrimaryButton>
              
              <PrimaryButton variant="secondary" size="lg" onClick={() => navigate('/signup')}>
                <span className="flex items-center">
                  See How It Works <ArrowRight size={18} className="ml-2" />
                </span>
              </PrimaryButton>
            </div>
          </div>
          
          <div className="lg:w-1/2 animate-slide-in-right" style={{ animationDelay: "0.4s" }}>
            <div className="relative">
              {/* Background decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-chatsector-orange/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-5 w-40 h-40 bg-chatsector-orange/10 rounded-full blur-3xl"></div>
              
              {/* Chat demo */}
              <div className="relative z-10">
                <ChatDemo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
