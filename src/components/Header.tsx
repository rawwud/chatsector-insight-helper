
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import PrimaryButton from './PrimaryButton';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-chatsector-black">
            Chatsector
          </a>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-chatsector-black hover:text-chatsector-orange transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-chatsector-black hover:text-chatsector-orange transition-colors">
            How It Works
          </a>
          <a href="#faq" className="text-chatsector-black hover:text-chatsector-orange transition-colors">
            FAQ
          </a>
          <PrimaryButton>
            Explore Now
          </PrimaryButton>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-chatsector-black" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4 px-6 flex flex-col space-y-4 animate-fade-in">
          <a 
            href="#features" 
            className="text-chatsector-black hover:text-chatsector-orange transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Features
          </a>
          <a 
            href="#how-it-works" 
            className="text-chatsector-black hover:text-chatsector-orange transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            How It Works
          </a>
          <a 
            href="#faq" 
            className="text-chatsector-black hover:text-chatsector-orange transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            FAQ
          </a>
          <PrimaryButton 
            className="w-full text-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Explore Now
          </PrimaryButton>
        </div>
      )}
    </header>
  );
};

export default Header;
