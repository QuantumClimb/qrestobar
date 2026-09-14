export type ReservationStatus = 
  | 'new' 
  | 'contacted' 
  | 'confirmed' 
  | 'seated' 
  | 'completed' 
  | 'cancelled';

export type SeatingPreference = 'indoor' | 'outdoor' | 'chefs-table';

export type OccasionType = 
  | 'casual' 
  | 'birthday' 
  | 'anniversary' 
  | 'business' 
  | 'date-night' 
  | 'celebration' 
  | 'other';

export interface Reservation {
  id: string;
  referenceNumber: string; // e.g. QRESTO-84920
  fullName: string;
  email: string;
  phone: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM (e.g. 19:30)
  guestCount: number; // 1 - 20
  seatingPreference: SeatingPreference;
  occasion: OccasionType;
  specialRequests?: string;
  consent: boolean;
  status: ReservationStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface ReservationFormData {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guestCount: number;
  seatingPreference: SeatingPreference;
  occasion: OccasionType;
  specialRequests?: string;
  consent: boolean;
}
