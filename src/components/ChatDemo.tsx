
import React, { useState, useEffect } from 'react';

const ChatDemo = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  
  const conversation = [
    { 
      isUser: true, 
      message: "What best practices can we implement to reduce waste generation in our facility?" 
    },
    { 
      isUser: false, 
      message: 
        "**Lean Manufacturing Practices**\n" +
        "Implement lean production methods to streamline operations, minimize excess production, and reduce waste generation throughout the facility.\n\n" +
        "**Recycling & Reuse Programs**\n" +
        "Establish comprehensive recycling and reuse initiatives. Regular waste audits can help pinpoint high-waste areas and identify opportunities for resource recovery.\n\n" +
        "**Employee Training & Awareness**\n" +
        "Educate employees on sustainable practices and waste reduction techniques. Empowering staff with knowledge can drive behavior change and support continuous improvement.\n\n" +
        "**Technology & Process Optimization**\n" +
        "Invest in precision technology and machinery that minimize off-cuts and enhance production accuracy. Process improvements can lead to significant waste reduction.\n\n" +
        "**Clear Metrics & Continuous Improvement**\n" +
        "Set clear waste reduction goals and track progress using key performance indicators (KPIs). Continuous monitoring and iterative improvements help maintain long-term sustainability."
    },
    { 
      isUser: true, 
      message: "Where can I find a directory of reliable suppliers for the components I need to make custom machinery?" 
    },
    { 
      isUser: false, 
      message: 
        "To source reliable suppliers for components needed in custom machinery manufacturing, consider utilizing the following reputable directories:\n\n" +
        "• **Thomasnet.com**: A comprehensive platform connecting buyers with over 500,000 industrial suppliers, including OEMs, custom manufacturers, service companies, and distributors.\n\n" +
        "• **MFG.com**: A global e-commerce marketplace that connects buyers with manufacturers offering contract manufacturing services, facilitating sourcing of custom-manufactured parts.\n\n" +
        "• **IQS Directory**: Provides an extensive list of custom machinery manufacturers and suppliers, allowing for easy review and sourcing of companies that can design, engineer, and manufacture machinery to exact specifications.\n\n" +
        "• **MachineShopWeb.com**: Features thousands of machine shops with various certifications, including ISO and AS9100, catering to different contract manufacturing needs."
    }
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
        }, 15); // Typing speed
        
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
