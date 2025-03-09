

import Footer from "@/components/main/footer";
import Header from "@/components/main/header";
import { PolicyBody } from "@/components/policy/body";

export default function CookiesPolicyPage() {
    return (
        <div>
            <Header />
            <div className="font-sans antialiased bg-white text-gray-900">
                <div className="max-w-4xl mx-auto px-4 py-10 sm:py-20">
                    {/* Cookies Policy Badge */}
                    <div className="text-center mb-6 sm:mb-12">
                        <span className="inline-block bg-green-100 text-green-800 text-sm py-2 px-4 rounded-full font-medium">
                            Cookies Policy
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-6">
                        How we use cookies at PicDB
                    </h1>

                    {/* Subtitle */}
                    <p className="text-gray-700 text-center mb-12">
                        This Cookies Policy explains how PicDB uses cookies and similar tracking technologies to enhance user experience and functionality.
                    </p>

                    {/* Updated Date */}
                    <p className="text-xs font-semibold uppercase text-gray-500 mb-8">
                        Updated March 09, 2025
                    </p>

                    {/* Body */}
                    <p className="mb-8">
                        At <strong>PicDB</strong>, we use cookies to improve your experience, track preferences, and enhance security. This Cookies Policy provides details on how and why we use cookies.
                    </p>

                    {/* Section */}
                    <PolicyBody no={1} title="What Are Cookies?" body={[
                        "Cookies are small text files stored on your device when you visit a website. They help us remember your preferences and improve site functionality."
                    ]} />

                    {/* Section */}
                    <PolicyBody no={2} title="Cookies We Use" body={[
                        "We use the following types of cookies to provide and enhance our services:"
                    ]} details={[
                        { title: "Essential Cookies", body: "These are required for core website functions, such as user authentication and session management." },
                        { title: "Preference Cookies", body: "These remember your settings and preferences for a personalized experience." },
                        { title: "Analytics Cookies", body: "We use these to understand user behavior and improve our services." },
                        { title: "Security Cookies", body: "These help protect your account and data by preventing fraud and unauthorized access." }
                    ]} />

                    {/* Section */}
                    <PolicyBody no={3} title="Cookies Used in PicDB" body={[
                        "PicDB uses the following specific cookies:"
                    ]} details={[
                        { title: `"cookiesAccepted"`, body: "Stores your consent regarding our use of cookies." },
                        { title: `"links"`, body: "Tracks the links you visit for analytics and personalized recommendations." },
                        { title: `"policyAccepted"`, body: "Remembers whether you have accepted our policies." }
                    ]} />

                    {/* Section */}
                    <PolicyBody no={4} title="How to Manage Cookies" body={[
                        "You can control and manage cookies through your browser settings. Most browsers allow you to:"
                    ]} points={[
                        "View and delete stored cookies.",
                        "Block all cookies or specific types of cookies.",
                        "Set preferences for certain websites."
                    ]} />

                    <p className="text-gray-700 mb-8">
                        However, disabling cookies may impact the functionality of PicDB.
                    </p>

                    {/* Section */}
                    <PolicyBody no={5} title="Third-Party Cookies" body={[
                        "We may use third-party services that set their own cookies, such as analytics and advertising providers."
                    ]} />

                    {/* Section */}
                    <PolicyBody no={6} title="Changes to This Cookies Policy" body={[
                        "We may update this policy periodically. Changes will be posted on this page, and we encourage you to review it regularly."
                    ]} />

                    {/* Section */}
                    <PolicyBody no={7} title="Contact Us" body={[
                        "If you have any questions about our Cookies Policy, contact us at support [at] picdb.com."
                    ]} />
                </div>
            </div>
            <Footer />
        </div>
    );
}
