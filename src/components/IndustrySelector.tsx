import React from 'react';
import ChipTag from './ui/ChipTag';
import { Button } from './ui/button';
import { ArrowRight, Users, Building, Briefcase, ShoppingBag, Monitor, Heart, GraduationCap, Landmark, Wrench } from 'lucide-react';

const IndustrySelector = () => {
  const industries = [
    {
      icon: <Building size={24} className="text-orange-500" />,
      name: "Real Estate",
      description: "Property development research and investment knowledge",
    },
    {
      icon: <Monitor size={24} className="text-orange-500" />,
      name: "Technology",
      description: "Technical innovation and digital research",
    },
    {
      icon: <Heart size={24} className="text-orange-500" />,
      name: "Healthcare",
      description: "Medical research and healthcare methodologies",
    },
    {
      icon: <Landmark size={24} className="text-orange-500" />,
      name: "Finance",
      description: "Financial market research and investment knowledge",
    },
    {
      icon: <ShoppingBag size={24} className="text-orange-500" />,
      name: "Retail",
      description: "Consumer behavior and retail research",
    },
    {
      icon: <GraduationCap size={24} className="text-orange-500" />,
      name: "Education",
      description: "Educational research and learning methodologies",
    },
    {
      icon: <Briefcase size={24} className="text-orange-500" />,
      name: "Business Services",
      description: "B2B research and operational excellence knowledge",
    },
    {
      icon: <Wrench size={24} className="text-orange-500" />,
      name: "Manufacturing",
      description: "Production studies and supply chain research",
    },
    {
      icon: <Users size={24} className="text-orange-500" />,
      name: "Custom Sector",
      description: "Tell us about your specific research needs",
    },
  ];

  return (
    <section id="sectors" className="section">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <ChipTag variant="orange" className="mb-4 mx-auto">
            Sector Expertise
          </ChipTag>
          <h2 className="text-3xl md:text-4xl font-baskerville mb-6">
            Specialized Knowledge for <span className="text-gradient">Your Sector</span>
          </h2>
          <p className="text-gray-700 text-balance">
            Whatever your sector, Chatsector provides specialized research and analysis 
            tailored to your specific field requirements.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {industries.map((industry, index) => (
            <div 
              key={index} 
              className="flex bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-elevation transition-all group cursor-pointer"
            >
              <div className="p-5 flex items-center">
                <div className="mr-4">
                  {industry.icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">{industry.name}</h3>
                  <p className="text-sm text-gray-600">{industry.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button className="bg-black hover:bg-black/90 text-white rounded-full px-8 py-6 flex items-center mx-auto">
            Explore All Sectors
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default IndustrySelector; 