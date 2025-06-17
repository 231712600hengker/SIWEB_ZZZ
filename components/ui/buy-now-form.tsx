'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Plus, Minus } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
}

interface BuyNowFormProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function BuyNowForm({ product, isOpen, onClose }: BuyNowFormProps) {
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });

  const total = product.price * quantity;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill in all required fields');
      return;
    }

    const orderDetails = `
🛍️ *ORDER DETAILS*

📦 Product: ${product.name}
💰 Price: $${product.price.toFixed(2)}
📊 Quantity: ${quantity}
💵 Total: $${total.toFixed(2)}

👤 *CUSTOMER INFORMATION*
Name: ${formData.name}
Email: ${formData.email || 'Not provided'}
Phone: ${formData.phone}
Address: ${formData.address}

📝 Notes: ${formData.notes || 'None'}

Thank you for your order! We will contact you soon to confirm the details.
    `.trim();

    const phoneNumber = "6287874289382";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(orderDetails)}`;
    
    window.open(whatsappUrl, '_blank');
    onClose();
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      notes: ''
    });
    setQuantity(1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Buy Now - Order Form
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Summary */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-600">${product.price.toFixed(2)} each</p>
                  <p className="text-sm text-gray-500">Stock: {product.stock} available</p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              {/* Quantity Selector */}
              <div className="flex items-center justify-between">
                <Label>Quantity:</Label>
                <div className="flex items-center space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              {/* Total */}
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-blue-600">${total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address">Delivery Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Enter your complete delivery address"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Any special instructions or notes"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-3">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                Send Order via WhatsApp
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}