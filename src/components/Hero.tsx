import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import ChipTag from './ui/ChipTag';
import { ArrowRight, Search, Sparkles, BookOpen, FileText, Book } from 'lucide-react';

const Hero = () => {
  const [formStep, setFormStep] = useState(0);
  const [industry, setIndustry] = useState('');
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState('');
  const [interests, setInterests] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStep(1);
  };

  return (
    <section className="min-h-screen relative overflow-hidden flex items-center pt-16">
      {/* Restore orange background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50 to-white z-[-1]"></div>
      
      <div className="container-custom flex flex-col items-center">
        <div className="text-center max-w-4xl mx-auto">
          <ChipTag variant="orange" className="mb-6 mx-auto animate-fade-in">
            <Sparkles size={12} className="mr-1" /> AI-Powered Sector Research
          </ChipTag>
            
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-baskerville tracking-tighter mb-6 animate-fade-in-down" style={{ lineHeight: 1.1 }}>
            Your Personalized AI Specialist for{' '}
            <span className="text-gradient">Sector Research</span>
            </h1>
            
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto text-balance animate-fade-in">
            Chatsector creates a custom AI research assistant based on your profile, 
            delivering precise knowledge and insights about your specific sector.
          </p>
          
          {formStep === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-subtle max-w-xl mx-auto animate-fade-in-up">
              <h2 className="text-2xl font-baskerville mb-4">Tell us about yourself</h2>
              <p className="text-gray-600 mb-6">We'll create a specialized AI research assistant tailored to your needs</p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">Your Industry</label>
                  <Input 
                    id="industry"
                    placeholder="Finance, Healthcare, Education, etc."
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Your Role</label>
                  <Input 
                    id="role"
                    placeholder="Manager, Analyst, Student, etc."
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                  <Select value={experience} onValueChange={setExperience} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="beginner">0-2 years</SelectItem>
                      <SelectItem value="intermediate">3-5 years</SelectItem>
                      <SelectItem value="experienced">6-10 years</SelectItem>
                      <SelectItem value="expert">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-1">Research Interests</label>
                  <Textarea 
                    id="interests"
                    placeholder="What specific aspects of your industry are you interested in researching?"
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    required
                  />
                </div>
                
                <Button type="submit" className="bg-black hover:bg-black/90 text-white rounded-full px-8 py-3 w-full">
                  Create My Research Assistant
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </form>
            </div>
          ) : (
            <div className="glass relative rounded-xl shadow-elevation w-full max-w-3xl mx-auto overflow-hidden animate-fade-in-up">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="text-xs text-gray-500 ml-2">Chatsector AI</div>
              </div>
              
              <div className="p-6 bg-white">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Sparkles size={14} className="text-orange-500" />
                  </div>
                  <div className="bg-gray-50 rounded-2xl rounded-tl-none px-5 py-4">
                    <p className="text-sm text-gray-700">
                      I've been customized as your personal {industry} research specialist, with focus on your role as a {role}. 
                      How can I assist you with your research today?
                    </p>
                    <div className="flex items-center mt-4 space-x-2">
                      <ChipTag variant="orange" className="cursor-pointer">Research analysis</ChipTag>
                      <ChipTag variant="default" className="cursor-pointer">Sector overview</ChipTag>
                      <ChipTag variant="default" className="cursor-pointer">Key publications</ChipTag>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mx-4 mb-4">
                  <div className="h-[1px] bg-gray-100 flex-1 mr-2"></div>
                  <span className="text-xs text-gray-400">Today, 10:42 AM</span>
                  <div className="h-[1px] bg-gray-100 flex-1 ml-2"></div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <FileText size={14} className="text-gray-500" />
                  </div>
                  <div className="bg-gray-50 rounded-2xl rounded-tl-none px-5 py-4">
                    <p className="text-sm text-gray-700">
                      Here are the key resources for {industry} professionals at your experience level:
                    </p>
                    <div className="flex flex-col gap-2 mt-3">
                      <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg bg-white">
                        <BookOpen size={16} className="text-orange-500" />
                        <div>
                          <p className="text-sm font-medium">Industry Journal of {industry}</p>
                          <p className="text-xs text-gray-500">Leading academic publication with peer-reviewed research</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg bg-white">
                        <Book size={16} className="text-orange-500" />
                        <div>
                          <p className="text-sm font-medium">{industry} Professional Association</p>
                          <p className="text-xs text-gray-500">Standards, best practices, and networking opportunities</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg bg-white">
                        <FileText size={16} className="text-orange-500" />
                        <div>
                          <p className="text-sm font-medium">Annual {industry} Report 2023</p>
                          <p className="text-xs text-gray-500">Comprehensive overview of sector developments</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-xs text-gray-500">Would you like me to provide summaries of any of these resources?</div>
                  </div>
                </div>
                
                <div className="relative flex items-center mt-4">
                  <Input
                    type="text"
                    placeholder="Ask about your sector research..."
                    className="pr-12 py-3 rounded-full"
                  />
                  <Button className="absolute right-1 rounded-full w-10 h-10 flex items-center justify-center p-0">
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mt-16 mb-0 max-w-4xl mx-auto text-center animate-fade-in-up">
          <div className="flex flex-col items-center">
            <div className="mb-2 text-orange-500">
              <Book size={24} />
            </div>
            <p className="text-3xl font-bold mb-1">1.2M+</p>
            <p className="text-sm text-gray-600">Academic papers</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="mb-2 text-orange-500">
              <FileText size={24} />
            </div>
            <p className="text-3xl font-bold mb-1">100+</p>
            <p className="text-sm text-gray-600">Sectors covered</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="mb-2 text-orange-500">
              <Sparkles size={24} />
            </div>
            <p className="text-3xl font-bold mb-1">98%</p>
            <p className="text-sm text-gray-600">Accuracy rate</p>
              </div>
          
          <div className="flex flex-col items-center">
            <div className="mb-2 text-orange-500">
              <BookOpen size={24} />
            </div>
            <p className="text-3xl font-bold mb-1">12K+</p>
            <p className="text-sm text-gray-600">Active researchers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
