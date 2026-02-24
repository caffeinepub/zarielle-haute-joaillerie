import React from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Sparkles, Shield, Truck, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useGetCraftsmanshipStory, useGetEthicalSourcingInfo } from '../hooks/useQueries';

const collections = [
  {
    name: 'Royal Bridal',
    slug: 'royalBridal',
    image: '/assets/generated/collection-royal-bridal.dim_800x600.jpg',
    description: 'Timeless bridal heritage meets contemporary grandeur',
  },
  {
    name: 'Temple Grandeur',
    slug: 'templeGrandeur',
    image: '/assets/generated/collection-temple-grandeur.dim_800x600.jpg',
    description: 'Sacred artistry in 22K gold',
  },
  {
    name: 'Diamond Couture',
    slug: 'diamondCouture',
    image: '/assets/generated/collection-diamond-couture.dim_800x600.jpg',
    description: 'Modern luxury, geometric precision',
  },
  {
    name: 'Limited Editions',
    slug: 'limitedEditions',
    image: '/assets/generated/collection-limited-editions.dim_800x600.jpg',
    description: 'Exclusive statement pieces for collectors',
  },
];

const lookbookImages = [
  '/assets/generated/lookbook-1.dim_600x800.jpg',
  '/assets/generated/lookbook-2.dim_600x800.jpg',
  '/assets/generated/lookbook-3.dim_600x800.jpg',
  '/assets/generated/lookbook-4.dim_600x800.jpg',
  '/assets/generated/lookbook-5.dim_600x800.jpg',
  '/assets/generated/lookbook-6.dim_600x800.jpg',
];

export function HomePage() {
  const { data: craftsmanshipStory } = useGetCraftsmanshipStory();
  const { data: ethicalSourcingInfo } = useGetEthicalSourcingInfo();

  return (
    <div className="min-h-screen">
      <div className="relative h-screen w-full overflow-hidden bg-primary">
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-bridal-gold.dim_1920x1080.jpg"
            alt="Luxury bridal jewellery"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
        </div>

        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <div className="text-center max-w-5xl mx-auto space-y-12 animate-fade-in-slow">
            <h1 className="font-serif-luxury text-display-xl md:text-display-2xl text-primary-foreground">
              Eternal Brilliance.
              <br />
              Timeless Power.
            </h1>
            <p className="text-2xl md:text-3xl text-primary-foreground/90 font-light tracking-wide max-w-3xl mx-auto leading-relaxed">
              Ultra-premium haute joaillerie for the discerning few
            </p>
            <div className="pt-12">
              <Link to="/collections/royalBridal">
                <Button
                  size="lg"
                  variant="secondary"
                  className="px-12 py-8 text-sm uppercase tracking-[0.2em] hover:shadow-gold-glow luxury-transition"
                >
                  Explore Collections <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-6 py-48">
        <div className="text-center mb-24">
          <h2 className="font-serif-luxury text-display-lg text-foreground mb-8">
            Haute Collections
          </h2>
          <p className="text-muted-foreground text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Four distinct expressions of luxury, each a masterpiece of design and craftsmanship
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {collections.map((collection, index) => (
            <Link
              key={collection.slug}
              to={`/collections/${collection.slug}`}
              className={`group animate-luxury-entrance-delay-${index}`}
            >
              <Card className="border-0 shadow-luxury overflow-hidden bg-card gold-glow">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover luxury-transition group-hover:scale-105"
                  />
                </div>
                <div className="p-10">
                  <h3 className="font-serif-luxury text-4xl mb-3 text-foreground">
                    {collection.name}
                  </h3>
                  <p className="text-muted-foreground font-light text-lg leading-relaxed">{collection.description}</p>
                  <div className="mt-8 flex items-center text-secondary text-sm uppercase tracking-[0.15em] font-medium">
                    Discover <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-muted/30 py-48">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="font-serif-luxury text-display-lg text-foreground mb-8">
              High Jewellery Lookbook
            </h2>
            <p className="text-muted-foreground text-xl font-light max-w-2xl mx-auto leading-relaxed">
              Editorial imagery celebrating the art of luxury jewellery
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {lookbookImages.map((image, index) => (
              <div
                key={index}
                className="aspect-[3/4] overflow-hidden bg-card rounded-sm shadow-luxury group cursor-pointer"
              >
                <img
                  src={image}
                  alt={`Lookbook ${index + 1}`}
                  className="w-full h-full object-cover luxury-transition group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/lookbook">
              <Button
                variant="outline"
                size="lg"
                className="px-10 py-7 text-sm uppercase tracking-[0.2em] luxury-transition"
              >
                View Full Lookbook <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-48">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif-luxury text-display-lg text-foreground mb-12">
            The Art of Craftsmanship
          </h2>
          <div className="prose prose-xl max-w-none text-muted-foreground font-light leading-loose">
            {craftsmanshipStory || (
              <p>
                Every Zarielle piece is born from the hands of master artisans who have perfected
                their craft over generations. From the initial sketch to the final polish, each
                creation undergoes over 200 hours of meticulous work. We blend traditional
                goldsmithing techniques with contemporary design sensibilities to create jewellery
                that transcends time.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-48">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif-luxury text-display-lg text-foreground mb-12">
              Ethical Excellence
            </h2>
            <div className="prose prose-xl max-w-none text-muted-foreground font-light leading-loose mb-16">
              {ethicalSourcingInfo || (
                <p>
                  Every gram of gold is BIS hallmark certified. Every diamond is conflict-free and
                  GIA certified. We believe true luxury carries the responsibility of ethical
                  sourcing and environmental consciousness.
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-20">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Shield className="h-10 w-10 text-secondary" />
                </div>
                <h3 className="text-sm uppercase tracking-[0.15em] font-medium mb-3">
                  BIS Hallmark
                </h3>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">Certified Gold Purity</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Sparkles className="h-10 w-10 text-secondary" />
                </div>
                <h3 className="text-sm uppercase tracking-[0.15em] font-medium mb-3">
                  GIA Certified
                </h3>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">Conflict-Free Diamonds</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Truck className="h-10 w-10 text-secondary" />
                </div>
                <h3 className="text-sm uppercase tracking-[0.15em] font-medium mb-3">
                  Insured Delivery
                </h3>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">White-Glove Service</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Award className="h-10 w-10 text-secondary" />
                </div>
                <h3 className="text-sm uppercase tracking-[0.15em] font-medium mb-3">
                  Lifetime Exchange
                </h3>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">Our Promise to You</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-48">
        <Card className="bg-primary text-primary-foreground border-0 shadow-luxury-lg overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
            <img
              src="/assets/generated/lookbook-2.dim_600x800.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 p-16 md:p-24 max-w-2xl">
            <h2 className="font-serif-luxury text-5xl md:text-6xl mb-8 leading-tight">
              Experience Luxury in Private
            </h2>
            <p className="text-xl font-light leading-loose mb-12 opacity-90">
              Book a private viewing at our atelier or schedule a video consultation with our
              jewellery experts. Discover pieces tailored to your vision.
            </p>
            <Link to="/appointments">
              <Button
                size="lg"
                variant="secondary"
                className="px-10 py-8 text-sm uppercase tracking-[0.2em] luxury-transition"
              >
                Book Your Appointment <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      <section className="container mx-auto px-6 pb-48">
        <div className="text-center mb-24">
          <h2 className="font-serif-luxury text-display-lg text-foreground mb-8">
            Voices of Distinction
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <Card className="p-10 border-0 shadow-luxury">
            <p className="text-muted-foreground font-light leading-loose mb-8 italic text-lg">
              "Zarielle transformed my bridal vision into reality. The craftsmanship is
              unparalleled, and the service felt like royalty."
            </p>
            <div className="flex items-center gap-4">
              <div>
                <p className="font-medium text-lg">Priya Malhotra</p>
                <p className="text-sm text-muted-foreground">Mumbai</p>
              </div>
            </div>
          </Card>

          <Card className="p-10 border-0 shadow-luxury">
            <p className="text-muted-foreground font-light leading-loose mb-8 italic text-lg">
              "A limited edition piece that becomes a conversation starter at every gala. Timeless
              investment, flawless execution."
            </p>
            <div className="flex items-center gap-4">
              <div>
                <p className="font-medium text-lg">Rajesh Kapoor</p>
                <p className="text-sm text-muted-foreground">Delhi</p>
              </div>
            </div>
          </Card>

          <Card className="p-10 border-0 shadow-luxury">
            <p className="text-muted-foreground font-light leading-loose mb-8 italic text-lg">
              "The private viewing experience was exceptional. They understood my aesthetic and
              curated pieces that felt made for me."
            </p>
            <div className="flex items-center gap-4">
              <div>
                <p className="font-medium text-lg">Aisha Verma</p>
                <p className="text-sm text-muted-foreground">Bangalore</p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
