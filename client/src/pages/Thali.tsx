import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Thali() {
  const handleWhatsAppOrder = () => {
    const message = "Hi, I want to know today's thali menu and place an order.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/918178061458?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background pb-24 pt-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">Today's Thali Menu</h1>
            <p className="text-lg text-muted-foreground">
              Fresh, homemade, and delicious thalis prepared daily with love
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12 border border-primary/20 space-y-6">
            <div className="text-center space-y-4">
              <p className="text-lg text-foreground">
                Our thali menu changes daily based on seasonal ingredients and special recipes.
              </p>
              <p className="text-base text-muted-foreground">
                Click below to chat with us on WhatsApp and find out today's thali options!
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleWhatsAppOrder}
                size="lg"
                className="w-full h-14 text-lg font-bold bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg shadow-green-500/20"
                data-testid="button-thali-whatsapp"
              >
                <MessageCircle className="w-6 h-6 mr-2" />
                Order / Know Today's Thali Menu on WhatsApp
              </Button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-2xl border border-border/50">
              <h3 className="font-bold text-lg mb-3">What We Offer</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Regular Veg Thali</li>
                <li>✓ Special Paneer Thali</li>
                <li>✓ North Indian specialties</li>
                <li>✓ Fresh daily preparation</li>
                <li>✓ Hygienic & FSSAI certified</li>
              </ul>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border/50">
              <h3 className="font-bold text-lg mb-3">Delivery Info</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Delivery to any area</li>
                <li>✓ Via Porter</li>
                <li>✓ WhatsApp order confirmation</li>
                <li>✓ Fresh & hot delivery</li>
                <li>✓ 24hr advance orders accepted</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
