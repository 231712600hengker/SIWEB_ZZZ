
/* eslint-disable react/no-unescaped-entities */
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Users, HeartHandshake } from 'lucide-react';

export default function ContactPage() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Store",
      details: ["123 Babarsari", "Sleman, Semua Teman", "Hindia Belanda"],
      gradient: "from-blue-400 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 123-4568", "Toll-free: 1-800-ELECTRO"],
      gradient: "from-green-400 to-green-600",
      bgGradient: "from-green-50 to-green-100"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["support@electrostore.com", "sales@electrostore.com", "info@electrostore.com"],
      gradient: "from-purple-400 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 9:00 AM - 8:00 PM", "Saturday: 10:00 AM - 6:00 PM", "Sunday: 12:00 PM - 5:00 PM"],
      gradient: "from-orange-400 to-orange-600",
      bgGradient: "from-orange-50 to-orange-100"
    }
  ];

  const features = [
    {
      icon: MessageCircle,
      title: "Quick Response",
      description: "We respond to all inquiries within 24 hours",
      color: "text-blue-600",
      bg: "bg-blue-100"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Our team consists of electronics specialists",
      color: "text-green-600",
      bg: "bg-green-100"
    },
    {
      icon: HeartHandshake,
      title: "Customer First",
      description: "Your satisfaction is our top priority",
      color: "text-purple-600",
      bg: "bg-purple-100"
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
                Get In Touch
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto animate-fade-in-up delay-200">
              We're here to help you with any questions or concerns. Reach out to our expert team anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 text-lg px-4 py-2">Why Contact Us</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Experience Premium Support
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className={`${feature.bg} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:rotate-12 transition-all duration-300`}>
                    <Icon className={`h-8 w-8 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 group-hover:${feature.color} transition-colors duration-300`}>{feature.title}</h3>
                  <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Multiple Ways to Connect</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Preferred Method
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer various ways to get in touch. Pick the one that works best for you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`bg-gradient-to-br ${info.bgGradient} p-6 group-hover:scale-105 transition-transform duration-300`}>
                      <div className={`bg-gradient-to-r ${info.gradient} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-3 text-center text-gray-900">{info.title}</h3>
                      <div className="space-y-1 text-center">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-700 text-sm font-medium">{detail}</p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <p className="text-blue-100">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-700 font-semibold">First Name</Label>
                      <Input id="firstName" placeholder="John" className="mt-2 border-2 focus:border-blue-500 transition-colors" />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-gray-700 font-semibold">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" className="mt-2 border-2 focus:border-blue-500 transition-colors" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-gray-700 font-semibold">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" className="mt-2 border-2 focus:border-blue-500 transition-colors" />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-gray-700 font-semibold">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="mt-2 border-2 focus:border-blue-500 transition-colors" />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="text-gray-700 font-semibold">Subject</Label>
                    <Input id="subject" placeholder="How can we help you?" className="mt-2 border-2 focus:border-blue-500 transition-colors" />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-gray-700 font-semibold">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us more about your inquiry..."
                      rows={5}
                      className="mt-2 border-2 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-lg py-3">
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Map and Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <Card className="shadow-2xl border-0 overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-blue-200 h-64 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
                    <div className="text-center relative z-10">
                      <MapPin className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-bounce" />
                      <p className="text-blue-900 font-bold text-lg">Visit Our Store</p>
                      <p className="text-blue-700 font-medium">123 Babarsari, Digital City</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Section */}
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50">
                <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors duration-300">
                    <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">What are your return policies?</h4>
                    <p className="text-gray-600 group-hover:text-gray-800 transition-colors">We offer a 30-day return policy for all products in original condition with full refund guarantee.</p>
                  </div>
                  <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors duration-300">
                    <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">Do you offer warranty?</h4>
                    <p className="text-gray-600 group-hover:text-gray-800 transition-colors">Yes, all products come with manufacturer warranty plus our additional 1-year guarantee for peace of mind.</p>
                  </div>
                  <div className="group hover:bg-gray-50 p-4 rounded-lg transition-colors duration-300">
                    <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">How fast is shipping?</h4>
                    <p className="text-gray-600 group-hover:text-gray-800 transition-colors">Standard shipping takes 2-3 business days, express overnight shipping is available for urgent orders.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Connect?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Don't hesitate to reach out. Our friendly team is standing by to assist you with any questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300">
              <Phone className="mr-2 h-5 w-5" />
              Call Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all duration-300">
              <Mail className="mr-2 h-5 w-5" />
              Email Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
