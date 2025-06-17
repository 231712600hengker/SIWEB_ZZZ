export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

// Cart functions
export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (product: Omit<CartItem, 'quantity'>, quantity: number = 1): void => {
  const cart = getCart();
  const existingItem = cart.find(item => item.productId === product.productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdated'));
};

export const removeFromCart = (productId: string): void => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.productId !== productId);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  window.dispatchEvent(new Event('cartUpdated'));
};

export const updateCartQuantity = (productId: string, quantity: number): void => {
  const cart = getCart();
  const item = cart.find(item => item.productId === productId);
  
  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = quantity;
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
    }
  }
};

export const clearCart = (): void => {
  localStorage.removeItem('cart');
  window.dispatchEvent(new Event('cartUpdated'));
};

export const getCartTotal = (): number => {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const getCartItemCount = (): number => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};

// Wishlist functions
export const getWishlist = (): WishlistItem[] => {
  if (typeof window === 'undefined') return [];
  const wishlist = localStorage.getItem('wishlist');
  return wishlist ? JSON.parse(wishlist) : [];
};

export const addToWishlist = (product: WishlistItem): void => {
  const wishlist = getWishlist();
  const exists = wishlist.find(item => item.productId === product.productId);
  
  if (!exists) {
    wishlist.push(product);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    window.dispatchEvent(new Event('wishlistUpdated'));
  }
};

export const removeFromWishlist = (productId: string): void => {
  const wishlist = getWishlist();
  const updatedWishlist = wishlist.filter(item => item.productId !== productId);
  localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  window.dispatchEvent(new Event('wishlistUpdated'));
};

export const isInWishlist = (productId: string): boolean => {
  const wishlist = getWishlist();
  return wishlist.some(item => item.productId === productId);
};