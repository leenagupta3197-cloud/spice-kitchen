import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Download, Smartphone, Apple, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function DownloadApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we have the global install prompt
    if ((window as any).installPromptEvent) {
      setDeferredPrompt((window as any).installPromptEvent);
    }

    // Also listen for future beforeinstallprompt events
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      (window as any).installPromptEvent = e;
      console.log('beforeinstallprompt event captured');
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Check if user is on iOS and mobile
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));
    setIsMobile(window.innerWidth < 768);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
        setIsOpen(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {isMobile ? (
          <button 
            className="flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 text-muted-foreground hover:text-foreground"
            data-testid="button-download-app"
            onClick={() => setIsOpen(true)}
          >
            <Download className="w-6 h-6" />
            <span className="text-[10px] font-medium">Download</span>
          </button>
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            data-testid="button-download-app"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download App</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">Download Spice Kitchen App</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue={isIOS ? "iphone" : "android"} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="android" className="gap-2">
              <Smartphone className="w-4 h-4" />
              Android
            </TabsTrigger>
            <TabsTrigger value="iphone" className="gap-2">
              <Apple className="w-4 h-4" />
              iPhone
            </TabsTrigger>
          </TabsList>

          <TabsContent value="android" className="space-y-4 mt-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Install on Android</h3>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</span>
                  <span className="text-sm">Open this website in <strong>Chrome browser</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</span>
                  <span className="text-sm">Look for the <strong>"Install"</strong> button at the bottom of your screen</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">3</span>
                  <span className="text-sm">Tap <strong>"Install"</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">4</span>
                  <span className="text-sm">Done! The app will appear on your home screen</span>
                </li>
              </ol>
              <p className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-lg">
                💡 <strong>Tip:</strong> If you don't see the install button, try the menu button (⋯) at the top right and select "Install app"
              </p>
              {deferredPrompt ? (
                <Button 
                  onClick={handleInstall} 
                  className="w-full mt-4"
                  data-testid="button-install-android"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Install Now
                </Button>
              ) : (
                <Button 
                  className="w-full mt-4"
                  data-testid="button-install-android"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Try Refreshing the Page
                </Button>
              )}
            </div>
          </TabsContent>

          <TabsContent value="iphone" className="space-y-4 mt-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Install on iPhone</h3>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</span>
                  <span className="text-sm">Open this website in <strong>Safari browser</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</span>
                  <span className="text-sm">Tap the <strong>Share button</strong> (arrow pointing up) at the bottom</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">3</span>
                  <span className="text-sm">Scroll down and select <strong>"Add to Home Screen"</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">4</span>
                  <span className="text-sm">Tap <strong>"Add"</strong> in the top right corner</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">5</span>
                  <span className="text-sm">Done! The app will appear on your home screen</span>
                </li>
              </ol>
              <p className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-lg">
                💡 <strong>Note:</strong> Safari must be used on iPhone. Chrome won't work for installation.
              </p>
              <Button 
                className="w-full mt-4"
                disabled={true}
                data-testid="button-install-iphone"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Follow Steps Above
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground text-center">
            ✓ Works just like a regular app<br/>
            ✓ Takes just 10 seconds to install<br/>
            ✓ No need to visit app store
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
