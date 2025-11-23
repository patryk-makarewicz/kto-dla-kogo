import { Gift } from 'lucide-react';

import { UsersForm } from '@/components/';

const Users = () => {
  return (
    <>
      <div className="flex items-center gap-2 self-center font-medium">
        <Gift className="text-primary size-8" />
        Kto dla kogo?
      </div>
      <UsersForm />
    </>
  );
};

export default Users;
