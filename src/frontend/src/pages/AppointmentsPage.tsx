import React, { useState } from 'react';
import { Calendar, Video, MapPin, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useCreateAppointment } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { AppointmentType, Appointment, AppointmentStatus } from '../backend';

export function AppointmentsPage() {
  const { identity } = useInternetIdentity();
  const createAppointment = useCreateAppointment();

  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    appointmentType: AppointmentType.video,
    preferredDate: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.clientName || !formData.email || !formData.phone || !formData.preferredDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    const appointment: Appointment = {
      id: BigInt(0),
      clientName: formData.clientName,
      email: formData.email,
      phone: formData.phone,
      appointmentType: formData.appointmentType,
      preferredDate: BigInt(new Date(formData.preferredDate).getTime() * 1_000_000),
      notes: formData.notes,
      status: AppointmentStatus.pending,
      createdAt: BigInt(Date.now() * 1_000_000),
      updatedAt: BigInt(Date.now() * 1_000_000),
      createdBy: identity ? identity.getPrincipal() : (() => { throw new Error('Not authenticated'); })(),
    };

    try {
      await createAppointment.mutateAsync(appointment);
      setSubmitted(true);
      toast.success('Appointment request submitted successfully');
    } catch (error) {
      toast.error('Failed to submit appointment request');
      console.error(error);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <CheckCircle className="h-20 w-20 mx-auto text-secondary mb-6" />
          <h2 className="font-serif-luxury text-4xl text-foreground mb-4">
            Appointment Request Received
          </h2>
          <p className="text-muted-foreground font-light text-lg mb-8 leading-relaxed">
            Thank you for your interest in Zarielle. Our concierge team will review your request and
            contact you within 24 hours to confirm your appointment details.
          </p>
          <Button onClick={() => setSubmitted(false)} variant="outline">
            Book Another Appointment
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-serif-luxury text-5xl md:text-7xl text-foreground mb-6 tracking-tight">
              Book an Appointment
            </h1>
            <p className="text-muted-foreground text-lg font-light leading-relaxed max-w-2xl mx-auto">
              Experience personalized service with our jewellery experts. Schedule a private viewing
              or video consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card
              className={`p-8 border-2 cursor-pointer transition-all duration-300 ${
                formData.appointmentType === AppointmentType.video
                  ? 'border-secondary shadow-gold-glow'
                  : 'border-border hover:border-secondary/50'
              }`}
              onClick={() => setFormData({ ...formData, appointmentType: AppointmentType.video })}
            >
              <Video className="h-12 w-12 text-secondary mb-4" />
              <h3 className="font-serif-luxury text-2xl mb-2">Video Consultation</h3>
              <p className="text-muted-foreground font-light">
                Connect with our experts from the comfort of your home
              </p>
            </Card>

            <Card
              className={`p-8 border-2 cursor-pointer transition-all duration-300 ${
                formData.appointmentType === AppointmentType.inPerson
                  ? 'border-secondary shadow-gold-glow'
                  : 'border-border hover:border-secondary/50'
              }`}
              onClick={() => setFormData({ ...formData, appointmentType: AppointmentType.inPerson })}
            >
              <MapPin className="h-12 w-12 text-secondary mb-4" />
              <h3 className="font-serif-luxury text-2xl mb-2">Private Viewing</h3>
              <p className="text-muted-foreground font-light">
                Visit our atelier for an exclusive in-person experience
              </p>
            </Card>
          </div>

          <Card className="p-8 md:p-12 border-border shadow-luxury-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="clientName" className="text-sm uppercase tracking-wider mb-2 block">
                    Full Name *
                  </Label>
                  <Input
                    id="clientName"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="bg-background"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm uppercase tracking-wider mb-2 block">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-background"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="phone" className="text-sm uppercase tracking-wider mb-2 block">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-background"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="preferredDate" className="text-sm uppercase tracking-wider mb-2 block">
                    Preferred Date & Time *
                  </Label>
                  <Input
                    id="preferredDate"
                    type="datetime-local"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="bg-background"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes" className="text-sm uppercase tracking-wider mb-2 block">
                  Additional Notes (Optional)
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="bg-background min-h-[120px]"
                  placeholder="Tell us about your preferences, budget range, or specific pieces you're interested in..."
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full py-6 text-sm uppercase tracking-widest"
                disabled={createAppointment.isPending}
              >
                {createAppointment.isPending ? 'Submitting...' : 'Submit Request'}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
