import Footer from "@/components/main/footer";
import Header from "@/components/main/header";
import { PolicyBody } from "@/components/policy/body";




export default function PrivacyPolicyPage() {
    return (
        <div>
            <Header />
            <div className="font-sans antialiased bg-white text-gray-900">
                <div className="max-w-4xl mx-auto px-4 py-10 sm:py-20">
                    {/* Privacy Policy Badge */}
                    <div className="text-center mb-6 sm:mb-12">
                        <span className="inline-block bg-purple-100 text-purple-800 text-sm py-2 px-4 rounded-full font-medium">
                            Privacy policy
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-6">
                        Our commitment to protecting your privacy
                    </h1>

                    {/* Subtitle */}
                    <p className="text-gray-700 text-center mb-12">
                        Learn more about how PicDB collects and uses data and your rights as a PicDB user.
                    </p>

                    {/* Updated Date */}
                    <p className="text-xs font-semibold uppercase text-gray-500 mb-8">
                        Updated March 09, 2025
                    </p>

                    {/* Body */}
                    <p className="mb-8">
                    Thank you for using <strong>PicDB! At AvianInTek</strong>, we are committed to protecting your privacy. This Privacy Policy describes how we collect, use, and handle your personal data when you use our website, software, and services ("Services").
                    </p>

                    {/* Section */}
                    <PolicyBody no={1} title="Information We Collect and Why" body={[
                        "We collect the following information to provide, improve, secure, and enhance our Services."
                    ]} details={[
                        { title: "Account Information", body: "When you create an account, we collect details such as:", points: ["Name", "Email address","Password (encrypted)"] },
                        { title: "Uploaded Content (\"Your Images\")", body: "Our Services allow you to upload, store, encrypt, and share images. We process and store this content to:", points: ["Enable seamless access to your images", "Provide encryption and security features", "Generate view and download links"] },
                        { title: "Usage Information", body: "We collect information on how you use our Services, including:", points: ["Image upload/download activity","File size and storage usage","Sharing and encryption preferences"]},
                        { title: "Device & Technical Data", body: "When you access PicDB, we may collect:", points: ["IP address", "Browser type and Device type", "Referring web pages", "Cookies and tracking technologies"] },
                        { title: "Communications & Support", body: "If you contact support, we collect the details of your request and any related correspondence to assist you better."},
                        // { title: "", body: "", points: },
                    ]} />

                    {/* Section */}
                    <PolicyBody no={2} title="Cookies & Tracking Technologies" body={[
                        "We use cookies and tracking technologies to provide and improve our Services. By using our Services, you agree to our use of these technologies."
                    ]} points={[
                        "<strong>Cookies:</strong> We use cookies to store your preferences and session data.",
                        "<strong>Analytics:</strong> We use Google Analytics to track and analyze website traffic.",
                        "<strong>Tracking:</strong> We use tracking pixels and scripts to monitor user activity.",
                    ]} />

                    {/* Section */}
                    <PolicyBody no={3} title="How We Use Your Data" body={[
                        "We use your data to provide, improve, secure, and enhance our Services. Here's how we use your data:",
                    ]} points={[
                        "<strong>Provide Services:</strong> We use your data to deliver our Services and features.",
                        "<strong>Security & Fraud Prevention:</strong> Detecting unauthorized access or harmful activity.",
                        "<strong>Security:</strong> We use your data to secure and protect our Services and users.",
                        "<strong>Analytics:</strong> We use your data to analyze and improve our Services.",
                        "<strong>Improving & Optimizing:</strong> Analyzing usage patterns to enhance user experience.",
                        "<strong>Marketing & Communication:</strong> Sending updates, promotions, or service-related notifications (opt-out available)."
                    ]} />

                    {/* Section */}
                    <PolicyBody no={4} title="Data Sharing & Disclosure" body={[
                        "We do not sell your personal data. However, we may share information in the following cases:"
                    ]} details={[
                        { title: "Third-Party Service Providers", body: "We use trusted partners for hosting, payment processing, and analytics. These providers must follow strict privacy safeguards.",  },
                        { title: "Legal & Security Reasons", body: "We may disclose your data if required by law, to protect our rights, or to prevent fraud, abuse, or security threats.",  },
                        { title: "Business Transfers", body: "If PicDB undergoes a merger, acquisition, or asset sale, your data may be transferred. We will notify you of such changes.", },
                    ]} />

                    {/* Section */}
                    <PolicyBody no={5} title="Data Security & Protection" body={[
                        "We prioritize your privacy and security through:",
                    ]} points={[
                        "<strong>Encryption:</strong> We encrypt your data to prevent unauthorized access.",
                        "<strong>Access Controls:</strong> We limit access to your data to authorized personnel only.",
                        "<strong>Security Measures:</strong> We implement security protocols to protect your data.",
                        "<strong>Compliance:</strong> We comply with data protection laws and regulations.",
                    ]} />

                    <p className="text-gray-700 mb-8">
                    Despite these protections, no online service is 100% secure. We recommend using strong passwords and enabling additional security features where available.
                    </p>


                    {/* Section */}
                    <PolicyBody no={6} title="Your Rights & Control Over Data" body={[
                        "You have the following rights over your data:"
                    ]} points={[
                        "<strong>Access & Download Data:</strong> View and export your stored images",
                        "<strong>Access & Portability:</strong> Request a copy of your data or export it in a machine-readable format.",
                        "<strong>Correction & Deletion:</strong> Update or correct your data or request deletion of your account.",
                        "<strong>Opt-Out:</strong> Unsubscribe from marketing communications.",
                        "<strong>Restriction:</strong> Request restrictions on how your data is processed or used.",
                        "<strong>Request Image Removal:</strong> Users can request account deletion, which removes all associated data unless required by law."
                    ]} />

                    {/* Section */}
                    <PolicyBody no={7} title="Data Retention" points={[
                        "Your uploaded images and personal data remain stored as long as your account is active.",
                        "If you delete an image, we permanently remove it from our systems within 30 days.",
                        "If you delete your account, we erase all associated data unless required for legal or security purposes.",
                        "All data which has been reported will be removed effectively, but a copy will be retailed for legal purposes."
                    ]} />

                    {/* Section */}
                    <PolicyBody no={8} title="International Data Transfers" body={[
                        "PicDB operates globally, but based out of India. By using our Services, you agree that your data may be stored and processed in countries where our servers or partners or service providers are located. We ensure compliance with applicable <strong>data protection laws (e.g., GDPR, CCPA).</strong> If you have questions or concerns about data transfers, please contact us."
                    ]} />

                    {/* Section */}
                    <PolicyBody no={9} title="Changes to This Privacy Policy" body={[
                        "We may update this Privacy Policy periodically. If any major changes impact your rights, we will notify you via email or through our website. Continued use of our Services means you accept the updated policy."
                    ]} />

                    {/* Section */}
                    <PolicyBody no={10} title="Contact Us" body={[
                        "If you have questions or concerns about our Privacy Policy, please contact us at support [at] picdb.com."
                    ]} />
                </div>
            </div>
            <Footer />
        </div>
    );
}