import { useEffect, useState } from 'react';
import {
  Bell,
  HelpCircle,
  Calendar,
  Globe,
  Link as LinkIcon,
  Award,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Loader2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  getMeApi,
  getMyLanguagesApi,
  getMyStatsApi,
  getMySubmissionsApi,
  type LanguageBreakdown,
  type ProfileStats,
  type UserSubmission,
} from '../api/auth.api';
import type { User } from '../hooks/useAuth';
import {
  formatJoinDate,
  formatRelativeTime,
  formatSubmissionStatus,
  getInitials,
} from '../utils/profile';

const LANGUAGE_COLORS = ['bg-[#6366F1]', 'bg-[#7bd0ff]', 'bg-[#d97721]', 'bg-[#10B981]'];

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<User | null>(null);
  const [stats, setStats] = useState<ProfileStats | null>(null);
  const [submissions, setSubmissions] = useState<UserSubmission[]>([]);
  const [languages, setLanguages] = useState<LanguageBreakdown[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      setIsLoading(true);
      setError(null);

      try {
        const [profileData, statsData, submissionsData, languagesData] = await Promise.all([
          getMeApi(),
          getMyStatsApi(),
          getMySubmissionsApi(),
          getMyLanguagesApi(),
        ]);

        if (cancelled) return;

        setProfile(profileData.user);
        setStats(statsData.stats);
        setSubmissions(submissionsData.submissions);
        setLanguages(languagesData.languages);
      } catch {
        if (!cancelled) {
          setError('Failed to load profile data.');
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
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-56px)] bg-[#0F1117] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#6366F1]" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-[calc(100vh-56px)] bg-[#0F1117] flex items-center justify-center text-[#EF4444] text-sm">
        {error ?? 'Profile unavailable'}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-56px)] bg-[#0F1117] text-[#e4e1ed] font-inter select-none">
      <header className="h-14 bg-[#151824] border-b border-[#2D3149] flex justify-between items-center px-6 sticky top-0 z-40 select-none flex-shrink-0">
        <h1 className="text-sm font-bold text-white tracking-tight">Profile</h1>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/settings')}
            className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6366F1] hover:text-white transition-colors"
          >
            Edit Profile
          </button>
          <button className="p-1.5 rounded hover:bg-[#22263A] text-[#908fa0] hover:text-white transition-colors">
            <Bell className="h-4.5 w-4.5" />
          </button>
          <button className="p-1.5 rounded hover:bg-[#22263A] text-[#908fa0] hover:text-white transition-colors">
            <HelpCircle className="h-4.5 w-4.5" />
          </button>
        </div>
      </header>

      <div className="flex-grow p-6 space-y-6 max-w-[1140px] mx-auto w-full text-left">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-[#151824] border border-[#2D3149] rounded-lg p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-28 h-28 rounded-lg bg-[#6366F1]/10 border border-[#2D3149] flex items-center justify-center text-3xl font-black text-[#6366F1] flex-shrink-0 select-none">
              {getInitials(profile.name)}
            </div>
            <div className="flex-grow space-y-4 text-center sm:text-left">
              <div>
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <h2 className="text-xl font-bold text-white tracking-tight">{profile.name}</h2>
                  <span className="bg-[#6366F1]/20 text-[#6366F1] border border-[#6366F1]/30 px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider">
                    {profile.role === 'admin' ? 'Admin' : 'Member'}
                  </span>
                </div>
                <p className="text-xs font-mono text-[#908fa0] mt-0.5">@{profile.username}</p>
              </div>

              <p className="text-xs text-[#908fa0] leading-relaxed max-w-lg">
                {profile.bio?.trim() || 'No bio yet. Add one from Settings → Profile.'}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-y-2 gap-x-4 text-[10px] font-mono text-[#908fa0]">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Joined {formatJoinDate(profile.createdAt)}</span>
                </div>
                {profile.country && (
                  <div className="flex items-center gap-1.5">
                    <Globe className="h-3.5 w-3.5" />
                    <span>{profile.country}</span>
                  </div>
                )}
                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-[#6366F1] hover:underline"
                  >
                    <LinkIcon className="h-3.5 w-3.5" />
                    <span>{profile.githubUrl.replace(/^https?:\/\//, '')}</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="bg-[#151824] border border-[#2D3149] rounded-lg p-5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold text-white tracking-tight uppercase">Progress</h3>
                <Award className="h-4.5 w-4.5 text-[#6366F1]" />
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#908fa0]">Problems solved</span>
                  <span className="font-bold text-[#10B981]">{stats?.solvedCount ?? 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#908fa0]">Total submissions</span>
                  <span className="font-bold text-white">{stats?.totalSubmissions ?? 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#908fa0]">Acceptance rate</span>
                  <span className="font-bold text-[#7bd0ff]">
                    {stats?.winRate !== null && stats?.winRate !== undefined ? `${stats.winRate}%` : '—'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#151824] border border-[#2D3149] p-5 rounded-lg text-left shadow-lg">
            <p className="text-[9px] font-mono font-bold text-[#908fa0] uppercase tracking-wider mb-2">Solved</p>
            <p className="text-xl font-bold text-[#6366F1]">{stats?.solvedCount ?? 0}</p>
          </div>
          <div className="bg-[#151824] border border-[#2D3149] p-5 rounded-lg text-left shadow-lg">
            <p className="text-[9px] font-mono font-bold text-[#908fa0] uppercase tracking-wider mb-2">Submissions</p>
            <p className="text-xl font-bold text-white">{stats?.totalSubmissions ?? 0}</p>
          </div>
          <div className="bg-[#151824] border border-[#2D3149] p-5 rounded-lg text-left shadow-lg">
            <p className="text-[9px] font-mono font-bold text-[#908fa0] uppercase tracking-wider mb-2">Acceptance</p>
            <p className="text-xl font-bold text-[#7bd0ff]">
              {stats?.winRate !== null && stats?.winRate !== undefined ? `${stats.winRate}%` : '—'}
            </p>
          </div>
          <div className="bg-[#151824] border border-[#2D3149] p-5 rounded-lg text-left shadow-lg">
            <p className="text-[9px] font-mono font-bold text-[#908fa0] uppercase tracking-wider mb-2">Languages</p>
            <p className="text-xl font-bold text-[#d97721]">{languages.length}</p>
          </div>
        </section>

        {languages.length > 0 && (
          <section className="bg-[#151824] border border-[#2D3149] rounded-lg p-5 space-y-4">
            <h3 className="text-xs font-bold text-white tracking-tight uppercase">Preferred Languages</h3>
            <div className="space-y-3.5 max-w-xl">
              {languages.map((lang, index) => (
                <div key={lang.name} className="space-y-1 text-left">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="font-semibold text-white">{lang.name}</span>
                    <span className="text-[#908fa0]">{lang.pct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#1A1D27] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${LANGUAGE_COLORS[index % LANGUAGE_COLORS.length]} rounded-full`}
                      style={{ width: `${lang.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="bg-[#151824] border border-[#2D3149] rounded-lg overflow-hidden">
          <div className="p-5 border-b border-[#2D3149]/60 flex justify-between items-center">
            <h3 className="text-xs font-bold text-white tracking-tight uppercase">Recent Submissions</h3>
            <button
              type="button"
              onClick={() => navigate('/history')}
              className="text-[#6366F1] hover:text-white text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {submissions.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#908fa0]">
              No submissions yet. Solve a problem in Solo Practice to see activity here.
            </div>
          ) : (
            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="bg-[#1A1D27]/30 text-[#908fa0] text-[9px] font-mono font-bold uppercase tracking-wider">
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5">Problem</th>
                    <th className="px-6 py-3.5">Language</th>
                    <th className="px-6 py-3.5">Runtime</th>
                    <th className="px-6 py-3.5">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2D3149]/30 text-xs">
                  {submissions.map((submission) => {
                    const accepted = submission.status === 'passed';
                    const label = formatSubmissionStatus(submission.status);

                    return (
                      <tr
                        key={submission.id}
                        className="hover:bg-[#1A1D27]/25 transition-colors cursor-pointer"
                        onClick={() => navigate(`/problems/${submission.slug}`)}
                      >
                        <td className="px-6 py-3.5">
                          <div className="flex items-center gap-2">
                            {accepted ? (
                              <>
                                <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                                <span className="text-[#10B981] font-semibold">{label}</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="h-4 w-4 text-[#EF4444]" />
                                <span className="text-[#EF4444] font-semibold">{label}</span>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-3.5 text-white font-medium">{submission.problem}</td>
                        <td className="px-6 py-3.5 font-mono text-[#7bd0ff]">{submission.language}</td>
                        <td className="px-6 py-3.5 font-mono text-[#908fa0]">
                          {submission.runtimeMs !== null ? `${submission.runtimeMs} ms` : '—'}
                        </td>
                        <td className="px-6 py-3.5 text-[#908fa0]">
                          {formatRelativeTime(submission.createdAt)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
