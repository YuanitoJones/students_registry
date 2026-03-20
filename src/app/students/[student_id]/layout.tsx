import { StudentProvider } from "@/lib/context/studentContext";

export default function StudentLayout({ children }: Readonly<{ children: React.ReactNode }>) {
   return <StudentProvider>{children}</StudentProvider>;
}
