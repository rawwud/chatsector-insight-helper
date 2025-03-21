
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Logo from '../components/Logo';

const SignUp = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Logo className="w-12 h-12 mx-auto mb-4" />
          <h1 className="font-libre text-3xl font-bold text-chatsector-black">
            {isLogin ? 'Welcome Back' : 'Join Chatsector'}
          </h1>
          <p className="text-chatsector-dark-gray/80 mt-2">
            {isLogin 
              ? 'Sign in to continue your research journey' 
              : 'Create an account to unlock comprehensive industry research'}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="Enter your full name" 
                  className="w-full"
                  required
                />
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email" 
                className="w-full"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Create a password" 
                className="w-full"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-chatsector-orange hover:bg-chatsector-orange/90 text-white"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin 
                ? "Don't have an account?" 
                : "Already have an account?"}
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="ml-1 text-chatsector-orange hover:underline focus:outline-none"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
