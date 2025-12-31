import { useState } from "react";
import { useMenu } from "@/hooks/use-menu";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { clsx } from "clsx";

export default function Menu() {
  const { data: menuItems, isLoading } = useMenu();
  const { items: cartItems, addItem, updateQuantity } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Thali", "Sweets", "Achar", "Catering", "Chinese"];

  const filteredItems = menuItems?.filter(item => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }) || [];

  const getQuantity = (id: number) => cartItems.find(i => i.id === id)?.quantity || 0;

  return (
    <div className="pb-32 pt-6 min-h-screen bg-background">
      <div className="container mx-auto px-4 space-y-6">
        <header className="space-y-4">
          <h1 className="text-4xl font-display font-bold text-foreground">Our Menu</h1>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Search for dishes..." 
              className="pl-10 h-12 text-lg rounded-xl bg-secondary/50 border-none shadow-sm focus:ring-2 focus:ring-primary/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={clsx(
                  "px-6 py-2 rounded-full whitespace-nowrap text-sm font-semibold transition-all duration-300",
                  activeCategory === cat 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        {isLoading ? (
          <div className="grid gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-muted animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const qty = getQuantity(item.id);
              
              return (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={item.id} 
                  className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden flex flex-row md:flex-col h-32 md:h-auto"
                >
                  {/* Image */}
                  <div className="w-32 md:w-full md:h-48 flex-shrink-0 bg-muted relative">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                    {/* Veg/Non-veg indicator overlay if needed */}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg line-clamp-1">{item.name}</h3>
                        {item.isVegetarian && (
                          <div className="w-4 h-4 border border-green-600 p-[2px] rounded-sm flex items-center justify-center" title="Vegetarian">
                            <div className="w-2 h-2 rounded-full bg-green-600" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{item.description}</p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="font-bold text-lg">₹{item.price}</span>
                      
                      {qty === 0 ? (
                        <Button 
                          size="sm" 
                          onClick={() => addItem(item)}
                          className="h-9 px-6 rounded-lg font-bold shadow-md shadow-primary/20"
                        >
                          ADD
                        </Button>
                      ) : (
                        <div className="flex items-center bg-primary/10 rounded-lg p-1 gap-3">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-7 h-7 flex items-center justify-center bg-background rounded-md text-primary hover:bg-white shadow-sm transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-bold text-primary w-4 text-center">{qty}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-7 h-7 flex items-center justify-center bg-background rounded-md text-primary hover:bg-white shadow-sm transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {filteredItems.length === 0 && !isLoading && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No items found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
