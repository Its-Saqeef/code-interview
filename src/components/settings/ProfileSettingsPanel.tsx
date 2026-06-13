import { useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import { Camera, Loader2 } from 'lucide-react';
import { getMeApi, updateProfileApi } from '../../api/auth.api';
import { useAuth } from '../../hooks/useAuth';
import { toastService } from '../../services/toast.service';
import { PROFILE_COUNTRIES, getInitials } from '../../utils/profile';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export function ProfileSettingsPanel() {
  const { user, refreshUser } = useAuth();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [country, setCountry] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      setIsLoading(true);

      try {
        const data = await getMeApi();
        if (cancelled) return;

        setFullName(data.user.name);
        setUsername(data.user.username);
        setBio(data.user.bio ?? '');
        setCountry(data.user.country || PROFILE_COUNTRIES[0]);
        setGithubUrl(data.user.githubUrl ?? '');
      } catch {
        if (!cancelled && user) {
          setFullName(user.name);
          setUsername(user.username ?? '');
          setBio(user.bio ?? '');
          setCountry(user.country || PROFILE_COUNTRIES[0]);
          setGithubUrl(user.githubUrl ?? '');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const handleSaveChanges = async () => {
    setIsSaving(true);

    try {
      await updateProfileApi({
        name: fullName.trim(),
        username: username.trim(),
        bio: bio.trim(),
        country: country.trim(),
        githubUrl: githubUrl.trim(),
      });
      await refreshUser();
      toastService.success('Profile updated successfully');
    } catch (error) {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ?? 'Failed to update profile'
        : 'Failed to update profile';
      toastService.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <section className="bg-[#151824] border border-[#2D3149] rounded-lg p-12 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-[#6366F1]" />
      </section>
    );
  }

  return (
    <section className="bg-[#151824] border border-[#2D3149] rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white tracking-tight">Account Profile</h3>
        <Button
          onClick={handleSaveChanges}
          disabled={isSaving}
          className="h-8.5 px-4 text-[10px] font-bold uppercase tracking-wider"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="relative select-none flex-shrink-0">
          <div className="w-24 h-24 rounded-full bg-[#6366F1]/10 border-2 border-[#2D3149] flex items-center justify-center text-2xl font-black text-[#6366F1]">
            {getInitials(fullName || user?.name || 'U')}
          </div>
          <button
            type="button"
            disabled
            title="Avatar upload coming soon"
            className="absolute bottom-0 right-0 bg-[#6366F1] p-2 rounded-full border border-[#151824] shadow-md text-white opacity-60 cursor-not-allowed"
          >
            <Camera className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex-grow w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-mono font-bold text-[#908fa0] uppercase tracking-wider">
              Full Name
            </label>
            <Input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="bg-[#1A1D27] border-[#2D3149] text-xs h-9"
            />
          </div>
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-mono font-bold text-[#908fa0] uppercase tracking-wider">
              Username
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs text-[#908fa0] font-mono">@</span>
              <Input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="bg-[#1A1D27] border-[#2D3149] text-xs h-9 pl-7"
              />
            </div>
          </div>
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-mono font-bold text-[#908fa0] uppercase tracking-wider">
              Email
            </label>
            <Input
              value={user?.email ?? ''}
              disabled
              className="bg-[#1A1D27]/60 border-[#2D3149] text-xs h-9 text-[#908fa0]"
            />
          </div>
          <div className="space-y-1.5 md:col-span-2 text-left">
            <label className="text-[10px] font-mono font-bold text-[#908fa0] uppercase tracking-wider">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              rows={3}
              maxLength={500}
              className="w-full bg-[#1A1D27] border border-[#2D3149] rounded-[4px] px-3 py-2 text-xs text-[#e4e1ed] focus:border-[#6366F1] outline-none transition-all resize-none"
            />
          </div>
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-mono font-bold text-[#908fa0] uppercase tracking-wider">
              Country
            </label>
            <select
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              className="w-full bg-[#1A1D27] border border-[#2D3149] rounded-[4px] px-3 py-2 text-xs text-[#e4e1ed] focus:border-[#6366F1] outline-none transition-all cursor-pointer h-9"
            >
              {PROFILE_COUNTRIES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-mono font-bold text-[#908fa0] uppercase tracking-wider">
              GitHub URL
            </label>
            <Input
              value={githubUrl}
              onChange={(event) => setGithubUrl(event.target.value)}
              placeholder="https://github.com/yourusername"
              className="bg-[#1A1D27] border-[#2D3149] text-xs h-9"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileSettingsPanel;
