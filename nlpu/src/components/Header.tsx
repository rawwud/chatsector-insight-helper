
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 glass shadow-sm' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-black">
            Chatsector
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a 
            href="#features" 
            className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
          >
            Features
          </a>
          <a 
            href="#demo" 
            className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
          >
            Demo
          </a>
          <a 
            href="#industries" 
            className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
          >
            Industries
          </a>
          <Link to="/sign-up">
            <Button className="bg-black text-white hover:bg-black/90 rounded-full px-6">
              Get Started
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-gray-800 focus:outline-none" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 pt-20 px-4 flex flex-col animate-fade-in md:hidden">
          <div className="flex flex-col space-y-6 items-center mt-10">
            <a 
              href="#features" 
              className="text-lg font-medium text-gray-800"
              onClick={toggleMobileMenu}
            >
              Features
            </a>
            <a 
              href="#demo" 
              className="text-lg font-medium text-gray-800"
              onClick={toggleMobileMenu}
            >
              Demo
            </a>
            <a 
              href="#industries" 
              className="text-lg font-medium text-gray-800"
              onClick={toggleMobileMenu}
            >
              Industries
            </a>
            <Link to="/sign-up" onClick={toggleMobileMenu}>
              <Button 
                className="bg-black text-white hover:bg-black/90 rounded-full px-6 w-full mt-4"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
