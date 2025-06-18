'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BuyNowForm } from '@/components/ui/buy-now-form';
import { toast } from 'sonner';
import { 
  User, 
  Mail, 
  Calendar, 
  LogOut, 
  ShoppingBag, 
  Settings, 
  Heart, 
  ShoppingCart,
  Plus,
  Minus,
  Trash2
} from 'lucide-react';
import { 
  getCart, 
  getWishlist, 
  removeFromCart, 
  removeFromWishlist, 
  updateCartQuantity,
  clearCart,
  getCartTotal,
  type CartItem,
  type WishlistItem
} from '@/lib/cart';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [buyNowProduct, setBuyNowProduct] = useState<any>(null);
  const [isBuyNowOpen, setIsBuyNowOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchUser();
    loadCartAndWishlist();

    // Listen for cart and wishlist updates
    const handleCartUpdate = () => loadCartAndWishlist();
    const handleWishlistUpdate = () => loadCartAndWishlist();

    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
    };
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

  const loadCartAndWishlist = () => {
    setCart(getCart());
    setWishlist(getWishlist());
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

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateCartQuantity(productId, newQuantity);
  };

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId);
    toast.success('Item removed from cart');
  };

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId);
    toast.success('Item removed from wishlist');
  };

  const handleBuyFromCart = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    // Create a combined product for cart checkout
    const cartTotal = getCartTotal();
    const cartSummary = {
      id: 'cart-checkout',
      name: `Cart Items (${cart.length} products)`,
      price: cartTotal,
      image: cart[0]?.image || '',
      stock: 999
    };

    setBuyNowProduct(cartSummary);
    setIsBuyNowOpen(true);
  };

  const handleBuyFromWishlist = (item: WishlistItem) => {
    const product = {
      id: item.productId,
      name: item.name,
      price: item.price,
      image: item.image,
      stock: 999 // Assume available for wishlist items
    };

    setBuyNowProduct(product);
    setIsBuyNowOpen(true);
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Cart cleared');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse space-y-6">
          <div className="h-8 bg-white-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64 bg-white-200 rounded-lg"></div>
            <div className="h-64 bg-white-200 rounded-lg"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white-900 mb-2">My Profile</h1>
          <p className="text-white-600">Manage your account information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Sidebar */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6 text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <User className="text-white w-10 h-10" />
              </div>

              <h2 className="text-xl font-semibold mb-1">{user.name}</h2>
              <p className="text-white-600 mb-3">{user.email}</p>
              <Badge variant={user.role === 'ADMIN' ? 'default' : 'secondary'}>
                {user.role}
              </Badge>

              <Separator className="my-5" />

              <div className="space-y-3">
                {user.role === 'ADMIN' && (
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => router.push('/admin')}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Admin Dashboard
                  </Button>
                )}

                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => router.push('/shop')}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Browse Products
                </Button>

                <Button 
                  variant="destructive" 
                  className="w-full justify-start"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="account" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="account">Account Info</TabsTrigger>
                <TabsTrigger value="cart">
                  Cart ({cart.length})
                </TabsTrigger>
                <TabsTrigger value="wishlist">
                  Wishlist ({wishlist.length})
                </TabsTrigger>
              </TabsList>

              {/* Account Information */}
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Account Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-white">Full Name</label>
                        <p className="text-white font-medium">{user.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-white-500">Email Address</label>
                        <p className="text-white-900 font-medium">{user.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-white-500">Role</label>
                        <p className="text-white-900 font-medium">{user.role}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-white-500">Member Since</label>
                        <p className="text-white-900 font-medium">
                          {new Date(user.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Shopping Cart */}
              <TabsContent value="cart">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Shopping Cart
                      </CardTitle>
                      {cart.length > 0 && (
                        <Button variant="outline" size="sm" onClick={handleClearCart}>
                          Clear Cart
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {cart.length === 0 ? (
                      <div className="text-center py-8">
                        <ShoppingCart className="h-16 w-16 mx-auto text-white-400 mb-4" />
                        <p className="text-white-500 mb-4">Your cart is empty</p>
                        <Button onClick={() => router.push('/shop')}>
                          Start Shopping
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-white-600">${item.price.toFixed(2)} each</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveFromCart(item.productId)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        
                        <Separator />
                        
                        <div className="flex justify-between items-center text-lg font-bold">
                          <span>Total: ${getCartTotal().toFixed(2)}</span>
                          <Button onClick={handleBuyFromCart} className="bg-green-600 hover:bg-green-700">
                            Checkout Cart
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Wishlist */}
              <TabsContent value="wishlist">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Heart className="h-5 w-5 mr-2" />
                      Wishlist
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {wishlist.length === 0 ? (
                      <div className="text-center py-8">
                        <Heart className="h-16 w-16 mx-auto text-white-400 mb-4" />
                        <p className="text-white-500 mb-4">Your wishlist is empty</p>
                        <Button onClick={() => router.push('/shop')}>
                          Discover Products
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {wishlist.map((item) => (
                          <div key={item.id} className="border rounded-lg p-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-32 object-cover rounded-lg mb-3"
                            />
                            <h3 className="font-semibold mb-2">{item.name}</h3>
                            <p className="text-blue-600 font-bold mb-3">${item.price.toFixed(2)}</p>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                className="flex-1"
                                onClick={() => handleBuyFromWishlist(item)}
                              >
                                Buy Now
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRemoveFromWishlist(item.productId)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Buy Now Form */}
      {buyNowProduct && (
        <BuyNowForm
          product={buyNowProduct}
          isOpen={isBuyNowOpen}
          onClose={() => {
            setIsBuyNowOpen(false);
            setBuyNowProduct(null);
          }}
        />
      )}

      <Footer />
    </div>
  );
}