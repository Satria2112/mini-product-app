import { Form, Input, Button, Card, Typography, message } from 'antd';
import { loginApi } from './authService';
import { useAuthStore } from './authStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const { Title } = Typography;

export default function LoginPage() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const token = useAuthStore((s) => s.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/', { replace: true });
    }
  }, [token]);

  const onFinish = async (values: any) => {
    try {
      const res = await loginApi(values);
      setAuth(res.data);

      message.success('Login success');
      navigate('/', { replace: true });
    } catch {
      message.error('Login gagal');
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #1677ff, #69c0ff)',
      }}
    >
      <Card style={{ width: 360, borderRadius: 12 }}>
        <Title level={3} style={{ textAlign: 'center' }}>
          Login
        </Title>

        <Form onFinish={onFinish} layout="vertical">
          <Form.Item name="username" rules={[{ required: true }]}>
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true }]}>
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}
