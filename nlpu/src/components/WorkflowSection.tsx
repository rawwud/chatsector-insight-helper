
import React from 'react';
import { ArrowRight } from 'lucide-react';

const WorkflowSection = () => {
  const steps = [
    {
      number: "1",
      title: "Describe what you want to build in natural language.",
      description: "Tell Chatsector about your sector and research needs."
    },
    {
      number: "2",
      title: "Chatsector builds your first version instantly.",
      description: "Get personalized analysis tailored to your industry."
    },
    {
      number: "3",
      title: "Talk to the AI to design and extend your research.",
      description: "Refine your queries and dig deeper into specific topics."
    },
    {
      number: "4",
      title: "Share your research via link or sync your data to your account.",
      description: "Easily distribute findings or save for later reference."
    }
  ];

  return (
    <section className="section bg-gray-50">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Connector Lines */}
            <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gray-200 z-0"></div>
            
            {steps.map((step, index) => (
              <div key={index} className="relative z-10 flex flex-col items-center text-center">
                <div className="bg-black text-white w-14 h-14 rounded-lg mb-6 flex items-center justify-center text-xl font-bold shadow-lg">
                  {step.number}
                </div>
                <h3 className="font-baskerville text-lg mb-3">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <div className="absolute top-7 left-[calc(50%+2rem)] hidden md:block">
                    <ArrowRight size={20} className="text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
