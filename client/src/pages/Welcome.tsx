import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import logoImage from "@assets/1000414191_1766946034978.jpg";
import thaliImage from "@assets/stock_images/traditional_indian_t_62bfa88b.jpg";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-secondary/60 flex items-center justify-center p-4">
      <div className="w-full max-w-lg text-center space-y-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <img 
            src={logoImage}
            alt="Spice Kitchen" 
            className="h-32 w-auto"
          />
        </motion.div>

        {/* Thali Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center"
        >
          <img 
            src={thaliImage}
            alt="Indian Thali" 
            className="w-64 h-64 md:w-72 md:h-72 object-cover rounded-3xl shadow-2xl border-8 border-white"
          />
        </motion.div>

        {/* Welcome Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold">
            <span className="text-primary">Ghar Ka Khana</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Spice Kitchen - Fresh, Homemade Meals
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base text-foreground"
        >
          Fresh, hygienic, and delicious homemade meals delivered to your doorstep in Ghaziabad.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/home">
            <Button 
              size="lg" 
              className="h-14 px-8 rounded-lg font-semibold shadow-lg"
              data-testid="button-welcome-continue"
            >
              Let's Order
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xs text-muted-foreground"
        >
          Homemade with love ❤️
        </motion.p>
      </div>
    </div>
  );
}
