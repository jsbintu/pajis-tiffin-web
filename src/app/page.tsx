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
  TrendingUp,
  Utensils
} from "lucide-react"

// Featured dishes that come with subscription plans
const featuredSubscriptionItems = [
  { name: "Dal Tadka", description: "Yellow lentils tempered with aromatic spices", price: "Included", category: "Main Course", image: "🍲" },
  { name: "Aloo Gobi", description: "Spiced cauliflower and potato curry", price: "Included", category: "Main Course", image: "🥕" },
  { name: "Rajma Rice", description: "Kidney beans curry with steamed rice", price: "Included", category: "Main Course", image: "🍚" },
  { name: "Chole", description: "Spiced chickpeas in thick gravy", price: "Included", category: "Main Course", image: "🍲" },
  { name: "Mixed Vegetables", description: "Seasonal vegetables in curry base", price: "Included", category: "Main Course", image: "🥕" },
  { name: "Rotis & Rice", description: "Fresh chapatis and basmati rice", price: "Included", category: "Staples", image: "🍚" },
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
            <Link href="/menu" className="hidden sm:inline text-sm font-medium hover:text-primary transition-colors hover:scale-105 duration-200">
              Menu
            </Link>
            <Link href="/order" className="hidden sm:inline text-sm font-medium hover:text-primary transition-all duration-200 hover:scale-105">
              Takeout
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
            <div className="flex flex-col justify-center space-y-8 animate-in fade-in-0 slide-in-from-left-4 duration-1000">
              <div className="space-y-4">
                <Badge className="w-fit bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100 hover:scale-105 transition-transform duration-200 animate-in fade-in-0 slide-in-from-top-2 duration-700 delay-300">
                  <Star className="mr-1 h-3 w-3 fill-current animate-pulse" />
                  Over 10,000+ Happy Customers
                </Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-200">
                  Authentic Home-Style
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-orange-600 animate-gradient-x">
                    Indian Meals
                  </span>
                  <br />
                  Delivered Fresh Daily
                </h1>
                <p className="max-w-[600px] text-lg text-muted-foreground animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-500">
                  Skip the cooking. Enjoy restaurant-quality, home-cooked Indian meals prepared by expert chefs.
                  Fresh ingredients, authentic recipes, delivered to your door or ready for pickup.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-700">
                <Button asChild size="lg" className="flex-1 sm:flex-initial w-full sm:w-auto text-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 hover:scale-105 transition-all duration-300 hover:shadow-lg group">
                  <Link href="/subscribe-new" className="flex items-center justify-center gap-2">
                    <span>Get Started - ₹2,499/month</span>
                    <TrendingUp className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="flex-1 sm:flex-initial w-full sm:w-auto text-lg hover:scale-105 transition-all duration-300 hover:shadow-md group">
                  <Link href="/menu" className="flex items-center justify-center gap-2">
                    <span>View Full Menu</span>
                    <Utensils className="h-4 w-4 group-hover:rotate-12 transition-transform duration-200" />
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap gap-6 pt-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-1000">
                <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-200 group">
                  <CheckCircle2 className="h-5 w-5 text-green-600 group-hover:animate-pulse" />
                  <span className="text-sm font-medium">No Cooking Required</span>
                </div>
                <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-200 group">
                  <CheckCircle2 className="h-5 w-5 text-green-600 group-hover:animate-pulse" />
                  <span className="text-sm font-medium">Cancel Anytime</span>
                </div>
                <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-200 group">
                  <CheckCircle2 className="h-5 w-5 text-green-600 group-hover:animate-pulse" />
                  <span className="text-sm font-medium">Fresh Daily</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 animate-in fade-in-0 slide-in-from-right-4 duration-1000 delay-300">
              <Card className="border-2 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 hover:border-green-400 group cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2 group-hover:scale-125 transition-transform duration-300">🍛</div>
                  <div className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform duration-200">200+</div>
                  <div className="text-sm text-muted-foreground">Dishes Available</div>
                </CardContent>
              </Card>
              <Card className="border-2 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 hover:border-yellow-400 group cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2 group-hover:animate-bounce">⭐</div>
                  <div className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform duration-200">4.9/5</div>
                  <div className="text-sm text-muted-foreground">Customer Rating</div>
                </CardContent>
              </Card>
              <Card className="border-2 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 hover:border-blue-400 group cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2 group-hover:animate-pulse">🚚</div>
                  <div className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform duration-200">99%</div>
                  <div className="text-sm text-muted-foreground">On-Time Delivery</div>
                </CardContent>
              </Card>
              <Card className="border-2 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 hover:border-orange-400 group cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2 group-hover:scale-125 transition-transform duration-300">👨‍🍳</div>
                  <div className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform duration-200">15+</div>
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
                        ₹2,499
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
                  Takeout Orders
                </CardTitle>
                <CardDescription className="text-base">
                  Fresh meals ready for pickup or delivery today. Perfect for special occasions!
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
                      <span>Order Takeout</span>
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
                    <span><strong>Takeout:</strong> Perfect for events & special meals</span>
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
            <div className="flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-200 group cursor-pointer">
              <Shield className="h-5 w-5 text-green-600 group-hover:animate-pulse" />
              <span className="text-sm font-medium">100% Safe & Hygienic</span>
            </div>
            <div className="flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-200 group cursor-pointer">
              <Truck className="h-5 w-5 text-green-600 group-hover:translate-x-1 transition-transform duration-200" />
              <span className="text-sm font-medium">Free Delivery</span>
            </div>
            <div className="flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-200 group cursor-pointer">
              <Leaf className="h-5 w-5 text-green-600 group-hover:rotate-12 transition-transform duration-200" />
              <span className="text-sm font-medium">Fresh Ingredients</span>
            </div>
            <div className="flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-200 group cursor-pointer">
              <Heart className="h-5 w-5 text-green-600 group-hover:animate-bounce" />
              <span className="text-sm font-medium">Made with Love</span>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 hover:scale-105 transition-transform duration-200 cursor-pointer">Our Menu</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 hover:text-primary transition-colors duration-300 cursor-pointer">
              What's Included in Your Subscription
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto hover:text-foreground/80 transition-colors duration-300">
              These home-style dishes are included in our subscription plans. Fresh, nutritious, and delivered daily to your door.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredSubscriptionItems.map((item, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/50 cursor-pointer overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-orange-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-5xl group-hover:scale-125 transition-transform duration-300">{item.image}</div>
                    <Badge variant="secondary" className="group-hover:scale-105 transition-transform duration-200">{item.category}</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-200">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 group-hover:text-foreground/70 transition-colors duration-200">{item.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-green-600 group-hover:scale-110 transition-transform duration-200">{item.price}</span>
                    <div className="flex items-center gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current group-hover:animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                      ))}
                    </div>
                  </div>
                  <Button size="sm" className="w-full group-hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                    Included in Subscription
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4 hover:text-foreground/80 transition-colors duration-300">And 200+ more delicious dishes in our rotating menu!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:scale-105 transition-all duration-300 hover:shadow-lg group">
                <Link href="/subscribe-new" className="flex items-center gap-2">
                  <span>Start Subscription</span>
                  <Users className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50 hover:scale-105 transition-all duration-300 hover:shadow-lg group">
                <Link href="/order" className="flex items-center gap-2">
                  <span>Order Takeout</span>
                  <Clock className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-gradient-to-br from-green-50 to-orange-50 dark:from-green-950 dark:to-orange-950 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 hover:scale-105 transition-transform duration-200 cursor-pointer">Customer Reviews</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 hover:text-primary transition-colors duration-300 cursor-pointer">
              What Our Customers Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto hover:text-foreground/80 transition-colors duration-300">
              Join thousands of satisfied customers who trust Pajis Kitchen for their daily meals
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 hover:border-primary/50 group cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4 text-yellow-500">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current group-hover:animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                    ))}
                  </div>
                  <p className="text-sm mb-4 italic group-hover:text-foreground/90 transition-colors duration-200">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform duration-300">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold group-hover:text-primary transition-colors duration-200">{testimonial.name}</p>
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
          <div className="text-center mb-16">
            <Badge className="mb-4 hover:scale-105 transition-transform duration-200 cursor-pointer">Two Simple Ways</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 hover:text-primary transition-colors duration-300 cursor-pointer">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose between our convenient subscription service or individual takeout orders
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Subscription Flow */}
            <Card className="border-2 border-green-200 bg-green-50/50 dark:bg-green-950/20 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                  <Users className="h-6 w-6" />
                  Daily Subscription Process
                </CardTitle>
                <CardDescription>
                  Set up once, enjoy daily fresh meals without the hassle
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white text-lg font-bold flex items-center justify-center flex-shrink-0 animate-pulse">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Choose Your Plan</h4>
                      <p className="text-sm text-muted-foreground">Select weekly or monthly subscription that fits your needs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white text-lg font-bold flex items-center justify-center flex-shrink-0 animate-pulse">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Add Extras (Optional)</h4>
                      <p className="text-sm text-muted-foreground">Customize with sides, beverages, and desserts at 20% off</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white text-lg font-bold flex items-center justify-center flex-shrink-0 animate-pulse">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Relax & Enjoy</h4>
                      <p className="text-sm text-muted-foreground">Fresh meals delivered daily to your doorstep automatically</p>
                    </div>
                  </div>
                </div>
                <Button asChild className="w-full bg-gradient-to-r from-green-600 to-green-700">
                  <Link href="/subscribe-new">Start Subscription →</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Takeout Flow */}
            <Card className="border-2 border-orange-200 bg-orange-50/50 dark:bg-orange-950/20 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
                  <Clock className="h-6 w-6" />
                  Takeout Order Process
                </CardTitle>
                <CardDescription>
                  Order when you want, pickup or delivery in 45 minutes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white text-lg font-bold flex items-center justify-center flex-shrink-0 animate-pulse">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Browse Full Menu</h4>
                      <p className="text-sm text-muted-foreground">Choose from 50+ dishes across all categories</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white text-lg font-bold flex items-center justify-center flex-shrink-0 animate-pulse">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Add to Cart</h4>
                      <p className="text-sm text-muted-foreground">Select quantity, pickup or delivery, and checkout</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white text-lg font-bold flex items-center justify-center flex-shrink-0 animate-pulse">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Get Your Order</h4>
                      <p className="text-sm text-muted-foreground">Ready in 45 minutes for pickup or delivered to you</p>
                    </div>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full border-orange-600 text-orange-600 hover:bg-orange-50">
                  <Link href="/order">Order Takeout →</Link>
                </Button>
              </CardContent>
            </Card>
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
                    <span className="text-lg text-muted-foreground line-through">₹3,124</span>
                  </div>
                  <p className="text-sm text-muted-foreground">per month</p>
                  <Badge className="mt-2 bg-green-100 text-green-800">Save ₹625/month (20% OFF)</Badge>
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
                  <Badge className="mt-2 bg-green-100 text-green-800">Save ₹1,250/month (20% OFF)</Badge>
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
