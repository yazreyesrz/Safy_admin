// src/layouts/MainLayout.jsx
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="d-flex">
      <Sidebar />
      <main
        className="flex-grow-1 p-4"
        style={{
          marginLeft: "250px",
          minHeight: "100vh",
          background: "#f8f9fa",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
