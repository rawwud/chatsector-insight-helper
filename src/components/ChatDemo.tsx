
import React, { useState, useEffect } from 'react';

const ChatDemo = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  
  const conversation = [
    { isUser: true, message: "What are the key market drivers in digital marketing for 2024?" },
    { isUser: false, message: "In digital marketing for 2024, AI-driven personalization, privacy-focused strategies, and programmatic advertising are the main market drivers. First-party data collection is increasingly valuable as third-party cookies phase out." },
    { isUser: true, message: "Which metrics should I monitor for my campaigns?" },
    { isUser: false, message: "For digital marketing campaigns, focus on conversion rate, customer acquisition cost (CAC), customer lifetime value (CLV), engagement metrics, and overall ROI. These provide a comprehensive view of your marketing effectiveness." },
  ];
  
  useEffect(() => {
    if (currentMessageIndex < conversation.length) {
      if (!conversation[currentMessageIndex].isUser) {
        // AI is "typing"
        setIsTyping(true);
        let text = '';
        const message = conversation[currentMessageIndex].message;
        let charIndex = 0;
        
        const typingInterval = setInterval(() => {
          if (charIndex < message.length) {
            text += message[charIndex];
            setDisplayedText(text);
            charIndex++;
          } else {
            setIsTyping(false);
            clearInterval(typingInterval);
            
            // Move to next message after a delay
            setTimeout(() => {
              setCurrentMessageIndex(prevIndex => prevIndex + 1);
            }, 2000);
          }
        }, 30); // Typing speed
        
        return () => clearInterval(typingInterval);
      } else {
        // User message appears immediately
        setDisplayedText('');
        setTimeout(() => {
          setCurrentMessageIndex(prevIndex => prevIndex + 1);
        }, 1500);
      }
    }
  }, [currentMessageIndex]);
  
  const renderConversation = () => {
    return conversation.slice(0, currentMessageIndex).map((item, index) => (
      <div 
        key={index} 
        className={`flex ${item.isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in`}
      >
        <div 
          className={`max-w-[80%] p-3 rounded-lg ${
            item.isUser 
              ? 'bg-chatsector-orange text-white rounded-tr-none' 
              : 'bg-chatsector-light-gray text-chatsector-black rounded-tl-none'
          }`}
        >
          {item.message}
        </div>
      </div>
    ));
  };
  
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-chatsector-light-gray">
      <div className="bg-chatsector-light-gray py-3 px-4 border-b border-chatsector-light-gray">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-chatsector-orange mr-2"></div>
          <div className="font-medium">Chatsector Research Assistant</div>
        </div>
      </div>
      
      <div className="p-4 h-80 overflow-y-auto flex flex-col">
        {renderConversation()}
        
        {currentMessageIndex < conversation.length && !conversation[currentMessageIndex].isUser && isTyping && (
          <div className="flex justify-start mb-4 animate-fade-in">
            <div className="max-w-[80%] p-3 rounded-lg bg-chatsector-light-gray text-chatsector-black rounded-tl-none">
              {displayedText}
              <span className="inline-block w-1 h-4 ml-1 bg-chatsector-orange animate-cursor-blink"></span>
            </div>
          </div>
        )}
        
        {currentMessageIndex < conversation.length && conversation[currentMessageIndex].isUser && (
          <div className="flex justify-end mb-4 animate-fade-in">
            <div className="max-w-[80%] p-3 rounded-lg bg-chatsector-orange text-white rounded-tr-none">
              {conversation[currentMessageIndex].message}
            </div>
          </div>
        )}
      </div>
      
      <div className="p-3 border-t border-chatsector-light-gray">
        <div className="flex items-center bg-chatsector-light-gray rounded-lg py-2 px-3">
          <input
            type="text"
            placeholder="Ask about your industry research..."
            className="flex-1 bg-transparent outline-none text-sm"
            disabled
          />
          <button className="text-chatsector-orange ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatDemo;
