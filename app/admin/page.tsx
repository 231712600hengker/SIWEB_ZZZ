'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Package, ShoppingCart, Users, TrendingUp, DollarSign, Star, Zap, Activity } from 'lucide-react';

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

  const StatCard = ({ title, value, icon: Icon, gradient, loading, index }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group"
    >
      <Card className="glass-morphism border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 overflow-hidden">
        <CardContent className="p-0">
          <div className={`bg-gradient-to-br ${gradient} p-6 relative overflow-hidden`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white rounded-full -translate-y-10 translate-x-10"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full translate-y-8 -translate-x-8"></div>
            </div>
            
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-white/80 text-sm font-medium mb-2">{title}</p>
                {loading ? (
                  <Skeleton className="h-8 w-20 bg-white/20" />
                ) : (
                  <motion.p 
                    className="text-3xl font-bold text-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                  >
                    {value}
                  </motion.p>
                )}
              </div>
              <motion.div 
                className="p-3 rounded-full bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Icon className="h-8 w-8 text-white" />
              </motion.div>
            </div>
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
          <h1 className="text-4xl font-bold futuristic-heading mb-2">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              ADMIN DASHBOARD
            </span>
          </h1>
          <p className="text-gray-400 text-lg">Welcome to your command center</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={itemVariants}
        >
          <StatCard
            title="Total Products"
            value={analytics?.totalProducts || 0}
            icon={Package}
            gradient="from-blue-500 to-cyan-500"
            loading={loading}
            index={0}
          />
          <StatCard
            title="Total Transactions"
            value={analytics?.totalTransactions || 0}
            icon={ShoppingCart}
            gradient="from-green-500 to-emerald-500"
            loading={loading}
            index={1}
          />
          <StatCard
            title="Total Users"
            value={analytics?.totalUsers || 0}
            icon={Users}
            gradient="from-purple-500 to-pink-500"
            loading={loading}
            index={2}
          />
          <StatCard
            title="Total Revenue"
            value={analytics ? `$${analytics.totalRevenue.toFixed(2)}` : '$0.00'}
            icon={DollarSign}
            gradient="from-orange-500 to-red-500"
            loading={loading}
            index={3}
          />
        </motion.div>

        {/* Charts and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Transactions */}
          <motion.div variants={itemVariants}>
            <Card className="glass-morphism border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-cyan-500/20">
                <CardTitle className="flex items-center text-white">
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
                        <Skeleton className="h-12 w-12 rounded-full bg-gray-700" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-full bg-gray-700" />
                          <Skeleton className="h-3 w-2/3 bg-gray-700" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : analytics?.recentTransactions.length ? (
                  <div className="space-y-4">
                    {analytics.recentTransactions.map((transaction, index) => (
                      <motion.div 
                        key={transaction.id} 
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-center">
                            <Activity className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-white">{transaction.user.name}</p>
                            <p className="text-sm text-gray-400">{transaction.product.name}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(transaction.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-400">
                            ${transaction.total.toFixed(2)}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Zap className="h-16 w-16 mx-auto text-gray-600 mb-4" />
                    <p className="text-gray-400">No recent transactions</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={itemVariants}>
            <Card className="glass-morphism border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-cyan-500/20">
                <CardTitle className="flex items-center text-white">
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
                        <Skeleton className="h-4 w-24 bg-gray-700" />
                        <Skeleton className="h-6 w-16 bg-gray-700" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {[
                      {
                        label: "Average Order Value",
                        value: `$${analytics?.totalTransactions ? (analytics.totalRevenue / analytics.totalTransactions).toFixed(2) : '0.00'}`,
                        gradient: "from-blue-400 to-cyan-400"
                      },
                      {
                        label: "Products in Stock",
                        value: analytics?.totalProducts || 0,
                        gradient: "from-green-400 to-emerald-400"
                      },
                      {
                        label: "Active Users",
                        value: analytics?.totalUsers || 0,
                        gradient: "from-purple-400 to-pink-400"
                      },
                      {
                        label: "Conversion Rate",
                        value: `${analytics?.totalUsers && analytics?.totalTransactions 
                          ? ((analytics.totalTransactions / analytics.totalUsers) * 100).toFixed(1)
                          : '0.0'}%`,
                        gradient: "from-orange-400 to-red-400"
                      }
                    ].map((stat, index) => (
                      <motion.div 
                        key={stat.label}
                        className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-800/30 to-gray-700/30 rounded-lg border border-cyan-500/10"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <span className="text-gray-300">{stat.label}</span>
                        <span className={`font-bold text-lg bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
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