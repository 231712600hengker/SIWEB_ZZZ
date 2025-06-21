'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Calendar, LogOut, Settings, Shield, Zap, Lock, Activity } from 'lucide-react';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminProfilePage() {
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
        toast.success('Logged out successfully');
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-700 rounded w-1/3"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="h-64 bg-gray-700 rounded-lg"></div>
            <div className="lg:col-span-2 h-64 bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!user) return null;

  return (
    <AdminLayout>
      <motion.div 
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl font-bold futuristic-heading mb-2">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              ADMIN PROFILE
            </span>
          </h1>
          <p className="text-gray-400 text-lg">Manage your admin account information</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Sidebar */}
          <motion.div 
            className="lg:col-span-1"
            variants={itemVariants}
          >
            <Card className="glass-morphism border-cyan-500/20">
              <CardContent className="p-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="relative mb-6"
                >
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center relative">
                    <User className="text-white w-12 h-12" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </motion.div>

                <h2 className="text-xl font-semibold mb-1 text-white">{user.name}</h2>
                <p className="text-gray-400 mb-3">{user.email}</p>
                <Badge className="bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-400 border-red-500/30 mb-6">
                  <Shield className="mr-1 h-3 w-3" />
                  {user.role}
                </Badge>

                <Separator className="my-6 bg-cyan-500/20" />

                <div className="space-y-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-red-500/30 text-red-400 hover:bg-red-500/10"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Account Details */}
            <motion.div variants={itemVariants}>
              <Card className="glass-morphism border-cyan-500/20">
                <CardHeader className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-b border-cyan-500/20">
                  <CardTitle className="flex items-center text-white">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 mr-3">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    Account Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: "Full Name", value: user.name, icon: User },
                      { label: "Email Address", value: user.email, icon: Mail },
                      { label: "Role", value: user.role, icon: Shield },
                      { 
                        label: "Member Since", 
                        value: new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }), 
                        icon: Calendar 
                      }
                    ].map((item, index) => (
                      <motion.div 
                        key={item.label}
                        className="p-4 bg-gradient-to-r from-gray-800/30 to-gray-700/30 rounded-lg border border-cyan-500/10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20">
                            <item.icon className="h-4 w-4 text-cyan-400" />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-400">{item.label}</label>
                            <p className="text-white font-medium">{item.value}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Admin Privileges */}
            <motion.div variants={itemVariants}>
              <Card className="glass-morphism border-cyan-500/20">
                <CardHeader className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-cyan-500/20">
                  <CardTitle className="flex items-center text-white">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 mr-3">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    Admin Privileges
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: "Manage Products", icon: Zap, gradient: "from-blue-500/20 to-cyan-500/20" },
                      { label: "Manage Transactions", icon: Activity, gradient: "from-green-500/20 to-emerald-500/20" },
                      { label: "View Analytics", icon: Settings, gradient: "from-purple-500/20 to-pink-500/20" },
                      { label: "Manage Users", icon: User, gradient: "from-orange-500/20 to-red-500/20" }
                    ].map((privilege, index) => (
                      <motion.div 
                        key={privilege.label}
                        className={`flex items-center space-x-3 p-4 bg-gradient-to-r ${privilege.gradient} rounded-lg border border-cyan-500/10`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <privilege.icon className="h-5 w-5 text-cyan-400" />
                        <span className="text-sm font-medium text-white">{privilege.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Security Information */}
            <motion.div variants={itemVariants}>
              <Card className="glass-morphism border-cyan-500/20">
                <CardHeader className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border-b border-cyan-500/20">
                  <CardTitle className="flex items-center text-white">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 mr-3">
                      <Lock className="h-5 w-5 text-white" />
                    </div>
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {[
                      {
                        title: "Password",
                        description: "Last updated: Never",
                        action: "Change Password",
                        gradient: "from-blue-500/20 to-cyan-500/20"
                      },
                      {
                        title: "Two-Factor Authentication",
                        description: "Not enabled",
                        action: "Enable 2FA",
                        gradient: "from-green-500/20 to-emerald-500/20"
                      }
                    ].map((item, index) => (
                      <motion.div 
                        key={item.title}
                        className={`flex justify-between items-center p-4 bg-gradient-to-r ${item.gradient} rounded-lg border border-cyan-500/10`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div>
                          <p className="font-medium text-white">{item.title}</p>
                          <p className="text-sm text-gray-400">{item.description}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                        >
                          {item.action}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
}