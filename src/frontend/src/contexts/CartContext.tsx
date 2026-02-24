import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ProductId, MetalType } from '../backend';

export interface CartItemType {
  productId: ProductId;
  productName: string;
  metalType: MetalType;
  weight: number;
  quantity: number;
  pricePerUnit: bigint;
  imageUrl?: string;
  engraving?: string;
  giftWrap?: boolean;
}

interface CartContextType {
  items: CartItemType[];
  addItem: (item: CartItemType) => void;
  removeItem: (productId: ProductId) => void;
  updateQuantity: (productId: ProductId, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: bigint;
}

const CartContext = createContext<CartContextType | null>(null);

const CART_STORAGE_KEY = 'zarielle_cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItemType[]>(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];
    try {
      const parsed = JSON.parse(stored);
      return parsed.map((item: any) => ({
        ...item,
        productId: BigInt(item.productId),
        pricePerUnit: BigInt(item.pricePerUnit),
      }));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const serialized = items.map((item) => ({
      ...item,
      productId: item.productId.toString(),
      pricePerUnit: item.pricePerUnit.toString(),
    }));
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(serialized));
  }, [items]);

  const addItem = (item: CartItemType) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeItem = (productId: ProductId) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const updateQuantity = (productId: ProductId, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) => prev.map((i) => (i.productId === productId ? { ...i, quantity } : i)));
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.pricePerUnit * BigInt(item.quantity),
    BigInt(0)
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
