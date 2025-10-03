'use client'

import { useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  Star, 
  ChefHat, 
  X,
  Flame,
  Clock,
  Users
} from "lucide-react"

const menuCategories = [
  {
    name: "Main Courses",
    items: [
      { 
        id: 1,
        name: "Butter Chicken", 
        description: "Creamy tomato curry with tender chicken pieces", 
        price: "₹280", 
        image: "🍛",
        rating: 4.9,
        reviews: 234,
        spicy: "Medium",
        prepTime: "25 mins",
        servings: "2-3",
        ingredients: ["Chicken", "Tomatoes", "Butter", "Cream", "Spices"],
        nutrition: { calories: 420, protein: "28g", carbs: "12g", fat: "30g" },
        details: "Our signature butter chicken is made with succulent chicken pieces marinated in yogurt and spices, cooked in a rich tomato-butter gravy with fresh cream."
      },
      { 
        id: 2,
        name: "Dal Makhani", 
        description: "Rich black lentils with butter & cream", 
        price: "₹180", 
        image: "🍲",
        rating: 4.8,
        reviews: 189,
        spicy: "Mild",
        prepTime: "30 mins",
        servings: "2-3",
        ingredients: ["Black Lentils", "Butter", "Cream", "Tomatoes", "Spices"],
        nutrition: { calories: 320, protein: "18g", carbs: "42g", fat: "12g" },
        details: "Slow-cooked black lentils and kidney beans in a creamy, buttery tomato sauce. A North Indian classic that pairs perfectly with naan or rice."
      },
      { 
        id: 3,
        name: "Chicken Biryani", 
        description: "Fragrant basmati rice with spiced chicken", 
        price: "₹250", 
        image: "🍚",
        rating: 5.0,
        reviews: 312,
        spicy: "Medium",
        prepTime: "45 mins",
        servings: "2",
        ingredients: ["Basmati Rice", "Chicken", "Saffron", "Yogurt", "Spices"],
        nutrition: { calories: 520, protein: "32g", carbs: "65g", fat: "18g" },
        details: "Aromatic long-grain rice layered with marinated chicken, fried onions, and authentic spices. Served with raita and salan."
      },
      { 
        id: 4,
        name: "Palak Paneer", 
        description: "Cottage cheese in creamy spinach gravy", 
        price: "₹220", 
        image: "🥬",
        rating: 4.7,
        reviews: 156,
        spicy: "Mild",
        prepTime: "20 mins",
        servings: "2",
        ingredients: ["Spinach", "Paneer", "Cream", "Garlic", "Spices"],
        nutrition: { calories: 280, protein: "16g", carbs: "18g", fat: "18g" },
        details: "Fresh spinach puree cooked with soft paneer cubes, cream, and aromatic spices. A healthy and delicious vegetarian option."
      },
      { 
        id: 5,
        name: "Rogan Josh", 
        description: "Kashmiri-style aromatic lamb curry", 
        price: "₹350", 
        image: "🍖",
        rating: 4.9,
        reviews: 98,
        spicy: "High",
        prepTime: "50 mins",
        servings: "2",
        ingredients: ["Lamb", "Yogurt", "Kashmiri Chilies", "Fennel", "Spices"],
        nutrition: { calories: 480, protein: "35g", carbs: "15g", fat: "32g" },
        details: "Tender lamb pieces cooked in a rich, aromatic gravy with Kashmiri spices. A royal delicacy from the mountains of Kashmir."
      },
    ]
  },
  {
    name: "Appetizers",
    items: [
      { 
        id: 6,
        name: "Paneer Tikka", 
        description: "Grilled cottage cheese with spices", 
        price: "₹220", 
        image: "🧆",
        rating: 4.8,
        reviews: 167,
        spicy: "Medium",
        prepTime: "15 mins",
        servings: "2",
        ingredients: ["Paneer", "Bell Peppers", "Yogurt", "Spices", "Lemon"],
        nutrition: { calories: 240, protein: "14g", carbs: "12g", fat: "16g" },
        details: "Marinated paneer cubes grilled to perfection with bell peppers and onions. Served with mint chutney."
      },
      { 
        id: 7,
        name: "Samosa (2 pcs)", 
        description: "Crispy pastry with spiced potato filling", 
        price: "₹80", 
        image: "🥟",
        rating: 4.9,
        reviews: 445,
        spicy: "Mild",
        prepTime: "10 mins",
        servings: "1",
        ingredients: ["Potato", "Peas", "Pastry", "Spices", "Oil"],
        nutrition: { calories: 260, protein: "5g", carbs: "35g", fat: "12g" },
        details: "Golden, crispy triangular pastries filled with spiced potatoes and peas. Served with tamarind and mint chutney."
      },
      { 
        id: 8,
        name: "Chicken 65", 
        description: "Spicy fried chicken appetizer", 
        price: "₹240", 
        image: "🍗",
        rating: 4.7,
        reviews: 201,
        spicy: "High",
        prepTime: "20 mins",
        servings: "2",
        ingredients: ["Chicken", "Curry Leaves", "Chilies", "Yogurt", "Spices"],
        nutrition: { calories: 340, protein: "28g", carbs: "18g", fat: "20g" },
        details: "Spicy, deep-fried chicken pieces marinated in a flavorful blend of spices and curry leaves. A South Indian favorite."
      },
    ]
  },
  {
    name: "Breads",
    items: [
      { 
        id: 9,
        name: "Butter Naan", 
        description: "Soft leavened flatbread with butter", 
        price: "₹40", 
        image: "🥖",
        rating: 4.9,
        reviews: 523,
        spicy: "None",
        prepTime: "5 mins",
        servings: "1",
        ingredients: ["Flour", "Yogurt", "Butter", "Yeast", "Milk"],
        nutrition: { calories: 180, protein: "4g", carbs: "32g", fat: "4g" },
        details: "Fluffy naan bread baked in a traditional tandoor and brushed with melted butter. Perfect for scooping up curries."
      },
      { 
        id: 10,
        name: "Garlic Naan", 
        description: "Naan topped with fresh garlic", 
        price: "₹50", 
        image: "🧄",
        rating: 5.0,
        reviews: 389,
        spicy: "None",
        prepTime: "5 mins",
        servings: "1",
        ingredients: ["Flour", "Garlic", "Butter", "Cilantro", "Yeast"],
        nutrition: { calories: 190, protein: "5g", carbs: "33g", fat: "5g" },
        details: "Our popular naan topped with fresh minced garlic and cilantro, brushed with butter. Aromatic and delicious."
      },
      { 
        id: 11,
        name: "Tandoori Roti", 
        description: "Whole wheat flatbread", 
        price: "₹25", 
        image: "🫓",
        rating: 4.6,
        reviews: 276,
        spicy: "None",
        prepTime: "5 mins",
        servings: "1",
        ingredients: ["Whole Wheat Flour", "Water", "Salt"],
        nutrition: { calories: 120, protein: "4g", carbs: "24g", fat: "2g" },
        details: "Healthy whole wheat roti baked in a tandoor. A lighter alternative to naan, perfect for dal or curry."
      },
    ]
  },
  {
    name: "Desserts",
    items: [
      { 
        id: 12,
        name: "Gulab Jamun (2 pcs)", 
        description: "Sweet milk dumplings in syrup", 
        price: "₹120", 
        image: "🍡",
        rating: 4.9,
        reviews: 412,
        spicy: "None",
        prepTime: "10 mins",
        servings: "1",
        ingredients: ["Milk Powder", "Flour", "Sugar", "Cardamom", "Rose Water"],
        nutrition: { calories: 280, protein: "6g", carbs: "48g", fat: "8g" },
        details: "Soft, spongy milk dumplings soaked in aromatic rose-cardamom syrup. Served warm. A traditional Indian celebration sweet."
      },
      { 
        id: 13,
        name: "Rasmalai (2 pcs)", 
        description: "Cottage cheese dumplings in cream", 
        price: "₹140", 
        image: "🥛",
        rating: 4.8,
        reviews: 298,
        spicy: "None",
        prepTime: "10 mins",
        servings: "1",
        ingredients: ["Paneer", "Milk", "Sugar", "Cardamom", "Saffron"],
        nutrition: { calories: 220, protein: "8g", carbs: "35g", fat: "7g" },
        details: "Delicate paneer dumplings soaked in sweetened, thickened milk flavored with cardamom and saffron. Chilled to perfection."
      },
      { 
        id: 14,
        name: "Kheer", 
        description: "Rice pudding with nuts", 
        price: "₹100", 
        image: "🍚",
        rating: 4.7,
        reviews: 234,
        spicy: "None",
        prepTime: "10 mins",
        servings: "1",
        ingredients: ["Rice", "Milk", "Sugar", "Cardamom", "Nuts"],
        nutrition: { calories: 240, protein: "7g", carbs: "42g", fat: "6g" },
        details: "Creamy rice pudding slow-cooked with milk, sugar, and aromatic cardamom. Garnished with almonds and pistachios."
      },
    ]
  },
  {
    name: "Beverages",
    items: [
      { 
        id: 15,
        name: "Mango Lassi", 
        description: "Sweet yogurt drink with mango", 
        price: "₹80", 
        image: "🥭",
        rating: 4.9,
        reviews: 367,
        spicy: "None",
        prepTime: "5 mins",
        servings: "1",
        ingredients: ["Yogurt", "Mango", "Sugar", "Cardamom"],
        nutrition: { calories: 180, protein: "6g", carbs: "32g", fat: "4g" },
        details: "Refreshing blend of ripe mango pulp, creamy yogurt, and a touch of cardamom. Served chilled."
      },
      { 
        id: 16,
        name: "Masala Chai", 
        description: "Spiced Indian tea", 
        price: "₹40", 
        image: "☕",
        rating: 4.8,
        reviews: 489,
        spicy: "None",
        prepTime: "5 mins",
        servings: "1",
        ingredients: ["Tea", "Milk", "Ginger", "Cardamom", "Spices"],
        nutrition: { calories: 80, protein: "3g", carbs: "12g", fat: "3g" },
        details: "Traditional Indian tea brewed with aromatic spices, fresh ginger, and milk. Perfect to start your day or enjoy anytime."
      },
    ]
  },
]

export default function MenuPage() {
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const allCategories = ["All", ...menuCategories.map(cat => cat.name)]

  const filteredMenu = selectedCategory === "All" 
    ? menuCategories 
    : menuCategories.filter(cat => cat.name === selectedCategory)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            <ChefHat className="h-6 w-6" />
            Pajis Kitchen
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">Home</Button>
            </Link>
            <Link href="/subscribe">
              <Button size="sm" className="bg-gradient-to-r from-green-600 to-green-700">
                Subscribe
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 via-orange-50 to-green-50 dark:from-green-950 dark:via-orange-950 dark:to-green-950 py-12">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4">Full Menu</Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Explore Our Delicious Menu
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Over 200+ authentic Indian dishes prepared fresh daily by our expert chefs
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {allCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredMenu.map((category) => (
            <div key={category.name} className="mb-12">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                {category.name}
                <Badge variant="secondary">{category.items.length} items</Badge>
              </h2>
              
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {category.items.map((item) => (
                  <Card 
                    key={item.id} 
                    className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2"
                    onClick={() => setSelectedItem(item)}
                  >
                    <CardContent className="p-6">
                      <div className="text-6xl mb-4 text-center transform group-hover:scale-110 transition-transform">
                        {item.image}
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <div className="flex items-center gap-1 text-yellow-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="font-semibold">{item.rating}</span>
                          </div>
                          <span className="text-muted-foreground">({item.reviews})</span>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-2xl font-bold text-primary">{item.price}</span>
                          <Button size="sm" variant="outline">View Details</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Enjoy These Dishes?</h2>
          <p className="text-lg mb-6 opacity-90">Subscribe now and get your first week FREE!</p>
          <Link href="/subscribe">
            <Button size="lg" variant="secondary" className="text-lg">
              Subscribe Now - Use Code WELCOME25
            </Button>
          </Link>
        </div>
      </section>

      {/* Item Detail Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedItem && (
            <div className="space-y-6">
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <DialogTitle className="text-3xl mb-2">{selectedItem.name}</DialogTitle>
                    <DialogDescription className="text-base">
                      {selectedItem.description}
                    </DialogDescription>
                  </div>
                  <div className="text-7xl ml-4">{selectedItem.image}</div>
                </div>
              </DialogHeader>

              {/* Rating & Quick Info */}
              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  ))}
                  <span className="ml-2 font-semibold">{selectedItem.rating}</span>
                  <span className="text-muted-foreground">({selectedItem.reviews} reviews)</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Flame className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                    <div className="text-sm font-medium">{selectedItem.spicy}</div>
                    <div className="text-xs text-muted-foreground">Spice Level</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                    <div className="text-sm font-medium">{selectedItem.prepTime}</div>
                    <div className="text-xs text-muted-foreground">Prep Time</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="h-6 w-6 mx-auto mb-2 text-green-500" />
                    <div className="text-sm font-medium">{selectedItem.servings}</div>
                    <div className="text-xs text-muted-foreground">Servings</div>
                  </CardContent>
                </Card>
              </div>

              {/* Details */}
              <div>
                <h4 className="font-semibold mb-2 text-lg">About This Dish</h4>
                <p className="text-muted-foreground">{selectedItem.details}</p>
              </div>

              {/* Ingredients */}
              <div>
                <h4 className="font-semibold mb-2 text-lg">Key Ingredients</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.ingredients.map((ingredient: string) => (
                    <Badge key={ingredient} variant="secondary">
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Nutrition */}
              <div>
                <h4 className="font-semibold mb-2 text-lg">Nutritional Information</h4>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">{selectedItem.nutrition.calories}</div>
                    <div className="text-xs text-muted-foreground">Calories</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">{selectedItem.nutrition.protein}</div>
                    <div className="text-xs text-muted-foreground">Protein</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">{selectedItem.nutrition.carbs}</div>
                    <div className="text-xs text-muted-foreground">Carbs</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">{selectedItem.nutrition.fat}</div>
                    <div className="text-xs text-muted-foreground">Fat</div>
                  </div>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <div className="text-sm text-muted-foreground">Price</div>
                  <div className="text-3xl font-bold text-primary">{selectedItem.price}</div>
                </div>
                <Link href="/subscribe">
                  <Button size="lg" className="bg-gradient-to-r from-green-600 to-green-700">
                    Add to Subscription
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
