import { ChefHat, Award, Clock } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="relative h-64 bg-primary overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-black/20" />
        <h1 className="relative z-10 text-5xl font-display font-bold text-white">Our Story</h1>
      </div>
      
      <div className="container mx-auto px-4 py-12 max-w-3xl space-y-12">
        <div className="prose prose-lg text-muted-foreground">
          <h2 className="text-3xl font-display font-bold text-foreground mb-6">Bringing "Ghar ka Khana" to You</h2>
          <p>
            Spice Kitchen started with a simple mission: to provide wholesome, hygienic, and delicious home-cooked meals 
            to students and professionals living away from home. We understand the longing for simple dal-chawal or a 
            freshly made roti that tastes like mom made it.
          </p>
          <p className="mt-4">
            Located in the heart of Ghaziabad, our kitchen follows strict hygiene protocols. We source fresh vegetables 
            daily from the local mandi and use premium spices to ensure every bite is packed with flavor and nutrition.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: ChefHat, title: "Home Chefs", desc: "Expert home cooks preparing your meals." },
            { icon: Award, title: "Quality First", desc: "No preservatives, just fresh ingredients." },
            { icon: Clock, title: "On Time", desc: "Reliable delivery for your lunch & dinner." },
          ].map((item, i) => (
            <div key={i} className="p-6 bg-secondary/30 rounded-2xl border border-secondary text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-primary shadow-sm">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-muted p-8 rounded-3xl text-center space-y-4">
          <h2 className="text-2xl font-bold font-display">FSSAI Certified Kitchen</h2>
          <p className="text-muted-foreground">License No: 22725698000124</p>
          <p className="text-sm">We adhere to the highest standards of food safety and hygiene.</p>
        </div>
      </div>
    </div>
  );
}
