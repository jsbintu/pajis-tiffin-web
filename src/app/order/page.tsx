"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Clock, MapPin, Phone, Calendar, ChefHat, Check, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

// Mock menu items for one-time orders
const menuItems = [
  { id: "1", name: "Butter Chicken", description: "Creamy tomato curry with tender chicken", price: 280, image: "🍛", category: "Main Course" },
  { id: "2", name: "Dal Makhani", description: "Rich black lentils with butter & cream", price: 180, image: "🍲", category: "Main Course" },
  { id: "3", name: "Chicken Biryani", description: "Fragrant basmati rice with spiced chicken", price: 250, image: "🍚", category: "Main Course" },
  { id: "4", name: "Palak Paneer", description: "Cottage cheese in creamy spinach gravy", price: 220, image: "🥬", category: "Main Course" },
  { id: "5", name: "Paneer Tikka", description: "Grilled cottage cheese with spices", price: 220, image: "🧆", category: "Appetizer" },
  { id: "6", name: "Samosa (2 pcs)", description: "Crispy pastry with spiced potato filling", price: 80, image: "🥟", category: "Appetizer" },
  { id: "7", name: "Butter Naan", description: "Soft leavened flatbread with butter", price: 40, image: "🥖", category: "Bread" },
  { id: "8", name: "Garlic Naan", description: "Naan topped with fresh garlic", price: 50, image: "🧄", category: "Bread" },
  { id: "9", name: "Gulab Jamun (2 pcs)", description: "Sweet milk dumplings in syrup", price: 120, image: "🍡", category: "Dessert" },
  { id: "10", name: "Mango Lassi", description: "Sweet yogurt drink with mango", price: 80, image: "🥭", category: "Beverage" },
]

const categories = ["All", ...Array.from(new Set(menuItems.map(item => item.category)))]

export default function OrderPage() {
  const [orderType, setOrderType] = useState<"pickup" | "delivery">("delivery")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [cart, setCart] = useState<Record<string, number>>({})
  const [showCheckout, setShowCheckout] = useState(false)

  const filteredItems = selectedCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory)

  const addToCart = (itemId: string) => {
    setCart(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }))
  }

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const newCart = { ...prev }
      if (newCart[itemId] > 1) {
        newCart[itemId]--
      } else {
        delete newCart[itemId]
      }
      return newCart
    })
  }

  const calculateTotal = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = menuItems.find(i => i.id === itemId)
      return total + (item?.price || 0) * quantity
    }, 0)
  }

  const cartItemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0)
  const total = calculateTotal()
  const deliveryFee = orderType === "delivery" ? 50 : 0
  const grandTotal = total + deliveryFee

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 dark:from-background dark:via-background dark:to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            <ChefHat className="h-6 w-6" />
            Pajis Kitchen
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">Home</Button>
            </Link>
            <Button 
              variant="default" 
              size="sm"
              className="relative"
              onClick={() => setShowCheckout(!showCheckout)}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-100">
            <Clock className="mr-1 h-3 w-3" />
            Same-Day Service Available
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Order Fresh
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-green-600">
              Home-Cooked Meals
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            No subscription needed! Order à la carte for pickup or delivery today.
          </p>
        </div>

        {/* Order Type Selection */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-2 p-1 bg-muted rounded-full">
            <Button
              variant={orderType === "delivery" ? "default" : "ghost"}
              size="sm"
              className={cn("rounded-full px-6", orderType === "delivery" && "shadow-sm")}
              onClick={() => setOrderType("delivery")}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Delivery
            </Button>
            <Button
              variant={orderType === "pickup" ? "default" : "ghost"}
              size="sm"
              className={cn("rounded-full px-6", orderType === "pickup" && "shadow-sm")}
              onClick={() => setOrderType("pickup")}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Pickup
            </Button>
          </div>
        </div>

        {/* Info Banner */}
        <Card className="mb-8 border-orange-200 bg-orange-50/50 dark:bg-orange-950/20">
          <CardContent className="p-4">
            <div className="grid gap-4 md:grid-cols-3 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-semibold">Ready in 45 mins</p>
                  <p className="text-muted-foreground">Order now for today</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-semibold">{orderType === "delivery" ? "Free delivery over ₹500" : "Free pickup"}</p>
                  <p className="text-muted-foreground">Within 10km radius</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-semibold">Call for custom orders</p>
                  <p className="text-muted-foreground">+91 98765 43210</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
          {filteredItems.map((item) => {
            const quantity = cart[item.id] || 0

            return (
              <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2">
                <CardContent className="p-6">
                  <div className="text-6xl mb-4 text-center transform group-hover:scale-110 transition-transform">
                    {item.image}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-2xl font-bold text-primary">₹{item.price}</span>
                      
                      {quantity === 0 ? (
                        <Button 
                          size="sm" 
                          onClick={() => addToCart(item.id)}
                          className="bg-gradient-to-r from-orange-600 to-orange-700"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Button 
                            size="icon" 
                            variant="outline"
                            className="h-8 w-8"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-semibold w-8 text-center">{quantity}</span>
                          <Button 
                            size="icon"
                            className="h-8 w-8 bg-gradient-to-r from-orange-600 to-orange-700"
                            onClick={() => addToCart(item.id)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Floating Cart Summary */}
        {cartItemCount > 0 && !showCheckout && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
            <Card className="shadow-2xl border-2 border-primary">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold">{cartItemCount} items</p>
                    <p className="text-2xl font-bold text-primary">₹{grandTotal}</p>
                  </div>
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-orange-600 to-orange-700"
                    onClick={() => setShowCheckout(true)}
                  >
                    Checkout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Checkout Section */}
        {showCheckout && cartItemCount > 0 && (
          <Card className="sticky bottom-4 shadow-2xl border-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Your Order</span>
                <Button variant="ghost" size="sm" onClick={() => setShowCheckout(false)}>
                  Continue Shopping
                </Button>
              </CardTitle>
              <CardDescription>
                {orderType === "delivery" ? "We'll deliver to your address" : "Ready for pickup in 45 minutes"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Cart Items */}
              <div className="space-y-2">
                {Object.entries(cart).map(([itemId, quantity]) => {
                  const item = menuItems.find(i => i.id === itemId)
                  if (!item) return null

                  return (
                    <div key={itemId} className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.image}</span>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">₹{item.price} × {quantity}</p>
                        </div>
                      </div>
                      <p className="font-semibold">₹{item.price * quantity}</p>
                    </div>
                  )
                })}
              </div>

              {/* Contact & Address Form */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" placeholder="+91 98765 43210" type="tel" />
                </div>
                
                {orderType === "delivery" && (
                  <>
                    <div>
                      <Label htmlFor="address">Delivery Address *</Label>
                      <Textarea id="address" placeholder="123 Main St, Apartment 4B" rows={3} />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input id="city" placeholder="Bangalore" />
                      </div>
                      <div>
                        <Label htmlFor="pincode">PIN Code *</Label>
                        <Input id="pincode" placeholder="560001" />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="notes">Special Instructions (Optional)</Label>
                  <Textarea id="notes" placeholder="E.g., Extra spicy, no onions, etc." rows={2} />
                </div>
              </div>

              {/* Total */}
              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                {orderType === "delivery" && (
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>{total >= 500 ? <Badge variant="secondary">FREE</Badge> : `₹${deliveryFee}`}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold pt-2 border-t">
                  <span>Total</span>
                  <span className="text-primary">₹{total >= 500 && orderType === "delivery" ? total : grandTotal}</span>
                </div>
              </div>

              <Button 
                className="w-full h-12 text-lg bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800"
                size="lg"
              >
                <Check className="mr-2 h-5 w-5" />
                Place Order - ₹{total >= 500 && orderType === "delivery" ? total : grandTotal}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Cash on {orderType === "delivery" ? "delivery" : "pickup"} • Payment on arrival
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
