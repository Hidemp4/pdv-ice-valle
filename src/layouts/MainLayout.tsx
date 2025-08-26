import Sidebar from "@/components/Sidebar";
import Home from "./Home";

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex w-screen h-screen">
      <Sidebar className="w-20 h-screen" />
      <div className="flex-1">
        {children ?? <Home />}
      </div>
    </div>
  );
};

export default MainLayout;
