import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Code2, Mail, Lock, Info } from 'lucide-react';
import clsx from 'clsx';

export const LoginPage = ({ initialTab = 'login' }: { initialTab?: 'login' | 'signup' }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingAdmin, setLoadingAdmin] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from?.pathname || '/';

  const handleMockLogin = async (role: 'user' | 'admin') => {
    if (role === 'user') setLoadingUser(true);
    if (role === 'admin') setLoadingAdmin(true);
    
    try {
      await login(email || `${role}@compile.io`, role);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      console.error(err);
    } finally {
      if (role === 'user') setLoadingUser(false);
      if (role === 'admin') setLoadingAdmin(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleMockLogin('user');
  };

  return (
    <div className="min-h-screen bg-[#0F1117] text-[#e4e1ed] font-inter flex items-center justify-center p-6 selection:bg-[#6366F1]/30 selection:text-white relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#6366F1]/5 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#10B981]/5 blur-[120px]" />

      <main className="w-full max-w-[400px] relative z-10 space-y-8 animate-fade-in">
        {/* Brand identity */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="h-10 w-10 rounded-[6px] bg-[#6366F1] flex items-center justify-center text-white">
              <Code2 className="h-6 w-6" />
            </div>
            <span className="font-mono text-xl font-bold tracking-tight text-white uppercase">
              COMPILE.IO
            </span>
          </div>
          <p className="text-[10px] font-mono font-semibold text-[#908fa0] uppercase tracking-[0.25em]">
            Interview Suite
          </p>
        </div>

        {/* Auth Card */}
        <Card className="bg-[#1A1D27] border-[#2D3149] rounded-lg overflow-hidden shadow-2xl">
          {/* Tabs */}
          <div className="flex border-b border-[#2D3149]">
            <button
              onClick={() => setActiveTab('login')}
              className={clsx(
                "flex-1 py-4 text-xs font-semibold uppercase tracking-wider transition-all duration-200 border-b-2",
                activeTab === 'login'
                  ? "text-[#6366F1] border-[#6366F1] bg-[#1A1D27]"
                  : "text-[#908fa0] border-transparent hover:text-[#e4e1ed] hover:bg-[#22263A]"
              )}
            >
              Log In
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={clsx(
                "flex-1 py-4 text-xs font-semibold uppercase tracking-wider transition-all duration-200 border-b-2",
                activeTab === 'signup'
                  ? "text-[#6366F1] border-[#6366F1] bg-[#1A1D27]"
                  : "text-[#908fa0] border-transparent hover:text-[#e4e1ed] hover:bg-[#22263A]"
              )}
            >
              Sign Up
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-6">
            {/* Social Authentication */}
            <Button
              variant="secondary"
              onClick={() => handleMockLogin('user')}
              className="w-full h-11 border-[#2D3149] hover:bg-[#22263A] text-xs font-medium gap-2 justify-center"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              <span>Continue with GitHub</span>
            </Button>

            {/* Separator */}
            <div className="relative flex items-center select-none py-1">
              <div className="flex-grow border-t border-[#2D3149]/40" />
              <span className="flex-shrink mx-4 font-mono text-[9px] text-[#908fa0] tracking-wider font-semibold">
                OR
              </span>
              <div className="flex-grow border-t border-[#2D3149]/40" />
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5 text-left">
                <Label htmlFor="email" className="text-[10px] font-mono tracking-wider text-[#908fa0] uppercase ml-1">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-4.5 w-4.5 text-[#908fa0]/60" />
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="pl-10.5 h-11 bg-[#1A1D27] border-[#2D3149] focus:border-[#6366F1] placeholder:text-[#908fa0]/30"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <div className="flex justify-between items-center px-1">
                  <Label htmlFor="password" className="text-[10px] font-mono tracking-wider text-[#908fa0] uppercase">
                    Password
                  </Label>
                  <a href="#" className="text-[10px] font-mono text-[#6366F1] hover:underline">
                    Forgot?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 h-4.5 w-4.5 text-[#908fa0]/60" />
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10.5 h-11 bg-[#1A1D27] border-[#2D3149] focus:border-[#6366F1] placeholder:text-[#908fa0]/30"
                  />
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <Button
                  type="submit"
                  disabled={loadingUser || loadingAdmin}
                  className="w-full h-11 text-xs font-semibold uppercase tracking-wider"
                >
                  {loadingUser ? 'Authorizing Session...' : activeTab === 'login' ? 'Log In Session' : 'Create Account'}
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  disabled={loadingUser || loadingAdmin}
                  onClick={() => handleMockLogin('admin')}
                  className="w-full h-11 border-[#2D3149] hover:bg-[#22263A] text-xs font-semibold uppercase tracking-wider text-[#10B981] hover:text-[#10B981] hover:border-[#10B981]/30"
                >
                  {loadingAdmin ? 'Authorizing Admin...' : 'Log In as Administrator'}
                </Button>
              </div>
            </form>

            {/* Helper Info */}
            <div className="flex items-start gap-2.5 p-3.5 bg-[#22263A] rounded-[6px] border border-[#2D3149] text-xs text-[#908fa0] leading-5 text-left">
              <Info className="h-4.5 w-4.5 text-[#6366F1] flex-shrink-0 mt-0.5" />
              <p>
                To explore admin screens, click the green administrator login. To explore normal candidate views, complete standard login.
              </p>
            </div>
          </div>
        </Card>

        {/* Footer info agreements */}
        <p className="text-center font-mono text-[10px] text-[#908fa0]/60 leading-5 px-6">
          By continuing, you agree to Compile.io's{' '}
          <a className="text-[#908fa0] underline hover:text-white" href="#">
            Terms of Service
          </a>{' '}
          and{' '}
          <a className="text-[#908fa0] underline hover:text-white" href="#">
            Privacy Policy
          </a>
          .
        </p>
      </main>
    </div>
  );
};

export default LoginPage;
