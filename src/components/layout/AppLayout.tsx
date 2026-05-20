import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export const AppLayout = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0F1117] font-inter">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Right Content Area */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Topbar */}
        <Topbar />

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-[#0F1117] text-[#e4e1ed]">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
