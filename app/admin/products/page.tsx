/* eslint-disable react/no-unescaped-entities */
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
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight, Package, Zap } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  featured: boolean;
  createdAt: string;
}

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  stock: string;
  featured: boolean;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    stock: '',
    featured: false
  });
  const [formLoading, setFormLoading] = useState(false);

  const productsPerPage = 10;

  const categories = [
    'smartphones',
    'laptops',
    'tablets',
    'accessories',
    'audio',
    'gaming'
  ];

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchTerm]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: productsPerPage.toString(),
        search: searchTerm
      });

      const response = await fetch(`/api/products?${params}`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
        setTotalPages(Math.ceil(data.total / productsPerPage));
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchProducts();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      image: '',
      category: '',
      stock: '',
      featured: false
    });
    setEditingProduct(null);
  };

  const handleAddProduct = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image,
      category: product.category,
      stock: product.stock.toString(),
      featured: product.featured
    });
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(editingProduct ? 'Product updated successfully' : 'Product created successfully');
        setIsDialogOpen(false);
        resetForm();
        fetchProducts();
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to save product');
      }
    } catch (error) {
      toast.error('An error occurred while saving the product');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Product deleted successfully');
        fetchProducts();
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to delete product');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the product');
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
          className="flex justify-between items-center"
          variants={itemVariants}
        >
          <div>
            <h1 className="text-4xl font-bold futuristic-heading mb-2">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                PRODUCTS
              </span>
            </h1>
            <p className="text-gray-400 text-lg">Manage your product inventory</p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={handleAddProduct}
              className="cyber-button bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </motion.div>
        </motion.div>

        {/* Search */}
        <motion.div variants={itemVariants}>
          <Card className="glass-morphism border-cyan-500/20">
            <CardContent className="p-6">
              <form onSubmit={handleSearch} className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search products by name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-800/50 border-cyan-500/30 text-white placeholder-gray-400 focus:border-cyan-400"
                    />
                  </div>
                </div>
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                >
                  Search
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Products Table */}
        <motion.div variants={itemVariants}>
          <Card className="glass-morphism border-cyan-500/20">
            <CardHeader className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-cyan-500/20">
              <CardTitle className="flex items-center text-white">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 mr-3">
                  <Package className="h-5 w-5 text-white" />
                </div>
                All Products
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-16 w-16 rounded bg-gray-700" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-full bg-gray-700" />
                        <Skeleton className="h-3 w-2/3 bg-gray-700" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-cyan-500/20 hover:bg-gray-800/50">
                          <TableHead className="text-gray-300">Image</TableHead>
                          <TableHead className="text-gray-300">Name</TableHead>
                          <TableHead className="text-gray-300">Category</TableHead>
                          <TableHead className="text-gray-300">Price</TableHead>
                          <TableHead className="text-gray-300">Stock</TableHead>
                          <TableHead className="text-gray-300">Featured</TableHead>
                          <TableHead className="text-gray-300">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products.map((product, index) => (
                          <motion.tr
                            key={product.id}
                            className="border-cyan-500/10 hover:bg-gray-800/30 transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <TableCell>
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-16 h-16 object-cover rounded-lg border border-cyan-500/20"
                              />
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium text-white">{product.name}</div>
                                <div className="text-sm text-gray-400 truncate max-w-xs">
                                  {product.description}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant="secondary" 
                                className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-cyan-400 border-cyan-500/30"
                              >
                                {product.category}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-green-400 font-bold">
                              ${product.price.toFixed(2)}
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={product.stock > 0 ? "default" : "destructive"}
                                className={product.stock > 0 
                                  ? "bg-green-500/20 text-green-400 border-green-500/30" 
                                  : "bg-red-500/20 text-red-400 border-red-500/30"
                                }
                              >
                                {product.stock}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {product.featured ? (
                                <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-500/30">
                                  Featured
                                </Badge>
                              ) : (
                                <Badge 
                                  variant="outline" 
                                  className="border-gray-500/30 text-gray-400"
                                >
                                  Regular
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEditProduct(product)}
                                    className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </motion.div>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                      <Button 
                                        variant="outline" 
                                        size="sm"
                                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </motion.div>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent className="bg-gray-900/95 backdrop-blur-md border-cyan-500/20">
                                    <AlertDialogHeader>
                                      <AlertDialogTitle className="text-white">Delete Product</AlertDialogTitle>
                                      <AlertDialogDescription className="text-gray-400">
                                        Are you sure you want to delete "{product.name}"? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel className="bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700">
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDeleteProduct(product.id)}
                                        className="bg-red-600 hover:bg-red-700 text-white"
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </motion.tr>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center space-x-2 mt-6">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className={currentPage === page 
                            ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white" 
                            : "border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
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
                        className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Add/Edit Product Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl bg-gray-900/95 backdrop-blur-md border-cyan-500/20">
            <DialogHeader>
              <DialogTitle className="text-white flex items-center">
                <Zap className="mr-2 h-5 w-5 text-cyan-400" />
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-gray-300">Product Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-gray-800/50 border-cyan-500/30 text-white placeholder-gray-400 focus:border-cyan-400"
                  />
                </div>
                <div>
                  <Label htmlFor="category" className="text-gray-300">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger className="bg-gray-800/50 border-cyan-500/30 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-cyan-500/30">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category} className="text-white hover:bg-gray-700">
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-gray-300">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  className="bg-gray-800/50 border-cyan-500/30 text-white placeholder-gray-400 focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price" className="text-gray-300">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    className="bg-gray-800/50 border-cyan-500/30 text-white placeholder-gray-400 focus:border-cyan-400"
                  />
                </div>
                <div>
                  <Label htmlFor="stock" className="text-gray-300">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    required
                    className="bg-gray-800/50 border-cyan-500/30 text-white placeholder-gray-400 focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="image" className="text-gray-300">Image URL</Label>
                <Input
                  id="image"
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  required
                  className="bg-gray-800/50 border-cyan-500/30 text-white placeholder-gray-400 focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-500 data-[state=checked]:to-purple-500"
                />
                <Label htmlFor="featured" className="text-gray-300">Featured Product</Label>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={formLoading}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
                >
                  {formLoading ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>
    </AdminLayout>
  );
}