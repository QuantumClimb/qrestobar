import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wine, Sparkles, Utensils, Heart, Briefcase, PartyPopper, Cake, ArrowRight, RotateCcw, Check, Flame } from 'lucide-react';

interface OccasionOption {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
}

interface FlavorOption {
  id: string;
  label: string;
  sublabel: string;
  tag: string;
}

interface DrinkOption {
  id: string;
  label: string;
  sublabel: string;
}

interface PairedExperience {
  title: string;
  tagline: string;
  sommelierNotes: string;
  estimatedPrice: number;
  starter: { name: string; desc: string; image: string };
  main: { name: string; desc: string; image: string };
  dessert: { name: string; desc: string; image: string };
  drink: { name: string; desc: string; image: string };
}

const OCCASIONS: OccasionOption[] = [
  { id: 'romantic', label: 'Romantic Date Night', sublabel: 'Intimate ambiance, candlelit flavors', icon: <Heart className="w-5 h-5" style={{ color: 'var(--experience-icon-1, #C084FC)' }} /> },
  { id: 'business', label: 'Executive Dinner', sublabel: 'Impress clients with prime cuts & fine wine', icon: <Briefcase className="w-5 h-5" style={{ color: 'var(--experience-icon-2, #A855F7)' }} /> },
  { id: 'weekend', label: 'Weekend Social & Vibes', sublabel: 'Lively atmosphere, sharable tapas & DJ beats', icon: <PartyPopper className="w-5 h-5" style={{ color: 'var(--experience-icon-3, #C084FC)' }} /> },
  { id: 'celebration', label: 'Birthday or Milestone', sublabel: 'Sparkler finishes & bespoke feast', icon: <Cake className="w-5 h-5 text-emerald-400" /> },
];

const FLAVORS: FlavorOption[] = [
  { id: 'smoky-bold', label: 'Charred, Smoky & Rich', sublabel: 'Coconut charcoal grill, percik glaze, Sarawak pepper', tag: 'Bold Umami' },
  { id: 'aromatic-spice', label: 'Fiery Sambal & Torch Ginger', sublabel: 'Complex slow-simmered kerisik, kaffir lime, bunga kantan', tag: 'Malaysian Heritage' },
  { id: 'seafood-citrus', label: 'Coastal Seafood & Citrus Mist', sublabel: 'Hamachi umai, soft-shell crab, calamansi bursts', tag: 'Fresh & Crisp' },
  { id: 'plant-creamy', label: 'Botanical, Truffle & Silken', sublabel: 'Wild mushrooms, artisanal tempeh, creamy reduction', tag: 'Refined Vegetarian' },
];

const DRINKS: DrinkOption[] = [
  { id: 'cocktail', label: 'Signature Botanical Cocktails', sublabel: 'Infused spirits, tropical botanicals, handcrafted ice' },
  { id: 'wine', label: 'Sommelier Wine Selections', sublabel: 'Crisp Marlborough Sauvignon Blanc or bold Shiraz' },
  { id: 'whisky', label: 'Smoky Highball & Spirits', sublabel: 'Aged malts, spiced pineapple shrubs, charred garnish' },
  { id: 'mocktail', label: 'Artisanal Zero-Proof Mocktails', sublabel: 'Bentong ginger, honey lemongrass, cold-pressed pandan' },
];

export const FlavorMatchmaker: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedOccasion, setSelectedOccasion] = useState<string>('romantic');
  const [selectedFlavor, setSelectedFlavor] = useState<string>('smoky-bold');
  const [selectedDrink, setSelectedDrink] = useState<string>('cocktail');
  const [isMatching, setIsMatching] = useState<boolean>(false);
  const [matchedExperience, setMatchedExperience] = useState<PairedExperience | null>(null);

  const calculatePairing = () => {
    setIsMatching(true);

    setTimeout(() => {
      let pairing: PairedExperience;

      if (selectedOccasion === 'romantic' || selectedDrink === 'cocktail') {
        pairing = {
          title: 'The Velvet Romance Degustation',
          tagline: 'Delicate floral aromas paired with luxurious Sarawak pepper duck and torched pandan finish.',
          sommelierNotes: 'The botanical rose essence in the martini softens the bold peppery notes of the smoked duck breast, culminating in a warm caramelized pandan finish.',
          estimatedPrice: 116,
          starter: {
            name: 'Cured Hamachi Umai Tartare',
            desc: 'Raw hamachi yellowtail with torch ginger bud, bird’s eye chili, and sago crisps.',
            image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80'
          },
          main: {
            name: 'Smoked Duck Breast Sarawak Pepper',
            desc: 'Pan-seared duck breast with highland black pepper and sweet potato puree.',
            image: '/images/Smoked Duck Breast Sarawak Pepper.jpg'
          },
          dessert: {
            name: 'Pandan Crème Brûlée',
            desc: 'Torched Gula Melaka sugar crust with cold-pressed pure pandan custard.',
            image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=600&q=80'
          },
          drink: {
            name: 'Lychee Rose Martini',
            desc: 'Grey Goose vodka, fresh sweet lychee liqueur, organic rose petal water.',
            image: '/images/Lychee Rose Martini.jpg'
          }
        };
      } else if (selectedOccasion === 'business' || selectedFlavor === 'smoky-bold') {
        pairing = {
          title: 'The Executive Heritage Grill Tasting',
          tagline: 'Prime Australian Black Angus ribeye Percik with charred satay and artisanal highball.',
          sommelierNotes: 'The charred caramelization of the coconut husk charcoal brings out deep wood notes that pair impeccably with our oak-aged Spiced Pineapple Highball.',
          estimatedPrice: 189,
          starter: {
            name: 'Charred Chicken Satay (6 Skewers)',
            desc: 'Lemongrass marinated chicken thighs grilled over coconut husk charcoal.',
            image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=600&q=80'
          },
          main: {
            name: 'Black Angus Ribeye Percik (300g)',
            desc: 'Char-grilled prime ribeye basted in Kelantanese percik spiced coconut glaze.',
            image: '/images/Lethu_steak.jpg'
          },
          dessert: {
            name: 'Durian & Dark Chocolate Sphere',
            desc: '70% single-origin Pahang dark chocolate with Musang King durian mousse.',
            image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=600&q=80'
          },
          drink: {
            name: 'Spiced Pineapple Highball',
            desc: 'Blended Scotch whisky, charred spiced pineapple shrub, smoked cinnamon syrup.',
            image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&w=600&q=80'
          }
        };
      } else if (selectedFlavor === 'plant-creamy') {
        pairing = {
          title: 'Botanical Harmony Plant-Forward Feast',
          tagline: 'Artisanal organic tempeh rendang, wok-charred kailan, and refreshing ginger fizz.',
          sommelierNotes: 'Crisp aromatic Bentong ginger cuts through rich coconut kerisik gravy to leave the palate cleansed and invigorated.',
          estimatedPrice: 88,
          starter: {
            name: 'Tofu Bakar with Sweet Peanut Glaze',
            desc: 'Crispy pressed organic beancurd stuffed with cucumber and roasted peanut glaze.',
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80'
          },
          main: {
            name: 'Charred Tempeh & Wild Mushroom Rendang',
            desc: 'Organic fermented tempeh and king oyster mushrooms in slow-simmered kerisik.',
            image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'
          },
          dessert: {
            name: 'Deconstructed Cendol Parfait',
            desc: 'Smoked coconut gelato, pandan jelly noodles, warm Gula Melaka drizzle.',
            image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80'
          },
          drink: {
            name: 'Ginger Lemongrass Fizz',
            desc: 'Cold-pressed Bentong ginger, smashed lemongrass, sparkling water, honey syrup.',
            image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80'
          }
        };
      } else {
        pairing = {
          title: 'Coastal Malaysian Royale Experience',
          tagline: 'Opulent crispy soft-shell crab laksa and signature Nasi Lemak with Calamansi Spritz.',
          sommelierNotes: 'Vibrant calamansi lime acidity balances the velvety richness of the spiced santan curry broth with sparkling effervescence.',
          estimatedPrice: 126,
          starter: {
            name: 'Crispy Salted Egg Squid Bites',
            desc: 'Tender squid rings with curry leaves, bird’s eye chili, and golden salted egg yolk.',
            image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80'
          },
          main: {
            name: 'Crispy Soft-Shell Crab Laksa',
            desc: 'Golden soft-shell crab nestled in opulent coconut curry broth with silken rice noodles.',
            image: 'https://images.unsplash.com/photo-1594998893017-36147cbcae05?auto=format&fit=crop&w=600&q=80'
          },
          dessert: {
            name: 'Pandan Crème Brûlée',
            desc: 'Torched Gula Melaka sugar crust with pure fresh pandan leaf custard.',
            image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=600&q=80'
          },
          drink: {
            name: 'Calamansi Spritz',
            desc: 'Artisanal gin, hand-squeezed calamansi lime, sparkling Prosecco, elderflower.',
            image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80'
          }
        };
      }

      setMatchedExperience(pairing);
      setIsMatching(false);
    }, 1000);
  };

  const handleBookPairedExperience = () => {
    if (!matchedExperience) return;
    const params = new URLSearchParams({
      package: matchedExperience.title,
      notes: `Matched Tasting: ${matchedExperience.title} (Starter: ${matchedExperience.starter.name}, Main: ${matchedExperience.main.name}, Drink: ${matchedExperience.drink.name})`
    });
    navigate(`/reservations?${params.toString()}`);
  };

  const resetQuiz = () => {
    setMatchedExperience(null);
    setCurrentStep(1);
  };

  return (
    <div className="bg-qc-surface border border-border-base rounded-sm p-6 sm:p-10 shadow-2xl space-y-8">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-base pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-purple-500 text-xs font-semibold uppercase tracking-widest mb-1">
            <Wine className="w-3.5 h-3.5" />
            <span>AI Sommelier &amp; Flavour Matchmaker</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-qc-primary">
            Find Your Ideal Culinary Pairing
          </h3>
        </div>

        {matchedExperience && (
          <button
            onClick={resetQuiz}
            className="btn-ghost-ivory text-xs px-4 py-2 border border-border-strong inline-flex items-center gap-2 self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Taste Quiz</span>
          </button>
        )}
      </div>

      {!matchedExperience ? (
        <div className="space-y-8">
          {/* Step Progress Bar */}
          <div className="flex items-center justify-between max-w-md mx-auto">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-display text-xs font-bold transition-all ${
                    currentStep === step
                      ? 'text-white ring-4 ring-purple-500/20'
                      : currentStep > step
                      ? 'bg-emerald-600 text-white'
                      : 'bg-qc-elevated text-qc-body'
                  }`}
                  style={{
                    backgroundColor: currentStep === step ? 'var(--experience-accent-primary, #9333EA)' : undefined
                  }}
                >
                  {currentStep > step ? <Check className="w-4 h-4" /> : step}
                </div>
                <span className={`text-xs font-medium ${currentStep === step ? 'text-purple-500' : 'text-qc-body'}`}>
                  {step === 1 ? 'Occasion' : step === 2 ? 'Flavor Mood' : 'Beverage'}
                </span>
                {step < 3 && <div className="w-12 h-0.5 bg-qc-elevated mx-1" />}
              </div>
            ))}
          </div>

          {/* STEP 1: Occasion */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h4 className="text-sm uppercase tracking-wider text-purple-500 font-semibold text-center">
                Step 1: What is the mood or occasion for your visit?
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {OCCASIONS.map((occ) => (
                  <button
                    key={occ.id}
                    onClick={() => setSelectedOccasion(occ.id)}
                    className={`p-4 rounded-sm border text-left transition-all flex items-start gap-3.5 ${
                      selectedOccasion === occ.id
                        ? 'bg-qc-base border-purple-600/80 shadow-gold-subtle'
                        : 'bg-qc-base/60 border-border-base hover:border-border-strong'
                    }`}
                  >
                    <div className="p-2 rounded bg-qc-surface border border-border-strong shrink-0">
                      {occ.icon}
                    </div>
                    <div>
                      <p className="font-display font-bold text-qc-primary text-sm">{occ.label}</p>
                      <p className="text-xs text-qc-body font-light mt-0.5">{occ.sublabel}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="text-center pt-4">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="btn-gold px-8 py-3 text-xs tracking-widest inline-flex items-center gap-2 shadow-gold-subtle"
                >
                  <span>Next: Select Flavor Mood</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Flavor */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h4 className="text-sm uppercase tracking-wider text-purple-500 font-semibold text-center">
                Step 2: What flavor profile excites your palate today?
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {FLAVORS.map((flav) => (
                  <button
                    key={flav.id}
                    onClick={() => setSelectedFlavor(flav.id)}
                    className={`p-4 rounded-sm border text-left transition-all ${
                      selectedFlavor === flav.id
                        ? 'bg-qc-base border-purple-600/80 shadow-gold-subtle'
                        : 'bg-qc-base/60 border-border-base hover:border-border-strong'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-purple-500 bg-purple-600/10 px-2 py-0.5 rounded">
                        {flav.tag}
                      </span>
                    </div>
                    <p className="font-display font-bold text-qc-primary text-sm">{flav.label}</p>
                    <p className="text-xs text-qc-body font-light mt-1">{flav.sublabel}</p>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="btn-ghost-ivory px-6 py-3 text-xs tracking-wider border border-border-strong"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="btn-gold px-8 py-3 text-xs tracking-widest inline-flex items-center gap-2 shadow-gold-subtle"
                >
                  <span>Next: Choose Drink Style</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Drink */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h4 className="text-sm uppercase tracking-wider text-purple-500 font-semibold text-center">
                Step 3: What beverage style do you prefer?
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {DRINKS.map((drk) => (
                  <button
                    key={drk.id}
                    onClick={() => setSelectedDrink(drk.id)}
                    className={`p-4 rounded-sm border text-left transition-all ${
                      selectedDrink === drk.id
                        ? 'bg-qc-base border-purple-600/80 shadow-gold-subtle'
                        : 'bg-qc-base/60 border-border-base hover:border-border-strong'
                    }`}
                  >
                    <p className="font-display font-bold text-qc-primary text-sm">{drk.label}</p>
                    <p className="text-xs text-qc-body font-light mt-1">{drk.sublabel}</p>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="btn-ghost-ivory px-6 py-3 text-xs tracking-wider border border-border-strong"
                >
                  Back
                </button>
                <button
                  onClick={calculatePairing}
                  disabled={isMatching}
                  className="btn-gold px-8 py-3 text-xs tracking-widest inline-flex items-center gap-2 shadow-gold-subtle"
                >
                  {isMatching ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>Curating Bespoke Experience...</span>
                    </>
                  ) : (
                    <>
                      <Utensils className="w-4 h-4" />
                      <span>Generate My Experience</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* MATCH RESULT SHOWCASE */
        <div className="space-y-8 animate-slide-up">
          {/* Result Banner */}
          <div
            className="bg-qc-base border-2 p-6 sm:p-8 rounded-sm relative overflow-hidden"
            style={{ borderColor: 'var(--experience-banner-border, rgba(147, 51, 234, 0.5))' }}
          >
            <div
              className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl pointer-events-none"
              style={{ backgroundColor: 'var(--experience-accent-glow, rgba(147, 51, 234, 0.1))' }}
            />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-purple-500 text-xs font-semibold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Your Curated Tasting Menu</span>
                </div>
                <h4 className="text-2xl sm:text-3xl font-display font-bold text-qc-primary">
                  {matchedExperience.title}
                </h4>
                <p className="text-xs sm:text-sm text-qc-body font-light leading-relaxed max-w-2xl">
                  {matchedExperience.tagline}
                </p>
              </div>

              <div className="text-left md:text-right shrink-0 bg-qc-surface border border-border-strong p-4 rounded-sm">
                <p className="text-[10px] uppercase tracking-wider text-qc-body">Estimated 3-Course + Drink</p>
                <p className="text-2xl font-display font-bold text-purple-500">
                  RM {matchedExperience.estimatedPrice}++
                </p>
                <p className="text-[10px] text-qc-body/80 mt-0.5">Per Person</p>
              </div>
            </div>

            {/* Sommelier Pairing Note */}
            <div className="mt-6 pt-4 border-t border-border-base text-xs text-qc-secondary font-light italic flex items-start gap-2.5">
              <Wine className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
              <span>&ldquo;{matchedExperience.sommelierNotes}&rdquo; — Head Sommelier &amp; Mixologist</span>
            </div>
          </div>

          {/* 4 Item Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Starter */}
            <div className="bg-qc-base border border-border-base rounded-sm overflow-hidden group">
              <div className="h-44 overflow-hidden relative">
                <img
                  src={matchedExperience.starter.image}
                  alt={matchedExperience.starter.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 bg-qc-base/90 text-purple-500 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border border-purple-600/30">
                  1. Starter Plate
                </span>
              </div>
              <div className="p-4 space-y-1.5">
                <h5 className="font-display font-bold text-qc-primary text-sm">
                  {matchedExperience.starter.name}
                </h5>
                <p className="text-xs text-qc-body font-light line-clamp-2">
                  {matchedExperience.starter.desc}
                </p>
              </div>
            </div>

            {/* Main */}
            <div className="bg-qc-base border border-border-base rounded-sm overflow-hidden group">
              <div className="h-44 overflow-hidden relative">
                <img
                  src={matchedExperience.main.image}
                  alt={matchedExperience.main.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 bg-qc-base/90 text-purple-500 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border border-purple-600/30">
                  2. Signature Main
                </span>
              </div>
              <div className="p-4 space-y-1.5">
                <h5 className="font-display font-bold text-qc-primary text-sm">
                  {matchedExperience.main.name}
                </h5>
                <p className="text-xs text-qc-body font-light line-clamp-2">
                  {matchedExperience.main.desc}
                </p>
              </div>
            </div>

            {/* Dessert */}
            <div className="bg-qc-base border border-border-base rounded-sm overflow-hidden group">
              <div className="h-44 overflow-hidden relative">
                <img
                  src={matchedExperience.dessert.image}
                  alt={matchedExperience.dessert.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 bg-qc-base/90 text-purple-500 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border border-purple-600/30">
                  3. Sweet Finish
                </span>
              </div>
              <div className="p-4 space-y-1.5">
                <h5 className="font-display font-bold text-qc-primary text-sm">
                  {matchedExperience.dessert.name}
                </h5>
                <p className="text-xs text-qc-body font-light line-clamp-2">
                  {matchedExperience.dessert.desc}
                </p>
              </div>
            </div>

            {/* Drink */}
            <div className="bg-qc-base border border-purple-600/40 rounded-sm overflow-hidden group shadow-gold-subtle">
              <div className="h-44 overflow-hidden relative">
                <img
                  src={matchedExperience.drink.image}
                  alt={matchedExperience.drink.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 bg-qc-base/90 text-purple-500 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border border-purple-600/30">
                  4. Handcrafted Pairing
                </span>
              </div>
              <div className="p-4 space-y-1.5">
                <h5 className="font-display font-bold text-qc-primary text-sm">
                  {matchedExperience.drink.name}
                </h5>
                <p className="text-xs text-qc-body font-light line-clamp-2">
                  {matchedExperience.drink.desc}
                </p>
              </div>
            </div>
          </div>

          {/* Action to book */}
          <div className="text-center pt-2">
            <button
              onClick={handleBookPairedExperience}
              className="btn-gold px-10 py-4 text-xs tracking-widest inline-flex items-center gap-2 shadow-gold-subtle"
            >
              <span>Reserve This Paired Experience Table</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Restaurant Owner Growth Note */}
      <div className="border-t border-border-base pt-4 flex items-start gap-3 text-xs text-qc-body font-light">
        <Flame className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
        <p>
          <strong className="text-qc-primary font-medium">Why Restaurant Owners Love This:</strong>{' '}
          Solves guest decision fatigue and guides diners into high-margin 3-course and craft cocktail pairings, lifting average spend per table by 35% to 45%.
        </p>
      </div>
    </div>
  );
};
