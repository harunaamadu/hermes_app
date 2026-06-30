import { Chart, SaleReport, TransactionHistory, WishlistSection } from "@/components/dashboard";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SectionCards } from "@/components/dashboard/section-cards";
import { SiteHeader } from "@/components/dashboard/site-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 w-full">
          <SectionCards />

          <div className="min-h- md:min-h-fit my-10">
            <Card className="ring-0">
              <CardHeader className="flex flex-col text-start">
                <CardTitle>Expenditure report</CardTitle>
                <CardDescription>Look at your spending</CardDescription>
              </CardHeader>

              <CardContent className="md:flex p-2 md:p-4 gap-6">
                <SaleReport />
                <Chart />
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-[1.5fr_ 0.5fr] gap-6 mb-10">
            <TransactionHistory />
            <WishlistSection />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
