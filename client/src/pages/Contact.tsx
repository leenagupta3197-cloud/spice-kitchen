import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background pb-24 pt-12">
      <div className="container mx-auto px-4 max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-display font-bold">Contact Us</h1>
          <p className="text-muted-foreground">We'd love to hear from you!</p>
        </div>

        <div className="space-y-4">
          <div className="bg-card p-6 rounded-2xl border shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Call Us</p>
              <p className="font-bold text-lg">+91 93101 53299</p>
            </div>
          </div>

          <div className="bg-card p-6 rounded-2xl border shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email Us</p>
              <p className="font-bold text-lg">sguptac2406@gmail.com</p>
            </div>
          </div>

          <div className="bg-card p-6 rounded-2xl border shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-bold text-lg">Nehru Nagar, Ghaziabad</p>
            </div>
          </div>
        </div>

        <div className="pt-8 space-y-4">
          <h3 className="font-bold text-xl text-center">Have a question?</h3>
          <Button 
            className="w-full h-14 text-lg font-bold bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg shadow-green-500/20"
            onClick={() => window.open("https://wa.me/919310153299", "_blank")}
            data-testid="button-contact-whatsapp"
          >
            <MessageCircle className="w-6 h-6 mr-2" />
            Chat on WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
