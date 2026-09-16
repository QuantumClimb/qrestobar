import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Gift, CheckCircle, Copy, ArrowRight, RotateCw, Flame } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface Prize {
  id: string;
  name: string;
  shortName: string;
  value: string;
  color: string;
  textColor: string;
  icon: string;
  terms: string;
}

const PRIZES: Prize[] = [
  {
    id: 'martini',
    name: 'Complimentary Lychee Rose Martini',
    shortName: 'Free Martini',
    value: 'RM40 Value',
    color: 'var(--wheel-color-1, #6D28D9)',
    textColor: '#F5F5F7',
    icon: '🍸',
    terms: 'Valid with any food order for dinner service.'
  },
  {
    id: 'brulee',
    name: 'Complimentary Pandan Crème Brûlée',
    shortName: 'Free Dessert',
    value: 'RM24 Value',
    color: 'var(--wheel-color-2, #2E1065)',
    textColor: '#F5F5F7',
    icon: '🍮',
    terms: 'Valid for table bookings of 2 guests and above.'
  },
  {
    id: 'satay',
    name: 'Charred Chicken Satay (6 Skewers)',
    shortName: 'Free Satay',
    value: 'RM32 Value',
    color: 'var(--wheel-color-3, #7C3AED)',
    textColor: '#FFFFFF',
    icon: '🍢',
    terms: 'Freshly grilled over charcoal. Valid for dinner bookings.'
  },
  {
    id: 'discount15',
    name: '15% Off Chef’s Tasting Menu',
    shortName: '15% Off Tasting',
    value: 'VIP Perk',
    color: 'var(--wheel-color-4, #1E1B2E)',
    textColor: '#EDE9FE',
    icon: '👑',
    terms: 'Applicable to multi-course degustation menus.'
  },
  {
    id: 'spritz',
    name: 'Complimentary Calamansi Spritz',
    shortName: 'Free Spritz',
    value: 'RM36 Value',
    color: 'var(--wheel-color-5, #8B5CF6)',
    textColor: '#FFFFFF',
    icon: '🍹',
    terms: 'Refreshing artisanal gin cocktail.'
  },
  {
    id: 'credit30',
    name: 'RM30 Dining Welcome Credit',
    shortName: 'RM30 Credit',
    value: 'Direct Credit',
    color: 'var(--wheel-color-6, #3B2D54)',
    textColor: '#F5F5F7',
    icon: '✨',
    terms: 'Valid with minimum spend of RM120 on dine-in.'
  }
];

export const GoldenPerkWheel: React.FC = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<Prize | null>(null);
  const [voucherCode, setVoucherCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  const numSegments = PRIZES.length;
  const segmentAngle = 360 / numSegments;

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWonPrize(null);
    setVoucherCode(null);
    setCopied(false);

    // Pick a random prize index
    const prizeIndex = Math.floor(Math.random() * numSegments);
    const selectedPrize = PRIZES[prizeIndex];

    // Calculate rotation to land on the center of that segment
    // 5 full rotations (1800 deg) + offset
    const extraRounds = 5 * 360;
    const segmentCenter = prizeIndex * segmentAngle + segmentAngle / 2;
    const targetAngle = extraRounds + (360 - segmentCenter);
    const newTotalRotation = rotation + targetAngle;

    setRotation(newTotalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(selectedPrize);
      const randomCode = `QRESTO-PERK-${Math.floor(1000 + Math.random() * 9000)}`;
      setVoucherCode(randomCode);

      showToast({
        type: 'success',
        title: '🎉 Congratulations!',
        message: `You unlocked: ${selectedPrize.name}`
      });
    }, 4500);
  };

  const handleCopyCode = () => {
    if (!voucherCode) return;
    navigator.clipboard.writeText(voucherCode);
    setCopied(true);
    showToast({
      type: 'info',
      title: 'Voucher Code Copied',
      message: `${voucherCode} copied to your clipboard.`
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleClaimAndBook = () => {
    if (!voucherCode || !wonPrize) return;
    navigate(`/reservations?voucher=${voucherCode}&perk=${encodeURIComponent(wonPrize.name)}`);
  };

  return (
    <div className="bg-qc-surface border border-border-base rounded-sm p-6 sm:p-10 shadow-xl relative overflow-hidden transition-colors">
      {/* Background radial glow */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: 'var(--experience-accent-glow, rgba(147, 51, 234, 0.1))' }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Wheel Interface */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center">
            {/* Outer decorative rings */}
            <div
              className="absolute inset-0 rounded-full border-4 shadow-xl pointer-events-none"
              style={{ borderColor: 'var(--wheel-ring-primary, rgba(147, 51, 234, 0.4))' }}
            />
            <div
              className="absolute -inset-3 rounded-full border pointer-events-none"
              style={{ borderColor: 'var(--wheel-ring-secondary, rgba(168, 85, 247, 0.2))' }}
            />

            {/* Pointer arrow at top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 w-8 h-8 flex items-center justify-center">
              <div
                className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[22px] drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)] animate-bounce"
                style={{ borderTopColor: 'var(--wheel-pointer-color, #A855F7)' }}
              />
            </div>

            {/* Spinning Wheel */}
            <div
              ref={wheelRef}
              className="w-full h-full rounded-full overflow-hidden relative shadow-inner border-2"
              style={{
                borderColor: 'var(--wheel-border-color, rgba(147, 51, 234, 0.5))',
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning ? 'transform 4.5s cubic-bezier(0.15, 0.9, 0.25, 1)' : 'none'
              }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                {PRIZES.map((prize, idx) => {
                  const startAngle = (idx * segmentAngle * Math.PI) / 180;
                  const endAngle = (((idx + 1) * segmentAngle) * Math.PI) / 180;
                  const x1 = 50 + 50 * Math.cos(startAngle);
                  const y1 = 50 + 50 * Math.sin(startAngle);
                  const x2 = 50 + 50 * Math.cos(endAngle);
                  const y2 = 50 + 50 * Math.sin(endAngle);
                  const largeArc = segmentAngle > 180 ? 1 : 0;
                  const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} Z`;
                  const midAngleDeg = idx * segmentAngle + segmentAngle / 2;

                  return (
                    <g key={prize.id}>
                      <path d={pathData} fill={prize.color} stroke="var(--border-strong)" strokeWidth="0.8" />
                      <g transform={`rotate(${midAngleDeg} 50 50)`}>
                        <text
                          x="75"
                          y="51.5"
                          fill={prize.textColor}
                          fontSize="4.2"
                          fontWeight="bold"
                          textAnchor="middle"
                          transform={`rotate(90 75 51.5)`}
                          className="font-display select-none"
                        >
                          {prize.shortName}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Center Hub Button */}
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className={`absolute z-20 w-20 h-20 rounded-full text-white font-display font-bold text-xs uppercase tracking-wider shadow-2xl flex flex-col items-center justify-center border-4 border-border-base active:scale-95 transition-all ${
                isSpinning ? 'opacity-80 cursor-not-allowed' : 'hover:scale-105'
              }`}
              style={{
                background: 'var(--wheel-hub-gradient, linear-gradient(135deg, #A855F7 0%, #9333EA 50%, #6B21A8 100%))',
                boxShadow: isSpinning ? undefined : 'var(--wheel-hub-shadow, 0 10px 25px -5px rgba(147, 51, 234, 0.5))'
              }}
              aria-label="Spin the perk wheel"
            >
              {isSpinning ? (
                <RotateCw className="w-6 h-6 animate-spin text-white" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mb-0.5" />
                  <span>SPIN</span>
                </>
              )}
            </button>
          </div>

          <p className="mt-6 text-xs text-qc-body text-center font-light">
            {isSpinning ? 'Spinning the wheel... Good luck!' : 'Click the center button to spin for tonight’s welcome treat!'}
          </p>
        </div>

        {/* Right Column: Prize Reveal & Voucher Details */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-purple-500 text-xs font-semibold uppercase tracking-widest">
              <Gift className="w-3.5 h-3.5" />
              <span>Interactive Guest Welcome Magnet</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-qc-primary">
              Chef’s Welcome Perk Wheel
            </h3>
            <p className="text-xs sm:text-sm text-qc-body leading-relaxed font-light">
              Reward prospective diners with an exclusive on-the-house hospitality treat. Diners unlock immediate value and convert directly into seated reservations.
            </p>
          </div>

          {/* Winning Card or Placeholder State */}
          {wonPrize && voucherCode ? (
            <div
              className="bg-qc-base border-2 p-6 rounded-sm space-y-5 animate-slide-up shadow-lg relative overflow-hidden"
              style={{ borderColor: 'var(--experience-card-border, rgba(147, 51, 234, 0.6))' }}
            >
              <div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-xl"
                style={{ backgroundColor: 'var(--experience-accent-glow, rgba(168, 85, 247, 0.2))' }}
              />

              <div className="flex items-start gap-4">
                <div className="text-3xl">{wonPrize.icon}</div>
                <div className="space-y-1">
                  <span
                    className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded"
                    style={{
                      color: 'var(--experience-accent-primary, #A855F7)',
                      backgroundColor: 'var(--experience-accent-surface, rgba(147, 51, 234, 0.1))'
                    }}
                  >
                    Unlocked Treat ({wonPrize.value})
                  </span>
                  <h4 className="text-xl font-display font-bold text-qc-primary">
                    {wonPrize.name}
                  </h4>
                  <p className="text-xs text-qc-body font-light">
                    {wonPrize.terms}
                  </p>
                </div>
              </div>

              {/* Voucher Code Box */}
              <div className="bg-qc-surface border border-border-strong p-3.5 rounded-sm flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase text-purple-500 tracking-wider font-semibold">
                    Your Secret Voucher Code
                  </p>
                  <p className="font-mono text-base font-bold text-qc-primary tracking-wider">
                    {voucherCode}
                  </p>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="btn-gold-outline px-3 py-1.5 text-xs flex items-center gap-1.5 shrink-0"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              {/* 1-Click Action Button */}
              <button
                onClick={handleClaimAndBook}
                className="btn-gold w-full py-3.5 text-xs tracking-widest flex items-center justify-center gap-2"
              >
                <span>Claim &amp; Apply to Table Reservation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="bg-qc-base/60 border border-dashed border-border-strong p-6 rounded-sm text-center space-y-3">
              <Gift className="w-8 h-8 text-purple-500/60 mx-auto" />
              <h4 className="text-base font-display font-medium text-qc-primary">
                Ready to Reveal Tonight’s Treat?
              </h4>
              <p className="text-xs text-qc-body font-light max-w-sm mx-auto">
                Spin the wheel on the left to unlock complimentary cocktails, artisan satay skewers, or dining credits.
              </p>
              <button
                onClick={handleSpin}
                disabled={isSpinning}
                className="btn-gold-outline px-6 py-2.5 text-xs tracking-wider inline-flex items-center gap-2 mt-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Spin Now</span>
              </button>
            </div>
          )}

          {/* Restaurant Owner Growth Note */}
          <div className="border-t border-border-base pt-4 flex items-start gap-3 text-xs text-qc-body font-light">
            <Flame className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
            <p>
              <strong className="text-qc-primary font-medium">Why Restaurant Owners Love This:</strong>{' '}
              Converts hesitant site visitors into committed diners by offering high-margin hospitality treats (e.g. cocktails or signature desserts) in exchange for a direct reservation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
