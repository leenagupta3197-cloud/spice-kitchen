import { Link, useLocation } from "wouter";
import { Home, UtensilsCrossed, ShoppingCart, Info, Phone } from "lucide-react";
import { clsx } from "clsx";
import { useCart } from "@/context/CartContext";
import { DownloadApp } from "@/components/DownloadApp";
import logoImage from "@assets/1000414191_1766946034978.jpg";

export function Navigation() {
  const [location] = useLocation();
  const { totalItems } = useCart();

  const navItems = [
    { key: "home", href: "/home", icon: Home, label: "Home" },
    { key: "menu", href: "/menu", icon: UtensilsCrossed, label: "Menu" },
    { key: "cart", href: "/menu", icon: ShoppingCart, label: "Cart", badge: totalItems > 0 ? totalItems : null },
    { key: "about", href: "/about", icon: Info, label: "About" },
    { key: "contact", href: "/contact", icon: Phone, label: "Contact" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 pb-safe md:hidden">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map(({ key, href, icon: Icon, label, badge }) => {
          const isActive = location === href;
          return (
            <Link key={key} href={href} className={clsx(
              "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 relative",
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}>
              <div className="relative">
                <Icon className={clsx("w-6 h-6", isActive && "fill-current/20")} strokeWidth={isActive ? 2.5 : 2} />
                {badge && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
        <DownloadApp />
        <Link href="/admin" className={clsx(
          "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 relative",
          location === "/admin" ? "text-primary" : "text-muted-foreground hover:text-foreground"
        )}>
          <UtensilsCrossed className="w-6 h-6" />
          <span className="text-[10px] font-medium">Staff</span>
        </Link>
      </div>
    </nav>
  );
}

export function DesktopNavigation() {
  const [location] = useLocation();

  const navItems = [
    { href: "/home", label: "Home" },
    { href: "/menu", label: "Our Menu" },
    { href: "/thali", label: "Today's Thali" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="hidden md:block sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img 
            src={logoImage}
            alt="Spice Kitchen" 
            className="h-12 w-auto"
          />
        </Link>
        <div className="flex gap-6 items-center">
          {navItems.map(({ href, label }) => (
            <Link 
              key={href} 
              href={href} 
              className={clsx(
                "text-sm font-semibold transition-colors hover:text-primary",
                location === href ? "text-primary" : "text-foreground"
              )}
            >
              {label}
            </Link>
          ))}
          <div className="flex gap-3">
            <DownloadApp />
            <Link 
              href="/admin" 
              className={clsx(
                "text-sm font-semibold transition-colors hover:text-primary px-3 py-1 rounded-lg",
                location === "/admin" ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Staff
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
