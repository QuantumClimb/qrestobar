import React, { useState } from 'react';
import { Search, Download, Trash2, Eye, X, MessageSquare, Phone } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Reservation, ReservationStatus } from '../../types/reservation';
import { Modal } from '../common/Modal';

export const AdminReservations: React.FC = () => {
  const { reservations, updateReservationStatus, deleteReservation, exportReservationsCsv } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [reservationToDelete, setReservationToDelete] = useState<Reservation | null>(null);

  const statuses: { id: string; label: string; color: string }[] = [
    { id: 'all', label: 'All Requests', color: 'text-qc-primary' },
    { id: 'new', label: 'New', color: 'text-amber-400' },
    { id: 'contacted', label: 'Contacted', color: 'text-blue-400' },
    { id: 'confirmed', label: 'Confirmed', color: 'text-emerald-400' },
    { id: 'seated', label: 'Seated', color: 'text-purple-400' },
    { id: 'completed', label: 'Completed', color: 'text-gray-400' },
    { id: 'cancelled', label: 'Cancelled', color: 'text-red-400' },
  ];

  // Filter & Search logic
  const filteredReservations = reservations.filter((r) => {
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      r.fullName.toLowerCase().includes(query) ||
      r.referenceNumber.toLowerCase().includes(query) ||
      r.phone.toLowerCase().includes(query) ||
      r.email.toLowerCase().includes(query);

    return matchesStatus && matchesQuery;
  });

  const handleStatusChange = async (id: string, newStatus: ReservationStatus) => {
    await updateReservationStatus(id, newStatus);
    if (selectedReservation && selectedReservation.id === id) {
      setSelectedReservation(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const confirmDelete = async () => {
    if (reservationToDelete) {
      await deleteReservation(reservationToDelete.id);
      setReservationToDelete(null);
      if (selectedReservation?.id === reservationToDelete.id) {
        setSelectedReservation(null);
      }
    }
  };

  const getStatusBadge = (status: ReservationStatus) => {
    const map: Record<ReservationStatus, { bg: string; text: string; border: string }> = {
      new: { bg: 'bg-amber-950/70', text: 'text-amber-300', border: 'border-amber-700/60' },
      contacted: { bg: 'bg-blue-950/70', text: 'text-blue-300', border: 'border-blue-700/60' },
      confirmed: { bg: 'bg-emerald-950/70', text: 'text-emerald-300', border: 'border-emerald-700/60' },
      seated: { bg: 'bg-purple-950/70', text: 'text-purple-300', border: 'border-purple-700/60' },
      completed: { bg: 'bg-qc-elevated', text: 'text-qc-body', border: 'border-border-strong' },
      cancelled: { bg: 'bg-red-950/70', text: 'text-red-300', border: 'border-red-800/60' },
    };

    const cfg = map[status] || map.new;

    return (
      <span className={`inline-block px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider rounded-full border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Filter & Action Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-charcoal-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, ref code (QRESTO-XXXX), phone or email..."
            className="w-full bg-qc-surface border border-border-strong/80 pl-10 pr-9 py-2 text-xs text-qc-primary placeholder-charcoal-600 rounded-sm focus:outline-none focus:border-purple-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-600 hover:text-qc-primary"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* CSV Export */}
        <div className="flex items-center gap-3">
          <button
            onClick={exportReservationsCsv}
            className="btn-gold-outline text-xs px-4 py-2 flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {statuses.map((st) => (
          <button
            key={st.id}
            onClick={() => setStatusFilter(st.id)}
            className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider rounded-sm transition-all shrink-0 ${
              statusFilter === st.id
                ? 'bg-purple-600 text-charcoal-950 font-bold shadow-sm'
                : 'bg-qc-surface text-qc-body border border-border-base hover:text-qc-primary'
            }`}
          >
            {st.label} (
            {st.id === 'all'
              ? reservations.length
              : reservations.filter((r) => r.status === st.id).length}
            )
          </button>
        ))}
      </div>

      {/* Reservations Table */}
      <div className="bg-qc-surface border border-border-base rounded-sm overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-qc-body">
            <thead className="bg-qc-base text-purple-500 font-semibold uppercase tracking-wider border-b border-border-base text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Ref Code</th>
                <th className="py-3.5 px-4">Date &amp; Time</th>
                <th className="py-3.5 px-4">Customer Name</th>
                <th className="py-3.5 px-4">Guests &amp; Area</th>
                <th className="py-3.5 px-4">Occasion</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-800/80">
              {filteredReservations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-qc-body">
                    <p className="text-sm font-medium">No reservations match your filter criteria.</p>
                    <p className="text-xs mt-1">Try resetting search filters or submit a new test reservation from the public page.</p>
                  </td>
                </tr>
              ) : (
                filteredReservations.map((r) => (
                  <tr key={r.id} className="hover:bg-qc-card/60 transition-colors">
                    {/* Ref Code */}
                    <td className="py-3 px-4 font-mono font-bold text-qc-secondary">
                      {r.referenceNumber}
                    </td>

                    {/* Date & Time */}
                    <td className="py-3 px-4">
                      <p className="font-semibold text-qc-primary">{r.date}</p>
                      <p className="text-[11px] text-qc-body">{r.time}</p>
                    </td>

                    {/* Customer */}
                    <td className="py-3 px-4">
                      <p className="font-medium text-qc-primary">{r.fullName}</p>
                      <p className="text-[11px] text-qc-body">{r.phone}</p>
                    </td>

                    {/* Guests & Seating */}
                    <td className="py-3 px-4">
                      <p className="text-qc-primary font-medium">{r.guestCount} pax</p>
                      <p className="text-[11px] text-qc-body capitalize">{r.seatingPreference}</p>
                    </td>

                    {/* Occasion */}
                    <td className="py-3 px-4 capitalize text-qc-primary">
                      {r.occasion}
                    </td>

                    {/* Status Select */}
                    <td className="py-3 px-4">
                      <select
                        value={r.status}
                        onChange={(e) => handleStatusChange(r.id, e.target.value as ReservationStatus)}
                        className="bg-qc-base border border-border-strong text-xs text-qc-primary rounded px-2 py-1 focus:border-purple-500 focus:outline-none capitalize"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="seated">Seated</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => setSelectedReservation(r)}
                          className="p-1.5 text-qc-body hover:text-qc-secondary rounded hover:bg-qc-elevated transition-colors"
                          title="View Full Booking Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setReservationToDelete(r)}
                          className="p-1.5 text-qc-body hover:text-red-400 rounded hover:bg-qc-elevated transition-colors"
                          title="Delete Reservation"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reservation Detail Modal */}
      {selectedReservation && (
        <Modal
          isOpen={Boolean(selectedReservation)}
          onClose={() => setSelectedReservation(null)}
          title={`Booking Ref: ${selectedReservation.referenceNumber}`}
          subtitle={`Submitted on ${new Date(selectedReservation.createdAt).toLocaleString('en-MY')}`}
          maxWidth="xl"
        >
          <div className="space-y-5 text-xs text-qc-body">
            <div className="flex items-center justify-between pb-3 border-b border-border-base">
              <span className="text-purple-500 font-semibold uppercase tracking-wider">Current Status</span>
              {getStatusBadge(selectedReservation.status)}
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-qc-base rounded border border-border-base">
              <div>
                <p className="text-[10px] uppercase text-qc-body">Guest Name</p>
                <p className="text-sm font-display font-bold text-qc-primary mt-0.5">{selectedReservation.fullName}</p>
              </div>

              <div>
                <p className="text-[10px] uppercase text-qc-body">Contact Telephone</p>
                <a href={`tel:${selectedReservation.phone}`} className="text-sm font-medium text-qc-secondary mt-0.5 block hover:underline">
                  {selectedReservation.phone}
                </a>
              </div>

              <div>
                <p className="text-[10px] uppercase text-qc-body">Email</p>
                <a href={`mailto:${selectedReservation.email}`} className="text-xs text-qc-primary mt-0.5 block hover:underline">
                  {selectedReservation.email}
                </a>
              </div>

              <div>
                <p className="text-[10px] uppercase text-qc-body">Party Size &amp; Seating</p>
                <p className="text-xs text-qc-primary mt-0.5">
                  {selectedReservation.guestCount} Guests • <span className="capitalize">{selectedReservation.seatingPreference}</span>
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase text-qc-body">Reservation Date</p>
                <p className="text-xs text-qc-primary mt-0.5">{selectedReservation.date}</p>
              </div>

              <div>
                <p className="text-[10px] uppercase text-qc-body">Requested Time</p>
                <p className="text-xs text-qc-primary mt-0.5">{selectedReservation.time}</p>
              </div>
            </div>

            {selectedReservation.specialRequests && (
              <div className="p-3 bg-qc-base rounded border border-border-base">
                <span className="text-[10px] font-semibold uppercase text-purple-500 block mb-1">
                  Customer Special Requests
                </span>
                <p className="text-qc-primary italic">"{selectedReservation.specialRequests}"</p>
              </div>
            )}

            {/* Quick Actions (Call / WhatsApp Guest) */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={`tel:${selectedReservation.phone.replace(/[^0-9+]/g, '')}`}
                className="btn-gold-outline flex-1 text-center py-2 flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Customer</span>
              </a>

              <a
                href={`https://wa.me/${selectedReservation.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Hello ${selectedReservation.fullName}, regarding your reservation request (${selectedReservation.referenceNumber}) for ${selectedReservation.date} at Q-RESTOBAR...`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-ivory flex-1 text-center py-2 border border-border-strong bg-emerald-950/40 text-emerald-300 hover:text-emerald-200 flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Guest</span>
              </a>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {reservationToDelete && (
        <Modal
          isOpen={Boolean(reservationToDelete)}
          onClose={() => setReservationToDelete(null)}
          title="Delete Reservation Record"
          subtitle="Warning: Destructive Action"
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <p className="text-qc-primary">
              Are you sure you want to permanently delete the reservation record for{' '}
              <strong className="text-purple-500">{reservationToDelete.fullName}</strong> (Ref:{' '}
              {reservationToDelete.referenceNumber})?
            </p>
            <p className="text-red-400">This action cannot be undone.</p>

            <div className="pt-4 border-t border-border-base flex items-center justify-end gap-3">
              <button
                onClick={() => setReservationToDelete(null)}
                className="btn-ghost-ivory text-xs px-4 py-2 border border-border-strong"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-800 hover:bg-red-700 text-qc-primary text-xs font-bold uppercase rounded-sm transition-colors"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
