import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const user = await getUser(request);

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Basic counts
    const [totalProducts, totalTransactions, totalUsers] = await Promise.all([
      prisma.product.count(),
      prisma.transaction.count(),
      prisma.user.count(),
    ]);

    // Total revenue
    const revenueResult = await prisma.transaction.aggregate({
      where: { status: 'COMPLETED' },
      _sum: { total: true }
    });
    const totalRevenue = revenueResult._sum.total || 0;

    // Recent transactions
    const recentTransactions = await prisma.transaction.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true } },
        product: { select: { name: true } }
      }
    });

    // Category statistics
    const categoryStats = await prisma.transaction.groupBy({
      by: ['productId'],
      where: { status: 'COMPLETED' },
      _sum: { total: true, quantity: true },
      _count: true
    });

    // Get product details for categories
    const productIds = categoryStats.map(stat => stat.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, category: true }
    });

    // Group by category
    const categoryMap = new Map();
    categoryStats.forEach(stat => {
      const product = products.find(p => p.id === stat.productId);
      if (product) {
        const category = product.category;
        if (!categoryMap.has(category)) {
          categoryMap.set(category, {
            category,
            count: 0,
            revenue: 0
          });
        }
        const existing = categoryMap.get(category);
        existing.count += stat._count;
        existing.revenue += stat._sum.total || 0;
      }
    });

    const categoryStatsArray = Array.from(categoryMap.values())
      .sort((a, b) => b.revenue - a.revenue);

    // Transaction status statistics
    const statusStats = await prisma.transaction.groupBy({
      by: ['status'],
      _count: true
    });

    const statusStatsObj = {
      completed: 0,
      pending: 0,
      cancelled: 0
    };

    statusStats.forEach(stat => {
      const status = stat.status.toLowerCase();
      if (status in statusStatsObj) {
        statusStatsObj[status as keyof typeof statusStatsObj] = stat._count;
      }
    });

    // Top products by sales
    const topProductsData = await prisma.transaction.groupBy({
      by: ['productId'],
      where: { status: 'COMPLETED' },
      _sum: { total: true, quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 10
    });

    const topProductIds = topProductsData.map(item => item.productId);
    const topProductsDetails = await prisma.product.findMany({
      where: { id: { in: topProductIds } },
      select: { id: true, name: true, category: true }
    });

    const topProducts = topProductsData.map(item => {
      const product = topProductsDetails.find(p => p.id === item.productId);
      return {
        id: item.productId,
        name: product?.name || 'Unknown Product',
        category: product?.category || 'unknown',
        totalSold: item._sum.quantity || 0,
        revenue: item._sum.total || 0
      };
    });

    // Top buyers
    const topBuyersData = await prisma.transaction.groupBy({
      by: ['userId'],
      where: { status: 'COMPLETED' },
      _sum: { total: true },
      _count: true,
      orderBy: { _sum: { total: 'desc' } },
      take: 5
    });

    const topBuyerIds = topBuyersData.map(item => item.userId);
    const topBuyersDetails = await prisma.user.findMany({
      where: { 
        id: { in: topBuyerIds },
        role: 'BUYER'
      },
      select: { id: true, name: true, email: true }
    });

    const topBuyers = topBuyersData.map(item => {
      const user = topBuyersDetails.find(u => u.id === item.userId);
      return {
        id: item.userId,
        name: user?.name || 'Unknown User',
        email: user?.email || 'unknown@email.com',
        totalSpent: item._sum.total || 0,
        totalOrders: item._count
      };
    }).filter(buyer => buyer.name !== 'Unknown User');

    // Monthly revenue (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyData = await prisma.transaction.findMany({
      where: {
        status: 'COMPLETED',
        createdAt: { gte: sixMonthsAgo }
      },
      select: {
        total: true,
        createdAt: true
      }
    });

    // Group by month
    const monthlyRevenue = new Map();
    monthlyData.forEach(transaction => {
      const monthKey = transaction.createdAt.toISOString().slice(0, 7); // YYYY-MM
      if (!monthlyRevenue.has(monthKey)) {
        monthlyRevenue.set(monthKey, {
          month: monthKey,
          revenue: 0,
          transactions: 0
        });
      }
      const existing = monthlyRevenue.get(monthKey);
      existing.revenue += transaction.total;
      existing.transactions += 1;
    });

    const monthlyRevenueArray = Array.from(monthlyRevenue.values())
      .sort((a, b) => a.month.localeCompare(b.month));

    return NextResponse.json({
      totalProducts,
      totalTransactions,
      totalUsers,
      totalRevenue,
      recentTransactions,
      categoryStats: categoryStatsArray,
      monthlyRevenue: monthlyRevenueArray,
      statusStats: statusStatsObj,
      topProducts,
      topBuyers
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}