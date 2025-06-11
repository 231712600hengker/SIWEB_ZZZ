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

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    
    const skip = (page - 1) * limit;
    
    const where: any = {};
    
    if (search) {
      where.OR = [
        {
          user: {
            name: {
              contains: search,
              mode: 'insensitive'
            }
          }
        },
        {
          product: {
            name: {
              contains: search,
              mode: 'insensitive'
            }
          }
        }
      ];
    }
    
    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              name: true,
              email: true
            }
          },
          product: {
            select: {
              name: true,
              price: true
            }
          }
        }
      }),
      prisma.transaction.count({ where })
    ]);
    
    return NextResponse.json({
      transactions,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUser(request);

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { userId, productId, quantity, total, status } = await request.json();

    if (!userId || !productId || !quantity || !total) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if product exists and has enough stock
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    if (product.stock < quantity) {
      return NextResponse.json(
        { message: 'Insufficient stock' },
        { status: 400 }
      );
    }

    // Create transaction and update product stock
    const transaction = await prisma.$transaction(async (tx) => {
      // Create the transaction
      const newTransaction = await tx.transaction.create({
        data: {
          userId,
          productId,
          quantity: parseInt(quantity),
          total: parseFloat(total),
          status: status || 'PENDING'
        },
        include: {
          user: {
            select: {
              name: true,
              email: true
            }
          },
          product: {
            select: {
              name: true,
              price: true
            }
          }
        }
      });

      // Update product stock
      await tx.product.update({
        where: { id: productId },
        data: {
          stock: {
            decrement: parseInt(quantity)
          }
        }
      });

      return newTransaction;
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error('Error creating transaction:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}