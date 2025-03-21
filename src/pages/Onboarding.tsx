
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Logo from '../components/Logo';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    industry: '',
    role: '',
    businessAreas: '',
    interests: '',
    geographicFocus: ''
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save this data to a database
    console.log('Onboarding data:', formData);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <Logo className="w-12 h-12 mx-auto mb-4" />
          <h1 className="font-libre text-3xl font-bold text-chatsector-black">
            Tell us about your needs
          </h1>
          <p className="text-chatsector-dark-gray/80 mt-2">
            Help us personalize your research experience
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <div 
                  key={num} 
                  className={`w-8 h-8 rounded-full flex items-center justify-center 
                    ${step >= num ? 'bg-chatsector-orange text-white' : 'bg-gray-200 text-gray-500'}`}
                >
                  {num}
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 h-1 rounded-full">
              <div 
                className="bg-chatsector-orange h-1 rounded-full transition-all duration-300" 
                style={{ width: `${(step / 5) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <h2 className="text-xl font-semibold mb-4">What is your industry or sector?</h2>
                <Input 
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  placeholder="e.g., Healthcare, Technology, Finance"
                  className="w-full"
                  required
                />
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <h2 className="text-xl font-semibold mb-4">What role/job do you occupy?</h2>
                <Input 
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="e.g., Manager, Researcher, Analyst"
                  className="w-full"
                  required
                />
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-4 animate-fade-in">
                <h2 className="text-xl font-semibold mb-4">What are your main business areas?</h2>
                <Textarea 
                  name="businessAreas"
                  value={formData.businessAreas}
                  onChange={handleChange}
                  placeholder="Describe your main business activities or focus areas"
                  className="w-full min-h-[120px]"
                  required
                />
              </div>
            )}
            
            {step === 4 && (
              <div className="space-y-4 animate-fade-in">
                <h2 className="text-xl font-semibold mb-4">Which aspects interest you the most?</h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="market-research" className="rounded border-gray-300" />
                    <label htmlFor="market-research">Market Research</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="competitor-analysis" className="rounded border-gray-300" />
                    <label htmlFor="competitor-analysis">Competitor Analysis</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="industry-reports" className="rounded border-gray-300" />
                    <label htmlFor="industry-reports">Industry Reports</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="regulatory-updates" className="rounded border-gray-300" />
                    <label htmlFor="regulatory-updates">Regulatory Updates</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="innovation-tech" className="rounded border-gray-300" />
                    <label htmlFor="innovation-tech">Innovation & Technology</label>
                  </div>
                  <div className="mt-4">
                    <Input 
                      name="interests"
                      value={formData.interests}
                      onChange={handleChange}
                      placeholder="Other interests (optional)"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {step === 5 && (
              <div className="space-y-4 animate-fade-in">
                <h2 className="text-xl font-semibold mb-4">Are you focusing on a specific region or worldwide?</h2>
                <RadioGroup 
                  defaultValue="worldwide"
                  onValueChange={(value) => handleSelectChange('geographicFocus', value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="worldwide" id="worldwide" />
                    <Label htmlFor="worldwide">Worldwide</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="north-america" id="north-america" />
                    <Label htmlFor="north-america">North America</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="europe" id="europe" />
                    <Label htmlFor="europe">Europe</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="asia-pacific" id="asia-pacific" />
                    <Label htmlFor="asia-pacific">Asia-Pacific</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="middle-east-africa" id="middle-east-africa" />
                    <Label htmlFor="middle-east-africa">Middle East & Africa</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="latin-america" id="latin-america" />
                    <Label htmlFor="latin-america">Latin America</Label>
                  </div>
                </RadioGroup>
              </div>
            )}
            
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={handlePrevious}
                >
                  Previous
                </Button>
              )}
              {step < 5 ? (
                <Button 
                  type="button"
                  className="ml-auto bg-chatsector-orange hover:bg-chatsector-orange/90 text-white"
                  onClick={handleNext}
                >
                  Next
                </Button>
              ) : (
                <Button 
                  type="submit"
                  className="ml-auto bg-chatsector-orange hover:bg-chatsector-orange/90 text-white"
                >
                  Complete & Start Research
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
