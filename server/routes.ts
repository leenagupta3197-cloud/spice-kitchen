import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Chatbot endpoint
  app.post(api.chatbot.chat.path, async (req, res) => {
    try {
      const { message } = req.body;
      const currentHour = new Date().getHours();
      
      // Check opening hours: 10 AM - 9:30 PM (hour 22 is 10 PM)
      if (currentHour < 10 || currentHour >= 22) {
        return res.json({
          reply: "Sorry, Spice Kitchen is currently closed. Our opening hours are 10:00 AM – 9:30 PM. Please come back later!",
        });
      }

      // Handle different user inputs
      const lowerMessage = message.toLowerCase();

      if (lowerMessage.includes("menu") || lowerMessage.includes("today")) {
        return res.json({
          reply: "Our today's menu includes delicious Thali, Sweets, Achar, and special Catering options. Visit our menu page to explore all items and place your order!",
        });
      }

      if (lowerMessage.includes("catering") || lowerMessage.includes("availability")) {
        return res.json({
          reply: "We offer special catering services for events and parties. Our catering is available for any area via Porter delivery. Contact us on WhatsApp: +91-9310153299 for catering inquiries!",
        });
      }

      if (lowerMessage.includes("delivery") || lowerMessage.includes("status")) {
        return res.json({
          reply: "We deliver to any area using Porter. For delivery updates, please check WhatsApp for order confirmation and estimated delivery time.",
        });
      }

      if (lowerMessage.includes("coming soon")) {
        return res.json({
          reply: "Great question! We have exciting new features coming soon. Stay tuned for updates!",
        });
      }

      // Default response for other questions
      return res.json({
        reply: "Thank you for your interest in Spice Kitchen! I can help you with Today's Menu, Catering & Availability, Delivery Status, or Coming Soon features. How can I assist you?",
      });
    } catch (error) {
      console.error("Error in chatbot:", error);
      res.status(400).json({
        reply: "Sorry, I encountered an error. Please try again later!",
      });
    }
  });

  app.get(api.menu.list.path, async (_req, res) => {
    const items = await storage.getMenuItems();
    res.json(items);
  });

  app.get(api.menu.get.path, async (req, res) => {
    const item = await storage.getMenuItem(Number(req.params.id));
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  });

  app.post(api.menu.list.path, async (req, res) => {
    try {
      const item = await storage.createMenuItem(req.body);
      res.status(201).json(item);
    } catch (error) {
      console.error('Error creating menu item:', error);
      res.status(400).json({ message: 'Failed to create menu item', error: String(error) });
    }
  });

  app.patch(api.menu.get.path, async (req, res) => {
    try {
      const item = await storage.updateMenuItem(Number(req.params.id), req.body);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.json(item);
    } catch (error) {
      console.error('Error updating menu item:', error);
      res.status(400).json({ message: 'Failed to update menu item', error: String(error) });
    }
  });

  app.delete(api.menu.get.path, async (req, res) => {
    try {
      const success = await storage.deleteMenuItem(Number(req.params.id));
      if (!success) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.json({ message: 'Menu item deleted' });
    } catch (error) {
      console.error('Error deleting menu item:', error);
      res.status(400).json({ message: 'Failed to delete menu item', error: String(error) });
    }
  });

  app.get(api.reviews.list.path, async (_req, res) => {
    const reviews = await storage.getReviews();
    res.json(reviews);
  });

  // Seed data endpoint (internal use or auto-run)
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingItems = await storage.getMenuItems();
  if (existingItems.length === 0) {
    console.log("Seeding database with menu items...");
    
    // Thali
    await storage.createMenuItem({
      name: "Regular Veg Thali",
      description: "Dal, Seasonal Veg, 2 Roti, Rice, Salad, Pickle",
      price: 120,
      category: "Thali",
      imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80",
      isVegetarian: true,
      available: true
    });
    await storage.createMenuItem({
      name: "Special Paneer Thali",
      description: "Paneer Butter Masala, Dal Makhani, 2 Butter Naan, Jeera Rice, Sweet, Salad",
      price: 180,
      category: "Thali",
      imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80",
      isVegetarian: true,
      available: true
    });

    // Sweets
    await storage.createMenuItem({
      name: "Gulab Jamun (2 pcs)",
      description: "Soft homemade khoya jamuns in cardamom syrup",
      price: 50,
      category: "Sweets",
      imageUrl: "https://images.unsplash.com/photo-1564093497595-593b96d80180?w=800&q=80",
      isVegetarian: true,
      available: true
    });
    await storage.createMenuItem({
      name: "Gajar Ka Halwa (250g)",
      description: "Seasonal winter special made with fresh red carrots and ghee",
      price: 120,
      category: "Sweets",
      imageUrl: "https://images.unsplash.com/photo-1564093497595-593b96d80180?w=800&q=80",
      isVegetarian: true,
      available: true
    });

    // Achar
    await storage.createMenuItem({
      name: "Homemade Mango Pickle",
      description: "Traditional grandmother's recipe, sun-dried (250g jar)",
      price: 150,
      category: "Achar",
      imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
      isVegetarian: true,
      available: true
    });

    // Catering
    await storage.createMenuItem({
      name: "Small Party Catering Box",
      description: "Complete meal solution for 5-10 people. Call for customization.",
      price: 1500,
      category: "Catering",
      imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80",
      isVegetarian: true,
      available: true
    });
    
    // Reviews
    await storage.createReview({
      name: "Priya Sharma",
      rating: 5,
      comment: "Best ghar ka khana in Ghaziabad! The Paneer Thali is amazing.",
      date: "2 days ago"
    });
    await storage.createReview({
      name: "Rahul Verma",
      rating: 4,
      comment: "Very hygienic and fresh. Delivery was on time via Porter.",
      date: "1 week ago"
    });
  }
}
