
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => (
  <div className="min-h-screen bg-aqua-100 flex flex-col justify-center items-center">
    <h1 className="text-3xl font-bold">Welcome to the Landing Page</h1>
    <Link to="/welcome" className="mt-4 text-aqua-500">Go to Welcome Page</Link>
  </div>
);

export default LandingPage;
