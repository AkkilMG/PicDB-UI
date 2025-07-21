"use client";


import Footer from "@/components/main/footer";
import Header from "@/components/main/header";
import { PolicyBody } from "@/components/policy/body";


export default function TermsOfServicePage() {
    return (
        <div>
            <Header />
            <div className="font-sans antialiased bg-white text-gray-900">
                <div className="max-w-4xl mx-auto px-4 py-10 sm:py-20">
                    
                    {/* Terms & Conditions Badge */}
                    <div className="text-center mb-6 sm:mb-12">
                        <span className="inline-block bg-blue-100 text-blue-800 text-sm py-2 px-4 rounded-full font-medium">
                            Terms & Conditions
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-6">
                        Terms of Service for PicDB
                    </h1>

                    {/* Subtitle */}
                    <p className="text-gray-700 text-center mb-12">
                        By using PicDB, you agree to the following terms and conditions.
                    </p>

                    {/* Updated Date */}
                    <p className="text-xs font-semibold uppercase text-gray-500 mb-8">
                        Updated July 21, 2025
                    </p>

                    {/* Section */}
                    <PolicyBody no={1} title="Acceptance of Terms" body={[
                        "By accessing or using PicDB, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use our Services."
                    ]} />

                    {/* Section */}
                    <PolicyBody no={2} title="Use of Services" body={[
                        "PicDB provides a storage platform for images, offering encryption, sharing, and security features. By using our Services, you agree to:"
                    ]} points={[
                        "Use PicDB only for lawful purposes.",
                        "Not upload, store, or share illegal, harmful, or copyrighted content without permission.",
                        "Not engage in abusive, fraudulent, or unauthorized activities.",
                        "Comply with all applicable laws and regulations."
                    ]} />

                    {/* Section */}
                    <PolicyBody no={3} title="User Accounts & Security" body={[
                        "To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your login credentials and ensuring account security."
                    ]} points={[
                        "You must provide accurate and complete account information.",
                        "You are responsible for all activities under your account.",
                        "Report any unauthorized access immediately to PicDB support."
                    ]} />

                    {/* Section */}
                    <PolicyBody no={4} title="Uploaded Content & Rights" body={[
                        "By uploading content to PicDB, you retain all ownership rights to your images. PicDB only owns the software platform itself and does not claim any ownership over user-uploaded content."
                    ]} points={[
                        "PicDB does not own, claim ownership, or have any proprietary rights to your uploaded content.",
                        "We only provide the software platform for storage and sharing services.",
                        "You are solely responsible for ensuring you have the rights to any uploaded content.",
                        "You must not upload copyrighted, illegal, or unauthorized content.",
                        "If any content violates rights or laws, please contact us immediately at support@avianintek.com and we will swiftly remove it.",
                        "Due to the anonymous nature of our platform, user tracing can be challenging, but we are committed to content removal upon legitimate requests."
                    ]} />

                    {/* Section */}
                    <PolicyBody no={5} title="Prohibited Activities" body={[
                        "You agree not to engage in any of the following activities while using PicDB:"
                    ]} points={[
                        "Uploading or sharing illegal, harmful, or offensive content.",
                        "Attempting to hack, exploit, or disrupt the platform.",
                        "Using PicDB for fraudulent, malicious, or unethical purposes.",
                        "Violating any applicable data protection laws."
                    ]} />

                    {/* Section */}
                    <PolicyBody no={6} title="Data Storage & Retention" body={[
                        "PicDB provides storage for images with encryption and security measures. However:"
                    ]} points={[
                        "We are not responsible for data loss due to unforeseen circumstances.",
                        "Deleted images are usually permanently removed within 30 days.",
                        "Users can request account deletion, which removes all associated data unless required by law."
                    ]} />

                    {/* Section */}
                    <PolicyBody no={7} title="Service Availability & Modifications" body={[
                        "We strive to maintain high availability but do not guarantee uninterrupted access to PicDB. We may modify, suspend, or discontinue Services at any time."
                    ]} />

                    {/* Section */}
                    <PolicyBody no={8} title="Content Responsibility & Platform Disclaimer" body={[
                        "PicDB is a software platform only. We do not own, review, or control user-uploaded content:"
                    ]} points={[
                        "All uploaded content remains the sole property and responsibility of the uploader.",
                        "PicDB acts only as a neutral technology platform providing storage and sharing services.",
                        "We do not monitor, review, or approve content before or after upload.",
                        "Users are fully responsible for compliance with all applicable laws regarding their content.",
                        "If you believe content violates your rights, contact us at support@avianintek.com for swift removal.",
                        "Due to our platform's anonymous features, user identification may be limited.",
                        "Legal disputes regarding content should be addressed with the content owner, not PicDB.",
                        "We will assist in legitimate content removal requests but are not liable for user-generated content."
                    ]} />

                    {/* Section */}
                    <PolicyBody no={9} title="Limitation of Liability & Content Disclaimer" body={[
                        "PicDB and its owners, employees, and partners shall not be held liable for:"
                    ]} points={[
                        "Loss of data or service disruptions.",
                        "Unauthorized access or security breaches beyond our control.",
                        "Any damages resulting from the use or inability to use our Services.",
                        "Any content uploaded by users - we are not responsible for user-generated content.",
                        "Legal issues arising from user-uploaded content as we do not own or control such content.",
                        "Any legal actions should be directed towards the content owner, not PicDB platform.",
                        "We will cooperate in content removal requests but cannot be held liable for user content."
                    ]} />

                    {/* Section */}
                    <PolicyBody no={10} title="Termination of Use" body={[
                        "We reserve the right to suspend or terminate your access to PicDB if you violate these terms."
                    ]} />

                    {/* Section */}
                    <PolicyBody no={11} title="Changes to Terms" body={[
                        "We may update these Terms of Service from time to time. Continued use of PicDB after updates constitutes acceptance of the revised terms."
                    ]} />

                    {/* Section */}
                    <PolicyBody no={12} title="Contact Us" body={[
                        "If you have questions about these Terms of Service or need to report content issues, please contact us at support@avianintek.com."
                    ]} />
                </div>
            </div>
            <Footer />
        </div>
    );
}
