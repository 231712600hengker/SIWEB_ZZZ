'use client';

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Star,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Smartphone,
  Laptop,
  Tablet,
  Headphones,
  Gamepad2,
  Watch
} from 'lucide-react';

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
    status: string;
  }>;
  categoryStats: Array<{
    category: string;
    count: number;
    revenue: number;
  }>;
  monthlyRevenue: Array<{
    month: string;
    revenue: number;
    transactions: number;
  }>;
  statusStats: {
    completed: number;
    pending: number;
    cancelled: number;
  };
  topProducts: Array<{
    id: string;
    name: string;
    category: string;
    totalSold: number;
    revenue: number;
  }>;
  topBuyers: Array<{
    id: string;
    name: string;
    email: string;
    totalSpent: number;
    totalOrders: number;
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

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'smartphones': return Smartphone;
      case 'laptops': return Laptop;
      case 'tablets': return Tablet;
      case 'audio': return Headphones;
      case 'gaming': return Gamepad2;
      case 'accessories': return Watch;
      default: return Package;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-500';
      case 'PENDING': return 'bg-yellow-500';
      case 'CANCELLED': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, subtitle, loading }: any) => (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            {loading ? (
              <Skeleton className="h-8 w-24 mt-2" />
            ) : (
              <p className="text-2xl font-bold mt-1">{value}</p>
            )}
            {subtitle && !loading && (
              <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Analytics</h1>
            <p className="text-gray-600 mt-2">Ringkasan lengkap performa ElectroStore</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>Update terakhir: {new Date().toLocaleDateString('id-ID')}</span>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Produk"
            value={analytics?.totalProducts || 0}
            subtitle="Produk aktif"
            icon={Package}
            color="bg-blue-500"
            loading={loading}
          />
          <StatCard
            title="Total Transaksi"
            value={analytics?.totalTransactions || 0}
            subtitle="Semua transaksi"
            icon={ShoppingCart}
            color="bg-green-500"
            loading={loading}
          />
          <StatCard
            title="Total Pengguna"
            value={analytics?.totalUsers || 0}
            subtitle="Pengguna terdaftar"
            icon={Users}
            color="bg-purple-500"
            loading={loading}
          />
          <StatCard
            title="Total Pendapatan"
            value={analytics ? formatRupiah(analytics.totalRevenue) : 'Rp 0'}
            subtitle="Pendapatan kotor"
            icon={DollarSign}
            color="bg-orange-500"
            loading={loading}
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Target className="mr-2 h-5 w-5" />
                Rata-rata Nilai Order
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-32" />
              ) : (
                <div>
                  <p className="text-2xl font-bold text-blue-600">
                    {analytics?.totalTransactions ? 
                      formatRupiah(analytics.totalRevenue / analytics.totalTransactions) : 
                      'Rp 0'
                    }
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Per transaksi</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Activity className="mr-2 h-5 w-5" />
                Tingkat Konversi
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {analytics?.totalUsers && analytics?.totalTransactions 
                      ? ((analytics.totalTransactions / analytics.totalUsers) * 100).toFixed(1)
                      : '0.0'}%
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Transaksi per user</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Star className="mr-2 h-5 w-5" />
                Produk Terlaris
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-24" />
              ) : analytics?.topProducts?.[0] ? (
                <div>
                  <p className="font-semibold text-gray-900 truncate">
                    {analytics.topProducts[0].name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {analytics.topProducts[0].totalSold} terjual
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">Belum ada data</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Category Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="mr-2 h-5 w-5" />
                Performa Kategori
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-8 w-8 rounded" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-2 w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : analytics?.categoryStats?.length ? (
                <div className="space-y-4">
                  {analytics.categoryStats.map((category) => {
                    const Icon = getCategoryIcon(category.category);
                    const percentage = analytics.totalRevenue > 0 ? 
                      (category.revenue / analytics.totalRevenue) * 100 : 0;
                    
                    return (
                      <div key={category.category} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <Icon className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium capitalize">{category.category}</p>
                              <p className="text-sm text-gray-500">{category.count} produk</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{formatRupiah(category.revenue)}</p>
                            <p className="text-sm text-gray-500">{percentage.toFixed(1)}%</p>
                          </div>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Belum ada data kategori</p>
              )}
            </CardContent>
          </Card>

          {/* Transaction Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Status Transaksi
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-12" />
                      </div>
                      <Skeleton className="h-3 w-full" />
                    </div>
                  ))}
                </div>
              ) : analytics?.statusStats ? (
                <div className="space-y-6">
                  {Object.entries(analytics.statusStats).map(([status, count]) => {
                    const total = analytics.totalTransactions || 1;
                    const percentage = (count / total) * 100;
                    const statusLabels = {
                      completed: 'Selesai',
                      pending: 'Pending',
                      cancelled: 'Dibatalkan'
                    };
                    
                    return (
                      <div key={status} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(status.toUpperCase())}`} />
                            <span className="font-medium">{statusLabels[status as keyof typeof statusLabels]}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-semibold">{count}</span>
                            <span className="text-sm text-gray-500 ml-2">({percentage.toFixed(1)}%)</span>
                          </div>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Belum ada data status</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity and Top Performers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Transaksi Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-3 w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : analytics?.recentTransactions.length ? (
                <div className="space-y-4">
                  {analytics.recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{transaction.user.name}</p>
                        <p className="text-sm text-gray-600 truncate">{transaction.product.name}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge 
                            variant={transaction.status === 'COMPLETED' ? 'default' : 
                                   transaction.status === 'PENDING' ? 'secondary' : 'destructive'}
                            className="text-xs"
                          >
                            {transaction.status === 'COMPLETED' ? 'Selesai' :
                             transaction.status === 'PENDING' ? 'Pending' : 'Dibatalkan'}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {new Date(transaction.createdAt).toLocaleDateString('id-ID')}
                          </span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-bold text-green-600">
                          {formatRupiah(transaction.total)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Belum ada transaksi</p>
              )}
            </CardContent>
          </Card>

          {/* Top Buyers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Pembeli Teratas
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-3 w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : analytics?.topBuyers?.length ? (
                <div className="space-y-4">
                  {analytics.topBuyers.map((buyer, index) => (
                    <div key={buyer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                          <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{buyer.name}</p>
                          <p className="text-sm text-gray-500">{buyer.email}</p>
                          <p className="text-xs text-gray-400">{buyer.totalOrders} transaksi</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-600">
                          {formatRupiah(buyer.totalSpent)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Belum ada data pembeli</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Top Products */}
        {analytics?.topProducts?.length ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="mr-2 h-5 w-5" />
                Produk Terlaris
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analytics.topProducts.slice(0, 6).map((product, index) => {
                  const Icon = getCategoryIcon(product.category);
                  return (
                    <div key={product.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Icon className="h-4 w-4 text-gray-600" />
                          </div>
                          <Badge variant="outline">#{index + 1}</Badge>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {product.category}
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h4>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Terjual:</span>
                          <span className="font-medium">{product.totalSold} unit</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Pendapatan:</span>
                          <span className="font-medium text-green-600">
                            {formatRupiah(product.revenue)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </AdminLayout>
  );
}