import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUser(request);

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get transaction details before deletion to restore stock
    const transaction = await prisma.transaction.findUnique({
      where: { id: params.id }
    });

    if (!transaction) {
      return NextResponse.json(
        { message: 'Transaction not found' },
        { status: 404 }
      );
    }

    // Delete transaction and restore product stock
    await prisma.$transaction(async (tx) => {
      // Delete the transaction
      await tx.transaction.delete({
        where: { id: params.id }
      });

      // Restore product stock
      await tx.product.update({
        where: { id: transaction.productId },
        data: {
          stock: {
            increment: transaction.quantity
          }
        }
      });
    });

    return NextResponse.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}