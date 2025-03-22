
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import WelcomeCard from '../components/WelcomeCard';
import { ArrowUp, ChevronDown, Settings, LogOut, Palette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Groq from 'groq-sdk';

const Dashboard = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [pageName, setPageName] = useState('New page');
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{type: 'user' | 'ai', content: string}[]>([]);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleStartResearch = () => {
    setShowWelcome(false);
  };

  const handleSendMessage = async () => {
    if (userInput.trim()) {
      // Add user message to chat history
      setChatHistory(prev => [...prev, {type: 'user', content: userInput}]);
      
      // Clear input field
      const userMessage = userInput;
      setUserInput('');
      setIsLoading(true);

      try {
        // Prepare messages for GROQ API
        const messages = [
          ...chatHistory.map(msg => ({
            role: msg.type === 'user' ? 'user' : 'assistant',
            content: msg.content
          })),
          { role: 'user', content: userMessage }
        ];

        // Initialize GROQ client
        const groq = new Groq({
          apiKey: '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', // This is a publishable key
        });

        // Make the API call
        const chatCompletion = await groq.chat.completions.create({
          messages,
          model: "llama-3.3-70b-versatile",
          temperature: 0.7,
          max_tokens: 1024,
          top_p: 1,
          stream: false
        });

        // Get the response content
        const responseContent = chatCompletion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";
        
        // Add AI response to chat history
        setChatHistory(prev => [...prev, {type: 'ai', content: responseContent}]);
      } catch (error) {
        console.error('Error calling GROQ API:', error);
        toast({
          title: "Error",
          description: "Failed to get AI response. Please try again.",
          variant: "destructive",
        });
        // Add a fallback error message to chat history
        setChatHistory(prev => [...prev, {type: 'ai', content: "Sorry, I encountered an error while generating a response. Please try again."}]);
      } finally {
        setIsLoading(false);
      }
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

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isEditingTitle]);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar - using a light grey background */}
      <div className="w-48 bg-[#F1F1F1] flex flex-col">
        <Popover>
          <PopoverTrigger asChild>
            <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#e5e5e5] transition-colors">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 bg-[#d9d9d9]">
                  <AvatarFallback className="text-[#222222]">U</AvatarFallback>
                </Avatar>
                <span className="ml-2 text-sm font-medium text-[#222222]">user</span>
              </div>
              <ChevronDown size={16} className="text-[#737373]" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-0 bg-white border border-gray-200 shadow-md rounded-md">
            <div className="py-1">
              <button className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100 text-sm">
                <Settings size={16} />
                <span>Settings</span>
              </button>
              <button className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100 text-sm">
                <Palette size={16} />
                <span>Customization</span>
              </button>
              <button className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100 text-sm">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </PopoverContent>
        </Popover>
        <div className="flex-grow">
          {/* Sidebar content will go here in the future */}
        </div>
      </div>

      {/* Main content - using white background */}
      <div className="flex-grow flex flex-col bg-white">
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
                  ref={titleInputRef}
                  type="text"
                  value={pageName}
                  onChange={handleTitleChange}
                  onBlur={handleTitleBlur}
                  onKeyDown={handleTitleKeyDown}
                  className="text-4xl font-libre text-gray-400 bg-transparent border-none focus:outline-none w-full"
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
                        <div className="text-lg">{message.content}</div>
                      ) : (
                        <>
                          <div className="font-medium text-lg">Answer</div>
                          <div className="text-lg">{message.content}</div>
                        </>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="space-y-2">
                      <div className="font-medium text-lg">Answer</div>
                      <div className="text-lg">Thinking...</div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Input area with specific styling from screenshot */}
            <div className="relative">
              <Input
                placeholder="Ask about your sector"
                className="pr-12 py-6 text-base rounded-full bg-[#d9d9d9] border-none placeholder:text-[#a6a6a6] focus-visible:ring-0"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <Button 
                className="absolute right-1 top-1 rounded-full w-10 h-10 p-0 bg-[#737373] hover:bg-[#5a5a5a]"
                onClick={handleSendMessage}
                disabled={!userInput.trim() || isLoading}
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
