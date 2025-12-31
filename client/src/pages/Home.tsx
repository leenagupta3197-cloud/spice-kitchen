import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Truck, ShieldCheck, ChefHat, ArrowRight, Flame, MessageCircle, X, Send } from "lucide-react";
import { useMenu } from "@/hooks/use-menu";
import { useReviews } from "@/hooks/use-reviews";
import { ReviewCard } from "@/components/ReviewCard";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";

function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ type: "bot" | "user"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { type: "user", text }]);
    setInput("");
    setShowOptions(false);
    setIsLoading(true);

    try {
      const response = await apiRequest("POST", "/api/chatbot", { message: text });
      const data = await response.json();
      setMessages((prev) => [...prev, { type: "bot", text: data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { type: "bot", text: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-primary hover:bg-primary/90 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all z-40"
        data-testid="button-chatbot-open"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-2rem)] h-[600px] max-h-[80vh] bg-white dark:bg-slate-950 rounded-lg shadow-2xl flex flex-col z-50 border border-border">
      <div className="bg-primary text-white p-4 rounded-t-lg flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg">Spice Kitchen</h3>
          <p className="text-xs opacity-90">We're here to help!</p>
        </div>
        <button onClick={() => setIsOpen(false)} className="hover:bg-primary/80 p-2 rounded">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-slate-900">
        {messages.length === 0 && showOptions ? (
          <div className="text-center mb-4">
            <p className="text-muted-foreground text-sm">How can we help you today?</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.type === "user" ? "bg-primary text-white" : "bg-white dark:bg-slate-800 border border-border"}`}>
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-border flex gap-2">
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-border space-y-3">
        {messages.length === 0 && showOptions && (
          <div className="space-y-2">
            <Button variant="outline" className="w-full text-left justify-start text-sm h-auto py-2" onClick={() => sendMessage("Today's Menu")} data-testid="button-chatbot-option-menu">Today's Menu</Button>
            <Button variant="outline" className="w-full text-left justify-start text-sm h-auto py-2" onClick={() => sendMessage("Catering & Availability")} data-testid="button-chatbot-option-catering">Catering & Availability</Button>
            <Button variant="outline" className="w-full text-left justify-start text-sm h-auto py-2" onClick={() => sendMessage("Delivery Status")} data-testid="button-chatbot-option-delivery">Delivery Status</Button>
            <Button variant="outline" className="w-full text-left justify-start text-sm h-auto py-2" onClick={() => sendMessage("Coming Soon")} data-testid="button-chatbot-option-coming-soon">Coming Soon</Button>
          </div>
        )}
        <div className="flex gap-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && sendMessage(input)} placeholder="Type your question..." className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background" data-testid="input-chatbot-message" disabled={isLoading} />
          <Button size="sm" onClick={() => sendMessage(input)} disabled={isLoading || !input.trim()} className="h-auto py-2" data-testid="button-chatbot-send"><Send className="w-4 h-4" /></Button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { data: menuItems, isLoading: isMenuLoading } = useMenu();
  const { data: reviews, isLoading: isReviewsLoading } = useReviews();

  const featuredItems = menuItems?.slice(0, 4) || [];

  return (
    <div className="pb-24 md:pb-12">
      <ChatbotWidget />
      {/* Hero Section */}
      <section className="relative bg-secondary/60 md:min-h-screen md:flex md:items-center md:justify-center overflow-hidden">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            
            {/* Left Column - Text */}
            <motion.div className="space-y-6 md:space-y-8">
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center gap-2 inline-block px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                    <Flame className="w-4 h-4" />
                    <span className="text-sm font-bold">Authentic Homemade Taste</span>
                  </div>
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight"
                >
                  Ghar Jaisa
                  <br />
                  <span className="text-primary">Khana</span>
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg text-muted-foreground max-w-md"
                >
                  Fresh, hygienic, and delicious homemade meals delivered to your doorstep.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex gap-4 flex-wrap"
              >
                <Link href="/menu">
                  <Button size="lg" className="rounded-lg h-12 px-6 font-semibold shadow-md hover:shadow-lg transition-shadow">
                    Order Now
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="rounded-lg h-12 px-6 font-semibold">
                  Learn More
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Column - Image + Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex items-center justify-center"
            >
              <div className="relative w-full aspect-square md:h-auto">
                {/* Hero Image - Thali/Food */}
                <div className="relative rounded-full md:rounded-3xl overflow-hidden shadow-2xl bg-white p-4 md:p-8 border-8 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80" 
                    alt="Spice Kitchen Thali" 
                    className="w-full h-full object-cover rounded-full md:rounded-2xl"
                  />
                </div>

                {/* FSSAI Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="absolute bottom-8 right-4 md:bottom-12 md:right-8 bg-white rounded-2xl p-3 md:p-4 shadow-lg flex items-center gap-2 border border-green-200"
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                  </div>
                  <div className="text-xs md:text-sm">
                    <p className="font-semibold text-foreground">Safety First</p>
                    <p className="text-muted-foreground">FSSAI Registered</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Payment Safety Message */}
      <section className="bg-primary/10 border-y border-primary/20">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">
              Thinking of the Risk?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Don't worry! Payment would be done safely through <strong className="text-primary">WhatsApp</strong>. Order with confidence!
            </p>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-3 gap-4 md:gap-8">
          {[
            { icon: Truck, title: "Fast Delivery", desc: "Delivery to any area" },
            { icon: ShieldCheck, title: "100% Hygienic", desc: "FSSAI Certified" },
            { icon: ChefHat, title: "Fresh Daily", desc: "Made with Love" }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-4 md:p-6 rounded-2xl bg-secondary/50 border border-secondary/80">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-background flex items-center justify-center mb-3 shadow-sm text-primary">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-sm md:text-base">{item.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Menu */}
      <section className="container mx-auto px-4 py-12 md:py-16 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl md:text-4xl font-display font-bold">Featured Items</h2>
          <Link href="/menu" className="text-primary font-semibold hover:underline flex items-center gap-1 text-sm md:text-base">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isMenuLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-64 bg-muted animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredItems.map(item => (
              <Link key={item.id} href="/menu">
                <div className="group cursor-pointer rounded-2xl overflow-hidden border bg-card hover:shadow-lg transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3 md:p-4">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h3 className="font-bold text-sm md:text-base leading-tight group-hover:text-primary transition-colors line-clamp-2">{item.name}</h3>
                      <span className="font-bold text-primary text-sm md:text-base">₹{item.price}</span>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Reviews Section */}
      <section className="bg-secondary/30 py-12 md:py-16">
        <div className="container mx-auto px-4 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-display font-bold">What Customers Say</h2>
            <p className="text-muted-foreground">Love from our happy foodies</p>
          </div>

          <div className="relative">
            {isReviewsLoading ? (
              <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                {[1, 2, 3].map(i => (
                  <div key={i} className="min-w-[280px] h-48 bg-muted animate-pulse rounded-xl" />
                ))}
              </div>
            ) : (
              <div className="flex gap-6 overflow-x-auto pb-8 pt-4 px-4 -mx-4 hide-scrollbar snap-x snap-mandatory">
                {reviews?.map(review => (
                  <div key={review.id} className="snap-center">
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="bg-primary rounded-3xl p-6 md:p-12 text-center md:text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 md:flex items-center justify-between gap-8">
            <div className="space-y-4 mb-6 md:mb-0 max-w-xl">
              <h2 className="text-2xl md:text-4xl font-display font-bold text-white">
                Ready to taste the difference?
              </h2>
              <p className="text-white/90 text-base md:text-lg">
                Order now and get fresh, hot, home-style food delivered within 45 minutes.
              </p>
            </div>
            <Link href="/menu">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-base md:text-lg font-bold h-12 md:h-14 px-8 rounded-full shadow-xl w-full md:w-auto">
                Order via WhatsApp
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
