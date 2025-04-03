import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { FaGoogle } from 'react-icons/fa';

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();
  const { signUp, signInWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      toast.error('Please accept the terms and conditions');
      return;
    }
    
    setIsLoading(true);

    try {
      // Signup flow
      if (!fullName.trim()) {
        toast.error('Please enter your full name');
        setIsLoading(false);
        return;
      }

      const { error } = await signUp(email, password, fullName);
      if (!error) {
        // Redirect to email verification
        navigate('/email-verification', { 
          state: { 
            email,
            password,
            fullName,
            redirectTo: '/user-profile'
          } 
        });
      }
    } catch (err) {
      console.error('Authentication error:', err);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      // After Google sign-in, we'll redirect to user-profile form for new users
      // This happens in the AuthCallback component
    } catch (err) {
      console.error('Google sign-in error:', err);
      toast.error('Failed to sign in with Google. Please try again.');
    }
  };

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
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Input 
                id="name" 
                placeholder="Enter your full name" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Create a password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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
            
            <Button 
              type="submit" 
              className="w-full bg-black hover:bg-black/90 text-white" 
              disabled={!acceptedTerms || isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  Creating Account...
                </span>
              ) : 'Sign Up'}
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
            onClick={handleGoogleSignIn}
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
