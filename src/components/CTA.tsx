
import React from 'react';
import PrimaryButton from './PrimaryButton';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-20 px-6 bg-chatsector-black text-white relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-chatsector-orange/20 blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-chatsector-orange/10 blur-[80px]"></div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="section-title mb-6 animate-fade-up">
            Ready to Transform Your <span className="text-chatsector-orange">Industry Knowledge</span>?
          </h2>
          <p className="section-description text-white/80 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Join thousands of professionals who are leveraging AI-powered insights to stay ahead in their industries. No more endless research—just ask and learn.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <PrimaryButton size="lg" className="w-full sm:w-auto">
            Start Exploring Now
          </PrimaryButton>
          
          <PrimaryButton 
            variant="secondary" 
            size="lg" 
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/20"
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
