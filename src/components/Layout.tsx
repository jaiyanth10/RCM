import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Configuration from '../components/config-ui/Configuration';

const Layout: React.FC = () => {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Header */}
      <header className="bg-blue-600 text-white shadow-md fixed top-0 left-0 right-0 z-10">
        <div className="container-fluid px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold">RCM Demo</h1>
          <nav className="flex items-center">
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="hover:underline ">Page 1</Link>
              </li>
              <li>
                <Link to="/page2" className="hover:underline">Page 2</Link>
              </li>
              <li>
                <Link to="/configuration" className="hover:underline">Configuration</Link>
              </li>
              <li>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      {/* Main Content with padding to account for fixed header */}
      <main className="flex-grow w-full mt-16">
        <div className="container-fluid px-4 py-4">
          <Outlet />
        </div>
      </main>
      
      {/* Configuration Panel */}
      {isConfigOpen && (
        <div className="fixed inset-0  backdrop-blur-xs z-40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Configuration Panel</h2>
              <button 
                className="text-gray-500 hover:text-gray-700" 
                onClick={() => setIsConfigOpen(false)}
              >
                ✖
              </button>
            </div>
            <div className="p-4">
              <Configuration />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
