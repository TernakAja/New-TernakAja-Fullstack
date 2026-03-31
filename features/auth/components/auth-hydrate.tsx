"use client"

import { useEffect } from 'react';
import { useAuthStore, User } from '../store/auth-store';

/**
 * Invisible component that injects the server-fetched user data
 * into the Zustand store on the client side without causing layout shift.
 */
export function AuthHydrate({ user }: { user: User | null }) {
  const setUser = useAuthStore((state) => state.setUser);
  
  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return null;
}
