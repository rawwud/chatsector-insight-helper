
import React from 'react';
import { MessageSquare, Lightbulb, LineChart } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <MessageSquare className="w-12 h-12 text-white" />,
      title: "Enter Your Industry",
      description: "Simply tell Chatsector about your industry or role to get started. The more specific you are, the more tailored your research will be.",
      color: "bg-chatsector-orange",
      delay: "0.1s"
    },
    {
      icon: <Lightbulb className="w-12 h-12 text-white" />,
      title: "Chat with AI",
      description: "Ask questions, request analysis, or explore topics of interest through an intuitive chat interface. Chatsector understands context and follows your conversation naturally.",
      color: "bg-chatsector-black",
      delay: "0.2s"
    },
    {
      icon: <LineChart className="w-12 h-12 text-white" />,
      title: "Gain Clarity",
      description: "Receive detailed research, visualized data, and actionable recommendations that you can implement immediately or save for future reference.",
      color: "bg-chatsector-orange",
      delay: "0.3s"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-libre text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-up">
            How <span className="text-chatsector-orange">Chatsector</span> Works
          </h2>
          <p className="section-description animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Accessing industry research has never been easier. Follow these simple steps to unlock the power of AI-driven research.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex-1 flex flex-col items-center text-center animate-fade-up"
              style={{ animationDelay: step.delay }}
            >
              <div className={`${step.color} w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-lg`}>
                {step.icon}
                <div className="absolute w-full h-full rounded-full animate-pulse-subtle opacity-70" style={{background: step.color}}></div>
              </div>
              
              <div className="relative mb-6">
                <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-chatsector-light-gray">
                    <div className="absolute right-0 -top-1 w-0 h-0 border-t-8 border-r-8 border-b-8 border-transparent border-r-chatsector-light-gray"></div>
                  </div>
                )}
              </div>
              
              <p className="text-chatsector-dark-gray/80">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
