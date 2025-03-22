
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Logo from '../components/Logo';
import WelcomeCard from '../components/WelcomeCard';
import { ArrowUp, ChevronDown } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  const [pageName, setPageName] = useState('New page');
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setCharHistory] = useState<{type: 'user' | 'ai', content: string}[]>([]);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  
  const handleStartResearch = () => {
    setShowWelcome(false);
  };

  const handleSendMessage = () => {
    if (userInput.trim()) {
      setCharHistory([...chatHistory, {type: 'user', content: userInput}, {type: 'ai', content: 'This is a placeholder AI response. The actual AI functionality will be implemented later.'}]);
      setUserInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageName(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditingTitle(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-48 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-gray-200 rounded-md w-8 h-8 flex items-center justify-center text-gray-700 font-semibold">
              U
            </div>
            <span className="ml-2 text-sm font-medium">user</span>
          </div>
          <ChevronDown size={16} className="text-gray-500" />
        </div>
        <div className="flex-grow">
          {/* Sidebar content will go here in the future */}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow flex flex-col">
        {showWelcome ? (
          <div className="flex-grow flex items-center justify-center p-6">
            <WelcomeCard onStart={handleStartResearch} />
          </div>
        ) : (
          <div className="flex-grow flex flex-col p-6">
            {/* Page title */}
            <div className="border-b border-gray-200 pb-4 mb-6">
              {isEditingTitle ? (
                <input
                  type="text"
                  value={pageName}
                  onChange={handleTitleChange}
                  onBlur={handleTitleBlur}
                  onKeyDown={handleTitleKeyDown}
                  className="text-4xl font-libre text-gray-400 bg-transparent border-none focus:outline-none"
                  autoFocus
                />
              ) : (
                <h1 
                  className="text-4xl font-libre text-gray-400 cursor-pointer"
                  onClick={handleTitleClick}
                >
                  {pageName}
                </h1>
              )}
            </div>

            {/* Chat area */}
            <div className="flex-grow overflow-y-auto mb-6">
              {chatHistory.length === 0 ? (
                <div className="text-gray-400 italic text-center mt-20">
                  Begin your research by asking a question below
                </div>
              ) : (
                <div className="space-y-6">
                  {chatHistory.map((message, index) => (
                    <div key={index} className="space-y-2">
                      {message.type === 'user' ? (
                        <>
                          <div className="text-lg">{message.content}</div>
                        </>
                      ) : (
                        <>
                          <div className="font-medium text-lg">Answer</div>
                          <div className="text-lg">{message.content}</div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Input area */}
            <div className="relative">
              <Input
                placeholder="Ask about your sector"
                className="pr-12 py-6 text-base rounded-full"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button 
                className="absolute right-1 top-1 rounded-full w-10 h-10 p-0"
                onClick={handleSendMessage}
                disabled={!userInput.trim()}
              >
                <ArrowUp size={18} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
