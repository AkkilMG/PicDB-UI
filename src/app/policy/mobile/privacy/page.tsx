"use client";

import Footer from "@/components/main/footer";
import Header from "@/components/main/header";
import { PolicyBody } from "@/components/policy/body";

export default function MobilePrivacyPolicyPage() {
    return (
        <div>
            <Header />
            <div className="font-sans antialiased bg-white text-gray-900">
                <div className="max-w-4xl mx-auto px-4 py-10 sm:py-20">
                    {/* Privacy Policy Badge */}
                    <div className="text-center mb-6 sm:mb-12">
                        <span className="inline-block bg-purple-100 text-purple-800 text-sm py-2 px-4 rounded-full font-medium">
                           Privacy Policy (Mobile)
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-6">
                        Privacy Policy
                    </h1>

                    {/* Subtitle */}
                    <p className="text-gray-700 text-center mb-12">
                        Learn more about how PicDB collects and uses data from our mobile application and your rights as a PicDB user.
                    </p>

                    {/* Updated Date */}
                    <p className="text-xs font-semibold uppercase text-gray-500 mb-8">
                        Updated October 8, 2025
                    </p>

                    {/* Body */}
                    <p className="mb-8">
                    Thank you for using <strong>PicDB! At Arkynox</strong>, we are committed to protecting your privacy. This Privacy Policy describes how we collect, use, and handle your personal data when you use our mobile application, website, software, and services ("Services").
                    </p>

                    {/* Section */}
                    <PolicyBody no={1} title="Information We Collect and Why" body={[
                        "We collect the following information to provide, improve, secure, and enhance our Services."
                    ]} details={[
                        { title: "Account Information", body: "When you create an account, we may collect details such as:", points: ["Name", "Phone identifiers"] },
                        { title: "Uploaded Content (\"Your Images\")", body: "Our Services allow you to upload, store, encrypt, and share images. We process and store this content to:", points: ["Enable seamless access to your images", "Provide encryption and security features", "Generate view and download links", "IMPORTANT: PicDB does not own any uploaded content - we only provide the software platform", "All content ownership remains with the uploader", "We are not responsible for the content uploaded by users"] },
                        { title: "Usage Information", body: "We collect information on how you use our Services, including:", points: ["Image upload/download activity","File size and storage usage","Sharing preferences"]},
                        { title: "Device & Technical Data", body: "When you access PicDB through our mobile app, we may collect:", points: ["Mobile network information", "IP address", "Crash data and performance reports"] },
                        { title: "Mobile Permissions", body: "Our app may request permissions to access certain features on your device, such as:", points: ["<strong>Camera:</strong> To allow you to capture and upload photos directly.", "<strong>Storage/Photos:</strong> To allow you to upload images from your device's gallery.", "You can manage these permissions in your device settings."] },
                        { title: "Communications & Support", body: "If you contact support, we collect the details of your request and any related correspondence to assist you better."},
                    ]} />

                    {/* Section */}
                    <PolicyBody no={2} title="How We Use Your Data" body={[
                        "We use your data to provide, improve, secure, and enhance our Services. Here's how we use your data:",
                    ]} points={[
                        "<strong>Provide Services:</strong> We use your data to deliver our Services and features on the mobile app.",
                        "<strong>Security & Fraud Prevention:</strong> Detecting unauthorized access or harmful activity.",
                        "<strong>Security:</strong> We use your data to secure and protect our Services and users.",
                        "<strong>Analytics:</strong> We use your data to analyze and improve our Services, including app performance.",
                        "<strong>Improving & Optimizing:</strong> Analyzing usage patterns to enhance user experience on mobile.",
                        "<strong>Marketing & Communication:</strong> Sending updates, promotions, or service-related notifications (opt-out available)."
                    ]} />

                    {/* Section */}
                    <PolicyBody no={3} title="Data Sharing & Disclosure" body={[
                        "We do not sell your personal data. However, we may share information in the following cases:"
                    ]} details={[
                        { title: "Third-Party Service Providers", body: "We use trusted partners for hosting, payment processing, and analytics. These providers must follow strict privacy safeguards.",  },
                        { title: "Legal & Security Reasons", body: "We may disclose your data if required by law, to protect our rights, or to prevent fraud, abuse, or security threats.",  },
                        { title: "Business Transfers", body: "If PicDB undergoes a merger, acquisition, or asset sale, your data may be transferred. We will notify you of such changes.", },
                    ]} />

                    {/* Section */}
                    <PolicyBody no={4} title="Children's Privacy" body={[
                        "Our Services are not directed to children under the age of 13, and we do not knowingly collect personal information from them. If your target audience includes children under 13, you must comply with the Children's Online Privacy Protection Act (COPPA) and other applicable laws. If we become aware that a child under 13 has provided us with personal information, we will take steps to delete such information. If you believe we might have any information from or about a child under 13, please contact us at support@arkynox.com."
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
                    Despite these protections, no online service is 100% secure. We will be enabling additional security features shortly, after upgradation.
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
                        "<strong>Request Image Removal:</strong> Users can request account deletion, which removes all associated data unless required by law.",
                        "<strong>Content Issues:</strong> If any uploaded content violates rights or laws, contact us immediately at support@arkynox.com for swift removal. Due to anonymous nature of our platform, user tracing may be challenging."
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
                        "PicDB operates globally, but based out of India. By using our Services, you agree that your data may be stored and processed in countries where our servers or partners or service providers are located. We ensure compliance with applicable \"data protection laws (e.g., GDPR, CCPA).\" If you have questions or concerns about data, please contact us."
                    ]} />

                    {/* Section */}
                    <PolicyBody no={9} title="Changes to This Privacy Policy" body={[
                        "We may update this Privacy Policy periodically. If any major changes impact your rights, we will notify you via email or through our app. Continued use of our Services means you accept the updated policy."
                    ]} />

                    {/* Section */}
                    <PolicyBody no={10} title="Contact Us" body={[
                        "If you have questions or concerns about our Privacy Policy or need to report content issues, please contact us at support@arkynox.com."
                    ]} />
                </div>
            </div>
            <Footer />
        </div>
    );
}
