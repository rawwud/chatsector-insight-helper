
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from '../components/Logo';

const Dashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center">
            <Logo className="w-8 h-8 mr-2" />
            <span className="text-xl font-bold">Chatsector</span>
          </div>
          <Button 
            variant="outline"
            onClick={() => navigate('/')}
          >
            Sign Out
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h1 className="font-libre text-3xl font-bold mb-4">Welcome to Your Research Dashboard</h1>
          <p className="text-lg text-gray-600 mb-6">
            This is a placeholder for the dashboard that will be customized later.
          </p>
          <p className="text-gray-500">
            You'll be able to access industry insights, research, and personalized content here.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
