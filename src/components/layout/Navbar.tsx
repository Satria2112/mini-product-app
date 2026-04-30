import { Layout, Avatar, Space, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useAuthStore } from '../../features/auth/authStore';

const { Header } = Layout;

export default function Navbar({
  collapsed,
  setCollapsed,
  mobile,
  setDrawerOpen,
}: any) {
  const user = useAuthStore((s: any) => s.user);

  const handleToggle = () => {
    if (mobile) {
      setDrawerOpen(true);
    } else {
      setCollapsed(!collapsed);
    }
  };

  return (
    <Header
      style={{
        background: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      }}
    >
      {/* Toggle */}
      <Button
        type="text"
        onClick={handleToggle}
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        style={{ fontSize: 18 }}
      />

      {/* User */}
      <Space>
        {!mobile && (
          <span>
            {user?.firstName} {user?.lastName}
          </span>
        )}
        <Avatar src={user?.image} />
      </Space>
    </Header>
  );
}
