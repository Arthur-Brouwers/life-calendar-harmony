import React from 'react';
import Calendar from '../components/Calendar';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Life Management App</h1>
      <Calendar />
    </div>
  );
};

export default Index;
