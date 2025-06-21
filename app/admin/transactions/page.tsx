'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Search, Plus, Trash2, ChevronLeft, ChevronRight, ShoppingCart, Activity } from 'lucide-react';
import { toast } from 'sonner';

interface Transaction {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  total: number;
  status: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
  product: {
    name: string;
    price: number;
  };
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface TransactionFormData {
  userId: string;
  productId: string;
  quantity: string;
  status: string;
}

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<TransactionFormData>({
    userId: '',
    productId: '',
    quantity: '',
    status: 'PENDING'
  });
  const [formLoading, setFormLoading] = useState(false);

  const transactionsPerPage = 10;

  useEffect(() => {
    fetchTransactions();
    fetchProducts();
    fetchUsers();
  }, [currentPage, searchTerm]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: transactionsPerPage.toString(),
        search: searchTerm
      });

      const response = await fetch(`/api/admin/transactions?${params}`);
      if (response.ok) {
        const data = await response.json();
        setTransactions(data.transactions);
        setTotalPages(Math.ceil(data.total / transactionsPerPage));
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast.error('Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products?limit=1000');
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchTransactions();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const resetForm = () => {
    setFormData({
      userId: '',
      productId: '',
      quantity: '',
      status: 'PENDING'
    });
  };

  const handleAddTransaction = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const selectedProduct = products.find(p => p.id === formData.productId);
      if (!selectedProduct) {
        toast.error('Please select a valid product');
        return;
      }

      const quantity = parseInt(formData.quantity);
      const total = selectedProduct.price * quantity;

      const response = await fetch('/api/admin/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          quantity,
          total
        }),
      });

      if (response.ok) {
        toast.success('Transaction created successfully');
        setIsDialogOpen(false);
        resetForm();
        fetchTransactions();
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to create transaction');
      }
    } catch (error) {
      toast.error('An error occurred while creating the transaction');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteTransaction = async (transactionId: string) => {
    try {
      const response = await fetch(`/api/admin/transactions/${transactionId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Transaction deleted successfully');
        fetchTransactions();
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to delete transaction');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the transaction');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case 'CANCELLED':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Cancelled</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
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

  return (
    <AdminLayout>
      <motion.div 
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          variants={itemVariants}
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Transactions
            </h1>
            <p className="text-gray-600 text-lg">Manage customer transactions</p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={handleAddTransaction}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
          </motion.div>
        </motion.div>

        {/* Search */}
        <motion.div variants={itemVariants}>
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <form onSubmit={handleSearch} className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search by product name or customer name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-gray-300 focus:border-blue-500"
                    />
                  </div>
                </div>
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                >
                  Search
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Transactions Table */}
        <motion.div variants={itemVariants}>
          <Card className="border-gray-200">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-100">
              <CardTitle className="flex items-center text-gray-900">
                <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 mr-3">
                  <ShoppingCart className="h-5 w-5 text-white" />
                </div>
                All Transactions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="p-6 space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-full bg-gray-200" />
                        <Skeleton className="h-3 w-2/3 bg-gray-200" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : transactions.length > 0 ? (
                <>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-200 hover:bg-gray-50">
                          <TableHead className="text-gray-700">Transaction ID</TableHead>
                          <TableHead className="text-gray-700">Customer</TableHead>
                          <TableHead className="text-gray-700 hidden sm:table-cell">Product</TableHead>
                          <TableHead className="text-gray-700 hidden md:table-cell">Quantity</TableHead>
                          <TableHead className="text-gray-700">Total</TableHead>
                          <TableHead className="text-gray-700 hidden lg:table-cell">Status</TableHead>
                          <TableHead className="text-gray-700 hidden xl:table-cell">Date</TableHead>
                          <TableHead className="text-gray-700">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {transactions.map((transaction, index) => (
                          <motion.tr
                            key={transaction.id}
                            className="border-gray-100 hover:bg-gray-50 transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <TableCell className="font-mono text-xs sm:text-sm text-blue-600">
                              #{transaction.id.slice(-8).toUpperCase()}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                  <Activity className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900 text-sm">{transaction.user.name}</div>
                                  <div className="text-xs text-gray-500 sm:hidden">{transaction.product.name}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <div>
                                <div className="font-medium text-gray-900 text-sm">{transaction.product.name}</div>
                                <div className="text-xs text-gray-500">
                                  ${transaction.product.price.toFixed(2)} each
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-blue-600 font-bold hidden md:table-cell">
                              {transaction.quantity}
                            </TableCell>
                            <TableCell className="font-bold text-green-600">
                              ${transaction.total.toFixed(2)}
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">{getStatusBadge(transaction.status)}</TableCell>
                            <TableCell className="text-gray-600 text-sm hidden xl:table-cell">
                              {new Date(transaction.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      className="border-red-300 text-red-600 hover:bg-red-50 p-1 sm:p-2"
                                    >
                                      <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                    </Button>
                                  </motion.div>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-white border-gray-200">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle className="text-gray-900">Delete Transaction</AlertDialogTitle>
                                    <AlertDialogDescription className="text-gray-600">
                                      Are you sure you want to delete this transaction? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel className="bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200">
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteTransaction(transaction.id)}
                                      className="bg-red-600 hover:bg-red-700 text-white"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </TableCell>
                          </motion.tr>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center space-x-2 p-6 border-t border-gray-100">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="border-gray-300 text-gray-600 hover:bg-gray-50"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="hidden sm:inline ml-1">Previous</span>
                      </Button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className={currentPage === page 
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white" 
                            : "border-gray-300 text-gray-600 hover:bg-gray-50"
                          }
                        >
                          {page}
                        </Button>
                      ))}
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="border-gray-300 text-gray-600 hover:bg-gray-50"
                      >
                        <span className="hidden sm:inline mr-1">Next</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <Activity className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">No transactions found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Add Transaction Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md bg-white border-gray-200">
            <DialogHeader>
              <DialogTitle className="text-gray-900 flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5 text-blue-600" />
                Add New Transaction
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="userId" className="text-gray-700">Customer</Label>
                <Select value={formData.userId} onValueChange={(value) => setFormData({ ...formData, userId: value })}>
                  <SelectTrigger className="border-gray-300 focus:border-blue-500">
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    {users.filter(user => user.email !== 'admin@electrostore.com').map((user) => (
                      <SelectItem key={user.id} value={user.id} className="text-gray-900 hover:bg-gray-100">
                        {user.name} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="productId" className="text-gray-700">Product</Label>
                <Select value={formData.productId} onValueChange={(value) => setFormData({ ...formData, productId: value })}>
                  <SelectTrigger className="border-gray-300 focus:border-blue-500">
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id} className="text-gray-900 hover:bg-gray-100">
                        {product.name} - ${product.price.toFixed(2)} (Stock: {product.stock})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="quantity" className="text-gray-700">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  required
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>

              <div>
                <Label htmlFor="status" className="text-gray-700">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger className="border-gray-300 focus:border-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    <SelectItem value="PENDING" className="text-gray-900 hover:bg-gray-100">Pending</SelectItem>
                    <SelectItem value="COMPLETED" className="text-gray-900 hover:bg-gray-100">Completed</SelectItem>
                    <SelectItem value="CANCELLED" className="text-gray-900 hover:bg-gray-100">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.productId && formData.quantity && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600">Total Amount:</div>
                  <div className="text-2xl font-bold text-green-600">
                    ${((products.find(p => p.id === formData.productId)?.price || 0) * parseInt(formData.quantity || '0')).toFixed(2)}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={formLoading}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                >
                  {formLoading ? 'Creating...' : 'Create Transaction'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>
    </AdminLayout>
  );
}
