import { Layout, Drawer } from "antd";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const { Content } = Layout;

export default function AppLayout({ children }: any) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setMobile(isMobile);
      setCollapsed(isMobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Desktop Sidebar */}
      {!mobile && <Sidebar collapsed={collapsed} />}

      {/* Mobile Drawer */}
      {mobile && (
        <Drawer
          placement="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          bodyStyle={{ padding: 0 }}
          headerStyle={{ display: "none" }}
          width={220}
        >
          <Sidebar collapsed={false} onClose={() => setDrawerOpen(false)} />
        </Drawer>
      )}

      <Layout>
        <Navbar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobile={mobile}
          setDrawerOpen={setDrawerOpen}
        />

        <Content
          style={{
            margin: mobile ? 8 : 16,
            padding: mobile ? 12 : 20,
            background: "#fff",
            borderRadius: 10,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}