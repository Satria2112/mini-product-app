import { Form, Input, Button, Card, Typography, message } from 'antd';
import { loginApi } from './authService';
import { useAuthStore } from './authStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import styles from '../../style/LoginPage.module.css';

const { Title, Text } = Typography;

export default function LoginPage() {
  const setAuth = useAuthStore((s: any) => s.setAuth);
  const token = useAuthStore((s: any) => s.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate('/');
  }, [token]);

  const onFinish = async (values: any) => {
    try {
      const res = await loginApi(values);
      setAuth(res.data);

      message.success('Login success');
      navigate('/');
    } catch {
      message.error('Login gagal');
    }
  };

  return (
    <div className={styles.container}>
      {/* background animation */}
      <div className={styles.overlay} />

      {/* bubbles */}
      <div className={`${styles.bubble} ${styles.bubble1}`} />
      <div className={`${styles.bubble} ${styles.bubble2}`} />
      <div className={`${styles.bubble} ${styles.bubble3}`} />

      {/* card */}
      <Card className={styles.card}>
        <Title level={3} style={{ textAlign: 'center' }}>
          Welcome Back 👋
        </Title>

        <Text
          type="secondary"
          style={{ display: 'block', textAlign: 'center', marginBottom: 20 }}
        >
          Please login to continue
        </Text>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true }]}>
            <Input size="large" placeholder="Username" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true }]}>
            <Input.Password size="large" placeholder="Password" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            className={styles.button}
          >
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}
