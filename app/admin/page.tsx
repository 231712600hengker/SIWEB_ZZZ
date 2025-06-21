'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Package, ShoppingCart, Users, TrendingUp, DollarSign, Star, Activity } from 'lucide-react';

interface Analytics {
  totalProducts: number;
  totalTransactions: number;
  totalUsers: number;
  totalRevenue: number;
  recentTransactions: Array<{
    id: string;
    user: { name: string };
    product: { name: string };
    total: number;
    createdAt: string;
  }>;
}

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/admin/analytics');
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, loading, index }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group"
    >
      <Card className="border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-2">{title}</p>
              {loading ? (
                <Skeleton className="h-8 w-20 bg-gray-200" />
              ) : (
                <motion.p 
                  className="text-3xl font-bold text-gray-900"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                >
                  {value}
                </motion.p>
              )}
            </div>
            <motion.div 
              className={`p-3 rounded-full ${color} group-hover:scale-110 transition-transform duration-300`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Icon className="h-6 w-6 text-white" />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

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
            Admin Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Welcome to your command center</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={itemVariants}
        >
          <StatCard
            title="Total Products"
            value={analytics?.totalProducts || 0}
            icon={Package}
            color="bg-blue-500"
            loading={loading}
            index={0}
          />
          <StatCard
            title="Total Transactions"
            value={analytics?.totalTransactions || 0}
            icon={ShoppingCart}
            color="bg-green-500"
            loading={loading}
            index={1}
          />
          <StatCard
            title="Total Users"
            value={analytics?.totalUsers || 0}
            icon={Users}
            color="bg-purple-500"
            loading={loading}
            index={2}
          />
          <StatCard
            title="Total Revenue"
            value={analytics ? `$${analytics.totalRevenue.toFixed(2)}` : '$0.00'}
            icon={DollarSign}
            color="bg-orange-500"
            loading={loading}
            index={3}
          />
        </motion.div>

        {/* Charts and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Transactions */}
          <motion.div variants={itemVariants}>
            <Card className="border-gray-200 hover:border-blue-300 transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
                <CardTitle className="flex items-center text-gray-900">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 mr-3">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {loading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full bg-gray-200" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-full bg-gray-200" />
                          <Skeleton className="h-3 w-2/3 bg-gray-200" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : analytics?.recentTransactions.length ? (
                  <div className="space-y-4">
                    {analytics.recentTransactions.map((transaction, index) => (
                      <motion.div 
                        key={transaction.id} 
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-all duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                            <Activity className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{transaction.user.name}</p>
                            <p className="text-sm text-gray-600">{transaction.product.name}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(transaction.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">
                            ${transaction.total.toFixed(2)}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Activity className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">No recent transactions</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={itemVariants}>
            <Card className="border-gray-200 hover:border-blue-300 transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-100">
                <CardTitle className="flex items-center text-gray-900">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 mr-3">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {loading ? (
                  <div className="space-y-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <Skeleton className="h-4 w-24 bg-gray-200" />
                        <Skeleton className="h-6 w-16 bg-gray-200" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {[
                      {
                        label: "Average Order Value",
                        value: `$${analytics?.totalTransactions ? (analytics.totalRevenue / analytics.totalTransactions).toFixed(2) : '0.00'}`,
                        color: "text-blue-600"
                      },
                      {
                        label: "Products in Stock",
                        value: analytics?.totalProducts || 0,
                        color: "text-green-600"
                      },
                      {
                        label: "Active Users",
                        value: analytics?.totalUsers || 0,
                        color: "text-purple-600"
                      },
                      {
                        label: "Conversion Rate",
                        value: `${analytics?.totalUsers && analytics?.totalTransactions 
                          ? ((analytics.totalTransactions / analytics.totalUsers) * 100).toFixed(1)
                          : '0.0'}%`,
                        color: "text-orange-600"
                      }
                    ].map((stat, index) => (
                      <motion.div 
                        key={stat.label}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <span className="text-gray-700">{stat.label}</span>
                        <span className={`font-bold text-lg ${stat.color}`}>
                          {stat.value}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </AdminLayout>
  );
}
