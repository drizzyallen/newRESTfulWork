import React from 'react';
import { Link } from 'react-router';

const PageNotFound: React.FC = () => { 
    return (
        <div className="PageNotFound flex items-center justify-center h-screen bg-gray-100">
            <main className="text-center">
                <div className="p-12 bg-white rounded-lg shadow-xl">
                    <h1 className="text-6xl font-bold text-red-500">Error 404</h1>
                    <p className="text-xl mt-4 mb-8">Oops! The page you're looking for doesn't exist.</p>
                    <Link to="/" className="text-blue-500 hover:underline">Return Home</Link>
                </div>
            </main>
        </div>
    );
};

export default PageNotFound;