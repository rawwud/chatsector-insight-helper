
import React from 'react';
import { MessageSquare, LineChart, Globe, Lightbulb, Search, FileText } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <MessageSquare className="w-10 h-10 text-chatsector-orange" />,
      title: "Conversational Research",
      description: "Engage in natural, intuitive conversations to access comprehensive research about your industry."
    },
    {
      icon: <Search className="w-10 h-10 text-chatsector-orange" />,
      title: "Real-Time Market Analysis",
      description: "Stay informed with current data on market shifts and changes in your sector."
    },
    {
      icon: <LineChart className="w-10 h-10 text-chatsector-orange" />,
      title: "Data Visualization",
      description: "Understand complex market data through clear, interactive charts and graphs."
    },
    {
      icon: <Lightbulb className="w-10 h-10 text-chatsector-orange" />,
      title: "Strategic Recommendations",
      description: "Receive actionable insights and strategic suggestions tailored to your specific challenges."
    },
    {
      icon: <Globe className="w-10 h-10 text-chatsector-orange" />,
      title: "Global Market Context",
      description: "Understand your position within the global landscape and identify international opportunities."
    },
    {
      icon: <FileText className="w-10 h-10 text-chatsector-orange" />,
      title: "Custom Reports",
      description: "Generate comprehensive, shareable reports on any aspect of your industry."
    }
  ];

  return (
    <section id="features" className="py-20 px-6 bg-chatsector-light-gray">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-libre text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-up">
            Industry Knowledge, <span className="text-chatsector-orange">Reimagined</span>
          </h2>
          <p className="section-description animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Discover how Chatsector transforms the way you research and navigate your industry landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card group animate-fade-up"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="p-3 mb-4 bg-chatsector-orange/10 rounded-lg inline-block transition-all duration-300 group-hover:bg-chatsector-orange/20">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-chatsector-dark-gray/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
