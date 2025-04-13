import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from "../components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import WelcomeCard from '../components/WelcomeCard';
import { ArrowUp, ChevronDown, Settings, LogOut, Palette, Star, MoreHorizontal, Lock, Edit, MessageSquare, Trash2, ExternalLink, X } from 'lucide-react';
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
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

interface PageData {
  id: string;
  title: string;
  messages: {
    type: 'user' | 'ai', 
    content: string, 
    key: string,
    sources?: {title: string, url: string, content: string}[]
  }[];
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
  const [chatHistory, setChatHistory] = useState<{
    type: 'user' | 'ai', 
    content: string, 
    key: string,
    sources?: {title: string, url: string, content: string}[]
  }[]>([]);
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
  const [showSourcesSidebar, setShowSourcesSidebar] = useState(false);
  const [currentSources, setCurrentSources] = useState<{title: string, url: string, content: string}[]>([]);
  const [isDeleteAllChatsDialogOpen, setIsDeleteAllChatsDialogOpen] = useState(false);
  const [isCustomizeDialogOpen, setIsCustomizeDialogOpen] = useState(false);
  const [customizationFormData, setCustomizationFormData] = useState({
    industry: '',
    role: '',
    experienceLevel: '',
    researchInterests: '',
    additionalPreferences: ''
  });
  
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
      try {
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
            
            // Redirect to dashboard
            navigate('/dashboard');
          } else {
            // Load the page as usual
            setActivePage(foundPage);
            setPageName(foundPage.title);
            setChatHistory(foundPage.messages);
              
              // If there are AI messages with sources, initialize currentSources with the most recent one
              const messagesWithSources = foundPage.messages.filter(
                msg => msg.type === 'ai' && msg.sources && msg.sources.length > 0
              );
              if (messagesWithSources.length > 0) {
                // Use the sources from the most recent AI message
                const mostRecentMessage = messagesWithSources[messagesWithSources.length - 1];
                if (mostRecentMessage.sources) {
                  setCurrentSources(mostRecentMessage.sources);
                }
              }
              
            setHasTitleChanged(foundPage.title !== 'New page');
            setShowWelcome(false);
          }
        } else {
          // If page not found, redirect to dashboard
          navigate('/dashboard');
        }
        }
      } catch (error) {
        console.error('Error parsing stored pages:', error);
        // Fallback to empty pages if parsing fails
        setPages([]);
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
        // Tavily API for web search - limited to 5 results
        const tavily_api_key = "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";
        
        // Search the web first
        const searchResponse = await axios.post(
          'https://api.tavily.com/search',
          {
            query: messageToSend,
            search_depth: "advanced",
            max_results: 5, // Limit to 5 search results as requested
            include_domains: [],
            exclude_domains: []
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${tavily_api_key}`
            }
          }
        );
        
        const searchResults = searchResponse.data.results;
        
        // Process search results
        const key_entities = searchResults.map(result => result.title.split(' ').slice(0, 2).join(' ')).slice(0, 3);
        
        // Create a simple sentiment distribution (placeholder - normally would use NLP)
        const sentiment_analysis = {
          source_diversity: 0.8,
          sentiment_distribution: {
            positive: 0.5,
            negative: 0.2,
            neutral: 0.3
          }
        };
        
        // Format sources for the prompt
        const formatted_sources = searchResults.map((result, index) => 
          `Source ${index + 1}: ${result.title}\nURL: ${result.url}\nContent: ${result.content}\n`
        ).join('\n');
        
        // Metadata context for the AI
        const metadata_context = `
        METADATA CONTEXT (for your awareness only, don't mention this directly):
        - Key entities detected: ${key_entities.join(', ')}
        - Source diversity score: ${sentiment_analysis.source_diversity.toFixed(2)} (higher is more diverse)
        - Sentiment distribution: Positive: ${sentiment_analysis.sentiment_distribution.positive}, 
          Negative: ${sentiment_analysis.sentiment_distribution.negative}, 
          Neutral: ${sentiment_analysis.sentiment_distribution.neutral}
        `;
        
        // Create comprehensive system message based on user profile
        // This will be the ONLY place where user profile info is included
        let systemMessage = "You are a helpful AI research assistant with access to the internet for real-time data.";
        
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

        // Add web search capabilities and prompt to the system message
        systemMessage += `
        
        You have access to the internet for real-time data. Here's how to use this information:
        
        1. Directly answer the query
        2. Answer like a normal chatbot or AI but make it clear you have access to the internet for real-time data
        3. Include in-line citations [1], [2], etc. after statements that reference specific sources
        4. Don't include the URLs or sources directly in your response text
        5. Prioritize the most relevant information from the sources
        6. Reply with detailed and informative content
        
        ${metadata_context}
        
        Here are the sources you can use:
        
        ${formatted_sources}
        `;

        // Initialize GROQ client with updated API key and dangerouslyAllowBrowser option
        const groq = new Groq({
          apiKey: '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',
          dangerouslyAllowBrowser: true, // Important: Allow browser usage
        });

        // Prepare messages array for GROQ API with correct type
        const messages: Array<{
          role: 'system' | 'user' | 'assistant',
          content: string
        }> = [];
        
        // Add system message
        messages.push({ 
          role: 'system', 
          content: systemMessage 
        });
        
        // Get only the most recent AI response, if available
        const lastAiMessage = chatHistory.filter(msg => msg.type === 'ai').pop();
        
        // Add the previous assistant message if available
        if (lastAiMessage) {
          messages.push({ 
            role: 'assistant', 
            content: lastAiMessage.content 
          });
        }
        
        // Add the current user message
        messages.push({ 
          role: 'user', 
          content: messageToSend 
        });

        // Make the API call with fixed types
        const chatCompletion = await groq.chat.completions.create({
          messages,
          model: "meta-llama/llama-4-scout-17b-16e-instruct", // Use the requested model
          temperature: 0.7,
          max_tokens: 1024,
          top_p: 1,
          stream: false
        });

        // Get the response content
        let responseContent = chatCompletion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";
        
        // Store the search results in state for later use in the sidebar
        const searchResultsForStorage = searchResults.map(result => ({
          title: result.title,
          url: result.url,
          content: result.content
        }));
        
        setCurrentSources(searchResultsForStorage);
        
        // Process the response to add the Sources button
        const hasSources = responseContent.includes("Sources:") || responseContent.includes("[1]") || 
                          responseContent.includes("[2]") || responseContent.includes("[3]") ||
                          searchResults.length > 0; // Always consider having sources if search results exist
        
        // Find and replace the Sources section with a button, or add one if missing
        if (hasSources) {
          // First, ensure all citation numbers are properly formatted for clicking
          responseContent = responseContent.replace(/\[(\d+)\]/g, '<span class="citation-number" data-source-id="$1">[$1]</span>');
          
          // Then handle the Sources section if it exists
          if (responseContent.includes("Sources:") || responseContent.includes("SOURCES:") || 
              responseContent.includes("References:") || responseContent.includes("REFERENCES:")) {
            
            // Split content at "Sources:" or similar heading
            const parts = responseContent.split(/Sources:|SOURCES:|References:|REFERENCES:/i);
            
            if (parts.length > 1) {
              // Count the number of sources
              const sourcesText = parts[1];
              const sourceCount = (sourcesText.match(/\[\d+\]/g) || []).length || 
                                 (sourcesText.match(/Source \d+:/g) || []).length || 
                                 searchResults.length;
              
              // Use only the main content part
              responseContent = parts[0] + `\n\n<div class="sources-button" data-sources="${sourceCount}">${sourceCount} sources</div>`;
            }
          } else {
            // If no Sources section is found but we have search results, add a sources button
            const sourceCount = searchResults.length;
            responseContent += `\n\n<div class="sources-button" data-sources="${sourceCount}">${sourceCount} sources</div>`;
          }
        }
        
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
        setChatHistory(prev => [
          ...prev, 
          {
            type: 'ai', 
            content: responseContent, 
            key: Date.now().toString(),
            sources: searchResultsForStorage // Always store sources with each message
          }
        ]);
        
        // If this is the first message and title hasn't been changed, set the title based on the first few words
        if (chatHistory.length === 0 && !hasTitleChanged) {
          // Grab first 5 words of user message or first 17 chars, whichever is shorter
          const words = messageToSend.split(' ').slice(0, 5).join(' ');
          const title = words.length > 17 ? words.substring(0, 17) + '...' : words;
          setPageName(title);
          setHasTitleChanged(true);
        }
      } catch (error) {
        console.error('Error processing request:', error);
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
    
    // Make sure all citation numbers are properly formatted, even after markdown processing
    let processedHtml = rawHtml.replace(/\[(\d+)\]/g, '<span class="citation-number" data-source-id="$1">[$1]</span>');
    
    // Add custom attributes to the DOMPurify configuration to allow our custom attributes
    const sanitizeConfig = {
      ADD_ATTR: ['data-source-id', 'data-sources', 'data-message-key'],
      ADD_TAGS: ['style', 'span'], // Ensure span tags are preserved
      ALLOW_DATA_ATTR: true
    };
    
    // Sanitize HTML with our custom configuration
    let sanitized = DOMPurify.sanitize(processedHtml, sanitizeConfig);
    
    // Add custom styling for sources button and citation numbers
    if (sanitized.includes('class="sources-button"') || sanitized.includes('class="citation-number"')) {
      sanitized += `
        <style>
          .sources-button {
            display: inline-block;
            padding: 4px 10px;
            background-color: #f5f5f5;
            border: 1px solid #e0e0e0;
            border-radius: 4px;
            font-size: 0.9rem;
            color: #666;
            cursor: pointer;
            margin-top: 10px;
          }
          .sources-button:hover {
            background-color: #e9e9e9;
          }
          .sources-button::before {
            content: '📚 ';
          }
          .citation-number {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background-color: #f0f0f0;
            border-radius: 4px;
            padding: 0 4px;
            margin: 0 2px;
            font-size: 0.85em;
            color: #555;
            cursor: pointer;
            transition: background-color 0.2s;
          }
          .citation-number:hover {
            background-color: #e0e0e0;
            text-decoration: none;
          }
        </style>
      `;
    }
    
    return sanitized;
  };

  // Handle click on sources button - updated to get sources from message
  const handleSourcesClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    
    // Find the closest message container
    const messageContainer = target.closest('.message-container');
    
    if (target.classList.contains('sources-button') && messageContainer) {
      // Get the message index from the data attribute
      const messageKey = messageContainer.getAttribute('data-message-key');
      if (messageKey) {
        // Find the message with this key
        const message = chatHistory.find(msg => msg.key === messageKey);
        if (message && message.sources && message.sources.length > 0) {
          setCurrentSources(message.sources);
          setShowSourcesSidebar(true);
        } else {
          // Fallback if message sources are not available for some reason
          toast({
            title: "Source information",
            description: "The sources for this response are not available.",
            variant: "default",
          });
        }
      }
    }
    
    if (target.classList.contains('citation-number')) {
      const sourceId = target.getAttribute('data-source-id');
      const messageKey = target.closest('.message-container')?.getAttribute('data-message-key');
      
      if (sourceId && messageKey) {
        const message = chatHistory.find(msg => msg.key === messageKey);
        if (message && message.sources && message.sources[parseInt(sourceId) - 1]) {
          const source = message.sources[parseInt(sourceId) - 1];
          window.open(source.url, '_blank');
        } else {
          // Fallback for when the specific citation source is not found
          toast({
            title: "Source not found",
            description: "The source for this citation could not be located.",
            variant: "default",
          });
        }
      }
    }
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

  // Add this effect to initialize customization form with user profile data
  useEffect(() => {
    if (userProfile) {
      setCustomizationFormData({
        industry: userProfile.industry || '',
        role: userProfile.role || '',
        experienceLevel: userProfile.experienceLevel || '',
        researchInterests: userProfile.researchInterests || '',
        additionalPreferences: userProfile.additionalPreferences || ''
      });
    }
  }, [userProfile]);

  // Handle form change for customization
  const handleCustomizationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomizationFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle select change for customization
  const handleCustomizationSelectChange = (name: string, value: string) => {
    setCustomizationFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle submit for customization
  const handleCustomizationSubmit = async () => {
    try {
      // Get current user
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      
      if (!currentUser) {
        throw new Error('User not authenticated');
      }
      
      // Update user metadata with the form data
      const { error } = await supabase.auth.updateUser({
        data: {
          ...customizationFormData,
          has_completed_onboarding: true
        }
      });
      
      if (error) {
        throw error;
      }
      
      // Update local state
      setUserProfile({
        ...userProfile,
        ...customizationFormData
      });
      
      // Close dialog and show success message
      setIsCustomizeDialogOpen(false);
      toast({
        title: "AI Settings Updated",
        description: "Your AI assistant has been customized successfully",
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Failed to update your AI settings. Please try again.",
      });
    }
  };

  // Delete all chats function
  const handleDeleteAllChats = () => {
    // Clear all pages from state and localStorage
    setPages([]);
    localStorage.removeItem('chatPages');
    
    // Reset current page state
    setActivePage(null);
    setPageName('New page');
    setChatHistory([]);
    setHasTitleChanged(false);
    
    // Navigate to dashboard root
    navigate('/dashboard');
    
    // Close dialog and show success message
    setIsDeleteAllChatsDialogOpen(false);
    toast({
      title: "All Chats Deleted",
      description: "All your chat history has been deleted",
    });
  };

  // Add this function to handle customization button click
  const handleCustomizeButtonClick = () => {
    setIsCustomizeDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar - fixed position */}
      <div className="w-48 bg-[#f7f7f7] flex flex-col fixed h-screen left-0 top-0 z-10">
        {/* Sidebar header with logo */}
        <div className="p-4 flex items-center gap-2 border-b border-gray-200">
          <span className="text-chatsector-orange font-bold text-2xl">CS</span>
          <span className="font-bold text-lg">Chatsector</span>
        </div>
        
        {/* New chat button */}
        <div className="p-3">
          <Button
            onClick={() => createNewPage()}
            className="w-full bg-white text-chatsector-black hover:bg-gray-100 border border-gray-200 shadow-sm"
          >
            <MessageSquare size={14} className="mr-2" />
            New Chat
          </Button>
        </div>
        
        {/* Pages list */}
        <div className="flex-grow overflow-y-auto p-2 space-y-1">
          {pages.map(page => (
            <Button
              key={page.id}
              variant="ghost"
              className={`w-full justify-start text-sm mb-1 h-auto py-2 px-3 font-normal ${
                activePage?.id === page.id ? 'bg-gray-200 hover:bg-gray-200' : ''
              }`}
              onClick={() => handlePageSelect(page.id)}
            >
              <div className="truncate text-left">{page.title}</div>
            </Button>
          ))}
        </div>
        
        {/* User section with dropdown for settings and logout */}
        <div className="mt-auto p-2 border-t border-gray-200">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start p-2 gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-chatsector-orange text-white text-xs">
                    {user?.email?.substring(0, 2).toUpperCase() || "AI"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-normal truncate max-w-[7rem]">
                  {user?.email || "User"}
                </span>
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem className="gap-2" onClick={() => setIsDeleteAllChatsDialogOpen(true)}>
                <Trash2 size={14} />
                <span>Delete All Chats</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2" onClick={handleLogout}>
                <LogOut size={14} />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Sources Sidebar - only visible when sources are being viewed */}
      {showSourcesSidebar && (
        <div className="w-80 bg-white flex flex-col fixed h-screen right-0 top-0 z-20 border-l border-gray-200 shadow-lg transition-all duration-300 ease-in-out">
          <div className="p-4 flex items-center justify-between border-b border-gray-200">
            <h2 className="font-medium text-lg">Sources</h2>
            <button
              className="p-1 rounded-full hover:bg-gray-100"
              onClick={() => setShowSourcesSidebar(false)}
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="flex-grow overflow-y-auto p-4">
            {currentSources.map((source, index) => (
              <div key={index} className="mb-6 pb-4 border-b border-gray-100 last:border-0">
                <div className="flex items-center mb-2">
                  <span className="flex items-center justify-center bg-gray-100 text-gray-600 w-6 h-6 rounded-full text-sm font-medium mr-2">
                    {index + 1}
                  </span>
                  <h3 className="font-medium text-gray-800">{source.title}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2 line-clamp-3">{source.content}</p>
                <a 
                  href={source.url} 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-sm flex items-center text-blue-600 hover:underline mt-1"
                >
                  Visit source <ExternalLink size={12} className="ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main content - using white background with margin to account for fixed sidebar */}
      <div className={`flex-grow flex flex-col bg-white ml-48 ${showSourcesSidebar ? 'mr-80' : ''} transition-all duration-300`}>
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
                    <button 
                      className="text-sm text-gray-500 mb-1 flex items-center gap-1 hover:text-gray-700 transition-colors animate-fadeIn"
                      onClick={handleCustomizeButtonClick}
                    >
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

            {/* Chat area - with click handler for sources */}
            <div className="flex-grow overflow-y-auto mb-6 pl-4">
              {chatHistory.length === 0 ? (
                <div className="text-gray-400 italic text-center mt-20">
                  {/* Empty state */}
                </div>
              ) : (
                <div className="space-y-8">
                  {chatHistory.map((message) => (
                    <div 
                      key={message.key} 
                      className="space-y-2 animate-fadeIn message-container" 
                      data-message-key={message.key}
                    >
                      {message.type === 'user' ? (
                        <div className="text-base">{message.content}</div>
                      ) : (
                        <>
                          <div className="font-medium text-base">Answer</div>
                          <div 
                            className="text-base leading-relaxed markdown-content"
                            dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
                            onClick={handleSourcesClick}
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

      {/* Add this - Delete All Chats confirmation dialog */}
      <AlertDialog open={isDeleteAllChatsDialogOpen} onOpenChange={setIsDeleteAllChatsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete All Chats</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete all your chat history. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAllChats}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Add this - Customization dialog */}
      <Dialog open={isCustomizeDialogOpen} onOpenChange={setIsCustomizeDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Customize Your AI Assistant</DialogTitle>
            <DialogDescription>
              Update your preferences to make your AI research assistant more personalized
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="industry">Your Industry</Label>
              <Input
                id="industry"
                name="industry"
                value={customizationFormData.industry}
                onChange={handleCustomizationChange}
                placeholder="Finance, Healthcare, Education, etc."
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="role">Your Role</Label>
              <Input
                id="role"
                name="role"
                value={customizationFormData.role}
                onChange={handleCustomizationChange}
                placeholder="Manager, Analyst, Student, etc."
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="experienceLevel">Experience Level</Label>
              <Select
                value={customizationFormData.experienceLevel}
                onValueChange={(value) => handleCustomizationSelectChange('experienceLevel', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="researchInterests">Research Interests</Label>
              <Textarea
                id="researchInterests"
                name="researchInterests"
                value={customizationFormData.researchInterests}
                onChange={handleCustomizationChange}
                placeholder="What specific aspects of your industry are you interested in researching?"
                className="min-h-[100px]"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="additionalPreferences">Additional Preferences (Optional)</Label>
              <Textarea
                id="additionalPreferences"
                name="additionalPreferences"
                value={customizationFormData.additionalPreferences}
                onChange={handleCustomizationChange}
                placeholder="Any other preferences on how your AI assistant should work?"
                className="min-h-[80px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCustomizeDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleCustomizationSubmit}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
