
import { Tabs } from "@/app/components/ui/tabs";
import { ReactNode } from "react";



export default function TabsComponent({
  defaultValue,
  className,
  children,
}: {
  defaultValue: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tabs defaultValue={defaultValue} className={className}>
      {children}
    </Tabs>
  );
}

