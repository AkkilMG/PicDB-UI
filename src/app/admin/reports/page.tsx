
import AdminReport from "@/components/admin/report/main";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function NotificationPage() {
    const token = (await cookies()).get("token");
    if (!token) {
        redirect("/admin");
    }
    return (
        <div className="h-screen">
            <AdminReport />
        </div>
    );
}
