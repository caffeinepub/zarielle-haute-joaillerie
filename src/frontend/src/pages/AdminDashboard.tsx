import React from 'react';
import { Navigate, Link } from '@tanstack/react-router';
import { Package, Calendar, Users, Settings, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useIsCallerAdmin, useListProducts, useListAppointments, useListClients } from '../hooks/useQueries';

export function AdminDashboard() {
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: products } = useListProducts();
  const { data: appointments } = useListAppointments();
  const { data: clients } = useListClients();

  if (adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-secondary" />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif-luxury text-5xl md:text-display-lg text-foreground mb-16">
            Admin Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 border-border shadow-luxury">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-[0.15em] mb-2">Products</p>
                  <p className="text-4xl font-serif-luxury text-foreground mt-3">
                    {products?.length || 0}
                  </p>
                </div>
                <Package className="h-10 w-10 text-secondary" />
              </div>
            </Card>

            <Card className="p-8 border-border shadow-luxury">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-[0.15em] mb-2">
                    Appointments
                  </p>
                  <p className="text-4xl font-serif-luxury text-foreground mt-3">
                    {appointments?.length || 0}
                  </p>
                </div>
                <Calendar className="h-10 w-10 text-secondary" />
              </div>
            </Card>

            <Card className="p-8 border-border shadow-luxury">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-[0.15em] mb-2">Clients</p>
                  <p className="text-4xl font-serif-luxury text-foreground mt-3">
                    {clients?.length || 0}
                  </p>
                </div>
                <Users className="h-10 w-10 text-secondary" />
              </div>
            </Card>
          </div>

          <Card className="p-10 border-border shadow-luxury mb-12">
            <h2 className="font-serif-luxury text-3xl mb-8">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link to="/admin/products">
                <button className="w-full px-8 py-5 border border-border rounded-sm hover:bg-secondary hover:text-primary hover:border-secondary luxury-transition text-sm uppercase tracking-[0.15em]">
                  Manage Products
                </button>
              </Link>
              <Link to="/admin/appointments">
                <button className="w-full px-8 py-5 border border-border rounded-sm hover:bg-secondary hover:text-primary hover:border-secondary luxury-transition text-sm uppercase tracking-[0.15em]">
                  View Appointments
                </button>
              </Link>
              <Link to="/admin/gold-rates">
                <button className="w-full px-8 py-5 border border-border rounded-sm hover:bg-secondary hover:text-primary hover:border-secondary luxury-transition text-sm uppercase tracking-[0.15em]">
                  Update Gold Rates
                </button>
              </Link>
              <Link to="/admin/content">
                <button className="w-full px-8 py-5 border border-border rounded-sm hover:bg-secondary hover:text-primary hover:border-secondary luxury-transition text-sm uppercase tracking-[0.15em]">
                  Edit Content
                </button>
              </Link>
            </div>
          </Card>

          <div className="text-center text-muted-foreground text-base font-light">
            <p>Admin features are under development. Basic dashboard shown above.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
