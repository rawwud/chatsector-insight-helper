
import React from 'react';
import PrimaryButton from './PrimaryButton';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CTA = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/signup');
  };

  return (
    <section className="py-20 px-6 bg-chatsector-black text-white relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-chatsector-orange/20 blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-chatsector-orange/10 blur-[80px]"></div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-libre text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-up">
            Ready to Transform Your <span className="text-chatsector-orange">Industry Knowledge</span>?
          </h2>
          <p className="section-description text-white/80 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Join professionals who are leveraging AI-powered research to stay informed in their industries. No more hours of manual research—just ask and learn.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <PrimaryButton size="lg" className="w-full sm:w-auto" onClick={handleExploreClick}>
            Start Researching Now
          </PrimaryButton>
          
          <PrimaryButton 
            variant="secondary" 
            size="lg" 
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/20"
            onClick={() => navigate('/signup')}
          >
            <span className="flex items-center">
              See Demo <ArrowRight size={18} className="ml-2" />
            </span>
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
};

export default CTA;
