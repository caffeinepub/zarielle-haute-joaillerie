import React, { useState, useEffect } from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { Loader2, Shield, Sparkles, Truck, Award, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from 'sonner';
import { useGetProductById, useCalculatePrice, useGetGoldRates } from '../hooks/useQueries';
import { useCart } from '../contexts/CartContext';
import { MetalType } from '../backend';
import { formatINR, formatWeight, getMetalTypeName } from '../utils/format';

export function ProductDetailPage() {
  const { productId } = useParams({ from: '/product/$productId' });
  const { data: product, isLoading } = useGetProductById(BigInt(productId));
  const { data: goldRates } = useGetGoldRates();
  const calculatePrice = useCalculatePrice();
  const { addItem } = useCart();

  const [selectedMetal, setSelectedMetal] = useState<MetalType | null>(null);
  const [weight, setWeight] = useState(0);
  const [engraving, setEngraving] = useState('');
  const [giftWrap, setGiftWrap] = useState(false);
  const [priceBreakdown, setPriceBreakdown] = useState<any>(null);

  useEffect(() => {
    if (product && product.metalOptions.length > 0) {
      setSelectedMetal(product.metalOptions[0]);
      setWeight(product.weightMin);
    }
  }, [product]);

  useEffect(() => {
    if (product && selectedMetal && weight > 0) {
      const basePriceNum = Number(product.basePrice);
      const makingCharges = BigInt(Math.round(basePriceNum * 0.15));
      const gst = BigInt(300);

      calculatePrice.mutate(
        {
          productId: product.id,
          metalType: selectedMetal,
          weight,
          makingCharges,
          gst,
        },
        {
          onSuccess: (data) => {
            if (data) {
              setPriceBreakdown(data);
            }
          },
        }
      );
    }
  }, [product, selectedMetal, weight]);

  const handleAddToCart = () => {
    if (!product || !selectedMetal || !priceBreakdown) {
      toast.error('Please select all options');
      return;
    }

    const imageUrl = product.images && product.images.length > 0 
      ? product.images[0].getDirectURL() 
      : undefined;

    addItem({
      productId: product.id,
      productName: product.name,
      metalType: selectedMetal,
      weight,
      quantity: 1,
      pricePerUnit: priceBreakdown.finalPrice,
      imageUrl,
      engraving: engraving || undefined,
      giftWrap,
    });

    toast.success('Added to cart');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-secondary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-lg mb-4">Product not found</p>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-8 animate-fade-in">
            {product.images && product.images.length > 0 ? (
              <div className="aspect-square bg-muted/20 rounded-sm overflow-hidden shadow-luxury-lg group">
                <img
                  src={product.images[0].getDirectURL()}
                  alt={product.name}
                  className="w-full h-full object-cover luxury-transition group-hover:scale-110"
                />
              </div>
            ) : (
              <div className="aspect-square bg-muted/20 rounded-sm flex items-center justify-center">
                <span className="text-muted-foreground">No image available</span>
              </div>
            )}

            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-6">
                {product.images.slice(1).map((img, index) => (
                  <div key={index} className="aspect-square bg-muted/20 rounded-sm overflow-hidden cursor-pointer hover:opacity-80 luxury-transition">
                    <img
                      src={img.getDirectURL()}
                      alt={`${product.name} ${index + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-10 animate-fade-in-slow">
            <div>
              <div className="flex items-start justify-between gap-4 mb-6">
                <h1 className="font-serif-luxury text-5xl md:text-6xl text-foreground leading-tight">
                  {product.name}
                </h1>
                {product.limitedEdition && (
                  <Badge className="bg-secondary text-primary px-4 py-2 text-sm">
                    Limited Edition
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground font-light text-xl leading-loose">
                {product.description}
              </p>
            </div>

            <Card className="p-8 bg-muted/20 border-border">
              <div className="space-y-8">
                <div>
                  <Label className="text-sm uppercase tracking-[0.15em] mb-4 block">Metal Type</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {product.metalOptions.map((metal) => (
                      <button
                        key={metal}
                        onClick={() => setSelectedMetal(metal)}
                        className={`px-5 py-4 border rounded-sm text-sm font-medium luxury-transition ${
                          selectedMetal === metal
                            ? 'border-secondary bg-secondary text-primary'
                            : 'border-border hover:border-secondary/50'
                        }`}
                      >
                        {getMetalTypeName(metal)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Label className="text-sm uppercase tracking-[0.15em]">
                      Weight: {formatWeight(weight)}
                    </Label>
                    <span className="text-xs text-muted-foreground">
                      {formatWeight(product.weightMin)} - {formatWeight(product.weightMax)}
                    </span>
                  </div>
                  <Slider
                    value={[weight]}
                    onValueChange={(values) => setWeight(values[0])}
                    min={product.weightMin}
                    max={product.weightMax}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="engraving" className="text-sm uppercase tracking-[0.15em] mb-4 block">
                    Personalized Engraving (Optional)
                  </Label>
                  <Input
                    id="engraving"
                    value={engraving}
                    onChange={(e) => setEngraving(e.target.value)}
                    placeholder="Enter your message (max 20 characters)"
                    maxLength={20}
                    className="bg-background text-base py-6"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <Checkbox
                    id="giftWrap"
                    checked={giftWrap}
                    onCheckedChange={(checked) => setGiftWrap(checked === true)}
                  />
                  <Label htmlFor="giftWrap" className="text-base cursor-pointer">
                    Premium Gift Wrapping (+₹500)
                  </Label>
                </div>
              </div>
            </Card>

            {priceBreakdown && (
              <Card className="p-8 border-border">
                <h3 className="text-sm uppercase tracking-[0.15em] font-medium mb-6">Price Breakdown</h3>
                <div className="space-y-3 text-base">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Base Price</span>
                    <span className="font-medium">{formatINR(priceBreakdown.basePrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gold Rate ({getMetalTypeName(selectedMetal!)})</span>
                    <span className="font-medium">{formatINR(priceBreakdown.goldRate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Making Charges</span>
                    <span className="font-medium">{formatINR(priceBreakdown.makingCharges)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GST (3%)</span>
                    <span className="font-medium">{formatINR(priceBreakdown.gst)}</span>
                  </div>
                  {giftWrap && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gift Wrapping</span>
                      <span className="font-medium">₹500</span>
                    </div>
                  )}
                  <div className="pt-4 mt-4 border-t border-border flex justify-between text-xl">
                    <span className="font-medium">Total</span>
                    <span className="font-serif-luxury text-3xl text-secondary">
                      {formatINR(priceBreakdown.finalPrice + (giftWrap ? BigInt(50000) : BigInt(0)))}
                    </span>
                  </div>
                </div>
              </Card>
            )}

            <div className="flex flex-col sm:flex-row gap-5">
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={calculatePrice.isPending || !priceBreakdown}
                className="flex-1 py-7 text-sm uppercase tracking-[0.2em] bg-primary hover:bg-primary/90 luxury-transition"
              >
                {calculatePrice.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Calculating...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Add to Cart
                  </>
                )}
              </Button>
              <Link to="/appointments" className="flex-1">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full py-7 text-sm uppercase tracking-[0.2em] luxury-transition"
                >
                  Request Private Viewing
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-4 p-5 border border-border rounded-sm">
                <Shield className="h-7 w-7 text-secondary shrink-0" />
                <div>
                  <p className="text-base font-medium">BIS Hallmark</p>
                  <p className="text-xs text-muted-foreground">Certified Purity</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-5 border border-border rounded-sm">
                <Sparkles className="h-7 w-7 text-secondary shrink-0" />
                <div>
                  <p className="text-base font-medium">GIA Certified</p>
                  <p className="text-xs text-muted-foreground">Diamonds</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-5 border border-border rounded-sm">
                <Truck className="h-7 w-7 text-secondary shrink-0" />
                <div>
                  <p className="text-base font-medium">Insured Shipping</p>
                  <p className="text-xs text-muted-foreground">White-Glove</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-5 border border-border rounded-sm">
                <Award className="h-7 w-7 text-secondary shrink-0" />
                <div>
                  <p className="text-base font-medium">Lifetime Exchange</p>
                  <p className="text-xs text-muted-foreground">Guaranteed</p>
                </div>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="specifications">
                <AccordionTrigger className="text-sm uppercase tracking-[0.15em] py-5">
                  Specifications
                </AccordionTrigger>
                <AccordionContent className="space-y-3 text-base text-muted-foreground pt-2">
                  <div className="flex justify-between">
                    <span>Weight Range</span>
                    <span>{formatWeight(product.weightMin)} - {formatWeight(product.weightMax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Metal Options</span>
                    <span>{product.metalOptions.map(getMetalTypeName).join(', ')}</span>
                  </div>
                  {product.diamondCarat && (
                    <div className="flex justify-between">
                      <span>Diamond Carat</span>
                      <span>{product.diamondCarat} ct</span>
                    </div>
                  )}
                  {product.diamondClarity && (
                    <div className="flex justify-between">
                      <span>Diamond Clarity</span>
                      <span>{product.diamondClarity}</span>
                    </div>
                  )}
                  {product.diamondColor && (
                    <div className="flex justify-between">
                      <span>Diamond Color</span>
                      <span>{product.diamondColor}</span>
                    </div>
                  )}
                  {product.diamondCut && (
                    <div className="flex justify-between">
                      <span>Diamond Cut</span>
                      <span>{product.diamondCut}</span>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="certifications">
                <AccordionTrigger className="text-sm uppercase tracking-[0.15em] py-5">
                  Certifications
                </AccordionTrigger>
                <AccordionContent className="space-y-3 text-base text-muted-foreground pt-2">
                  <p>Gold Certification: {product.goldCertification || 'BIS Hallmark'}</p>
                  <p>GIA Certification: {product.giaCertification || 'Certified'}</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="delivery">
                <AccordionTrigger className="text-sm uppercase tracking-[0.15em] py-5">
                  Delivery & Returns
                </AccordionTrigger>
                <AccordionContent className="space-y-3 text-base text-muted-foreground pt-2">
                  <p>Free insured delivery across India</p>
                  <p>White-glove delivery service</p>
                  <p>7-day return policy</p>
                  <p>Lifetime exchange guarantee</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
