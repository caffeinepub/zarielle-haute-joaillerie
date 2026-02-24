import React, { useState, useEffect } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { ShoppingBag, Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../hooks/useQueries';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const { data: isAdmin } = useIsCallerAdmin();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAuthenticated = !!identity;
  const isHomepage = location.pathname === '/';

  const navClasses = `fixed top-0 left-0 right-0 z-50 luxury-transition ${
    scrolled || !isHomepage
      ? 'bg-background/95 backdrop-blur-md shadow-luxury border-b border-border'
      : 'bg-transparent'
  }`;

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
    } else {
      await login();
    }
  };

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col group">
            <span className="font-serif-luxury text-3xl text-foreground luxury-transition group-hover:text-secondary">
              Zarielle
            </span>
            <span className="text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase font-light">
              Haute Joaillerie
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            <Link
              to="/collections/royalBridal"
              className="text-sm font-light tracking-wide uppercase text-foreground/80 hover:text-secondary luxury-transition"
            >
              Collections
            </Link>
            <Link
              to="/lookbook"
              className="text-sm font-light tracking-wide uppercase text-foreground/80 hover:text-secondary luxury-transition"
            >
              Lookbook
            </Link>
            <Link
              to="/story"
              className="text-sm font-light tracking-wide uppercase text-foreground/80 hover:text-secondary luxury-transition"
            >
              Our Story
            </Link>
            <Link
              to="/appointments"
              className="text-sm font-light tracking-wide uppercase text-foreground/80 hover:text-secondary luxury-transition"
            >
              Book Appointment
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {isAdmin && (
              <Link to="/admin">
                <Button variant="ghost" size="sm" className="text-xs uppercase tracking-wider">
                  Admin
                </Button>
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-foreground hover:text-secondary"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleAuth}
              disabled={loginStatus === 'logging-in'}
              className="text-xs uppercase tracking-wider"
            >
              {loginStatus === 'logging-in'
                ? 'Loading...'
                : isAuthenticated
                ? 'Sign Out'
                : 'Sign In'}
            </Button>
            <Link to="/cart" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:text-secondary relative"
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-secondary text-primary text-xs flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-6 pb-4 space-y-4 border-t border-border mt-4 animate-fade-in">
            <Link
              to="/collections/royalBridal"
              className="block text-sm font-light tracking-wide uppercase text-foreground/80 hover:text-secondary luxury-transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Collections
            </Link>
            <Link
              to="/lookbook"
              className="block text-sm font-light tracking-wide uppercase text-foreground/80 hover:text-secondary luxury-transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Lookbook
            </Link>
            <Link
              to="/story"
              className="block text-sm font-light tracking-wide uppercase text-foreground/80 hover:text-secondary luxury-transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Our Story
            </Link>
            <Link
              to="/appointments"
              className="block text-sm font-light tracking-wide uppercase text-foreground/80 hover:text-secondary luxury-transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Appointment
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className="block text-sm font-light tracking-wide uppercase text-foreground/80 hover:text-secondary luxury-transition py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            <Link
              to="/cart"
              className="block text-sm font-light tracking-wide uppercase text-foreground/80 hover:text-secondary luxury-transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cart {totalItems > 0 && `(${totalItems})`}
            </Link>
            <div className="flex items-center gap-4 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="flex items-center gap-2"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="h-4 w-4" /> Light
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4" /> Dark
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAuth}
                disabled={loginStatus === 'logging-in'}
                className="flex-1"
              >
                {loginStatus === 'logging-in'
                  ? 'Loading...'
                  : isAuthenticated
                  ? 'Sign Out'
                  : 'Sign In'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
