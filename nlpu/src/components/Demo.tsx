
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ChipTag from './ui/ChipTag';
import { MessageSquare, PieChart, TrendingUp, BarChart2, LineChart } from 'lucide-react';

const Demo = () => {
  const [activeDemo, setActiveDemo] = useState('conversation');
  
  const demoOptions = [
    {
      id: 'conversation',
      title: 'Conversation',
      icon: <MessageSquare size={16} />,
      description: 'Ask anything about your industry'
    },
    {
      id: 'trends',
      title: 'Trends',
      icon: <TrendingUp size={16} />,
      description: 'Discover emerging trends'
    },
    {
      id: 'visualization',
      title: 'Visualization',
      icon: <BarChart2 size={16} />,
      description: 'See data in beautiful charts'
    }
  ];

  return (
    <section id="demo" className="section bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <ChipTag variant="orange" className="mb-4 mx-auto">
            See it in action
          </ChipTag>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-gradient">Experience</span> the Future of Industry Research
          </h2>
          <p className="text-gray-700 text-balance">
            Watch how Chatsector transforms complex industry data into simple, 
            actionable insights through natural conversation.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {/* Demo Selection */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {demoOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setActiveDemo(option.id)}
                className={`flex items-center px-4 py-2 rounded-full transition-all ${
                  activeDemo === option.id
                    ? 'bg-black text-white shadow-lg'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{option.icon}</span>
                {option.title}
              </button>
            ))}
          </div>
          
          {/* Demo Viewer */}
          <div className="relative bg-white rounded-xl shadow-elevation overflow-hidden">
            {/* Demo Header */}
            <div className="bg-gray-50 border-b border-gray-100 px-5 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="text-sm font-medium">Chatsector Demo</div>
              <div className="text-sm text-gray-500">
                {activeDemo === 'conversation' && 'Marketing Industry'}
                {activeDemo === 'trends' && 'Tech Sector Trends'}
                {activeDemo === 'visualization' && 'Market Share Analysis'}
              </div>
            </div>
            
            {/* Demo Content */}
            <div className="p-6">
              {activeDemo === 'conversation' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium">You</span>
                    </div>
                    <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4">
                      <p className="text-gray-800">
                        What are the latest content marketing trends for SaaS companies in 2023?
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <MessageSquare size={14} className="text-orange-500" />
                    </div>
                    <div className="bg-gray-50 rounded-2xl rounded-tl-none p-4">
                      <p className="text-gray-800 mb-3">
                        Based on my analysis of the SaaS content marketing landscape in 2023, these are the most prominent trends:
                      </p>
                      <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                        <li><strong>Interactive content experiences</strong> - SaaS companies are creating more interactive tools, calculators, and assessments to engage prospects.</li>
                        <li><strong>Product-led content</strong> - Content that showcases the product in action while solving real problems is gaining traction.</li>
                        <li><strong>AI-generated personalization</strong> - Customized content experiences based on user behavior and needs.</li>
                        <li><strong>Video-first approach</strong> - Short-form product tutorials and thought leadership videos are seeing higher engagement than text alone.</li>
                      </ol>
                      <p className="mt-3 text-gray-800">
                        Would you like me to elaborate on any of these trends or provide specific examples of SaaS companies implementing them effectively?
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeDemo === 'trends' && (
                <div className="animate-fade-in">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium">You</span>
                    </div>
                    <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4">
                      <p className="text-gray-800">
                        Show me the emerging technologies in fintech for 2023-2024
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <TrendingUp size={14} className="text-orange-500" />
                    </div>
                    <div className="bg-gray-50 rounded-2xl rounded-tl-none p-4">
                      <p className="text-gray-800 mb-4">
                        Here are the top emerging fintech technologies gaining momentum in 2023-2024:
                      </p>
                      
                      <div className="space-y-3">
                        <div className="bg-white p-3 rounded-lg border border-gray-100">
                          <div className="flex justify-between items-center mb-2">
                            <div className="font-medium">Embedded Finance</div>
                            <ChipTag variant="orange">High Growth</ChipTag>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-500 rounded-full" style={{ width: '92%' }}></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">92% adoption trend</div>
                        </div>
                        
                        <div className="bg-white p-3 rounded-lg border border-gray-100">
                          <div className="flex justify-between items-center mb-2">
                            <div className="font-medium">Decentralized Finance (DeFi)</div>
                            <ChipTag variant="orange">Emerging</ChipTag>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-500 rounded-full" style={{ width: '78%' }}></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">78% adoption trend</div>
                        </div>
                        
                        <div className="bg-white p-3 rounded-lg border border-gray-100">
                          <div className="flex justify-between items-center mb-2">
                            <div className="font-medium">AI-powered Underwriting</div>
                            <ChipTag variant="orange">Rapid Growth</ChipTag>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-500 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">85% adoption trend</div>
                        </div>
                      </div>
                      
                      <div className="mt-4 text-sm text-gray-500">Data source: Fintech Industry Report Q1 2023</div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeDemo === 'visualization' && (
                <div className="animate-fade-in">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium">You</span>
                    </div>
                    <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4">
                      <p className="text-gray-800">
                        Visualize the e-commerce market share by platform for the last quarter
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <PieChart size={14} className="text-orange-500" />
                    </div>
                    <div className="bg-gray-50 rounded-2xl rounded-tl-none p-4 w-full">
                      <p className="text-gray-800 mb-4">
                        Here's the e-commerce market share by platform for Q2 2023:
                      </p>
                      
                      <div className="bg-white p-5 rounded-lg border border-gray-100 mb-4">
                        <h4 className="text-sm font-medium mb-4">E-commerce Market Share by Platform (Q2 2023)</h4>
                        <div className="flex justify-between">
                          <div className="w-1/2">
                            <div className="relative w-40 h-40 mx-auto">
                              <div className="absolute inset-0 rounded-full border-8 border-gray-100"></div>
                              <div 
                                className="absolute inset-0 rounded-full border-8 border-transparent border-t-orange-500"
                                style={{ transform: 'rotate(0deg)' }}
                              ></div>
                              <div 
                                className="absolute inset-0 rounded-full border-8 border-transparent border-t-blue-500 border-r-blue-500"
                                style={{ transform: 'rotate(130deg)' }}
                              ></div>
                              <div 
                                className="absolute inset-0 rounded-full border-8 border-transparent border-t-green-500"
                                style={{ transform: 'rotate(250deg)' }}
                              ></div>
                            </div>
                          </div>
                          <div className="w-1/2 flex flex-col justify-center">
                            <div className="space-y-3">
                              <div className="flex items-center">
                                <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                                <div className="text-sm">Amazon (37%)</div>
                              </div>
                              <div className="flex items-center">
                                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                                <div className="text-sm">Shopify (33%)</div>
                              </div>
                              <div className="flex items-center">
                                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                <div className="text-sm">Other platforms (30%)</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border border-gray-100">
                        <h4 className="text-sm font-medium mb-3">Key Insights:</h4>
                        <ul className="text-sm text-gray-700 space-y-2">
                          <li>• Amazon's market share dropped 2% compared to previous quarter</li>
                          <li>• Shopify gained 5% market share, showing strongest growth</li>
                          <li>• Smaller platforms collectively lost 3% of market share</li>
                        </ul>
                      </div>
                      
                      <div className="mt-4 text-xs text-gray-500">Data source: E-commerce Industry Report Q2 2023</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Demo Input */}
            <div className="p-4 border-t border-gray-100">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ask anything about your industry..."
                  className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
                <Button className="absolute right-1 top-1 bg-orange-500 hover:bg-orange-600 text-white rounded-full w-10 h-8 flex items-center justify-center p-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
