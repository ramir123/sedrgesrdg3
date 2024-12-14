import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from './store/useStore';
import { Auth } from './components/Auth';
import { NewOrder } from './components/NewOrder';
import { OrderList } from './components/OrderList';
import { Dashboard } from './components/Dashboard';
import { Toaster } from 'react-hot-toast';
import { Package } from 'lucide-react';

function App() {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const [activeTab, setActiveTab] = useState('new');

  if (!isAuthenticated) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-[#1a1f2e] text-white">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-[#232936] p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center">
          <Package className="w-6 h-6 text-blue-500 mr-2" />
          <h1 className="text-xl font-bold">Order Manager ✨</h1>
        </div>
      </header>

      {/* Navigation */}
      <nav className="max-w-7xl mx-auto p-4">
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('new')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'new'
                ? 'bg-blue-500 text-white'
                : 'bg-[#232936] text-gray-300'
            }`}
          >
            📝 New Order
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'list'
                ? 'bg-blue-500 text-white'
                : 'bg-[#232936] text-gray-300'
            }`}
          >
            📋 Order List
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'dashboard'
                ? 'bg-blue-500 text-white'
                : 'bg-[#232936] text-gray-300'
            }`}
          >
            📊 Dashboard
          </motion.button>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'new' && <NewOrder key="new" />}
          {activeTab === 'list' && <OrderList key="list" />}
          {activeTab === 'dashboard' && <Dashboard key="dashboard" />}
        </AnimatePresence>
      </main>
    </div>
  );
}