import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Logo from './Logo';

interface WelcomeCardProps {
  onStart: () => void;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ onStart }) => {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Slightly visible background */}
      <div className="absolute inset-0 bg-gray-200 bg-opacity-30 rounded-3xl backdrop-blur-sm"></div>
      
      <Card className="relative bg-white bg-opacity-95 border-0 shadow-xl rounded-3xl max-w-xl w-full p-8 flex flex-col items-center">
        <div className="mb-8 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-white border border-gray-100 flex items-center justify-center mb-6">
            <Logo className="w-10 h-10" />
          </div>
          
          <div className="space-y-4 text-center">
            <div className="bg-gray-100 text-gray-800 rounded-full py-2 px-6 text-sm font-medium inline-block">
              Generate documents
            </div>
            
            <div className="block">
              <div className="bg-gray-100 text-gray-800 rounded-full py-2 px-6 text-sm font-medium inline-block">
                Conduct industry research
              </div>
            </div>
            
            <div className="block">
              <div className="bg-gray-100 text-gray-800 rounded-full py-2 px-6 text-sm font-medium inline-block">
                Offer precise, answers
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <h2 className="font-libre text-3xl font-bold mb-1">
            Welcome to Chatsector
          </h2>
          <h3 className="font-libre text-2xl font-bold mb-6">
            Unlock Research, Stay Ahead
          </h3>
          
          <p className="text-center text-base text-gray-700 mb-8">
            Ask, Analyze, Act – Start Researching with Chatsector
          </p>
        </div>
        
        <div className="w-full flex justify-end mt-4">
          <Button 
            className="bg-chatsector-orange hover:bg-chatsector-orange/90 text-white rounded-full px-8 py-2"
            onClick={onStart}
          >
            start
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default WelcomeCard;
