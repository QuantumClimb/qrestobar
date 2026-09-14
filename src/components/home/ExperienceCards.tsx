import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Wine, PartyPopper, ArrowRight, Check } from 'lucide-react';
import { Modal } from '../common/Modal';

interface Experience {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  icon: React.ElementType;
  features: string[];
  ctaText: string;
  ctaLink: string;
}

export const ExperienceCards: React.FC = () => {
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);

  const experiences: Experience[] = [
    {
      id: 'dining',
      title: 'Modern Malaysian Dining',
      subtitle: 'Lunch & Dinner Tasting Plates',
      description: 'An elevated journey through Malaysia’s rich flavour heritage, crafted with precision fire-grilling, slow braises, and refined plating.',
      longDescription: 'Our dining room offers an intimate yet vibrant setting where traditional Southeast Asian recipes meet contemporary culinary mastery. Whether you are craving our 8-hour Beef Rendang, Crispy Soft-Shell Crab Laksa, or smoky Black Angus Ribeye Percik, every course is calibrated to deliver deep satisfaction.',
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      icon: UtensilsCrossed,
      features: [
        'A la carte and executive tasting menus',
        'Sharing plates designed for 2 to 10 guests',
        'Locally sourced organic herbs and spices',
        'Full allergen customization available'
      ],
      ctaText: 'View Food Menu',
      ctaLink: '/menu'
    },
    {
      id: 'cocktails',
      title: 'Cocktails & Late Nights',
      subtitle: 'Artisanal Botanicals & Mixology',
      description: 'Savour handcrafted tropical cocktails, premium spirits, and late-night ambient vinyl grooves in our sophisticated cocktail bar.',
      longDescription: 'As the evening deepens, Q-RESTOBAR transforms into an energetic cocktail sanctuary. Our mixologists blend fresh pandan leaves, Bentong ginger, wild torch ginger flower, and calamansi lime with premium spirits to craft signature concoctions you will not find anywhere else in the city.',
      imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
      icon: Wine,
      features: [
        'Bespoke house cocktails inspired by Malaysian flora',
        'Curated international wine and champagne cellar',
        'Late night small plates available until 11:30 PM',
        'Resident DJ ambient sessions on weekends'
      ],
      ctaText: 'Explore Cocktails',
      ctaLink: '/menu'
    },
    {
      id: 'private',
      title: 'Private Events & Celebrations',
      subtitle: 'Bespoke Gatherings & Buyouts',
      description: 'Host memorable birthdays, corporate banquets, anniversaries, and VIP buyouts in our tailored private dining suites.',
      longDescription: 'From intimate 10-person private rooms to full 180-guest restaurant buyouts, Q-RESTOBAR delivers flawless hospitality for your most important milestones. Our events team manages custom menu printing, sommelier pairings, and personalized audio-visual setups.',
      imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
      icon: PartyPopper,
      features: [
        'Private VIP room with high-definition AV equipment',
        'Customized printed menus with corporate/personal branding',
        'Dedicated event coordinator and sommelier service',
        'Flexible floor layouts for seated or cocktail formats'
      ],
      ctaText: 'Plan an Event',
      ctaLink: '/offers'
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-qc-surface border-t border-border-base text-qc-primary relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-purple-500 text-xs font-semibold uppercase tracking-[0.25em]">
            <span>Tailored Experiences</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-qc-primary">
            Three Ways to Experience Q-RESTOBAR
          </h2>

          <p className="text-sm sm:text-base text-qc-body font-light leading-relaxed">
            From relaxed afternoon lunches and vibrant cocktail evenings to memorable corporate galas, our spaces adapt to every occasion.
          </p>
        </div>

        {/* 3 Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp) => {
            const Icon = exp.icon;
            return (
              <div
                key={exp.id}
                className="luxury-card group flex flex-col justify-between overflow-hidden cursor-pointer"
                onClick={() => setSelectedExp(exp)}
              >
                <div className="relative h-56 overflow-hidden bg-qc-base">
                  <img
                    src={exp.imageUrl}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/30 to-transparent" />
                  
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-qc-base/90 border border-purple-600/40 flex items-center justify-center text-purple-500 shadow-md">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[11px] font-semibold text-purple-500 uppercase tracking-wider block mb-1">
                      {exp.subtitle}
                    </span>
                    <h3 className="text-xl font-display font-bold text-qc-primary group-hover:text-qc-secondary transition-colors mb-2">
                      {exp.title}
                    </h3>
                    <p className="text-xs text-qc-body font-light leading-relaxed">
                      {exp.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border-base flex items-center justify-between text-xs text-purple-500 font-semibold uppercase tracking-wider">
                    <span>Explore Experience</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Experience Details Modal */}
      {selectedExp && (
        <Modal
          isOpen={Boolean(selectedExp)}
          onClose={() => setSelectedExp(null)}
          title={selectedExp.title}
          subtitle={selectedExp.subtitle}
          maxWidth="2xl"
        >
          <div className="space-y-5">
            <div className="h-64 rounded-sm overflow-hidden border border-border-base">
              <img
                src={selectedExp.imageUrl}
                alt={selectedExp.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm text-qc-body leading-relaxed font-light">
              {selectedExp.longDescription}
            </p>

            <div className="p-4 bg-qc-base border border-border-base rounded-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-purple-500 mb-3">
                Experience Inclusions:
              </p>
              <ul className="space-y-2 text-xs text-qc-body">
                {selectedExp.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-border-base flex items-center justify-between gap-3">
              <Link
                to={selectedExp.ctaLink}
                className="btn-gold-outline text-xs px-5 py-2.5"
                onClick={() => setSelectedExp(null)}
              >
                {selectedExp.ctaText}
              </Link>

              <Link
                to="/reservations"
                className="btn-gold text-xs px-6 py-2.5"
                onClick={() => setSelectedExp(null)}
              >
                Reserve Your Table
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
