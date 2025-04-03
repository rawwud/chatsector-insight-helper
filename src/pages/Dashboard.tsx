import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from "../components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import WelcomeCard from '../components/WelcomeCard';
import { ArrowUp, ChevronDown, Settings, LogOut, Palette, Star, MoreHorizontal, Lock, Edit, MessageSquare, Trash2 } from 'lucide-react';
import { useToast } from "../components/ui/use-toast";
import { Groq } from 'groq-sdk';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../contexts/AuthContext';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { supabase } from '../lib/supabase';

interface PageData {
  id: string;
  title: string;
  messages: {type: 'user' | 'ai', content: string, key: string}[];
  createdAt: number;
}

interface DashboardProps {
  isNewUser?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ isNewUser = false }) => {
  const navigate = useNavigate();
  const { pageId } = useParams<{ pageId: string }>();
  const { user, signOut } = useAuth();
  
  const [showWelcome, setShowWelcome] = useState(isNewUser);
  const [pages, setPages] = useState<PageData[]>([]);
  const [activePage, setActivePage] = useState<PageData | null>(null);
  const [pageName, setPageName] = useState('New page');
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{type: 'user' | 'ai', content: string, key: string}[]>([]);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCustomizeButton, setShowCustomizeButton] = useState(false);
  const [streamedResponse, setStreamedResponse] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasTitleChanged, setHasTitleChanged] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  // Load user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const { data } = await supabase.auth.getUser();
        if (data.user) {
          setUserProfile(data.user.user_metadata);
        }
      }
    };

    fetchUserProfile();
  }, [user]);
  
  // Load chat history from localStorage on initial render
  useEffect(() => {
    const storedPages = localStorage.getItem('chatPages');
    if (storedPages) {
      const parsedPages = JSON.parse(storedPages) as PageData[];
      setPages(parsedPages);
      
      // If we have a pageId from URL, load that page
      if (pageId) {
        const foundPage = parsedPages.find(page => page.id === pageId);
        if (foundPage) {
          // Check if the page is empty (default title with no messages)
          if (foundPage.title === 'New page' && foundPage.messages.length === 0) {
            // Remove this empty page
            const updatedPages = parsedPages.filter(page => page.id !== pageId);
            setPages(updatedPages);
            localStorage.setItem('chatPages', JSON.stringify(updatedPages));
            
            // Toast notification removed
            
            // Redirect to dashboard
            navigate('/dashboard');
          } else {
            // Load the page as usual
            setActivePage(foundPage);
            setPageName(foundPage.title);
            setChatHistory(foundPage.messages);
            setHasTitleChanged(foundPage.title !== 'New page');
            setShowWelcome(false);
          }
        } else {
          // If page not found, redirect to dashboard
          navigate('/dashboard');
        }
      }
    }
  }, [pageId, navigate]);
  
  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (activePage) {
      // Don't call setPages here to avoid infinite update loop
      const updatedPages = pages.map(page => 
        page.id === activePage.id 
          ? { ...page, title: pageName, messages: chatHistory } 
          : page
      );
      
      // Only update localStorage, don't update state inside this effect
      localStorage.setItem('chatPages', JSON.stringify(updatedPages));
    }
  }, [chatHistory, pageName, activePage, pages]);
  
  // Separate effect to update pages state when activePage or its data changes
  useEffect(() => {
    if (activePage && pages.length > 0) {
      // Only update pages if activePage exists and there are pages
      const pageExists = pages.some(page => page.id === activePage.id);
      
      if (pageExists) {
        const updatedPages = pages.map(page => 
          page.id === activePage.id 
            ? { ...page, title: pageName, messages: chatHistory } 
            : page
        );
        
        // Directly update localStorage without triggering another effect
        setPages(updatedPages);
      }
    }
  // This effect only runs when specific properties of the page change, not when pages array changes
  }, [chatHistory.length, pageName, activePage?.id]);
  
  // Check if a page is empty (has default title and no messages)
  const isPageEmpty = (page: PageData): boolean => {
    return page.title === 'New page' && page.messages.length === 0;
  };
  
  const createNewPage = (initialMessage?: string) => {
    const newPageId = uuidv4();
    const newPage: PageData = {
      id: newPageId,
      title: 'New page',
      messages: [],
      createdAt: Date.now()
    };
    
    // Check for and remove any empty pages before creating a new one
    const emptyPages = pages.filter(isPageEmpty);
    let updatedPages: PageData[];
    
    if (emptyPages.length > 0) {
      // Filter out empty pages
      updatedPages = [newPage, ...pages.filter(page => !isPageEmpty(page))];
      
      // If the active page is one of the empty pages being deleted, don't include it in the toast message
      const deletedEmptyPages = emptyPages.filter(page => page.id !== activePage?.id);
      
      // If we deleted any empty pages (other than the current active one), show a toast
      if (deletedEmptyPages.length > 0) {
        // Toast notification removed
      }
    } else {
      // No empty pages to remove
      updatedPages = [newPage, ...pages];
    }
    
    setPages(updatedPages);
    localStorage.setItem('chatPages', JSON.stringify(updatedPages));
    
    setActivePage(newPage);
    setPageName('New page');
    setChatHistory([]);
    setHasTitleChanged(false);
    
    // Navigate to the new page URL
    navigate(`/dashboard/${newPageId}`);
    
    // If there's an initial message, process it
    if (initialMessage) {
      setUserInput(initialMessage);
      setTimeout(() => {
        handleSendMessage(initialMessage);
      }, 100);
    }
  };
  
  const handleStartResearch = () => {
    setShowWelcome(false);
    createNewPage();
  };

  const handleSendMessage = async (initialMessage?: string) => {
    const messageToSend = initialMessage || userInput.trim();
    
    if (messageToSend) {
      // If we don't have an active page yet, create one
      if (!activePage) {
        createNewPage(messageToSend);
        return;
      }
      
      // Add user message to chat history with key for animation
      const newUserMessage = {type: 'user' as const, content: messageToSend, key: Date.now().toString()};
      setChatHistory(prev => [...prev, newUserMessage]);
      
      // Clear input field
      setUserInput('');
      setIsLoading(true);
      
      // We'll handle streaming separately from isLoading
      // isLoading is for the "Thinking..." state
      // isStreaming is for the token streaming animation
      setIsStreaming(false);
      setStreamedResponse('');

      try {
        // Initialize GROQ client with updated API key and dangerouslyAllowBrowser option
        const groq = new Groq({
          apiKey: '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',
          dangerouslyAllowBrowser: true, // Important: Allow browser usage
        });

        // Create system message based on user profile
        let systemMessage = "You are a helpful AI research assistant.";
        
        if (userProfile) {
          systemMessage = `You are a specialized AI research assistant for a ${userProfile.industry || "general"} professional`;
          
          if (userProfile.role) {
            systemMessage += ` who works as a ${userProfile.role}`;
          }
          
          if (userProfile.experienceLevel) {
            const experienceLevelMap: {[key: string]: string} = {
              'student': 'a student who is learning about the field',
              'beginner': 'a beginner with basic knowledge',
              'intermediate': 'someone with intermediate knowledge and experience',
              'advanced': 'someone with advanced knowledge and experience',
              'expert': 'an expert with deep domain knowledge'
            };
            
            systemMessage += ` with ${experienceLevelMap[userProfile.experienceLevel] || userProfile.experienceLevel} level expertise`;
          }
          
          systemMessage += '.';
          
          if (userProfile.researchInterests) {
            systemMessage += ` Focus your responses on their interests in: ${userProfile.researchInterests}.`;
          }
          
          if (userProfile.additionalPreferences) {
            systemMessage += ` Additional preferences: ${userProfile.additionalPreferences}.`;
          }
        }

        // Prepare correctly typed messages for GROQ API
        const messages = [
          { role: 'system' as const, content: systemMessage },
          ...chatHistory.map(msg => ({
            role: msg.type === 'user' ? 'user' as const : 'assistant' as const,
            content: msg.content
          })),
          { role: 'user' as const, content: messageToSend }
        ];

        // Make the API call with fixed types
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
        
        // Set loading to false first to remove "Thinking..."
        setIsLoading(false);
        
        // Now start streaming tokens
        setIsStreaming(true);
        
        // Improved token streaming without animation
        const words = responseContent.split(' ');
        let currentContent = '';
        
        for (let i = 0; i < words.length; i++) {
          // Add a space after each word except the last one
          const word = words[i] + (i < words.length - 1 ? ' ' : '');
          currentContent += word;
          setStreamedResponse(currentContent);
          
          // Small delay between words for visual effect
          await new Promise(resolve => setTimeout(resolve, 10));
        }
        
        // Add AI response to chat history after streaming completes
        setIsStreaming(false);
        setChatHistory(prev => [...prev, {type: 'ai', content: responseContent, key: Date.now().toString()}]);
        
        // If this is the first message and title hasn't been changed, set the title based on the first few words
        if (chatHistory.length === 0 && !hasTitleChanged) {
          // Grab first 5 words of user message or first 17 chars, whichever is shorter
          const words = messageToSend.split(' ').slice(0, 5).join(' ');
          const title = words.length > 17 ? words.substring(0, 17) + '...' : words;
          setPageName(title);
          setHasTitleChanged(true);
        }
      } catch (error) {
        console.error('Error calling GROQ API:', error);
        toast({
          title: "Error",
          description: "Failed to get AI response. Please try again.",
          variant: "destructive",
        });
        // Add a fallback error message to chat history
        setIsLoading(false);
        setIsStreaming(false);
        setChatHistory(prev => [...prev, {type: 'ai', content: "Sorry, I encountered an error while generating a response. Please try again.", key: Date.now().toString()}]);
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
    if (e.target.value !== 'New page') {
      setHasTitleChanged(true);
    } else {
      setHasTitleChanged(false);
    }
  };

  const handleTitleBlur = () => {
    // If the title is empty (or only whitespace), revert to "New page"
    if (!pageName.trim()) {
      setPageName('New page');
      setHasTitleChanged(false);
    }
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      // If the title is empty (or only whitespace), revert to "New page"
      if (!pageName.trim()) {
        setPageName('New page');
        setHasTitleChanged(false);
      }
      setIsEditingTitle(false);
    }
  };
  
  const handlePageSelect = (pageId: string) => {
    // Find the page the user is trying to navigate to
    const targetPage = pages.find(page => page.id === pageId);
    
    // If the page is empty (default title and no messages), don't navigate to it
    // Instead, delete it and stay on the current page or navigate to dashboard
    if (targetPage && isPageEmpty(targetPage)) {
      // Remove the empty page
      const updatedPages = pages.filter(page => page.id !== pageId);
      setPages(updatedPages);
      localStorage.setItem('chatPages', JSON.stringify(updatedPages));
      
      // Toast notification removed
      
      // If we're already on this page, navigate to the dashboard root
      if (activePage?.id === pageId) {
        navigate('/dashboard');
      }
      // Otherwise stay on the current page (do nothing)
    } else {
      // Regular navigation to the selected page
      navigate(`/dashboard/${pageId}`);
    }
  };
  
  const truncateTitle = (title: string) => {
    if (title.length <= 17) return title;
    
    // Try to truncate at the last space before 17 characters
    const lastSpaceIndex = title.substring(0, 17).lastIndexOf(' ');
    if (lastSpaceIndex > 0) {
      return title.substring(0, lastSpaceIndex) + '...';
    }
    
    // If no space found, just truncate at 17 chars
    return title.substring(0, 17) + '...';
  };
  
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isEditingTitle]);

  // Function to safely render markdown including tables
  const renderMarkdown = (content: string) => {
    // Configure marked to enable tables and other GitHub Flavored Markdown
    marked.setOptions({
      gfm: true,
      breaks: true
    });
    
    // Convert markdown to HTML
    const rawHtml = marked.parse(content) as string;
    
    // Sanitize the HTML to prevent XSS attacks
    const sanitizedHtml = DOMPurify.sanitize(rawHtml, {
      ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'code', 'pre', 'table', 'thead', 'tbody', 'tr', 'th', 'td'],
      ALLOWED_ATTR: ['href', 'target', 'rel']
    });
    
    return sanitizedHtml;
  };

  // Add a function to handle page deletion
  const handleDeletePage = (pageId: string, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation(); // Prevent triggering page selection
    }
    setPageToDelete(pageId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeletePage = () => {
    if (!pageToDelete) return;
    
    // Remove the page from pages array
    const updatedPages = pages.filter(page => page.id !== pageToDelete);
    setPages(updatedPages);
    localStorage.setItem('chatPages', JSON.stringify(updatedPages));
    
    // Show success toast
    toast({
      title: "Page deleted",
      description: "The page has been permanently deleted",
    });
    
    // If the deleted page is the active page, navigate to dashboard root
    if (activePage?.id === pageToDelete) {
      setActivePage(null);
      navigate('/dashboard');
    }
    
    // Reset state
    setPageToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar - fixed position */}
      <div className="w-48 bg-[#f7f7f7] flex flex-col fixed h-screen left-0 top-0 z-10">
        {/* Chatsector Logo at the top */}
        <div className="p-4 flex items-center justify-center border-b border-gray-200">
          <h1 className="font-libre text-xl font-bold text-chatsector-black">Chatsector</h1>
        </div>
        
        {/* New page button */}
        <button 
          className="w-full text-left px-4 py-2 mb-2 flex items-center text-sm text-gray-700 font-medium hover:bg-gray-200"
          onClick={() => createNewPage()}
        >
          + New Chat
        </button>
        
        {/* Chat history - scrollable middle section */}
        <div className="flex-grow overflow-y-auto">
          <div className="space-y-1 px-2">
            {pages.map(page => (
              <div
                key={page.id}
                className={`w-full text-left px-2 py-2 rounded flex items-center justify-between text-sm group ${
                  activePage?.id === page.id ? 'bg-gray-200' : 'hover:bg-gray-100'
                }`}
              >
                <div 
                  className="flex items-center truncate cursor-pointer flex-grow"
                  onClick={() => handlePageSelect(page.id)}
                >
                  <MessageSquare size={14} className="mr-2 text-gray-500 flex-shrink-0" />
                  <span className="truncate">{truncateTitle(page.title)}</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button 
                      className="opacity-0 group-hover:opacity-100 focus:opacity-100 p-1 rounded-sm hover:bg-gray-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal size={14} className="text-gray-500" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem 
                      className="text-red-600 focus:text-red-600 focus:bg-red-50"
                      onClick={(e) => handleDeletePage(page.id, e as React.MouseEvent)}
                    >
                      <Trash2 size={14} className="mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </div>
        
        {/* Profile section - now at the bottom */}
        <div className="mt-auto border-t border-gray-200">
          <Popover>
            <PopoverTrigger asChild>
              <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#e5e5e5] transition-colors">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 bg-[#d9d9d9]">
                    <AvatarFallback className="text-[#222222]">{user?.email?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                  </Avatar>
                  <span className="ml-2 text-sm font-medium text-[#222222] truncate max-w-[70px]">
                    {user?.email?.split('@')[0] || 'user'}
                  </span>
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
                <button 
                  className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100 text-sm"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Main content - using white background with margin to account for fixed sidebar */}
      <div className="flex-grow flex flex-col bg-white ml-48">
        {/* New upper bar */}
        <div className="w-full bg-white py-3 px-6 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-1 text-sm">
            <span>{pageName}</span>
            <button className="opacity-70">
              <Lock size={14} className="ml-1 text-gray-500" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100">
              <Star size={18} className="text-gray-500" />
            </button>
            {activePage && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100">
                    <MoreHorizontal size={18} className="text-gray-500" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem 
                    className="text-red-600 focus:text-red-600 focus:bg-red-50"
                    onClick={() => activePage && handleDeletePage(activePage.id)}
                  >
                    <Trash2 size={14} className="mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {showWelcome ? (
          <div className="flex-grow flex items-center justify-center p-6">
            <WelcomeCard onStart={handleStartResearch} />
          </div>
        ) : (
          <div className="flex-grow flex flex-col p-8">
            {/* Page title with hover button */}
            <div 
              className="relative mb-10 pl-4" 
              onMouseEnter={() => setShowCustomizeButton(true)}
              onMouseLeave={() => setShowCustomizeButton(false)}
            >
              {isEditingTitle ? (
                <input
                  ref={titleInputRef}
                  type="text"
                  value={pageName}
                  onChange={handleTitleChange}
                  onBlur={handleTitleBlur}
                  onKeyDown={handleTitleKeyDown}
                  className={`text-4xl font-libre ${hasTitleChanged ? 'text-gray-800 font-bold' : 'text-gray-300'} bg-transparent border-none focus:outline-none w-full`}
                  autoFocus
                />
              ) : (
                <div className="flex flex-col items-start">
                  {showCustomizeButton && (
                    <button className="text-sm text-gray-500 mb-1 flex items-center gap-1 hover:text-gray-700 transition-colors animate-fadeIn">
                      <Palette size={14} className="text-gray-500" /> Customize Page Research
                    </button>
                  )}
                  <h1 
                    className={`text-4xl font-libre ${hasTitleChanged ? 'text-gray-800 font-bold' : 'text-gray-300'} cursor-pointer`}
                    onClick={handleTitleClick}
                  >
                    {pageName}
                  </h1>
                </div>
              )}
            </div>

            {/* Chat area - slightly adjusted positioning */}
            <div className="flex-grow overflow-y-auto mb-6 pl-4">
              {chatHistory.length === 0 ? (
                <div className="text-gray-400 italic text-center mt-20">
                  {/* Empty state */}
                </div>
              ) : (
                <div className="space-y-8">
                  {chatHistory.map((message) => (
                    <div key={message.key} className="space-y-2 animate-fadeIn">
                      {message.type === 'user' ? (
                        <div className="text-base">{message.content}</div>
                      ) : (
                        <>
                          <div className="font-medium text-base">Answer</div>
                          <div 
                            className="text-base leading-relaxed markdown-content"
                            dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
                          />
                        </>
                      )}
                    </div>
                  ))}
                  
                  {/* Only show "Thinking..." when loading and not streaming */}
                  {isLoading && !isStreaming && (
                    <div className="space-y-2 animate-fadeIn">
                      <div className="font-medium text-base">Answer</div>
                      <div className="text-base animate-pulse">Thinking...</div>
                    </div>
                  )}
                  
                  {/* Only show streaming when not loading */}
                  {isStreaming && !isLoading && (
                    <div className="space-y-2 animate-fadeIn">
                      <div className="font-medium text-base">Answer</div>
                      <div className="text-base leading-relaxed whitespace-pre-line">
                        {streamedResponse}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Input area with specific styling from screenshot - now with animation */}
            <div className="relative flex justify-center">
              <div className="relative w-4/5 max-w-3xl">
                <textarea
                  placeholder="Ask about your sector"
                  className="w-full pr-12 py-2 px-6 text-base rounded-full bg-[#f5f5f5] border-none placeholder:text-[#636363] focus-visible:ring-0 focus-visible:outline-none resize-none overflow-hidden min-h-[2.5rem] transition-all duration-300 ease-in-out focus:min-h-[3rem] focus:py-3"
                  value={userInput}
                  onChange={(e) => {
                    setUserInput(e.target.value);
                    // Auto-resize the textarea
                    e.target.style.height = 'auto';
                    e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
                  }}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  style={{ height: userInput ? 'auto' : '2.5rem' }}
                  rows={1}
                />
                <Button 
                  className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full w-8 h-8 p-0 bg-[#8a8a8a] hover:bg-[#6a6a6a] transition-all duration-300 ease-in-out"
                  onClick={() => handleSendMessage()}
                  disabled={!userInput.trim() || isLoading}
                >
                  <ArrowUp size={16} className="text-[#d1d1d1]" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this page?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the page and remove all of its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700 text-white" 
              onClick={confirmDeletePage}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Dashboard;
