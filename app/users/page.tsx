import { Gift } from "lucide-react";
import { UsersForm } from "@/components/";

const Users = () => {
  return (
    <main className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <Gift className="size-8 text-primary" />
          Kto dla kogo?
        </div>
        <UsersForm />
      </div>
    </main>
  );
};

export default Users;
