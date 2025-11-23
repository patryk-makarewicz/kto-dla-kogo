'use client';

import { UsersFormValuesType } from '@/model/users.model';
import { useUsers } from '@/providers';
import { useCallback, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';

import { drawUsers } from '@/lib/draw';

const INITIAL_USERS = [{ name: '' }];

export const useDraw = () => {
  const { users, setUsers, results, setResults } = useUsers();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onSubmit = useCallback(
    async (data: UsersFormValuesType) => {
      setIsLoading(true);
      setUsers(data.users);

      const names = data.users.map((u) => u.name);
      const draw = await drawUsers(names);

      setResults(draw);
      setIsLoading(false);
      setIsFlipped(true);

      toast.success('Gratulacje! Losowanie zakonczyło się sukcesem.');
    },
    [setUsers, setResults]
  );

  const onReset = useCallback(() => {
    setUsers(INITIAL_USERS);
    setResults(null);
    setIsFlipped(false);
  }, [setUsers, setResults]);

  const onEditAgain = useCallback(() => {
    setIsFlipped(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setResults(null);
      timeoutRef.current = null;
    }, 600);
  }, [setResults]);

  const initialUsers = useMemo(() => INITIAL_USERS, []);

  return {
    users,
    initialUsers,
    results,
    isFlipped,
    isLoading,
    onSubmit,
    onReset,
    onEditAgain
  };
};
