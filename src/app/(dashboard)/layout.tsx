import Container from "@/components/common/Container";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata(
  "Dashboard",
  "Manage dashboard and view analysis."
);

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <Container as="main" className="py-0 grid! max-w-full">
      {children}
    </Container>
  );
}