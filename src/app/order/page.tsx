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

// Full menu items for takeout orders - organized by category
const menuItems = [
  // Main Course
  { id: 'main1', name: 'Butter Chicken', description: 'Creamy tomato curry with tender chicken', price: 16, image: '🍛', category: 'Main Course', spiceLevel: 'Medium' },
  { id: 'main2', name: 'Dal Makhani', description: 'Rich black lentils with butter & cream', price: 12, image: '🍲', category: 'Main Course', spiceLevel: 'Mild' },
  { id: 'main3', name: 'Chicken Biryani', description: 'Fragrant basmati rice with spiced chicken', price: 18, image: '🍚', category: 'Main Course', spiceLevel: 'Medium' },
  { id: 'main4', name: 'Palak Paneer', description: 'Cottage cheese in creamy spinach gravy', price: 14, image: '🥬', category: 'Main Course', spiceLevel: 'Mild' },
  { id: 'main5', name: 'Chole Bhature', description: 'Spiced chickpeas with fried bread', price: 13, image: '🍲', category: 'Main Course', spiceLevel: 'Medium' },
  { id: 'main6', name: 'Rajma Masala', description: 'Kidney beans in thick tomato gravy', price: 12, image: '🍲', category: 'Main Course', spiceLevel: 'Medium' },
  { id: 'main7', name: 'Paneer Makhani', description: 'Cottage cheese in creamy tomato sauce', price: 15, image: '🍛', category: 'Main Course', spiceLevel: 'Mild' },
  { id: 'main8', name: 'Mutton Curry', description: 'Tender mutton in aromatic spices', price: 20, image: '🍛', category: 'Main Course', spiceLevel: 'Hot' },
  { id: 'main9', name: 'Fish Curry', description: 'Fresh fish in coconut curry', price: 17, image: '🍛', category: 'Main Course', spiceLevel: 'Medium' },
  { id: 'main10', name: 'Egg Curry', description: 'Boiled eggs in spiced gravy', price: 10, image: '🍛', category: 'Main Course', spiceLevel: 'Medium' },
  
  // Appetizers
  { id: 'app1', name: 'Paneer Tikka', description: 'Grilled cottage cheese with spices', price: 14, image: '🧆', category: 'Appetizer', spiceLevel: 'Medium' },
  { id: 'app2', name: 'Chicken Tikka', description: 'Marinated grilled chicken pieces', price: 15, image: '🍗', category: 'Appetizer', spiceLevel: 'Medium' },
  { id: 'app3', name: 'Seekh Kebab', description: 'Minced meat skewers with spices', price: 16, image: '🍢', category: 'Appetizer', spiceLevel: 'Hot' },
  { id: 'app4', name: 'Samosa (3 pcs)', description: 'Crispy pastry with spiced potato filling', price: 6, image: '🥟', category: 'Appetizer', spiceLevel: 'Mild' },
  { id: 'app5', name: 'Mixed Pakora', description: 'Assorted fritters with mint chutney', price: 7, image: '🧄', category: 'Appetizer', spiceLevel: 'Medium' },
  { id: 'app6', name: 'Aloo Tikki', description: 'Spiced potato patties with chutneys', price: 5, image: '🥔', category: 'Appetizer', spiceLevel: 'Medium' },
  
  // Breads
  { id: 'bread1', name: 'Butter Naan', description: 'Soft leavened flatbread with butter', price: 3, image: '🥖', category: 'Bread', spiceLevel: 'None' },
  { id: 'bread2', name: 'Garlic Naan', description: 'Naan topped with fresh garlic', price: 3.50, image: '🧄', category: 'Bread', spiceLevel: 'Mild' },
  { id: 'bread3', name: 'Cheese Naan', description: 'Naan stuffed with melted cheese', price: 4.50, image: '🧀', category: 'Bread', spiceLevel: 'None' },
  { id: 'bread4', name: 'Tandoori Roti', description: 'Whole wheat flatbread from tandoor', price: 2, image: '🫓', category: 'Bread', spiceLevel: 'None' },
  { id: 'bread5', name: 'Kulcha', description: 'Leavened bread with onions/potato', price: 3, image: '🥖', category: 'Bread', spiceLevel: 'Mild' },
  { id: 'bread6', name: 'Paratha', description: 'Layered flatbread with ghee', price: 2.50, image: '🥞', category: 'Bread', spiceLevel: 'None' },
  { id: 'bread7', name: 'Plain Naan', description: 'Classic soft leavened bread', price: 2.50, image: '🥖', category: 'Bread', spiceLevel: 'None' },
  
  // Rice
  { id: 'rice1', name: 'Steamed Rice', description: 'Perfectly cooked basmati rice', price: 4, image: '🍚', category: 'Rice', spiceLevel: 'None' },
  { id: 'rice2', name: 'Jeera Rice', description: 'Cumin flavored basmati rice', price: 6, image: '🍚', category: 'Rice', spiceLevel: 'Mild' },
  { id: 'rice3', name: 'Veg Pulao', description: 'Mixed vegetable pilaf rice', price: 8, image: '🍚', category: 'Rice', spiceLevel: 'Mild' },
  { id: 'rice4', name: 'Lemon Rice', description: 'Tangy rice with curry leaves', price: 5, image: '🍋', category: 'Rice', spiceLevel: 'Mild' },
  { id: 'rice5', name: 'Coconut Rice', description: 'Rice cooked in coconut milk', price: 5.50, image: '🥥', category: 'Rice', spiceLevel: 'Mild' },
  
  // Desserts
  { id: 'dessert1', name: 'Gulab Jamun (3 pcs)', description: 'Sweet milk dumplings in syrup', price: 7.50, image: '🍡', category: 'Dessert', spiceLevel: 'None' },
  { id: 'dessert2', name: 'Rice Kheer', description: 'Creamy rice pudding with nuts', price: 6, image: '🍮', category: 'Dessert', spiceLevel: 'None' },
  { id: 'dessert3', name: 'Rasmalai (2 pcs)', description: 'Cottage cheese in sweet milk', price: 9, image: '🧈', category: 'Dessert', spiceLevel: 'None' },
  { id: 'dessert4', name: 'Kulfi', description: 'Traditional Indian ice cream', price: 5, image: '🍦', category: 'Dessert', spiceLevel: 'None' },
  { id: 'dessert5', name: 'Gajar Halwa', description: 'Carrot pudding with ghee and nuts', price: 7, image: '🥕', category: 'Dessert', spiceLevel: 'None' },
  { id: 'dessert6', name: 'Jalebi (4 pcs)', description: 'Crispy spirals in sugar syrup', price: 6.50, image: '🍩', category: 'Dessert', spiceLevel: 'None' },
  
  // Beverages
  { id: 'bev1', name: 'Mango Lassi', description: 'Sweet yogurt drink with mango', price: 4, image: '🥭', category: 'Beverage', spiceLevel: 'None' },
  { id: 'bev2', name: 'Sweet Lassi', description: 'Traditional sweet yogurt drink', price: 3.50, image: '🥛', category: 'Beverage', spiceLevel: 'None' },
  { id: 'bev3', name: 'Masala Chai', description: 'Spiced Indian tea with milk', price: 2, image: '☕', category: 'Beverage', spiceLevel: 'Mild' },
  { id: 'bev4', name: 'Fresh Lime Water', description: 'Refreshing lime water with mint', price: 2.50, image: '🍋', category: 'Beverage', spiceLevel: 'None' },
  { id: 'bev5', name: 'Buttermilk', description: 'Spiced churned yogurt drink', price: 3, image: '🥛', category: 'Beverage', spiceLevel: 'Mild' },
  { id: 'bev6', name: 'Rose Sharbat', description: 'Sweet rose flavored drink', price: 3.50, image: '🌹', category: 'Beverage', spiceLevel: 'None' },
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
            Fresh Takeout Available Today
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Order Takeout
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-green-600">
              Fresh Made Daily
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            No subscription needed! Order individual items for pickup or delivery today.
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

        {/* Menu Sections by Category */}
        <div className="space-y-12 mb-12">
          {['Main Course', 'Appetizer', 'Bread', 'Rice', 'Dessert', 'Beverage'].map(category => {
            const categoryItems = menuItems.filter(item => item.category === category)
            return (
              <div key={category}>
                <Card className="hover:shadow-lg transition-shadow duration-300 border-2">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-full">
                        {category === 'Main Course' && '🍛'}
                        {category === 'Appetizer' && '🧆'}
                        {category === 'Bread' && '🥖'}
                        {category === 'Rice' && '🍚'}
                        {category === 'Dessert' && '🍡'}
                        {category === 'Beverage' && '🥭'}
                      </div>
                      {category}
                      <Badge variant="secondary" className="ml-auto">
                        {categoryItems.length} items
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-base">
                      {category === 'Main Course' && 'Complete meals with authentic flavors'}
                      {category === 'Appetizer' && 'Perfect starters to begin your meal'}
                      {category === 'Bread' && 'Fresh baked breads from our tandoor'}
                      {category === 'Rice' && 'Aromatic rice dishes and varieties'}
                      {category === 'Dessert' && 'Sweet endings to your perfect meal'}
                      {category === 'Beverage' && 'Refreshing drinks and traditional beverages'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {categoryItems.map((item) => {
                        const quantity = cart[item.id] || 0

                        return (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-4 rounded-lg border hover:border-orange-500 transition-all duration-200 hover:shadow-sm group"
                          >
                            <div className="flex items-center gap-3 flex-1">
                              <div className="text-3xl group-hover:scale-110 transition-transform duration-200">{item.image}</div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold text-base group-hover:text-orange-600 transition-colors duration-200">{item.name}</h4>
                                  {(item as any).spiceLevel && (item as any).spiceLevel !== 'None' && (
                                    <Badge variant="outline" className="text-xs">
                                      {(item as any).spiceLevel === 'Mild' && '🌶️'}
                                      {(item as any).spiceLevel === 'Medium' && '🌶️🌶️'}
                                      {(item as any).spiceLevel === 'Hot' && '🌶️🌶️🌶️'}
                                      {(item as any).spiceLevel}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                                <p className="text-lg font-bold text-orange-600">${item.price}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {quantity === 0 ? (
                                <Button 
                                  size="sm" 
                                  onClick={() => addToCart(item.id)}
                                  className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 transition-all duration-200"
                                >
                                  <Plus className="h-4 w-4 mr-1" />
                                  Add
                                </Button>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="h-8 w-8 p-0"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="font-semibold w-6 text-center">{quantity}</span>
                                  <Button 
                                    size="sm"
                                    className="h-8 w-8 p-0 bg-gradient-to-r from-orange-600 to-orange-700"
                                    onClick={() => addToCart(item.id)}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
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
