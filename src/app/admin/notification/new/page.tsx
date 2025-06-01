
import AdminNewNotification from "@/components/admin/notification/newMain";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function NewNotificationPage() {
    
    const token = (await cookies()).get("token");
    if (!token) {
        redirect("/admin");
    }
    return (
        <div className="h-screen">
            <AdminNewNotification />
        </div>
    );
}
