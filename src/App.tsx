import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Users, Settings, BarChart3, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/assets/logo';
import MerchantRegistration from '@/pages/MerchantRegistration';
import Dashboard from '@/pages/Dashboard';
import StoreManagement from '@/pages/StoreManagement';
import TrackingPage from '@/pages/TrackingPage';

const queryClient = new QueryClient();

const navigation = [
  { name: 'Opt-ins', href: '/', icon: BarChart3 },
  { name: 'Add Merchant', href: '/register', icon: Users },
  { name: 'Configure Widget', href: '/stores', icon: Settings },
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard }
];

function AppContent() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <Logo width={240} height={64} />
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-blue-500 hover:text-blue-600',
                      location.pathname === item.href && 'border-blue-500 text-blue-600'
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="sm:hidden">
        <div className="space-y-1 pb-3 pt-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-blue-500 hover:bg-gray-50 hover:text-blue-600',
                location.pathname === item.href && 'border-blue-500 bg-gray-50 text-blue-600'
              )}
            >
              <item.icon className="mr-4 h-5 w-4" />
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<TrackingPage />} />
          <Route path="/register" element={<MerchantRegistration />} />
          <Route path="/stores" element={<StoreManagement />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
