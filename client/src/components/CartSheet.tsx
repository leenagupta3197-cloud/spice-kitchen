import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";

export function CartFloatingButton() {
  const { totalItems, totalAmount } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  if (totalItems === 0) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-20 md:bottom-8 left-4 right-4 z-40 md:left-auto md:right-8 md:w-96"
        >
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className="w-full h-16 rounded-2xl shadow-xl bg-primary text-primary-foreground hover:bg-primary/90 flex justify-between items-center px-6 text-lg font-semibold"
          >
            <div className="flex items-center gap-3">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                {totalItems} items
              </span>
            </div>
            <span>View Cart</span>
            <span className="bg-black/20 px-3 py-1 rounded-lg">
              ₹{totalAmount}
            </span>
          </Button>
        </motion.div>
      </AnimatePresence>

      <CartSheet open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}

function CartSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { items, updateQuantity, totalAmount, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [showAddressInput, setShowAddressInput] = useState(false);

  const handleWhatsAppOrder = () => {
    if (!address.trim()) return;

    const itemsList = items
      .map((item) => `• ${item.quantity} x ${item.name} (₹${item.price * item.quantity})`)
      .join("\n");
    
    const message = `*New Order from Spice Kitchen website* 🍛\n\n${itemsList}\n\n*Total Amount: ₹${totalAmount}*\n\n📍 *Delivery Address:*\n${address}\n\nDelivery via Porter to any area. Please confirm my order!`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919310153299?text=${encodedMessage}`, "_blank");
    
    // Optional: clear cart after successful redirect
    // clearCart();
    // onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-[2rem] sm:max-w-md sm:mx-auto p-0 flex flex-col">
        <SheetHeader className="p-6 pb-2">
          <SheetTitle className="text-2xl font-display font-bold">Your Cart</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-4">
              <ShoppingBag className="w-16 h-16 opacity-20" />
              <p>Your cart is empty</p>
              <Button variant="outline" onClick={() => onOpenChange(false)}>Browse Menu</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 bg-secondary/50 p-4 rounded-xl border border-secondary">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground truncate">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">₹{item.price}</p>
                  </div>
                  <div className="flex items-center gap-3 bg-background rounded-lg p-1 border shadow-sm">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 hover:text-destructive transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-semibold w-4 text-center text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 hover:text-primary transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 bg-secondary/30 border-t space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Item Total</span>
                <span>₹{totalAmount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery (Porter)</span>
                <span>Actuals</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>To Pay</span>
                <span>₹{totalAmount} + Delivery</span>
              </div>
            </div>

            {showAddressInput ? (
              <div className="space-y-3 pt-2">
                <div className="space-y-1">
                  <Label htmlFor="address">Delivery Address</Label>
                  <Input 
                    id="address" 
                    placeholder="Flat No, Building, Street, Area..." 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-background"
                  />
                </div>
                <Button 
                  onClick={handleWhatsAppOrder}
                  disabled={!address.trim()}
                  className="w-full h-12 text-lg font-bold bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg shadow-green-500/20"
                >
                  Confirm on WhatsApp
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => setShowAddressInput(false)}
                  className="w-full text-sm text-muted-foreground"
                >
                  Back
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => setShowAddressInput(true)}
                className="w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/20"
              >
                Proceed to Order
              </Button>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
