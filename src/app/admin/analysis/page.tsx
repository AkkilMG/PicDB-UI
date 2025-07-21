
import Analysis from "@/components/admin/analysis/main";
import AdminSidenav from "@/components/admin/sidenav";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";



export default async function AnalysisPage() {
    const token = (await cookies()).get("token");
    if (!token) {
        redirect("/admin");
    }
    return (
        <div className="h-screen">
            <div className="flex flex-col md:flex-row h-screen bg-gray-50">
                <AdminSidenav />
                <main className="flex-1 p-4 md:p-8">
                <Analysis />
                </main>
            </div>
        </div>
    );
}
