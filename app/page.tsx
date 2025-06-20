/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FloatingParticles } from '@/components/ui/floating-particles';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, Star, Shield, Truck, Headphones, ShoppingCart, Zap, Cpu, Wifi, Battery } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured: boolean;
}

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const response = await fetch('/api/products?featured=true&limit=6');
    if (response.ok) {
      const data = await response.json();
      return data.products;
    }
    return [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const products = await getFeaturedProducts();
      setFeaturedProducts(products);
      setLoading(false);
    };
    loadProducts();
  }, []);

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
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingParticles />
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10" />
        
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center">
            <motion.h1 
              className="text-4xl md:text-7xl font-bold mb-6 futuristic-heading"
              variants={itemVariants}
            >
              <span className="block">FUTURE TECH</span>
              <span className="block text-3xl md:text-5xl mt-2">
                <span className="text-cyan-400">FOR EVERYONE</span>
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Experience tomorrow's technology today. Discover cutting-edge electronics with 
              <span className="text-cyan-400 font-semibold"> quantum-powered performance</span> and 
              <span className="text-purple-400 font-semibold"> AI-enhanced features</span>.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="cyber-button text-lg px-8 py-4" asChild>
                  <Link href="/shop">
                    <Zap className="mr-2 h-5 w-5" />
                    EXPLORE TECH <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 text-lg px-8 py-4" asChild>
                  <Link href="/about">LEARN MORE</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Tech Elements */}
        <motion.div
          className="absolute top-20 left-10 text-cyan-400/30"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Cpu className="h-16 w-16" />
        </motion.div>
        
        <motion.div
          className="absolute top-32 right-20 text-purple-400/30"
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        >
          <Wifi className="h-12 w-12" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-20 left-20 text-cyan-400/30"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 2 }}
        >
          <Battery className="h-14 w-14" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
        
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 futuristic-heading"
            variants={itemVariants}
          >
            WHY CHOOSE ELECTROSTORE?
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Quantum Security",
                description: "Military-grade encryption and quantum-resistant security protocols protect your data.",
                color: "from-cyan-400 to-blue-600"
              },
              {
                icon: Truck,
                title: "Hyper Delivery",
                description: "AI-optimized logistics ensure lightning-fast delivery within 24-48 hours.",
                color: "from-green-400 to-emerald-600"
              },
              {
                icon: Headphones,
                title: "Neural Support",
                description: "AI-powered customer support available 24/7 with instant problem resolution.",
                color: "from-purple-400 to-pink-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="text-center group"
              >
                <div className={`bg-gradient-to-br ${feature.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 neon-glow group-hover:scale-110 transition-all duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-cyan-400 font-mono">{feature.title}</h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="py-16 relative">
        <div className="absolute inset-0 data-stream" />
        
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold mb-4 futuristic-heading"
              variants={itemVariants}
            >
              FEATURED TECHNOLOGY
            </motion.h2>
            <motion.p 
              className="text-muted-foreground max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Discover our handpicked selection of the most advanced electronics with cutting-edge features.
            </motion.p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={index}
                  className="glass-morphism rounded-lg p-6 animate-pulse"
                  variants={itemVariants}
                >
                  <div className="aspect-square bg-muted rounded-lg mb-4" />
                  <div className="h-4 bg-muted rounded mb-2" />
                  <div className="h-6 bg-muted rounded mb-2" />
                  <div className="h-4 bg-muted rounded mb-3" />
                  <div className="h-10 bg-muted rounded" />
                </motion.div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
            >
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                  className="group"
                >
                  <Card className="glass-morphism border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative aspect-square bg-gradient-to-br from-cyan-500/10 to-purple-500/10 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white border-0">
                            {product.category}
                          </Badge>
                        </div>
                        <motion.div
                          className="absolute inset-0 hologram-effect opacity-0 group-hover:opacity-100"
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-2 text-cyan-400 font-mono group-hover:text-cyan-300 transition-colors duration-300">
                          {product.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {product.description}
                        </p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                            ${product.price.toFixed(2)}
                          </span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                            <span className="text-sm text-muted-foreground ml-1">4.9</span>
                          </div>
                        </div>
                        
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button className="w-full cyber-button" asChild>
                            <Link href={`/product/${product.id}`}>
                              <Zap className="mr-2 h-4 w-4" />
                              VIEW DETAILS
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-12"
              variants={itemVariants}
            >
              <p className="text-muted-foreground">No featured products available.</p>
              <Button className="mt-4 cyber-button" asChild>
                <Link href="/shop">BROWSE ALL PRODUCTS</Link>
              </Button>
            </motion.div>
          )}

          <motion.div 
            className="text-center mt-12"
            variants={itemVariants}
          >
            <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10" asChild>
              <Link href="/shop">
                VIEW ALL PRODUCTS <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10" />
        
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="text-center">
            <motion.h2 
              className="text-3xl font-bold mb-4 futuristic-heading"
              variants={itemVariants}
            >
              STAY CONNECTED TO THE FUTURE
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Subscribe to our neural network and be the first to access next-gen technology, 
              exclusive deals, and quantum-encrypted tech news.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row max-w-md mx-auto gap-3"
              variants={itemVariants}
            >
              <input
                type="email"
                placeholder="Enter your neural ID (email)"
                className="flex-1 px-4 py-3 rounded-lg bg-background/50 border border-cyan-500/30 text-foreground focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 backdrop-blur-sm"
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="cyber-button px-8 py-3">
                  CONNECT
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 relative">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold mb-4 futuristic-heading"
              variants={itemVariants}
            >
              NEURAL FEEDBACK
            </motion.h2>
            <motion.p 
              className="text-muted-foreground max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Real experiences from our quantum-enhanced customer base across the digital multiverse.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Quantum Developer",
                content: "The neural interface on my new laptop is incredible! Processing speeds are beyond anything I've experienced.",
                avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
              },
              {
                name: "Marcus Rodriguez",
                role: "AI Researcher",
                content: "ElectroStore's quantum-encrypted delivery system is revolutionary. My gear arrived before I even finished ordering!",
                avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
              },
              {
                name: "Dr. Emily Watson",
                role: "Cybernetics Engineer",
                content: "The holographic display quality exceeds all expectations. This is truly next-generation technology.",
                avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, rotateY: 5 }}
              >
                <Card className="text-center glass-morphism border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center justify-center">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-3 neon-border"
                      />
                      <div>
                        <p className="font-semibold text-cyan-400">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20" />
        
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl font-bold mb-4 futuristic-heading"
            variants={itemVariants}
          >
            READY TO UPGRADE YOUR REALITY?
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Join thousands of tech pioneers who trust ElectroStore for their quantum-enhanced lifestyle.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="cyber-button text-lg px-8 py-4" asChild>
                <Link href="/shop">
                  <Zap className="mr-2 h-5 w-5" />
                  START SHOPPING
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 text-lg px-8 py-4" asChild>
                <Link href="/contact">CONTACT US</Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
