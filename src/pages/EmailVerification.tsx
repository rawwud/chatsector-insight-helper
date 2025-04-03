import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from '../components/Logo';
import { Icons } from '@/components/icons';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const EmailVerification = () => {
  const location = useLocation();
  const [isResending, setIsResending] = useState(false);
  const { signUp } = useAuth();
  const email = location.state?.email || '';
  const redirectTo = location.state?.redirectTo || '/dashboard';

  const handleResendEmail = async () => {
    if (!email) {
      toast.error('Email address is missing. Please go back to the sign-up page.');
      return;
    }

    setIsResending(true);
    try {
      // Re-send verification email
      const password = location.state?.password;
      const fullName = location.state?.fullName;
      
      if (password && fullName) {
        await signUp(email, password, fullName);
        toast.success('Verification email has been resent. Please check your inbox.');
      } else {
        toast.error('Missing information to resend verification. Please sign up again.');
      }
    } catch (error) {
      console.error('Error resending verification email:', error);
      toast.error('Failed to resend verification email.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Logo className="w-12 h-12 mx-auto mb-4" />
          <h1 className="font-libre text-3xl font-bold text-chatsector-black">
            Check Your Email
          </h1>
          <p className="text-chatsector-dark-gray/80 mt-2">
            We've sent a verification link to{' '}
            <span className="font-medium">{email}</span>
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
          <div className="flex flex-col items-center justify-center py-6">
            <div className="bg-blue-50 rounded-full p-4 mb-6">
              <Icons.email className="w-12 h-12 text-blue-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Verify your email address</h2>
            <p className="text-center text-gray-600 mb-6">
              Click on the link in the email we sent to verify your account and continue with setting up your profile.
            </p>
            <Button 
              onClick={handleResendEmail} 
              variant="outline" 
              className="w-full"
              disabled={isResending}
            >
              {isResending ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></span>
                  Resending Email...
                </span>
              ) : (
                'Resend Verification Email'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
