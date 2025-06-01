
import Analysis from "@/components/admin/analysis/main";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";



export default async function AnalysisPage() {
    const token = (await cookies()).get("token");
    if (!token) {
        redirect("/admin");
    }
    return (
        <div className="h-screen">
            <Analysis />
        </div>
    );
}
