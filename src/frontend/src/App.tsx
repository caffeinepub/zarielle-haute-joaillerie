import React from 'react';
import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { HomePage } from './pages/HomePage';
import { CollectionPage } from './pages/CollectionPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { AdminDashboard } from './pages/AdminDashboard';

function RootLayout() {
  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster position="bottom-right" richColors />
    </>
  );
}

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const collectionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/collections/$collection',
  component: CollectionPage,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/product/$productId',
  component: ProductDetailPage,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: CartPage,
});

const appointmentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/appointments',
  component: AppointmentsPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminDashboard,
});

const lookbookRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/lookbook',
  component: () => (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <h1 className="font-serif-luxury text-5xl md:text-7xl text-center mb-12">
          High Jewellery Lookbook
        </h1>
        <p className="text-center text-muted-foreground mb-20 text-lg">
          Editorial imagery celebrating the art of luxury jewellery
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div key={num} className="aspect-[3/4] bg-muted/20 rounded-sm overflow-hidden shadow-luxury">
              <img
                src={`/assets/generated/lookbook-${num}.dim_600x800.jpg`}
                alt={`Lookbook ${num}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
});

const storyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/story',
  component: () => (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif-luxury text-5xl md:text-7xl mb-12">Our Story</h1>
          <div className="prose prose-lg max-w-none text-muted-foreground font-light leading-relaxed space-y-6">
            <p>
              Zarielle Haute Joaillerie was born from a singular vision: to create jewellery that transcends time, embodying both eternal brilliance and timeless power.
            </p>
            <p>
              Each piece in our collection represents the culmination of master craftsmanship, passed down through generations of artisans who have dedicated their lives to the art of jewellery making.
            </p>
            <p>
              We source only the finest materials: BIS hallmark certified gold and GIA certified, conflict-free diamonds. Every creation undergoes over 200 hours of meticulous work, from initial sketch to final polish.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/checkout',
  component: () => (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <h1 className="font-serif-luxury text-5xl md:text-7xl text-center mb-12">
          Checkout Coming Soon
        </h1>
        <p className="text-center text-muted-foreground">
          Payment integration will be implemented in the next phase
        </p>
      </div>
    </div>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  collectionRoute,
  productRoute,
  cartRoute,
  appointmentsRoute,
  adminRoute,
  lookbookRoute,
  storyRoute,
  checkoutRoute,
]);

const router = createRouter({ routeTree });

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </ThemeProvider>
  );
}
