import { motion } from "framer-motion";
import { ChefHat } from "lucide-react";

export default function Chinese() {
  return (
    <div className="min-h-screen bg-background pb-24 pt-12 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6"
      >
        <div className="flex justify-center">
          <ChefHat className="w-24 h-24 text-primary opacity-20" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
          Chinese Section
        </h1>
        
        <p className="text-2xl md:text-3xl font-semibold text-primary">
          Coming Soon
        </p>
        
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          We're preparing delicious Chinese dishes for you. Stay tuned for an exciting menu launch!
        </p>

        <div className="pt-8">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl"
          >
            🍜
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
