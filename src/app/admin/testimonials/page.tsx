import AdminSidenav from "@/components/admin/sidenav";
import AdminTestimonials from "@/components/admin/testimonials/main";

export default function Testimonials() {
    return (
        <div className="h-screen">
            <div className="flex flex-col md:flex-row h-screen bg-gray-50">
                <AdminSidenav />
                <main className="flex-1">
                    <AdminTestimonials />
                </main>
            </div>
        </div>
        
    )
}