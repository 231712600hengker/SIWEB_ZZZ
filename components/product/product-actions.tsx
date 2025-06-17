'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { BuyNowForm } from '@/components/ui/buy-now-form';
import { ShoppingCart, Heart, Share2 } from 'lucide-react';
import { addToCart, addToWishlist, removeFromWishlist, isInWishlist } from '@/lib/cart';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
}

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const [isBuyNowOpen, setIsBuyNowOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    setIsWishlisted(isInWishlist(product.id));
  }, [product.id]);

  const handleAddToCart = () => {
    if (product.stock === 0) {
      toast.error('Product is out of stock');
      return;
    }

    addToCart({
      id: `cart-${product.id}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    
    toast.success('Added to cart!');
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      setIsWishlisted(false);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist({
        id: `wishlist-${product.id}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: 'electronics'
      });
      setIsWishlisted(true);
      toast.success('Added to wishlist!');
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Check out this amazing product: ${product.name} - $${product.price.toFixed(2)}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href);
        toast.success('Product link copied to clipboard!');
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard!');
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex space-x-4">
          <Button 
            size="lg" 
            className="flex-1" 
            disabled={product.stock === 0}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={handleWishlistToggle}
            className={isWishlisted ? 'text-red-600 border-red-600' : ''}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </Button>
          <Button size="lg" variant="outline" onClick={handleShare}>
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
        
        <Button 
          variant="outline" 
          size="lg" 
          className="w-full"
          disabled={product.stock === 0}
          onClick={() => setIsBuyNowOpen(true)}
        >
          Buy Now
        </Button>
      </div>

      <BuyNowForm
        product={product}
        isOpen={isBuyNowOpen}
        onClose={() => setIsBuyNowOpen(false)}
      />
    </>
  );
}