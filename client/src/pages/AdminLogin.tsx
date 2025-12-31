import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Lock, ChefHat } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logoImage from "@assets/1000414191_1766946034978.jpg";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login delay
    setTimeout(() => {
      if (password === "jaiguruji25") {
        localStorage.setItem("adminAuth", "true");
        toast({ title: "Success", description: "Logged in successfully!" });
        setLocation("/admin");
      } else {
        toast({
          title: "Error",
          description: "Invalid password. Please try again.",
        });
        setPassword("");
      }
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/40 via-background to-secondary/40 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <div className="p-8 space-y-8">
          {/* Logo */}
          <div className="flex flex-col items-center gap-4">
            <img 
              src={logoImage}
              alt="Spice Kitchen" 
              className="h-20 w-auto"
            />
            <p className="text-sm text-muted-foreground font-medium">Staff Panel Access</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-base font-semibold">
                Enter Staff Panel Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 py-6 text-lg"
                  disabled={isLoading}
                  autoFocus
                  data-testid="input-admin-password"
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full h-12 font-semibold"
              disabled={isLoading}
              data-testid="button-admin-login"
            >
              {isLoading ? "Logging in..." : "Access Staff Panel"}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground">
            This is a secure admin area. Please enter your password to continue.
          </p>
        </div>
      </Card>
    </div>
  );
}
