import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <main className="w-full min-h-screen bg-linear-to-br from-blue-300 to-blue-900 py-16">
      <Outlet />
    </main>
  );
};

export default MainLayout;
