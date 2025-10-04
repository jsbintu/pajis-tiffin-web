"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  CheckCircle2, 
  Star, 
  Clock, 
  Truck, 
  Shield, 
  Users,
  ChefHat,
  Leaf,
  Heart,
  TrendingUp
} from "lucide-react"

const menuItems = [
  { name: "Butter Chicken", description: "Creamy tomato curry with tender chicken", price: "₹280", category: "Main Course", image: "🍛" },
  { name: "Dal Makhani", description: "Rich black lentils with butter & cream", price: "₹180", category: "Main Course", image: "🍲" },
  { name: "Paneer Tikka", description: "Grilled cottage cheese with spices", price: "₹220", category: "Appetizer", image: "🧆" },
  { name: "Biryani", description: "Fragrant rice with vegetables or chicken", price: "₹250", category: "Main Course", image: "🍚" },
  { name: "Naan & Roti", description: "Fresh baked Indian breads", price: "₹40", category: "Bread", image: "🥖" },
  { name: "Gulab Jamun", description: "Sweet milk dumplings in syrup", price: "₹120", category: "Dessert", image: "🍡" },
]

const testimonials = [
  { name: "Priya Sharma", rating: 5, text: "Best home-style food! Tastes just like my mom's cooking. I've been a subscriber for 6 months now.", location: "Bangalore" },
  { name: "Rajesh Kumar", rating: 5, text: "The convenience of having fresh, authentic meals delivered daily is amazing. Highly recommend!", location: "Mumbai" },
  { name: "Sneha Reddy", rating: 5, text: "Quality is consistently excellent. The variety keeps me excited for every meal!", location: "Hyderabad" },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            <ChefHat className="h-6 w-6" />
            Pajis Kitchen
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/menu" className="hidden sm:inline text-sm font-medium hover:text-primary transition-colors">
              Menu
            </Link>
            <Link href="/order" className="hidden sm:inline text-sm font-medium hover:text-primary transition-colors">
              Order Now
            </Link>
            <Link href="/manage-subscription" className="hidden md:inline text-sm font-medium hover:text-primary transition-colors">
              Manage
            </Link>
            <a href="#testimonials" className="hidden sm:inline text-sm font-medium hover:text-primary transition-colors">
              Reviews
            </a>
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild size="sm" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
              <Link href="/subscribe-new">Subscribe Now</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-orange-50 dark:from-green-950 dark:via-background dark:to-orange-950">
        <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <Badge className="w-fit bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100">
                  <Star className="mr-1 h-3 w-3 fill-current" />
                  Over 10,000+ Happy Customers
                </Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Authentic Home-Style
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-orange-600">
                    Indian Meals
                  </span>
                  <br />
                  Delivered Fresh Daily
                </h1>
                <p className="max-w-[600px] text-lg text-muted-foreground">
                  Skip the cooking. Enjoy restaurant-quality, home-cooked Indian meals prepared by expert chefs.
                  Fresh ingredients, authentic recipes, delivered to your door.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="flex-1 sm:flex-initial w-full sm:w-auto text-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                  <Link href="/subscribe-new">Get Started - ₹2,999/month</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="flex-1 sm:flex-initial w-full sm:w-auto text-lg">
                  <Link href="/menu">View Full Menu</Link>
                </Button>
              </div>

              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">No Cooking Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">Cancel Anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">Fresh Daily</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2">🍛</div>
                  <div className="text-2xl font-bold text-primary">200+</div>
                  <div className="text-sm text-muted-foreground">Dishes Available</div>
                </CardContent>
              </Card>
              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2">⭐</div>
                  <div className="text-2xl font-bold text-primary">4.9/5</div>
                  <div className="text-sm text-muted-foreground">Customer Rating</div>
                </CardContent>
              </Card>
              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2">🚚</div>
                  <div className="text-2xl font-bold text-primary">99%</div>
                  <div className="text-sm text-muted-foreground">On-Time Delivery</div>
                </CardContent>
              </Card>
              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2">👨‍🍳</div>
                  <div className="text-2xl font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground">Expert Chefs</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Service Options Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-green-50 dark:from-slate-900 dark:via-background dark:to-green-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-green-100 to-orange-100 text-green-800 border-green-200">
              Choose Your Style
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              How Would You Like to Order?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We offer two convenient ways to enjoy our delicious meals. Pick the one that fits your lifestyle!
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
            {/* Subscription Option */}
            <Card className="group relative overflow-hidden border-2 hover:border-green-500 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative z-10 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 group-hover:animate-pulse">
                    Most Popular
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold text-green-800 dark:text-green-200 group-hover:text-green-900 dark:group-hover:text-green-100 transition-colors">
                  Daily Subscription
                </CardTitle>
                <CardDescription className="text-base">
                  Fresh meals delivered to your door every day. Set it and forget it!
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-sm font-medium">Daily fresh meals (Mon-Sun)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 group-hover:scale-110 transition-transform duration-200 delay-75" />
                    <span className="text-sm font-medium">20% discount on extras</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 group-hover:scale-110 transition-transform duration-200 delay-150" />
                    <span className="text-sm font-medium">No cooking or planning needed</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 group-hover:scale-110 transition-transform duration-200 delay-200" />
                    <span className="text-sm font-medium">Cancel anytime, no commitment</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-green-200/50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">Starting from</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600 group-hover:scale-105 transition-transform duration-200">
                        ₹2,999
                      </div>
                      <div className="text-xs text-muted-foreground">per month</div>
                    </div>
                  </div>
                  
                  <Button asChild className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 group-hover:shadow-lg transition-all duration-300">
                    <Link href="/subscribe-new" className="flex items-center justify-center gap-2">
                      <span>Start Subscription</span>
                      <TrendingUp className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Same-Day Order Option */}
            <Card className="group relative overflow-hidden border-2 hover:border-orange-500 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative z-10 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 group-hover:animate-pulse">
                    Quick & Easy
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold text-orange-800 dark:text-orange-200 group-hover:text-orange-900 dark:group-hover:text-orange-100 transition-colors">
                  Same-Day Order
                </CardTitle>
                <CardDescription className="text-base">
                  Order now for pickup or delivery today. Perfect for special occasions!
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-orange-600 group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-sm font-medium">Order when you want</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-orange-600 group-hover:scale-110 transition-transform duration-200 delay-75" />
                    <span className="text-sm font-medium">Pickup or delivery options</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-orange-600 group-hover:scale-110 transition-transform duration-200 delay-150" />
                    <span className="text-sm font-medium">Full menu available</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-orange-600 group-hover:scale-110 transition-transform duration-200 delay-200" />
                    <span className="text-sm font-medium">Same-day freshness</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-orange-200/50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">Individual meals</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-600 group-hover:scale-105 transition-transform duration-200">
                        ₹180+
                      </div>
                      <div className="text-xs text-muted-foreground">per dish</div>
                    </div>
                  </div>
                  
                  <Button asChild variant="outline" className="w-full border-orange-600 text-orange-600 hover:bg-orange-50 hover:border-orange-700 group-hover:shadow-lg transition-all duration-300">
                    <Link href="/order" className="flex items-center justify-center gap-2">
                      <span>Order Now</span>
                      <Truck className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Comparison Helper */}
          <div className="mt-12 text-center">
            <Card className="max-w-3xl mx-auto bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900 dark:to-gray-900 border-dashed border-2 border-gray-300 dark:border-gray-600">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-green-600" />
                    <span><strong>Subscription:</strong> Best for busy professionals & families</span>
                  </div>
                  <div className="hidden sm:block w-px h-6 bg-gray-300" />
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <span><strong>Same-Day:</strong> Perfect for events & special meals</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-y bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="flex items-center justify-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">100% Safe & Hygienic</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Truck className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Free Delivery</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Leaf className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Fresh Ingredients</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Heart className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Made with Love</span>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Our Menu</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Today's Featured Dishes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Authentic recipes passed down through generations. All dishes made fresh daily with premium ingredients.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {menuItems.map((item, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-5xl">{item.image}</div>
                    <Badge variant="secondary">{item.category}</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{item.price}</span>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">And 200+ more delicious dishes in our rotating menu!</p>
            <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-green-700">
              <Link href="/menu">View Full Menu & Subscribe</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-gradient-to-br from-green-50 to-orange-50 dark:from-green-950 dark:to-orange-950 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Customer Reviews</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Pajis Kitchen for their daily meals
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4 text-yellow-500">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm mb-4 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">Trusted by over 10,000+ customers across India</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Simple Process</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              How It Works
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Choose Your Plan</h3>
              <p className="text-muted-foreground">
                Select from our flexible weekly or monthly subscription plans
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Customize Your Menu</h3>
              <p className="text-muted-foreground">
                Pick your favorite dishes from our extensive rotating menu
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Enjoy Fresh Meals</h3>
              <p className="text-muted-foreground">
                Receive hot, fresh meals delivered right to your doorstep
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="bg-gradient-to-br from-green-50 to-orange-50 dark:from-green-950 dark:to-orange-950 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-red-100 text-red-800 hover:bg-red-100">Limited Time Offer</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Choose Your Perfect Plan
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Save up to 20% with our monthly plans. No commitment, cancel anytime.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
            <Card className="border-2 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-2xl">Basic Plan</CardTitle>
                  <Badge variant="secondary">Popular</Badge>
                </div>
                <CardDescription className="text-base">Perfect for individuals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-primary">₹2,499</span>
                    <span className="text-lg text-muted-foreground line-through">₹2,999</span>
                  </div>
                  <p className="text-sm text-muted-foreground">per month</p>
                  <Badge className="mt-2 bg-green-100 text-green-800">Save ₹500/month</Badge>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>1 meal per day (Lunch or Dinner)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>6 days a week delivery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Free delivery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Cancel anytime</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Email support</span>
                  </li>
                </ul>
                <Button asChild size="lg" variant="outline" className="w-full text-lg">
                  <Link href="/subscribe-new">Start Basic Plan</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-4 border-primary shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-bold">
                BEST VALUE - 20% OFF
              </div>
              <CardHeader className="pt-8">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-2xl">Premium Plan</CardTitle>
                  <Badge className="bg-yellow-500 text-yellow-950">⭐ Most Popular</Badge>
                </div>
                <CardDescription className="text-base">Best for families</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-primary">₹4,999</span>
                    <span className="text-xl text-muted-foreground line-through">₹6,249</span>
                  </div>
                  <p className="text-sm text-muted-foreground">per month</p>
                  <Badge className="mt-2 bg-green-100 text-green-800">Save ₹1,250/month</Badge>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="font-semibold">2 meals per day (Lunch & Dinner)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>7 days a week delivery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Free delivery & packaging</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Custom menu preferences</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Priority support 24/7</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Special festival menus</span>
                  </li>
                </ul>
                <Button asChild size="lg" className="w-full text-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                  <Link href="/subscribe-new">Start Premium Plan →</Link>
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  🔥 Only <span className="font-bold text-red-600">3 slots left</span> this week!
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              ✨ Special offer: Get your first week FREE on any plan! Use code: <span className="font-bold text-primary">WELCOME25</span>
            </p>
            <p className="text-xs text-muted-foreground">
              All plans include free trial period. Cancel anytime with no questions asked.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Pajis Kitchen. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
