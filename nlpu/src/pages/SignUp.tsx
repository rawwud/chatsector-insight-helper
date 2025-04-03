
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const SignUp = () => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50/70 to-white px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold text-black">Chatsector</h1>
          </Link>
          <p className="text-gray-600 mt-2">
            Create an account to get started with personalized sector research
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-elevation p-8">
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Input id="name" placeholder="Enter your full name" />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Input id="password" type="password" placeholder="Create a password" />
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="terms" 
                checked={acceptedTerms}
                onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                className="mt-1"
              />
              <div className="grid gap-1.5 leading-none">
                <Label 
                  htmlFor="terms" 
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  I agree to the <Link to="#" className="text-orange-500 hover:text-orange-600">Terms of Service</Link> and <Link to="#" className="text-orange-500 hover:text-orange-600">Privacy Policy</Link>
                </Label>
              </div>
            </div>
            
            <Button type="submit" className="w-full bg-black hover:bg-black/90 text-white" disabled={!acceptedTerms}>
              Sign Up
            </Button>
          </form>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full border-gray-300 flex items-center justify-center gap-2"
          >
            <FaGoogle className="w-5 h-5 text-black" />
            Sign up with Google
          </Button>
          
          <p className="text-center mt-6 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-orange-500 hover:text-orange-600 font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
