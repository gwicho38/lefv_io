
import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => (
  <div className="min-h-screen bg-aqua-100 flex flex-col justify-center items-center">
    <h1 className="text-3xl font-bold">Welcome to the Welcome Page</h1>
    <Link to="/" className="mt-4 text-aqua-500">Go to Landing Page</Link>
  </div>
);

export default WelcomePage;
