import { useAuthStore } from '../features/auth/authStore';

export default function HomePage() {
  const user = useAuthStore((s) => s.user);

  return (
    <h2>
      Welcome {user?.firstName} {user?.lastName}
    </h2>
  );
}
