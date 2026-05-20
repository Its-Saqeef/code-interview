import { useState } from 'react';
import { 
  Bell, 
  HelpCircle, 
  CheckCircle2, 
  X,
  Cloud,
  FileCode,
  Shield,
  Zap,
  HelpCircle as FaqIcon,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from '../components/ui/Button';

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  { q: 'Can I switch plans later?', a: 'Yes, you can upgrade or downgrade at any time. Changes are prorated to your next billing cycle automatically.' },
  { q: 'Is there a free trial?', a: 'Every new team starts with a 14-day Pro trial. No credit card is required to explore all professional features.' },
  { q: 'Can I cancel my subscription?', a: 'Yes, you can cancel your subscription at any time. You will continue to have access to your plan until the end of your billing period.' },
  { q: 'Do you offer student discounts?', a: 'Yes! Students get 50% off the Pro plan. Verification is processed through your university email address.' }
];

export const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [userPlan, setUserPlan] = useState<'free' | 'pro' | 'team'>('free');

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const handleUpgrade = (plan: 'pro' | 'team') => {
    const price = plan === 'pro' ? (isAnnual ? '$9.60/mo' : '$12/mo') : (isAnnual ? '$39.20/mo' : '$49/mo');
    if (window.confirm(`Confirm upgrade to the ${plan.toUpperCase()} plan for ${price}?`)) {
      setUserPlan(plan);
      alert(`Successfully upgraded to the ${plan.toUpperCase()} plan!`);
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-56px)] bg-[#0F1117] text-[#e4e1ed] font-inter select-none">
      {/* Top Header */}
      <header className="h-14 bg-[#151824] border-b border-[#2D3149] flex justify-between items-center px-6 sticky top-0 z-40 select-none flex-shrink-0">
        <h1 className="text-sm font-bold text-white tracking-tight">Pricing</h1>
        <div className="flex items-center gap-3">
          <button className="p-1.5 rounded hover:bg-[#22263A] text-[#908fa0] hover:text-white transition-colors">
            <Bell className="h-4.5 w-4.5" />
          </button>
          <button className="p-1.5 rounded hover:bg-[#22263A] text-[#908fa0] hover:text-white transition-colors">
            <HelpCircle className="h-4.5 w-4.5" />
          </button>
          <div className="h-4 w-px bg-[#2D3149] mx-1" />
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold">
            <span className="text-[#908fa0] uppercase">Plan:</span>
            <span className="px-2 py-0.5 bg-[#6366F1]/10 border border-[#6366F1]/30 text-[#6366F1] uppercase rounded">
              {userPlan}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6 flex flex-col items-center max-w-[1140px] mx-auto w-full text-center">
        {/* Banner Title */}
        <div className="max-w-3xl w-full space-y-3.5 my-8">
          <span className="px-3 py-1 rounded-full bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/20 text-[10px] font-mono font-bold uppercase tracking-wider inline-block">
            Simple, transparent pricing
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">Scalable coding for every team</h2>
          <p className="text-xs text-[#908fa0] max-w-lg mx-auto leading-relaxed">
            From solo practice to global engineering orgs, find the plan that powers your next technical breakthrough with professional-grade interview tools.
          </p>
        </div>

        {/* Annual Toggle Switch */}
        <div className="flex items-center gap-3.5 mb-10 select-none">
          <span className={`text-xs font-semibold ${!isAnnual ? 'text-white font-bold' : 'text-[#908fa0]'}`}>Monthly</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-12 h-6 bg-[#1A1D27] rounded-full border border-[#2D3149] flex items-center px-1"
          >
            <div className={`w-4 h-4 bg-[#6366F1] rounded-full transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold ${isAnnual ? 'text-white font-bold' : 'text-[#908fa0]'}`}>Annual</span>
            <span className="bg-[#d97721]/15 text-[#d97721] border border-[#d97721]/20 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider">
              Save 20%
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12 text-left">
          {/* Individual Free Plan */}
          <div className="bg-[#151824] border border-[#2D3149] p-6 rounded-lg flex flex-col justify-between hover:border-[#908fa0]/30 transition-all shadow-md relative">
            <div>
              <p className="text-[#7bd0ff] text-[10px] font-mono font-bold uppercase tracking-wider mb-2">Individual</p>
              <h3 className="text-lg font-bold text-white tracking-tight">Free</h3>
              <div className="flex items-baseline gap-1 mt-4">
                <span className="text-3xl font-black text-white">$0</span>
                <span className="text-[10px] text-[#908fa0] font-mono uppercase tracking-wider">/ mo</span>
              </div>
              <p className="text-xs text-[#908fa0] mt-2 leading-relaxed">For developers practicing solo and learning the ropes.</p>

              <div className="space-y-3 mt-6">
                {[
                  '5 interview sessions / mo',
                  'Community problem set',
                  'Basic code editor access',
                ].map((f) => (
                  <div key={f} className="flex items-center gap-2.5 text-xs text-[#e4e1ed]">
                    <CheckCircle2 className="h-4.5 w-4.5 text-[#7bd0ff] flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
                {[
                  'No private repositories',
                ].map((f) => (
                  <div key={f} className="flex items-center gap-2.5 text-xs text-[#464554] line-through">
                    <X className="h-4.5 w-4.5 text-[#464554] flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant={userPlan === 'free' ? 'secondary' : 'primary'}
              disabled={userPlan === 'free'}
              onClick={() => setUserPlan('free')}
              className="w-full h-10 mt-8 text-[10px] font-bold uppercase tracking-wider border-[#2D3149]"
            >
              {userPlan === 'free' ? 'Current Plan' : 'Downgrade to Free'}
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="bg-[#151824] border-2 border-[#6366F1] p-6 rounded-lg flex flex-col justify-between hover:brightness-105 transition-all shadow-xl relative">
            <span className="absolute top-4 right-4 bg-[#6366F1] text-white px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider">
              Most Popular
            </span>
            <div>
              <p className="text-[#6366F1] text-[10px] font-mono font-bold uppercase tracking-wider mb-2">Professional</p>
              <h3 className="text-lg font-bold text-white tracking-tight">Pro</h3>
              <div className="flex items-baseline gap-1 mt-4">
                <span className="text-3xl font-black text-white">
                  {isAnnual ? '$9.60' : '$12'}
                </span>
                <span className="text-[10px] text-[#908fa0] font-mono uppercase tracking-wider">/ mo</span>
              </div>
              <p className="text-xs text-[#908fa0] mt-2 leading-relaxed">Everything you need for serious career advancement.</p>

              <div className="space-y-3 mt-6">
                {[
                  'Unlimited interview sessions',
                  'AI-Powered Interview Coach',
                  'Private problem repositories',
                  'HD Video session recording',
                ].map((f) => (
                  <div key={f} className="flex items-center gap-2.5 text-xs text-[#e4e1ed]">
                    <CheckCircle2 className="h-4.5 w-4.5 text-[#6366F1] flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={() => handleUpgrade('pro')}
              className={`w-full h-10 mt-8 text-[10px] font-bold uppercase tracking-wider bg-[#6366F1] text-white hover:brightness-110 shadow-lg ${
                userPlan === 'pro' ? 'opacity-65 pointer-events-none' : ''
              }`}
            >
              {userPlan === 'pro' ? 'Current Plan (Pro)' : 'Upgrade to Pro'}
            </Button>
          </div>

          {/* Team Plan */}
          <div className="bg-[#151824] border border-[#2D3149] p-6 rounded-lg flex flex-col justify-between hover:border-[#908fa0]/30 transition-all shadow-md relative">
            <div>
              <p className="text-[#d97721] text-[10px] font-mono font-bold uppercase tracking-wider mb-2">Corporate</p>
              <h3 className="text-lg font-bold text-white tracking-tight">Team</h3>
              <div className="flex items-baseline gap-1 mt-4">
                <span className="text-3xl font-black text-white">
                  {isAnnual ? '$39.20' : '$49'}
                </span>
                <span className="text-[10px] text-[#908fa0] font-mono uppercase tracking-wider">/ mo</span>
              </div>
              <p className="text-xs text-[#908fa0] mt-2 leading-relaxed">Advanced analytics and security for hiring teams.</p>

              <div className="space-y-3 mt-6">
                {[
                  'Single Sign-On (SSO)',
                  'Team performance analytics',
                  'Priority 24/7 technical support',
                  'White-label interview portal',
                ].map((f) => (
                  <div key={f} className="flex items-center gap-2.5 text-xs text-[#e4e1ed]">
                    <CheckCircle2 className="h-4.5 w-4.5 text-[#d97721] flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={() => handleUpgrade('team')}
              variant="secondary"
              className={`w-full h-10 mt-8 text-[10px] font-bold uppercase tracking-wider border-[#2D3149] hover:bg-[#1A1D27] ${
                userPlan === 'team' ? 'opacity-65 pointer-events-none' : ''
              }`}
            >
              {userPlan === 'team' ? 'Current Plan (Team)' : 'Contact Sales'}
            </Button>
          </div>
        </div>

        {/* Trust logos Section */}
        <section className="w-full max-w-4xl p-6 bg-[#151824] rounded-lg border border-[#2D3149] text-center mb-10 select-none">
          <p className="text-[9px] font-mono font-bold text-[#908fa0] uppercase tracking-wider mb-4">Trusted by engineers at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-40 grayscale">
            <div className="flex items-center gap-1.5 font-bold text-white text-xs">
              <Cloud className="h-4 w-4 text-white" />
              <span className="font-mono tracking-widest uppercase">Nebula</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-white text-xs">
              <FileCode className="h-4 w-4 text-white" />
              <span className="font-mono tracking-widest uppercase">Synth</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-white text-xs">
              <Zap className="h-4 w-4 text-white" />
              <span className="font-mono tracking-widest uppercase">Quantum</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-white text-xs">
              <Shield className="h-4 w-4 text-white" />
              <span className="font-mono tracking-widest uppercase">Aegis</span>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="w-full max-w-4xl space-y-3.5 text-left mb-8">
          <h3 className="text-xs font-bold text-white tracking-tight uppercase flex items-center gap-2">
            <FaqIcon className="h-4.5 w-4.5 text-[#6366F1]" />
            <span>Frequently Asked Questions</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-[#151824] p-4 rounded-lg border border-[#2D3149] cursor-pointer hover:border-[#6366F1]/50 transition-all select-none"
                  onClick={() => toggleFaq(idx)}
                >
                  <div className="flex justify-between items-center gap-2">
                    <h4 className="text-xs font-bold text-white">{faq.q}</h4>
                    {isOpen ? <ChevronUp className="h-4 w-4 text-[#908fa0]" /> : <ChevronDown className="h-4 w-4 text-[#908fa0]" />}
                  </div>
                  {isOpen && (
                    <p className="text-[11px] text-[#908fa0] leading-relaxed mt-2 select-text">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default PricingPage;
