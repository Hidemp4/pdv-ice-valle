import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar.tsx";
import PaymentArea from "@/components/PaymentArea";

const MainLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="layout-container flex overflow-hidden max-h-screen max-w-screen">
      <Sidebar />
      <div className="grid grid-cols-2 flex-1 overflow-hidden">
        <div>
          <Header />
          <main className="main-content p-4 overflow-hidden">{children}</main>
        </div>
        <div className="overflow-hidden">
          <PaymentArea />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
