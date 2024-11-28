import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

const BaseLayout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col items-center">
        <SidebarTrigger className="self-start m-4" />
        <main className="flex flex-col items-center w-full px-16 ">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default BaseLayout;
