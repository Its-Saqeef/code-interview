import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Code2, Mail, Lock, Info, User as UserIcon, Loader2 } from 'lucide-react';
import clsx from 'clsx';
import { toastService } from '../services/toast.service';

export const LoginPage = ({ initialTab = 'login' }: { initialTab?: 'login' | 'signup' }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [usernameVal, setUsernameVal] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingAdmin, setLoadingAdmin] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from?.pathname || '/';

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  const handleAdminLogin = async () => {
    setLoadingAdmin(true);
    try {
      await login('admin@compile.io', 'admin123456');
      toastService.success('Admin session authorized successfully!');
      navigate('/admin', { replace: true });
    } catch (err: any) {
      console.error(err);
      const errMsg = err?.response?.data?.message || err?.message || 'Admin login failed';
      toastService.error(errMsg);
    } finally {
      setLoadingAdmin(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingUser(true);
    try {
      if (activeTab === 'login') {
        await login(email, password);
        toastService.success('Logged in successfully!');
        navigate(redirectPath, { replace: true });
      } else {
        await register(name, usernameVal, email, password, avatarUrl);
        toastService.success('Account created successfully!');
        navigate(redirectPath, { replace: true });
      }
    } catch (err: any) {
      console.error(err);
      const errMsg = err?.response?.data?.message || err?.message || 'Authentication failed';
      toastService.error(errMsg);
    } finally {
      setLoadingUser(false);
    }
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
              onClick={() => {
                setActiveTab('login');
              }}
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
              onClick={() => {
                setActiveTab('signup');
              }}
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
            {/* Quick Access Admin Button */}
            <Button
              variant="secondary"
              onClick={handleAdminLogin}
              className="w-full h-11 border-[#2D3149] hover:bg-[#22263A] text-xs font-medium gap-2 justify-center text-[#10B981] hover:text-[#10B981]"
            >
              <span>Quick Access: Admin Account</span>
            </Button>

            {/* Separator */}
            <div className="relative flex items-center select-none py-1">
              <div className="flex-grow border-t border-[#2D3149]/40" />
              <span className="flex-shrink mx-4 font-mono text-[9px] text-[#908fa0] tracking-wider font-semibold">
                OR
              </span>
              <div className="flex-grow border-t border-[#2D3149]/40" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === 'signup' && (
                <>
                  {/* Full Name field */}
                  <div className="space-y-1.5 text-left">
                    <Label htmlFor="name" className="text-[10px] font-mono tracking-wider text-[#908fa0] uppercase ml-1">
                      Full Name
                    </Label>
                    <div className="relative">
                      <UserIcon className="absolute right-3.5 top-3.5 h-4 w-4 text-[#908fa0]/60" />
                      <Input
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="pl-10.5 h-11 bg-[#1A1D27] border-[#2D3149] focus:border-[#6366F1] placeholder:text-[#908fa0]/30"
                      />
                    </div>
                  </div>

                  {/* Username field */}
                  <div className="space-y-1.5 text-left">
                    <Label htmlFor="username" className="text-[10px] font-mono tracking-wider text-[#908fa0] uppercase ml-1">
                      Username
                    </Label>
                    <div className="relative">
                      <span className="absolute right-3.5 top-3.5 text-xs text-[#908fa0]/60 font-mono">@</span>
                      <Input
                        id="username"
                        type="text"
                        required
                        value={usernameVal}
                        onChange={(e) => setUsernameVal(e.target.value)}
                        placeholder="@johndoe"
                        className="pl-10.5 h-11 bg-[#1A1D27] border-[#2D3149] focus:border-[#6366F1] placeholder:text-[#908fa0]/30"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Email field */}
              <div className="space-y-1.5 text-left">
                <Label htmlFor="email" className="text-[10px] font-mono tracking-wider text-[#908fa0] uppercase ml-1">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute right-3.5 top-3.5 h-4 w-4 text-[#908fa0]/60" />
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


              {/* Password field */}
              <div className="space-y-1.5 text-left">
                <div className="flex justify-between items-center px-1">
                  <Label htmlFor="password" className="text-[10px] font-mono tracking-wider text-[#908fa0] uppercase">
                    Password
                  </Label>
                  {activeTab === 'login' && (
                    <a href="#" className="text-[10px] font-mono text-[#6366F1] hover:underline">
                      Forgot?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute right-3.5 top-3.5 h-4 w-4 text-[#908fa0]/60" />
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
                {/* Avatar field (only shown for sign up) */}
                {activeTab === 'signup' && (
                  <div className="space-y-1.5 text-left">
                    <div className="flex justify-between items-center px-1">
                      <Label htmlFor="avatar" className="text-[10px] font-mono tracking-wider text-[#908fa0] uppercase">
                        Avatar
                      </Label>
                      <span className="text-[10px] font-mono text-[#908fa0]/60">Optional</span>
                    </div>
                    <div className="relative">
                      <input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatar}
                        className="hidden"
                      />
                      <label
                        htmlFor="avatar"
                        className="flex items-center justify-center w-full h-11 cursor-pointer"
                      >
                        <div className="flex-grow border-2 border-[#2D3149] border-dashed rounded-[6px] flex flex-col items-center justify-center p-2 hover:border-[#6366F1] transition-colors">
                          {avatarUrl ? (
                            <>
                              <img src={avatarUrl} alt="Selected Avatar" className="h-8 w-8 rounded object-cover mb-1" />
                              <span className="text-[9px] font-mono text-[#908fa0] max-w-full truncate">Selected</span>
                            </>
                          ) : (
                            <>
                              <UserIcon className="h-4 w-4 text-[#908fa0]/60 mb-1" />
                              <span className="text-[9px] font-mono text-[#908fa0]">Click to upload</span>
                            </>
                          )}
                        </div>
                      </label>
                    </div>
                  </div>
                )}

              </div>

              {/* Action buttons */}
              <div className="pt-2 space-y-3">
                <Button
                  type="submit"
                  disabled={loadingUser || loadingAdmin}
                  className="w-full h-11 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  {loadingUser && <Loader2 className="h-4 w-4 animate-spin" />}
                  <span>{loadingUser ? 'Authorizing Session...' : activeTab === 'login' ? 'Log In Session' : 'Create Account'}</span>
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  disabled={loadingUser || loadingAdmin}
                  onClick={handleAdminLogin}
                  className="w-full h-11 border-[#2D3149] hover:bg-[#22263A] text-xs font-semibold uppercase tracking-wider text-[#10B981] hover:text-[#10B981] hover:border-[#10B981]/30 flex items-center justify-center gap-2"
                >
                  {loadingAdmin && <Loader2 className="h-4 w-4 animate-spin" />}
                  <span>{loadingAdmin ? 'Authorizing Admin...' : 'Log In as Administrator'}</span>
                </Button>
              </div>
            </form>

            {/* Helper Info */}
            <div className="flex items-start gap-2.5 p-3.5 bg-[#22263A] rounded-[6px] border border-[#2D3149] text-xs text-[#908fa0] leading-5 text-left">
              <Info className="h-4.5 w-4.5 text-[#6366F1] flex-shrink-0 mt-0.5" />
              <p>
                To explore admin screens, click the green administrator login. To explore normal candidate views, complete standard login or sign up for a new account.
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
