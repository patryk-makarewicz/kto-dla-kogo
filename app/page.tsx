import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FieldDescription,
} from "@/components/ui";

import { cn } from "@/lib/utils";
import { Gift } from "lucide-react";

export default function Home() {
  return (
    <main>
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className="flex items-center gap-2 self-center font-medium">
            <Gift className="size-8 text-primary" />
            Kto dla kogo?
          </div>
          <div className={cn("flex flex-col gap-6")}>
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Witaj!</CardTitle>
                <CardDescription>
                  Wylosuj osobę, której zrobisz prezent
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full cursor-pointer">Zaczynamy</Button>
              </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center">
              Przez kliknięcie &quot;Zaczynamy&quot;, akceptujesz nasz{" "}
              <a href="#">Regulamin</a> oraz{" "}
              <a href="#">Politykę prywatności</a>.
            </FieldDescription>
          </div>
        </div>
      </div>
    </main>
  );
}
