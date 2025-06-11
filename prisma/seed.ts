import { PrismaClient, Role, TransactionStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Clear existing data
  await prisma.transaction.deleteMany()
  await prisma.product.deleteMany()
  await prisma.user.deleteMany()

  console.log('🗑️  Cleared existing data')

  // Create users
  const hashedAdminPassword = await bcrypt.hash('admin123', 12)
  const hashedBuyerPassword = await bcrypt.hash('buyer123', 12)

  const admin = await prisma.user.create({
    data: {
      email: 'admin@electrostore.com',
      name: 'Admin User',
      password: hashedAdminPassword,
      role: Role.ADMIN,
    },
  })

  const buyer = await prisma.user.create({
    data: {
      email: 'buyer@electrostore.com',
      name: 'John Buyer',
      password: hashedBuyerPassword,
      role: Role.BUYER,
    },
  })

  // Create additional buyers
  const buyers = []
  for (let i = 1; i <= 10; i++) {
    const user = await prisma.user.create({
      data: {
        email: `buyer${i}@example.com`,
        name: `Buyer ${i}`,
        password: hashedBuyerPassword,
        role: Role.BUYER,
      },
    })
    buyers.push(user)
  }

  console.log('👥 Created users')

  // Product data
  const products = [
    // Smartphones
    {
      name: 'iPhone 15 Pro Max',
      description: 'The most advanced iPhone with titanium design, A17 Pro chip, and professional camera system.',
      price: 1199.99,
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      category: 'smartphones',
      stock: 25,
      featured: true,
    },
    {
      name: 'Samsung Galaxy S24 Ultra',
      description: 'Premium Android smartphone with S Pen, 200MP camera, and AI-powered features.',
      price: 1299.99,
      image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      category: 'smartphones',
      stock: 30,
      featured: true,
    },
    {
      name: 'Google Pixel 8 Pro',
      description: 'Pure Android experience with advanced AI photography and Magic Eraser.',
      price: 999.99,
      image: 'https://images.pexels.com/photos/1440727/pexels-photo-1440727.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      category: 'smartphones',
      stock: 20,
      featured: false,
    },
    {
      name: 'OnePlus 12',
      description: 'Flagship killer with Snapdragon 8 Gen 3, fast charging, and OxygenOS.',
      price: 799.99,
      image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      category: 'smartphones',
      stock: 15,
      featured: false,
    },
    {
      name: 'Xiaomi 14 Ultra',
      description: 'Photography-focused smartphone with Leica cameras and premium build quality.',
      price: 899.99,
      image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      category: 'smartphones',
      stock: 18,
      featured: false,
    },

    // Laptops
    {
      name: 'MacBook Pro 16" M3 Max',
      description: 'Professional laptop with M3 Max chip, 18-core GPU, and Liquid Retina XDR display.',
      price: 3499.99,
      image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      category: 'laptops',
      stock: 12,
      featured: true,
    },
    {
      name: 'Dell XPS 15',
      description: 'Premium Windows laptop with 4K OLED display, Intel Core i9, and NVIDIA RTX 4070.',
      price: 2299.99,
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      category: 'laptops',
      stock: 8,
      featured: true,
    },
    {
      name: 'ThinkPad X1 Carbon',
      description: 'Business ultrabook with military-grade durability, Intel vPro, and 14" display.',
      price: 1899.99,
      image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      category: 'laptops',
      stock: 10,
      featured: false,
    },
    {
      name: 'ASUS ROG Zephyrus G16',
      description: 'Gaming laptop with RTX 4080, AMD Ryzen 9, and 240Hz display.',
      price: 2799.99,
      image: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      category: 'laptops',
      stock: 6,
      featured: false,
    },
    {
      name: 'Surface Laptop Studio 2',
      description: 'Versatile 2-in-1 laptop with touchscreen, Surface Pen support, and Intel Core i7.',
      price: 1999.99,
      image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      category: 'laptops',
      stock: 7,
      featured: false,
    },

    // Tablets
    {
      name: 'iPad Pro 12.9" M2',
      description: 'Professional tablet with M2 chip, Liquid Retina XDR display, and Apple Pencil support.',
      price: 1099.99,
      image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      category: 'tablets',
      stock: 20,
      featured: true,
    },
    {
      name: 'Samsung Galaxy Tab S9 Ultra',
      description: 'Large Android tablet with S Pen, 14.6" AMOLED display, and DeX mode.',
      price: 1199.99,
      image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      category: 'tablets',
      stock: 15,
      featured: false,
    },
    {
      name: 'Microsoft Surface Pro 9',
      description: '2-in-1 tablet with Intel Core i7, detachable keyboard, and Windows 11.',
      price: 1299.99,
      image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      category: 'tablets',
      stock: 12,
      featured: false,
    },
    {
      name: 'iPad Air 5th Gen',
      description: 'Lightweight tablet with M1 chip, 10.9" Liquid Retina display, and all-day battery.',
      price: 599.99,
      image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      category: 'tablets',
      stock: 25,
      featured: false,
    },
    {
      name: 'Lenovo Tab P12 Pro',
      description: 'Premium Android tablet with OLED display, Snapdragon 870, and productivity features.',
      price: 699.99,
      image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      category: 'tablets',
      stock: 18,
      featured: false,
    },

    // Audio
    {
      name: 'AirPods Pro 2nd Gen',
      description: 'Premium wireless earbuds with active noise cancellation and spatial audio.',
      price: 249.99,
      image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      category: 'audio',
      stock: 50,
      featured: true,
    },
    {
      name: 'Sony WH-1000XM5',
      description: 'Industry-leading noise canceling headphones with 30-hour battery life.',
      price: 399.99,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      category: 'audio',
      stock: 30,
      featured: true,
    },
    {
      name: 'Bose QuietComfort 45',
      description: 'Comfortable over-ear headphones with world-class noise cancellation.',
      price: 329.99,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      category: 'audio',
      stock: 25,
      featured: false,
    },
    {
      name: 'Sennheiser Momentum 4',
      description: 'Audiophile wireless headphones with adaptive noise cancellation.',
      price: 379.99,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      category: 'audio',
      stock: 20,
      featured: false,
    },
    {
      name: 'JBL Charge 5',
      description: 'Portable Bluetooth speaker with powerful sound and 20-hour playtime.',
      price: 179.99,
      image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      category: 'audio',
      stock: 40,
      featured: false,
    },

    // Gaming
    {
      name: 'PlayStation 5',
      description: 'Next-gen gaming console with 4K gaming, ray tracing, and ultra-fast SSD.',
      price: 499.99,
      image: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      category: 'gaming',
      stock: 15,
      featured: true,
    },
    {
      name: 'Xbox Series X',
      description: 'Powerful gaming console with 4K/120fps gaming and Game Pass compatibility.',
      price: 499.99,
      image: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      category: 'gaming',
      stock: 12,
      featured: true,
    },
    {
      name: 'Nintendo Switch OLED',
      description: 'Hybrid gaming console with vibrant OLED screen and portable gaming.',
      price: 349.99,
      image: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      category: 'gaming',
      stock: 25,
      featured: false,
    },
    {
      name: 'Steam Deck',
      description: 'Handheld PC gaming device with access to your entire Steam library.',
      price: 649.99,
      image: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      category: 'gaming',
      stock: 8,
      featured: false,
    },
    {
      name: 'Razer DeathAdder V3 Pro',
      description: 'Professional gaming mouse with Focus Pro 30K sensor and 90-hour battery.',
      price: 149.99,
      image: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      category: 'gaming',
      stock: 35,
      featured: false,
    },

    // Accessories
    {
      name: 'Apple Watch Series 9',
      description: 'Advanced smartwatch with health monitoring, GPS, and cellular connectivity.',
      price: 399.99,
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      category: 'accessories',
      stock: 30,
      featured: true,
    },
    {
      name: 'Samsung Galaxy Watch 6',
      description: 'Feature-rich smartwatch with health tracking and Google Wear OS.',
      price: 329.99,
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      category: 'accessories',
      stock: 25,
      featured: false,
    },
    {
      name: 'Anker PowerCore 10000',
      description: 'Compact portable charger with 10000mAh capacity and fast charging.',
      price: 29.99,
      image: 'https://images.pexels.com/photos/4526943/pexels-photo-4526943.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      category: 'accessories',
      stock: 100,
      featured: false,
    },
    {
      name: 'Belkin MagSafe Charger',
      description: 'Wireless charging pad for iPhone with MagSafe technology.',
      price: 39.99,
      image: 'https://images.pexels.com/photos/4526943/pexels-photo-4526943.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      category: 'accessories',
      stock: 60,
      featured: false,
    },
    {
      name: 'Logitech MX Master 3S',
      description: 'Advanced wireless mouse for productivity with precision scrolling.',
      price: 99.99,
      image: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      category: 'accessories',
      stock: 45,
      featured: false,
    },
    {
      name: 'Apple Magic Keyboard',
      description: 'Wireless keyboard with scissor mechanism and rechargeable battery.',
      price: 99.99,
      image: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
      category: 'accessories',
      stock: 40,
      featured: false,
    },
  ]

  // Create products
  const createdProducts = []
  for (const productData of products) {
    const product = await prisma.product.create({
      data: productData,
    })
    createdProducts.push(product)
  }

  console.log('📦 Created 30 products')

  // Create transactions
  const allUsers = [buyer, ...buyers]
  const transactionStatuses = [
    TransactionStatus.COMPLETED,
    TransactionStatus.COMPLETED,
    TransactionStatus.COMPLETED,
    TransactionStatus.COMPLETED,
    TransactionStatus.PENDING,
    TransactionStatus.CANCELLED,
  ]

  for (let i = 0; i < 50; i++) {
    const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)]
    const randomProduct = createdProducts[Math.floor(Math.random() * createdProducts.length)]
    const randomQuantity = Math.floor(Math.random() * 3) + 1 // 1-3 items
    const randomStatus = transactionStatuses[Math.floor(Math.random() * transactionStatuses.length)]
    const total = randomProduct.price * randomQuantity

    // Create transaction date within last 6 months
    const randomDate = new Date()
    randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 180))

    await prisma.transaction.create({
      data: {
        userId: randomUser.id,
        productId: randomProduct.id,
        quantity: randomQuantity,
        total: total,
        status: randomStatus,
        createdAt: randomDate,
        updatedAt: randomDate,
      },
    })
  }

  console.log('💳 Created 50 transactions')

  console.log('✅ Seed completed successfully!')
  console.log('\n📊 Summary:')
  console.log(`- Users: ${allUsers.length + 1} (1 admin + ${allUsers.length} buyers)`)
  console.log(`- Products: ${createdProducts.length}`)
  console.log('- Transactions: 50')
  console.log('\n🔑 Demo accounts:')
  console.log('- Admin: admin@electrostore.com / admin123')
  console.log('- Buyer: buyer@electrostore.com / buyer123')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })