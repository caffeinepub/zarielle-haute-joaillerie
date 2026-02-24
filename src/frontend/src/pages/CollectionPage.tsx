import React from 'react';
import { Link, useParams } from '@tanstack/react-router';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useListProducts } from '../hooks/useQueries';
import { ProductCollection } from '../backend';
import { formatPriceFrom, getCollectionName, getProductRoute } from '../utils/format';

export function CollectionPage() {
  const { collection } = useParams({ from: '/collections/$collection' });
  const { data: products, isLoading } = useListProducts(collection as ProductCollection);

  const collectionName = getCollectionName(collection);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-secondary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24 max-w-3xl mx-auto animate-fade-in">
          <h1 className="font-serif-luxury text-display-lg md:text-display-xl text-foreground mb-8">
            {collectionName}
          </h1>
          <p className="text-muted-foreground text-xl font-light leading-loose">
            {collection === 'royalBridal' &&
              'Timeless bridal heritage meets contemporary grandeur'}
            {collection === 'templeGrandeur' && 'Sacred artistry in 22K gold'}
            {collection === 'diamondCouture' && 'Modern luxury, geometric precision'}
            {collection === 'limitedEditions' &&
              'Exclusive statement pieces for collectors'}
          </p>
        </div>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-7xl mx-auto">
            {products.map((product) => (
              <Link
                key={product.id.toString()}
                to={getProductRoute(product.id)}
                className="group"
              >
                <Card className="border-0 shadow-luxury overflow-hidden bg-card gold-glow">
                  <div className="aspect-square overflow-hidden bg-muted/20">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0].getDirectURL()}
                        alt={product.name}
                        className="w-full h-full object-cover luxury-transition group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-muted-foreground">No image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <h3 className="font-serif-luxury text-3xl text-foreground">
                        {product.name}
                      </h3>
                      {product.limitedEdition && (
                        <Badge className="bg-secondary text-primary text-xs px-2 py-1">
                          Limited
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground font-light text-base mb-6 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                    <p className="text-foreground text-xl font-medium mb-6">
                      {formatPriceFrom(product.basePrice)}
                    </p>
                    <div className="flex items-center text-secondary text-sm uppercase tracking-[0.15em] font-medium">
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <p className="text-muted-foreground text-xl font-light">
              No products available in this collection yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
