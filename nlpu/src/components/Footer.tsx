
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Twitter, Linkedin, Instagram, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container-custom">
        {/* CTA Section */}
        <div className="bg-black rounded-2xl p-8 md:p-12 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-500/20 to-transparent opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Ready to transform your industry research?</h2>
              <p className="text-gray-300">Get started with Chatsector today and unlock insights that drive decisions.</p>
            </div>
            <Button className="whitespace-nowrap bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-6 flex items-center">
              Get Started Free
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
        
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <div className="mb-6">
              <span className="text-2xl font-bold">
                <span className="text-black">Chat</span>
                <span className="text-orange-500">sector</span>
              </span>
            </div>
            <p className="text-gray-600 mb-6">
              AI-powered industry research assistant providing real-time insights and analysis for professionals across all sectors.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">Use Cases</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">Integrations</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">API</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">Industry Reports</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">Case Studies</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">Guides</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 border-t border-gray-200 text-center md:flex md:justify-between md:items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Chatsector. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-500 hover:text-orange-500 text-sm transition-colors">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-orange-500 text-sm transition-colors">Terms</a>
            <a href="#" className="text-gray-500 hover:text-orange-500 text-sm transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
