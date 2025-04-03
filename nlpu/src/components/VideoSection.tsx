
import React from 'react';
import ChipTag from './ui/ChipTag';
import { Play } from 'lucide-react';

const VideoSection = () => {
  return (
    <section id="video" className="section bg-white">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <ChipTag variant="orange" className="mb-4 mx-auto">
            How It Works
          </ChipTag>
          <h2 className="text-3xl md:text-4xl font-baskerville mb-6">
            See Chatsector in <span className="text-gradient">Action</span>
          </h2>
          <p className="text-gray-700 text-balance">
            Watch how Chatsector transforms your research experience, providing personalized
            insights and analysis for your specific sector needs.
          </p>
        </div>
        
        {/* Video Placeholder */}
        <div className="relative max-w-4xl mx-auto rounded-xl overflow-hidden shadow-elevation">
          <img 
            src="/placeholder.svg" 
            alt="Video Placeholder" 
            className="w-full aspect-video object-cover bg-gray-100"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center shadow-lg hover:bg-orange-600 transition-colors">
              <Play size={24} className="text-white ml-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
