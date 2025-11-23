'use client';

import { useMemo } from 'react';

import { useDraw } from '@/hooks';

import { DrawFormCard } from './draw-form-card';
import { DrawResultsCard } from './draw-results-card';

export const Draw = () => {
  const { users, initialUsers, results, isFlipped, isLoading, onSubmit, onReset, onEditAgain } = useDraw();

  const formInitialUsers = useMemo(() => (users.length > 0 ? users : initialUsers), [users, initialUsers]);
  const hasResults = useMemo(() => results && results.length > 0, [results]);

  return (
    <div className="flip-container">
      <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
        {/* Front side - Form */}
        <div className="flip-card-front">
          <DrawFormCard initialUsers={formInitialUsers} onSubmit={onSubmit} onReset={onReset} isLoading={isLoading} />
        </div>

        {/* Back side - Results */}
        <div className="flip-card-back">
          {hasResults && <DrawResultsCard results={results!} onEditAgain={onEditAgain} />}
        </div>
      </div>
    </div>
  );
};
