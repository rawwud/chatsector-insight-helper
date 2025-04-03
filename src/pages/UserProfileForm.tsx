import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Logo from '../components/Logo';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

const UserProfileForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    industry: '',
    role: '',
    experienceLevel: '',
    researchInterests: '',
    additionalPreferences: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      // Update user metadata with the form data
      const { error } = await supabase.auth.updateUser({
        data: {
          ...formData,
          has_completed_onboarding: true
        }
      });
      
      if (error) {
        throw error;
      }
      
      // Show success message
      toast.success('Your Sector AI has been created!');
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving user profile:', error);
      toast.error('Failed to create your Sector AI. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Logo className="w-12 h-12 mx-auto mb-4" />
          <h1 className="font-libre text-3xl font-bold text-chatsector-black">
            Tell us about yourself
          </h1>
          <p className="text-chatsector-dark-gray/80 mt-2">
            We'll create a specialized AI research assistant tailored to your needs
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                Your Industry
              </label>
              <Input 
                id="industry" 
                name="industry"
                type="text" 
                placeholder="Finance, Healthcare, Education, etc." 
                className="w-full"
                value={formData.industry}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Your Role
              </label>
              <Input 
                id="role" 
                name="role"
                type="text" 
                placeholder="Manager, Analyst, Student, etc." 
                className="w-full"
                value={formData.role}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700">
                Experience Level
              </label>
              <Select 
                value={formData.experienceLevel} 
                onValueChange={(value) => handleSelectChange('experienceLevel', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="researchInterests" className="block text-sm font-medium text-gray-700">
                Research Interests
              </label>
              <Textarea 
                id="researchInterests" 
                name="researchInterests"
                placeholder="What specific aspects of your industry are you interested in researching?" 
                className="w-full min-h-[100px]"
                value={formData.researchInterests}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="additionalPreferences" className="block text-sm font-medium text-gray-700">
                Additional Preferences (Optional)
              </label>
              <Textarea 
                id="additionalPreferences" 
                name="additionalPreferences"
                placeholder="Any other preferences on how your AI assistant should work?" 
                className="w-full min-h-[100px]"
                value={formData.additionalPreferences}
                onChange={handleChange}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-chatsector-orange hover:bg-chatsector-orange/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  Creating Your Sector AI...
                </span>
              ) : (
                'Create My Sector AI'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfileForm; 