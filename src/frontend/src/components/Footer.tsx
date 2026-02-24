import React from 'react';
import { Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-32">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="font-serif-luxury text-2xl tracking-tight text-foreground">
                Zarielle
              </span>
              <span className="text-[0.5rem] tracking-[0.3em] text-muted-foreground uppercase font-light">
                Haute Joaillerie
              </span>
            </div>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Eternal Brilliance. Timeless Power.
            </p>
          </div>

          {/* Collections */}
          <div>
            <h3 className="text-sm uppercase tracking-wider font-medium mb-4">Collections</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/collections/royalBridal"
                  className="text-sm text-muted-foreground hover:text-secondary transition-colors duration-600 font-light"
                >
                  Royal Bridal
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/templeGrandeur"
                  className="text-sm text-muted-foreground hover:text-secondary transition-colors duration-600 font-light"
                >
                  Temple Grandeur
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/diamondCouture"
                  className="text-sm text-muted-foreground hover:text-secondary transition-colors duration-600 font-light"
                >
                  Diamond Couture
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/limitedEditions"
                  className="text-sm text-muted-foreground hover:text-secondary transition-colors duration-600 font-light"
                >
                  Limited Editions
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm uppercase tracking-wider font-medium mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/lookbook"
                  className="text-sm text-muted-foreground hover:text-secondary transition-colors duration-600 font-light"
                >
                  Lookbook
                </Link>
              </li>
              <li>
                <Link
                  to="/story"
                  className="text-sm text-muted-foreground hover:text-secondary transition-colors duration-600 font-light"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/appointments"
                  className="text-sm text-muted-foreground hover:text-secondary transition-colors duration-600 font-light"
                >
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm uppercase tracking-wider font-medium mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground font-light">
              <li>Private Viewings</li>
              <li>Video Consultations</li>
              <li>Bespoke Commissions</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground font-light flex items-center gap-1.5">
            © 2026. Built with{' '}
            <Heart className="h-3 w-3 fill-secondary text-secondary inline-block" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-light">
              BIS Hallmark Certified
            </span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-light">
              GIA Certified Diamonds
            </span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-light">
              Insured Delivery
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
