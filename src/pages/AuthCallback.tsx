import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Get the URL hash and parse it
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      
      // If we have tokens in the URL, we're coming from an OAuth provider
      if (accessToken && refreshToken) {
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        
        if (error) {
          console.error('Error setting session:', error.message);
          navigate('/signup');
          return;
        }
        
        // Check if the user is new or existing by examining metadata
        const user = data.user;
        const isNewUser = !user?.user_metadata?.has_completed_onboarding;
        
        // Redirect based on user status
        if (isNewUser) {
          navigate('/user-profile');
        } else {
          navigate('/dashboard');
        }
      } else {
        // Handle email OTP verification
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error.message);
          navigate('/signup');
          return;
        }
        
        if (session) {
          // Check if the user has completed onboarding
          const user = session.user;
          const hasCompletedOnboarding = user?.user_metadata?.has_completed_onboarding;
          
          if (hasCompletedOnboarding) {
            navigate('/dashboard');
          } else {
            navigate('/user-profile');
          }
        } else {
          navigate('/signup');
        }
      }
    };
    
    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-chatsector-orange"></div>
      <p className="mt-4 text-gray-600">Completing authentication...</p>
    </div>
  );
};

export default AuthCallback;
