
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-white px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold text-black">Chatsector</h1>
          </Link>
          <p className="text-gray-600 mt-2">
            Sign in to continue with your personalized sector research
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-elevation p-8">
          <form className="space-y-4">
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
              <Input id="password" type="password" placeholder="Enter your password" />
              <div className="flex justify-end mt-1">
                <Link to="#" className="text-sm text-orange-500 hover:text-orange-600">
                  Forgot password?
                </Link>
              </div>
            </div>
            
            <Button type="submit" className="w-full bg-black hover:bg-black/90 text-white">
              Log In
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
            <FcGoogle className="w-5 h-5" />
            Log in with Google
          </Button>
          
          <p className="text-center mt-6 text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/sign-up" className="text-orange-500 hover:text-orange-600 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
