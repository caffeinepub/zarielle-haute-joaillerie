import React from 'react';
import { Link } from '@tanstack/react-router';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCart } from '../contexts/CartContext';
import { formatINR, formatWeight, getMetalTypeName } from '../utils/format';

export function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  const gst = (totalPrice * BigInt(3)) / BigInt(100);
  const finalTotal = totalPrice + gst;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <ShoppingBag className="h-20 w-20 mx-auto text-muted-foreground/40 mb-6" />
          <h2 className="font-serif-luxury text-3xl text-foreground mb-4">Your Cart is Empty</h2>
          <p className="text-muted-foreground font-light mb-8">
            Discover our exquisite collections and find pieces that speak to your soul.
          </p>
          <Link to="/collections/royalBridal">
            <Button size="lg" className="px-8 py-6 text-sm uppercase tracking-widest">
              Explore Collections <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif-luxury text-4xl md:text-6xl text-foreground mb-12 animate-fade-in">
            Your Selection
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <Card key={item.productId.toString()} className="p-6 border-border shadow-luxury">
                  <div className="flex gap-6">
                    <div className="w-32 h-32 shrink-0 bg-muted/20 rounded-sm overflow-hidden">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-muted-foreground text-xs">No image</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-serif-luxury text-xl text-foreground mb-1">
                            {item.productName}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {getMetalTypeName(item.metalType)} • {formatWeight(item.weight)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      {item.engraving && (
                        <p className="text-sm text-muted-foreground mb-2">
                          Engraving: <span className="italic">&quot;{item.engraving}&quot;</span>
                        </p>
                      )}
                      {item.giftWrap && (
                        <p className="text-sm text-muted-foreground mb-2">
                          Premium Gift Wrapping included
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <label className="text-sm text-muted-foreground">Quantity:</label>
                          <div className="flex items-center border border-border rounded-sm">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="px-3 py-1 hover:bg-muted transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              −
                            </button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(item.productId, parseInt(e.target.value) || 1)
                              }
                              className="w-16 text-center border-0 focus-visible:ring-0"
                              min={1}
                            />
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="px-3 py-1 hover:bg-muted transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <p className="text-lg font-medium text-foreground">
                          {formatINR(item.pricePerUnit * BigInt(item.quantity))}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="lg:sticky lg:top-32 h-fit">
              <Card className="p-8 border-border shadow-luxury-lg">
                <h3 className="font-serif-luxury text-2xl mb-6">Order Summary</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatINR(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">GST (3%)</span>
                    <span className="font-medium">{formatINR(gst)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-secondary">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Insurance</span>
                    <span className="font-medium text-secondary">Included</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-border mb-8">
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-medium">Total</span>
                    <span className="font-serif-luxury text-3xl text-secondary">
                      {formatINR(finalTotal)}
                    </span>
                  </div>
                </div>

                <Link to="/checkout">
                  <Button size="lg" className="w-full py-6 text-sm uppercase tracking-widest mb-4">
                    Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <Link to="/collections/royalBridal" className="block">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full py-6 text-sm uppercase tracking-widest"
                  >
                    Continue Shopping
                  </Button>
                </Link>

                <div className="mt-8 pt-8 border-t border-border space-y-3 text-sm text-muted-foreground">
                  <p className="flex items-start gap-2">
                    <span className="text-secondary">✓</span>
                    <span>Free insured shipping across India</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-secondary">✓</span>
                    <span>7-day return policy</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-secondary">✓</span>
                    <span>Lifetime exchange guarantee</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-secondary">✓</span>
                    <span>White-glove delivery service</span>
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
