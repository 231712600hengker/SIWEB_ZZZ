"use client"
/* eslint-disable react/no-unescaped-entities */
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Award, Clock, Heart, Target, Zap, Globe, TrendingUp } from 'lucide-react';
import CountUp from 'react-countup';
import Link from 'next/link';

export default function AboutPage() {
const teamMembers = [
  {
    name: "Sion Felix S",
    role: "CEO & Founder",
    description: "Visionary leader with 15+ years in electronics retail",
    image: "/images/Sion About.jpg", // from public
    gradient: "from-purple-400 to-purple-600" 
  },
  {
    name: "Moch Alif BS",
    role: "CTO",
    description: "Technology expert ensuring cutting-edge solutions",
    image: "/images/Alip About.jpg", // from public
    gradient: "from-purple-400 to-purple-600"
  },
  {
    name: "Fanidyasani Atantya W P",
    role: "Head of Operations",
    description: "Operations specialist focused on customer satisfaction",
    image: "/images/Cinta About.jpg", // from public
    gradient: "from-purple-400 to-purple-600"
  }
];



  const values = [
    {
      icon: Award,
      title: "Quality First",
      description: "We only sell products that meet our high-quality standards",
      color: "text-yellow-600",
      bg: "from-yellow-50 to-yellow-100"
    },
    {
      icon: Users,
      title: "Customer Focus",
      description: "Your satisfaction is our top priority in everything we do",
      color: "text-blue-600",
      bg: "from-blue-50 to-blue-100"
    },
    {
      icon: Clock,
      title: "Fast Service",
      description: "Quick delivery and responsive customer support",
      color: "text-green-600",
      bg: "from-green-50 to-green-100"
    },
    {
      icon: Heart,
      title: "Passion",
      description: "We're passionate about bringing you the latest technology",
      color: "text-red-600",
      bg: "from-red-50 to-red-100"
    }
  ];

  const milestones = [
    {
      year: "2010",
      title: "Company Founded",
      description: "Started as a small electronics retailer with big dreams",
      icon: Target
    },
    {
      year: "2015",
      title: "Online Expansion",
      description: "Launched our e-commerce platform and went digital",
      icon: Globe
    },
    {
      year: "2020",
      title: "Rapid Growth",
      description: "Reached 10,000+ satisfied customers worldwide",
      icon: TrendingUp
    },
    {
      year: "2024",
      title: "Innovation Leader",
      description: "Leading the industry with cutting-edge solutions",
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce delay-100"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-bounce delay-300"></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 bg-white/10 rounded-full animate-bounce delay-500"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-bounce delay-700"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                About ElectroStore
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto animate-fade-in-up delay-200">
              Your trusted partner in premium electronics since 2010. We're committed to bringing you the latest technology with exceptional service.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <Badge variant="secondary" className="mb-4 text-lg px-4 py-2">Our Story</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Building Trust Through Quality
              </h2>
              <div className="space-y-4 text-gray-600">
                <p className="hover:text-gray-800 transition-colors duration-300">
                  Founded in 2010, ElectroStore began as a small electronics retailer with a simple mission: 
                  to provide high-quality electronics at fair prices with exceptional customer service.
                </p>
                <p className="hover:text-gray-800 transition-colors duration-300">
                  Over the years, we've grown from a local store to a trusted online destination, 
                  serving thousands of customers worldwide. Our commitment to quality and customer 
                  satisfaction has remained unchanged.
                </p>
                <p className="hover:text-gray-800 transition-colors duration-300">
                  Today, we continue to evolve, embracing new technologies and expanding our product 
                  range to meet the ever-changing needs of our customers.
                </p>
              </div>
              <Button className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300" asChild>
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <img
                src="https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Electronics store"
                className="relative rounded-lg shadow-2xl w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>
{/* Stats Section */}
<section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold mb-4">Our Achievements</h2>
      <p className="text-purple-100 text-lg">Numbers that speak to our commitment and success</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
      <div className="group">
        <div className="text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
          <CountUp end={10000} duration={2} separator="," />+
        </div>
        <div className="text-blue-200 text-lg">Happy Customers</div>
      </div>
      <div className="group">
        <div className="text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
          <CountUp end={500} duration={2} separator="," />+
        </div>
        <div className="text-purple-200 text-lg">Premium Products</div>
      </div>
      <div className="group">
        <div className="text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
          <CountUp end={14} duration={2} />
        </div>
        <div className="text-pink-200 text-lg">Years Experience</div>
      </div>
      <div className="group">
        <div className="text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
          <CountUp end={99} duration={2} />%
        </div>
        <div className="text-blue-200 text-lg">Satisfaction Rate</div>
      </div>
    </div>
  </div>
</section>

      {/* Timeline Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 text-lg px-4 py-2">Our Journey</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Milestones That Define Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From humble beginnings to industry leadership, here's how we've evolved over the years.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">{milestone.title}</h3>
                    <p className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors">{milestone.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 text-lg px-4 py-2">Our Values</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Drives Us Forward
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our core values guide everything we do, from product selection to customer service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`bg-gradient-to-br ${value.bg} p-6 group-hover:scale-105 transition-transform duration-300`}>
                      <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                        <Icon className={`h-8 w-8 ${value.color} group-hover:scale-110 transition-transform duration-300`} />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-center group-hover:text-gray-900 transition-colors">{value.title}</h3>
                      <p className="text-gray-600 text-center group-hover:text-gray-800 transition-colors">{value.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 text-lg px-4 py-2">Our Team</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet the Visionaries Behind ElectroStore
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our dedicated team works tirelessly to ensure you have the best shopping experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-1 group-hover:text-blue-600 transition-colors">{member.name}</h3>
                    <Badge variant="outline" className={`mb-3 bg-gradient-to-r ${member.gradient} text-white border-0`}>{member.role}</Badge>
                    <p className="text-gray-600 group-hover:text-gray-800 transition-colors">{member.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Experience the Difference?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust ElectroStore for their electronics needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300" asChild>
              <Link href="/shop">Start Shopping</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transform hover:scale-105 transition-all duration-300" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
