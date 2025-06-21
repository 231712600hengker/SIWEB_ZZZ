'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Menu,
  BarChart3,
  Package,
  ShoppingCart,
  User,
  LogOut,
  Home,
  Zap,
  Shield
} from 'lucide-react';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const userData = await response.json();
        if (userData.role !== 'ADMIN') {
          router.push('/');
          return;
        }
        setUser(userData);
      } else {
        router.push('/auth/login');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      router.push('/auth/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        setUser(null);
        toast.success('Logged out successfully');
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: BarChart3, gradient: 'from-blue-500 to-cyan-500' },
    { href: '/admin/products', label: 'Products', icon: Package, gradient: 'from-purple-500 to-pink-500' },
    { href: '/admin/transactions', label: 'Transactions', icon: ShoppingCart, gradient: 'from-green-500 to-emerald-500' },
    { href: '/admin/profile', label: 'Profile', icon: User, gradient: 'from-orange-500 to-red-500' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-cyan-400/10 rounded-full animate-bounce delay-100"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-purple-400/10 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-blue-400/10 rounded-full animate-bounce delay-500"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-pink-400/10 rounded-full animate-bounce delay-700"></div>
      </div>

      {/* Top Navigation */}
      <nav className="bg-black/20 backdrop-blur-md border-b border-cyan-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3 group"
            >
              <Link href="/admin" className="flex items-center space-x-3 group">
                <div className="relative">
                  <motion.div 
                    className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center neon-glow"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Zap className="w-4 h-4 text-white" />
                  </motion.div>
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full animate-pulse"></div>
                </div>
                <span className="text-xl font-bold futuristic-heading text-white">
                  ElectroStore
                </span>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-bold">
                    ADMIN
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="group relative flex items-center space-x-2 text-gray-300 hover:text-white font-medium transition-all duration-300 px-3 py-2 rounded-lg hover:bg-white/10"
                    >
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${item.gradient} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="group-hover:text-cyan-400 transition-colors duration-300">{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10" asChild>
                  <Link href="/">
                    <Home className="h-4 w-4 mr-2" />
                    Back to Store
                  </Link>
                </Button>
              </motion.div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="ghost" size="sm" className="h-10 w-10 rounded-full hover:bg-white/10">
                      <Avatar className="h-10 w-10 border-2 border-cyan-400">
                        <AvatarFallback className="text-sm bg-gradient-to-br from-cyan-500 to-purple-600 text-white font-bold">
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-gray-900/95 backdrop-blur-md border-cyan-500/20">
                  <div className="flex items-center justify-start gap-2 p-3 border-b border-cyan-500/20">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-white">{user.name}</p>
                      <p className="w-[200px] truncate text-sm text-gray-400">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuItem asChild className="text-gray-300 hover:text-white hover:bg-white/10">
                    <Link href="/admin/profile">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden text-gray-300 hover:text-white hover:bg-white/10">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-gray-900/95 backdrop-blur-md border-cyan-500/20">
                  <div className="flex flex-col space-y-4 mt-8">
                    {navItems.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Link
                            href={item.href}
                            className="flex items-center space-x-3 text-gray-300 hover:text-white font-medium transition-colors duration-200 p-3 rounded-lg hover:bg-white/10"
                          >
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${item.gradient}`}>
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <span>{item.label}</span>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}