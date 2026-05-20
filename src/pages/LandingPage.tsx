import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { 
  Sparkles, 
  ArrowRight, 
  Users, 
  Terminal, 
  RotateCcw, 
  Globe, 
  HelpCircle,
  Code2
} from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-[#0F1117] text-[#e4e1ed] font-inter flex flex-col selection:bg-[#6366F1]/30 selection:text-white">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#1A1D27]/80 backdrop-blur-md z-50 border-b border-[#2D3149] px-6 flex justify-between items-center select-none">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-[6px] bg-[#6366F1] flex items-center justify-center text-white">
            <Code2 className="h-5 w-5" />
          </div>
          <span className="font-mono text-sm font-semibold tracking-wider text-white uppercase">
            COMPILE.IO
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link 
            to="/login" 
            className="text-xs font-mono font-medium tracking-wider text-[#908fa0] hover:text-white transition-colors"
          >
            SIGN IN
          </Link>
          <Button 
            onClick={() => navigate('/login')}
            className="h-9 px-4 text-xs animate-fade-in"
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Main viewport */}
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[850px] flex flex-col items-center justify-center text-center px-6 pt-16 hero-gradient overflow-hidden">
          {/* Hero background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-[#6366F1]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto space-y-6 relative z-10">
            {/* AI badge tag */}
            <div className="inline-flex items-center gap-2 bg-[#22263A] border border-[#2D3149] px-3.5 py-1.5 rounded-full mb-2">
              <Sparkles className="h-3.5 w-3.5 text-[#6366F1]" />
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#6366F1]">
                Now with AI code analysis
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
              Interview smarter, <span className="text-[#6366F1]">together</span>
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-[#908fa0] max-w-2xl mx-auto leading-relaxed">
              Real-time collaborative coding interviews with live execution. The technical hiring platform built for speed, accuracy, and deep focus.
            </p>

            {/* CTA Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button 
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto h-12 px-8 text-sm gap-2"
              >
                <span>Start Interview</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                variant="secondary"
                onClick={() => navigate('/styling')}
                className="w-full sm:w-auto h-12 px-8 text-sm border-[#2D3149] hover:bg-[#22263A]"
              >
                Practice Solo
              </Button>
            </div>
          </div>

          {/* IDE Preview Showcase Container */}
          <div className="mt-20 w-full max-w-5xl mx-auto rounded-lg border border-[#2D3149] bg-[#1A1D27] overflow-hidden shadow-2xl relative z-10">
            <div className="h-9 bg-[#1A1D27] border-b border-[#2D3149] flex items-center px-4 gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]/40" />
            </div>
            <img 
              alt="IDE Interface Preview" 
              className="w-full h-auto opacity-90 select-none pointer-events-none" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-astJFzqJmLz2fKldIkLZGiK0HtIlBWNBBwQWopyRhwtQWqotFE3F55mvmWzrrLRua6gVjxYaL_ALY3U-X4t0rm3-70QxZc8RMePi-KtOdvWk-P-Ii9LH_7GlgKZ0vtZHS4dccsmj-04FU91dQwwlUK0xoi8Xnu5YacdElwuqaXeI-j_3yAcZkXAYxpWRQy8Y8A9hrRGYGsZmBy-aipFxexoC7vFYgsaGCzCFTdHVQbQyd6wb2yd8rDDeEkxxK9kyJkQClcVmlD4"
            />
          </div>
        </section>

        {/* Bento Grid Features */}
        <section className="py-24 px-6 max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <Card className="bg-[#1A1D27]/50 border-[#2D3149] p-8 flex flex-col gap-4 hover:bg-[#1A1D27] hover:border-[#6366F1]/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-[#6366F1]/10 flex items-center justify-center group-hover:bg-[#6366F1]/20 transition-all duration-300 text-[#6366F1]">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">Real-time Collaboration</h3>
              <p className="text-sm text-[#908fa0] leading-relaxed">
                Latency-free shared editor with multi-cursor support. Type together, debug together, and evaluate faster with no sync issues.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card className="bg-[#1A1D27]/50 border-[#2D3149] p-8 flex flex-col gap-4 hover:bg-[#1A1D27] hover:border-[#6366F1]/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-[#10B981]/10 flex items-center justify-center group-hover:bg-[#10B981]/20 transition-all duration-300 text-[#10B981]">
                <Terminal className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">Multi-language Execution</h3>
              <p className="text-sm text-[#908fa0] leading-relaxed">
                Execute code in 20+ languages instantly. Built-in isolated sandboxes ensure secure and consistent runtimes for every session.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className="bg-[#1A1D27]/50 border-[#2D3149] p-8 flex flex-col gap-4 hover:bg-[#1A1D27] hover:border-[#6366F1]/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center group-hover:bg-[#F59E0B]/20 transition-all duration-300 text-[#F59E0B]">
                <RotateCcw className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">Session Replay</h3>
              <p className="text-sm text-[#908fa0] leading-relaxed">
                Review every keystroke after the interview. Replay the entire thought process of the candidate with our deterministic playback system.
              </p>
            </Card>
          </div>
        </section>

        {/* Social Proof Stats */}
        <section className="py-12 border-y border-[#2D3149]/40 bg-[#1A1D27]/20 select-none">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-around items-center gap-8 opacity-45 grayscale hover:opacity-75 transition-opacity duration-300">
            <span className="font-mono text-sm font-semibold tracking-[0.25em] text-white">GITHUB</span>
            <span className="font-mono text-sm font-semibold tracking-[0.25em] text-white">VERCEL</span>
            <span className="font-mono text-sm font-semibold tracking-[0.25em] text-white">LINEAR</span>
            <span className="font-mono text-sm font-semibold tracking-[0.25em] text-white">STRIPE</span>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1A1D27]/40 border-t border-[#2D3149] py-16 mt-auto select-none">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-[6px] bg-[#6366F1] flex items-center justify-center text-white">
                <Code2 className="h-5 w-5" />
              </div>
              <span className="font-mono text-sm font-semibold tracking-wider text-white uppercase">
                COMPILE.IO
              </span>
            </div>
            <p className="text-xs text-[#908fa0] leading-relaxed max-w-[220px]">
              Empowering technical teams to find the best talent through better interviews.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-mono font-semibold text-white tracking-widest uppercase">Product</h4>
            <ul className="space-y-2 text-xs text-[#908fa0]">
              <li><a className="hover:text-[#6366F1] transition-colors" href="#">Features</a></li>
              <li><a className="hover:text-[#6366F1] transition-colors" href="#">Pricing</a></li>
              <li><a className="hover:text-[#6366F1] transition-colors" href="#">Security</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-mono font-semibold text-white tracking-widest uppercase">Company</h4>
            <ul className="space-y-2 text-xs text-[#908fa0]">
              <li><a className="hover:text-[#6366F1] transition-colors" href="#">About Us</a></li>
              <li><a className="hover:text-[#6366F1] transition-colors" href="#">Careers</a></li>
              <li><a className="hover:text-[#6366F1] transition-colors" href="#">Blog</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-mono font-semibold text-white tracking-widest uppercase">Legal</h4>
            <ul className="space-y-2 text-xs text-[#908fa0]">
              <li><a className="hover:text-[#6366F1] transition-colors" href="#">Privacy</a></li>
              <li><a className="hover:text-[#6366F1] transition-colors" href="#">Terms</a></li>
              <li><a className="hover:text-[#6366F1] transition-colors" href="#">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-[#2D3149]/40 flex justify-between items-center text-xs text-[#908fa0]">
          <span>© 2026 Compile.io Inc. All rights reserved.</span>
          <div className="flex gap-4">
            <Globe className="h-4.5 w-4.5 cursor-pointer hover:text-white transition-colors" />
            <HelpCircle className="h-4.5 w-4.5 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
