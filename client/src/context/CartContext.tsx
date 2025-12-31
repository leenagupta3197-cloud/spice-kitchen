import React, { createContext, useContext, useState, useEffect } from "react";
import type { MenuItemResponse } from "@shared/routes";

export interface CartItem extends MenuItemResponse {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItemResponse) => void;
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, delta: number) => void;
  clearCart: () => void;
  totalAmount: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Calculate totals
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const addItem = (item: MenuItemResponse) => {
    setItems((current) => {
      const existing = current.find((i) => i.id === item.id);
      if (existing) {
        return current.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...current, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (itemId: number) => {
    setItems((current) => current.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId: number, delta: number) => {
    setItems((current) => {
      return current.map((item) => {
        if (item.id === itemId) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter((item) => item.quantity > 0);
    });
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalAmount, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
