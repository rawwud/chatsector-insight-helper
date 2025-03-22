
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Logo from './Logo';

interface WelcomeCardProps {
  onStart: () => void;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ onStart }) => {
  return (
    <Card className="max-w-xl w-full p-10 flex flex-col items-center">
      <div className="mb-8 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-6">
          <Logo className="w-12 h-12" />
        </div>
        
        <div className="space-y-3 text-center">
          <div className="bg-gray-200 text-gray-800 rounded-full py-2 px-6 mb-3 inline-block">
            Generate documents
          </div>
          
          <div className="bg-gray-200 text-gray-800 rounded-full py-2 px-6 mb-3 inline-block">
            Conduct industry research
          </div>
          
          <div className="bg-gray-200 text-gray-800 rounded-full py-2 px-6 mb-3 inline-block">
            Offer precise, answers
          </div>
        </div>
      </div>
      
      <h2 className="font-libre text-3xl text-center font-bold mb-3">
        Welcome to Chatsector
      </h2>
      <h3 className="font-libre text-2xl text-center font-bold mb-6">
        Unlock Research, Stay Ahead
      </h3>
      
      <p className="text-center text-lg mb-8">
        Ask, Analyze, Act – Start Researching with Chatsector
      </p>
      
      <Button 
        className="bg-chatsector-orange hover:bg-chatsector-orange/90 text-white rounded-full px-8 py-2"
        onClick={onStart}
      >
        start
      </Button>
    </Card>
  );
};

export default WelcomeCard;
