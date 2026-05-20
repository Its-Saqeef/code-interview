import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { HelpCircle } from 'lucide-react';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0F1117] text-[#e4e1ed] font-inter flex items-center justify-center p-6 selection:bg-[#6366F1]/30 selection:text-white">
      <Card className="max-w-md w-full bg-[#1A1D27] border-[#2D3149] p-8 text-center space-y-6 shadow-2xl">
        <div className="mx-auto h-12 w-12 rounded-[6px] bg-[#6366F1]/10 flex items-center justify-center text-[#6366F1]">
          <HelpCircle className="h-6 w-6" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white tracking-tight">Page Not Found</h1>
          <p className="text-xs text-[#908fa0] leading-relaxed">
            The path you are looking for does not exist, or has been relocated to another workspace.
          </p>
        </div>
        <div className="flex gap-4">
          <Button onClick={() => navigate(-1)} variant="secondary" className="flex-1 border-[#2D3149] hover:bg-[#22263A]">
            Go Back
          </Button>
          <Button onClick={() => navigate('/welcome')} className="flex-1">
            Home Portal
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default NotFoundPage;
