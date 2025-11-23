'use client';

import { UsersFormValuesType } from '@/model/users.model';
import { useUsers } from '@/providers';
import { useState } from 'react';
import { toast } from 'sonner';

import { drawUsers } from '@/lib/draw';

import { UsersFormCard } from './users-form-card';
import { UsersResultsCard } from './users-results-card';

export const UsersForm = () => {
  const { users, setUsers, results, setResults } = useUsers();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialUsers = [{ name: '' }];

  const onSubmit = async (data: UsersFormValuesType) => {
    setIsLoading(true);
    setUsers(data.users);

    // Symulacja opóźnienia dla lepszego UX (opcjonalne)
    await new Promise((resolve) => setTimeout(resolve, 500));

    const names = data.users.map((u) => u.name);
    const draw = drawUsers(names);
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
    // Najpierw obróć kartę
    setIsFlipped(false);
    // Opóźnij usunięcie wyników, aby karta najpierw się obróciła
    setTimeout(() => {
      setResults(null);
    }, 600); // Czas trwania animacji flip (0.6s)
  };

  return (
    <div className="flip-container">
      <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
        {/* Front side - Form */}
        <div className="flip-card-front">
          <UsersFormCard
            initialUsers={users.length > 0 ? users : initialUsers}
            onSubmit={onSubmit}
            onReset={onReset}
            isLoading={isLoading}
          />
        </div>

        {/* Back side - Results */}
        <div className="flip-card-back">
          {results && results.length > 0 && <UsersResultsCard results={results} onEditAgain={onEditAgain} />}
        </div>
      </div>
    </div>
  );
};
