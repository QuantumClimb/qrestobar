import { Reservation, ReservationFormData, ReservationStatus } from '../types/reservation';
import { storageService } from './storageService';

export const reservationService = {
  // Generate a random 5-digit reference code like QRESTO-82914
  generateReference(): string {
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    return `QRESTO-${randomDigits}`;
  },

  async getAll(): Promise<Reservation[]> {
    const list = storageService.getReservations();
    // Sort with most recent creation first
    return [...list].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async getById(id: string): Promise<Reservation | undefined> {
    const list = storageService.getReservations();
    return list.find(r => r.id === id || r.referenceNumber === id);
  },

  async create(formData: ReservationFormData): Promise<Reservation> {
    const list = storageService.getReservations();
    const referenceNumber = this.generateReference();
    
    const newReservation: Reservation = {
      ...formData,
      id: `res-${Date.now()}`,
      referenceNumber,
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    list.unshift(newReservation);
    storageService.saveReservations(list);
    return newReservation;
  },

  async updateStatus(id: string, status: ReservationStatus): Promise<Reservation | null> {
    const list = storageService.getReservations();
    const index = list.findIndex(r => r.id === id);
    if (index === -1) return null;

    list[index] = {
      ...list[index],
      status,
      updatedAt: new Date().toISOString()
    };

    storageService.saveReservations(list);
    return list[index];
  },

  async delete(id: string): Promise<boolean> {
    const list = storageService.getReservations();
    const filtered = list.filter(r => r.id !== id);
    if (filtered.length === list.length) return false;
    storageService.saveReservations(filtered);
    return true;
  },

  // Export reservations to CSV format
  exportToCsv(reservations: Reservation[]): void {
    const headers = [
      'Reference Number',
      'Customer Name',
      'Phone',
      'Email',
      'Date',
      'Time',
      'Guests',
      'Seating Preference',
      'Occasion',
      'Special Requests',
      'Status',
      'Created At'
    ];

    const rows = reservations.map(r => [
      `"${r.referenceNumber}"`,
      `"${r.fullName.replace(/"/g, '""')}"`,
      `"${r.phone}"`,
      `"${r.email}"`,
      `"${r.date}"`,
      `"${r.time}"`,
      r.guestCount,
      `"${r.seatingPreference}"`,
      `"${r.occasion}"`,
      `"${(r.specialRequests || '').replace(/"/g, '""')}"`,
      `"${r.status}"`,
      `"${new Date(r.createdAt).toLocaleString('en-MY')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `qresto_reservations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // Generate Google Calendar Link
  generateGoogleCalendarUrl(reservation: Reservation): string {
    const startTime = `${reservation.date.replace(/-/g, '')}T${reservation.time.replace(':', '')}00`;
    // Assume 2 hour dining slot
    const [hours, minutes] = reservation.time.split(':').map(Number);
    const endHours = String(hours + 2).padStart(2, '0');
    const endTime = `${reservation.date.replace(/-/g, '')}T${endHours}${String(minutes).padStart(2, '0')}00`;

    const title = encodeURIComponent(`Dining Reservation at Q-RESTOBAR - Ref: ${reservation.referenceNumber}`);
    const details = encodeURIComponent(
      `Table Reservation for ${reservation.fullName} (${reservation.guestCount} guests)\n` +
      `Reference: ${reservation.referenceNumber}\n` +
      `Seating: ${reservation.seatingPreference}\n` +
      `Location: Q-RESTOBAR, Level 2 The Pavilion Gallery, Bukit Bintang, Kuala Lumpur\n` +
      `Phone: +60 11-6424 2145`
    );
    const location = encodeURIComponent('Q-RESTOBAR, Level 2, The Pavilion Gallery, Jalan Bukit Bintang, Kuala Lumpur');

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
  },

  // Generate .ics iCalendar file download
  downloadIcsFile(reservation: Reservation): void {
    const [hours, minutes] = reservation.time.split(':').map(Number);
    const startStr = `${reservation.date.replace(/-/g, '')}T${String(hours).padStart(2, '0')}${String(minutes).padStart(2, '0')}00`;
    const endStr = `${reservation.date.replace(/-/g, '')}T${String(hours + 2).padStart(2, '0')}${String(minutes).padStart(2, '0')}00`;

    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Q-RESTOBAR//Table Reservation//EN',
      'BEGIN:VEVENT',
      `UID:${reservation.referenceNumber}@q-restobar.com`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${startStr}`,
      `DTEND:${endStr}`,
      `SUMMARY:Dining at Q-RESTOBAR (${reservation.guestCount} Guests) - ${reservation.referenceNumber}`,
      `DESCRIPTION:Table reservation request for ${reservation.fullName}. Seating: ${reservation.seatingPreference}. Notes: ${reservation.specialRequests || 'None'}`,
      'LOCATION:Q-RESTOBAR, Level 2 The Pavilion Gallery, Jalan Bukit Bintang, Kuala Lumpur',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `qresto_reservation_${reservation.referenceNumber}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // Generate WhatsApp inquiry text
  generateWhatsAppLink(reservation: Reservation, whatsappNumber: string): string {
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Hello Q-RESTOBAR team, I have submitted a table reservation request.\n\n` +
      `• Reference: ${reservation.referenceNumber}\n` +
      `• Name: ${reservation.fullName}\n` +
      `• Date: ${reservation.date}\n` +
      `• Time: ${reservation.time}\n` +
      `• Guests: ${reservation.guestCount} pax\n` +
      `• Seating: ${reservation.seatingPreference}\n\n` +
      `Looking forward to receiving booking confirmation. Thank you!`
    );

    return `https://wa.me/${cleanNumber}?text=${message}`;
  }
};
