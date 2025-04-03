
import React from 'react';
import ChipTag from './ui/ChipTag';
import { ArrowRight, MessageSquare, BookOpen, Search, Book, Brain, FileText, Database, LayoutDashboard } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <MessageSquare size={24} className="text-orange-500" />,
      title: "Conversational Research",
      description: "Engage with an AI specialist that understands your sector context and delivers knowledge through natural conversation.",
      tag: "Research"
    },
    {
      icon: <Search size={24} className="text-orange-500" />,
      title: "Deep Sector Analysis",
      description: "Get detailed analysis on academic publications, methodologies, and sector-specific knowledge.",
      tag: "Analysis"
    },
    {
      icon: <Book size={24} className="text-orange-500" />,
      title: "Literature Reviews",
      description: "Quickly obtain comprehensive reviews of important literature in your field of expertise.",
      tag: "Literature"
    },
    {
      icon: <Brain size={24} className="text-orange-500" />,
      title: "Intelligent Recommendations",
      description: "Receive personalized research recommendations based on your background and interests.",
      tag: "AI"
    },
    {
      icon: <FileText size={24} className="text-orange-500" />,
      title: "Research Summaries",
      description: "Complex publications transformed into clear, digestible summaries for better understanding.",
      tag: "Summaries"
    },
    {
      icon: <LayoutDashboard size={24} className="text-orange-500" />,
      title: "Custom Research Reports",
      description: "Generate comprehensive reports on any aspect of your sector with a simple request.",
      tag: "Reports"
    }
  ];

  return (
    <section id="features" className="section bg-white">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <ChipTag variant="orange" className="mb-4 mx-auto">
            Research Capabilities
          </ChipTag>
          <h2 className="text-3xl md:text-4xl font-baskerville mb-6">
            Your Personal Sector Specialist,{' '}
            <span className="text-gradient">Always Available</span>
          </h2>
          <p className="text-gray-700 text-balance">
            Chatsector combines advanced AI with comprehensive sector knowledge to deliver research
            that helps you make informed decisions about your field of expertise.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card group"
            >
              <div className="mb-5 p-3 bg-orange-50 rounded-lg inline-block">
                {feature.icon}
              </div>
              <div className="mb-2 flex justify-between items-center">
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <ChipTag variant="muted">{feature.tag}</ChipTag>
              </div>
              <p className="text-gray-600 mb-4">
                {feature.description}
              </p>
              <a 
                href="#" 
                className="inline-flex items-center text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors group-hover:underline"
              >
                Learn more <ArrowRight size={14} className="ml-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
