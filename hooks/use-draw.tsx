'use client';

import { UsersFormValuesType } from '@/model/users.model';
import { useUsers } from '@/providers';
import { useState } from 'react';
import { toast } from 'sonner';

import { drawUsers } from '@/lib/draw';

export const useDraw = () => {
  const { users, setUsers, results, setResults } = useUsers();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialUsers = [{ name: '' }];

  const onSubmit = async (data: UsersFormValuesType) => {
    setIsLoading(true);
    setUsers(data.users);

    const names = data.users.map((u) => u.name);
    const draw = await drawUsers(names);
    setResults(draw);
    setIsLoading(false);
    setIsFlipped(true);
    toast.success('Gratulacje! Losowanie zakonczyło się sukcesem.');
  };

  const onReset = () => {
    setUsers(initialUsers);
    setResults(null);
    setIsFlipped(false);
  };

  const onEditAgain = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setResults(null);
    }, 600);
  };

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
