import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  AppstoreOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/authStore';

const { Sider } = Layout;

export default function Sidebar({ collapsed, onClose }: any) {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((s: any) => s.logout);

  const handleClick = (e: any) => {
    if (e.key === '/logout') {
      logout();
      navigate('/login');
    } else {
      navigate(e.key);
    }

    if (onClose) onClose();
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      width={220}
      style={{
        background: '#001529',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <div
        style={{
          height: 60,
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'left',
          paddingLeft: collapsed ? 0 : 20,
          fontWeight: 'bold',
        }}
      >
        {collapsed ? 'A' : 'Product App'}
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={handleClick}
        items={[
          { key: '/', icon: <HomeOutlined />, label: 'Home' },
          { key: '/products', icon: <AppstoreOutlined />, label: 'Product' },
          { key: '/logout', icon: <LogoutOutlined />, label: 'Logout' },
        ]}
      />
    </Sider>
  );
}
