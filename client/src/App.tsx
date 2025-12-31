import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { Navigation, DesktopNavigation } from "@/components/Navigation";
import { CartFloatingButton } from "@/components/CartSheet";
import NotFound from "@/pages/not-found";

import Welcome from "@/pages/Welcome";
import Home from "@/pages/Home";
import Menu from "@/pages/Menu";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Thali from "@/pages/Thali";
import Chinese from "@/pages/Chinese";
import { default as StaffOnly } from "@/pages/Admin";
import AdminLogin from "@/pages/AdminLogin";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Welcome} />
      <Route path="/home" component={Home} />
      <Route path="/menu" component={Menu} />
      <Route path="/thali" component={Thali} />
      <Route path="/chinese" component={Chinese} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/admin-login" component={AdminLogin} />
      <Route path="/admin" component={StaffOnly} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <div className="min-h-screen bg-background font-body text-foreground flex flex-col">
            <DesktopNavigation />
            <main className="flex-1">
              <Router />
            </main>
            <CartFloatingButton />
            <Navigation />
          </div>
          <Toaster />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
