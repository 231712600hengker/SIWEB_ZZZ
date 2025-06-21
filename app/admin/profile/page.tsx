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
import { User, Mail, Calendar, LogOut, Settings, Shield, Lock, Activity } from 'lucide-react';
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
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="h-64 bg-gray-200 rounded-lg"></div>
            <div className="lg:col-span-2 h-64 bg-gray-200 rounded-lg"></div>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Profile
          </h1>
          <p className="text-gray-600 text-lg">Manage your admin account information</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Sidebar */}
          <motion.div 
            className="lg:col-span-1"
            variants={itemVariants}
          >
            <Card className="border-gray-200">
              <CardContent className="p-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="relative mb-6"
                >
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative">
                    <User className="text-white w-12 h-12" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </motion.div>

                <h2 className="text-xl font-semibold mb-1 text-gray-900">{user.name}</h2>
                <p className="text-gray-600 mb-3">{user.email}</p>
                <Badge className="bg-red-100 text-red-800 border-red-200 mb-6">
                  <Shield className="mr-1 h-3 w-3" />
                  {user.role}
                </Badge>

                <Separator className="my-6 bg-gray-200" />

                <div className="space-y-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50"
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
                      className="w-full justify-start border-red-300 text-red-600 hover:bg-red-50"
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
              <Card className="border-gray-200">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-gray-100">
                  <CardTitle className="flex items-center text-gray-900">
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
                        className="p-4 bg-gray-50 rounded-lg border border-gray-100"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100">
                            <item.icon className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">{item.label}</label>
                            <p className="text-gray-900 font-medium">{item.value}</p>
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
              <Card className="border-gray-200">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-100">
                  <CardTitle className="flex items-center text-gray-900">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 mr-3">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    Admin Privileges
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: "Manage Products", icon: Activity, color: "blue" },
                      { label: "Manage Transactions", icon: Activity, color: "green" },
                      { label: "View Analytics", icon: Settings, color: "purple" },
                      { label: "Manage Users", icon: User, color: "orange" }
                    ].map((privilege, index) => (
                      <motion.div 
                        key={privilege.label}
                        className={`flex items-center space-x-3 p-4 bg-${privilege.color}-50 rounded-lg border border-${privilege.color}-100`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <privilege.icon className={`h-5 w-5 text-${privilege.color}-600`} />
                        <span className="text-sm font-medium text-gray-900">{privilege.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Security Information */}
            <motion.div variants={itemVariants}>
              <Card className="border-gray-200">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-gray-100">
                  <CardTitle className="flex items-center text-gray-900">
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
                        color: "blue"
                      },
                      {
                        title: "Two-Factor Authentication",
                        description: "Not enabled",
                        action: "Enable 2FA",
                        color: "green"
                      }
                    ].map((item, index) => (
                      <motion.div 
                        key={item.title}
                        className={`flex justify-between items-center p-4 bg-${item.color}-50 rounded-lg border border-${item.color}-100`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div>
                          <p className="font-medium text-gray-900">{item.title}</p>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={`border-${item.color}-300 text-${item.color}-600 hover:bg-${item.color}-50`}
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
