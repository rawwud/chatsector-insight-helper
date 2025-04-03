import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any; data: any; }>;
  signIn: (email: string, password: string) => Promise<{ error: any; data: any; }>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any; data: any; }>;
  updatePassword: (newPassword: string) => Promise<{ error: any; data: any; }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    setIsLoading(true);
    // Store full name in user metadata
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      }
    });
    setIsLoading(false);
    
    if (error) {
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: error.message,
      });
    } else {
      toast({
        title: "Verification email sent",
        description: "Please check your email for a verification link",
      });
    }
    
    return { data, error };
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setIsLoading(false);
    
    if (error) {
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: error.message,
      });
    }
    
    return { data, error };
  };

  const signOut = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    setIsLoading(false);
    navigate('/');
  };

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      }
    });
  };

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setIsLoading(false);
    
    if (error) {
      toast({
        variant: "destructive",
        title: "Password reset failed",
        description: error.message,
      });
    } else {
      toast({
        title: "Password reset email sent",
        description: "Please check your email for a password reset link",
      });
    }
    
    return { data, error };
  };

  const updatePassword = async (newPassword: string) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    setIsLoading(false);
    
    if (error) {
      toast({
        variant: "destructive",
        title: "Password update failed",
        description: error.message,
      });
    } else {
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully",
      });
    }
    
    return { data, error };
  };

  const value = {
    session,
    user,
    isLoading,
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
    resetPassword,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
