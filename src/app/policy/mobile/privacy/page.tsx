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

                    {/* ===== HEADER ===== */}
                    <div className="text-center mb-6 sm:mb-12">
                        <span className="inline-block bg-purple-100 text-purple-800 text-sm py-2 px-4 rounded-full font-medium">
                           Privacy Policy (Mobile)
                        </span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-6">
                        Privacy Policy
                    </h1>
                    <p className="text-gray-700 text-center mb-12 text-lg">
                        This page explains in simple language how PikDB handles your data, your rights, and the laws that protect you.
                    </p>
                    <p className="text-xs font-semibold uppercase text-gray-500 mb-8">
                        Updated June 20, 2026
                    </p>

                    {/* ===== QUICK SUMMARY CARD ===== */}
                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-10">
                        <h2 className="text-xl font-bold text-purple-900 mb-4">Quick Summary: What You Need to Know</h2>
                        <div className="grid sm:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-start gap-2"><span className="text-green-600 text-lg">&#10003;</span><span><strong>Anonymous:</strong> No account needed, no tracking</span></div>
                            <div className="flex items-start gap-2"><span className="text-green-600 text-lg">&#10003;</span><span><strong>Encrypted:</strong> Your images are locked with encryption</span></div>
                            <div className="flex items-start gap-2"><span className="text-green-600 text-lg">&#10003;</span><span><strong>You Own It:</strong> We don't own your images, you do</span></div>
                            <div className="flex items-start gap-2"><span className="text-green-600 text-lg">&#10003;</span><span><strong>No Selling:</strong> We never sell your data</span></div>
                            <div className="flex items-start gap-2"><span className="text-red-500 text-lg">&#9888;</span><span><strong>Report Content:</strong> File a ticket at desk.arkynox.com</span></div>
                            <div className="flex items-start gap-2"><span className="text-red-500 text-lg">&#9888;</span><span><strong>Indian Law:</strong> We are based in India, Indian law governs</span></div>
                        </div>
                    </div>

                    {/* ===== INTRO ===== */}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-10">
                        <p className="text-gray-800 leading-relaxed mb-4">
                            Thank you for using <strong>PikDB by Arkynox</strong>. We are a team based in <strong>India</strong> building a privacy-first platform for storing and sharing images.
                        </p>
                        <p className="text-gray-800 leading-relaxed mb-4">
                            This Privacy Policy is written in <strong>simple language</strong> so everyone can understand it. If you have any questions, reach out to us at <strong>desk.arkynox.com</strong>.
                        </p>
                        <p className="text-gray-800 leading-relaxed">
                            <strong>Governing Law:</strong> This policy is governed by the laws of <strong>India</strong>. All disputes will be handled in Indian courts.
                        </p>
                    </div>

                    {/* ===== REAL LIFE ANALOGY ===== */}
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
                        <h3 className="font-bold text-amber-900 mb-2">Think of It Like This</h3>
                        <p className="text-amber-800 text-sm leading-relaxed">
                            Imagine PikDB is a <strong>safety deposit box company</strong>. You bring your own items, put them in a locked box, and store them in our facility. 
                            We provide the building and the boxes — but <strong>we don't own what's inside</strong>. We don't look inside your box unless someone 
                            files a legal complaint and we have to check. If you want to permanently destroy what's inside, you need to tell us officially (file a ticket).
                            That's what PikDB does — we provide the secure storage, you own everything inside.
                        </p>
                    </div>

                    {/* ===== SECTION 1: ANONYMITY ===== */}
                    <PolicyBody no={1} title="Our Promise: You Stay Anonymous" body={[
                        "PikDB is built differently. Most apps track everything you do — we believe you deserve privacy. That's why we designed PikDB to work without knowing who you are."
                    ]} />

                    {/* Visual: What we DON'T collect */}
                    <div className="grid sm:grid-cols-3 gap-4 mb-10">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                            <div className="text-3xl mb-2">&#128100;</div>
                            <h4 className="font-bold text-green-800 text-sm">No Name Required</h4>
                            <p className="text-green-700 text-xs mt-1">You don't need to tell us who you are</p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                            <div className="text-3xl mb-2">&#128241;</div>
                            <h4 className="font-bold text-green-800 text-sm">No Device Tracking</h4>
                            <p className="text-green-700 text-xs mt-1">We don't track your phone or computer</p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                            <div className="text-3xl mb-2">&#128200;</div>
                            <h4 className="font-bold text-green-800 text-sm">No Profiling</h4>
                            <p className="text-green-700 text-xs mt-1">We don't build profiles about you</p>
                        </div>
                    </div>

                    <PolicyBody details={[
                        { title: "No Account Needed", body: "You can upload, share, and view images without ever creating an account.", points: ["No email, no password, no phone number required", "No sign-up forms to fill out", "Just open the app and start using it"] },
                        { title: "No Device Fingerprinting", body: "Many websites track your device using a 'fingerprint' — we don't.", points: ["No IMEI or device ID collection", "No advertising ID tracking", "No cookies that track you across websites"] },
                        { title: "No Behavioral Advertising", body: "We don't show ads, and we certainly don't track what you do to sell to advertisers.", points: ["No ad targeting", "No data sold to advertisers", "No profile built from your activity"] },
                    ]} />

                    {/* ===== SECTION 2: WHAT WE COLLECT ===== */}
                    <PolicyBody no={2} title="What Information We Collect (And What We Don't)" body={[
                        "Since we are anonymous-first, we collect very little. Here's an honest breakdown of everything that happens with your data:"
                    ]} />

                    {/* Visual comparison table */}
                    <div className="overflow-x-auto mb-10">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 p-3 text-left">Data Type</th>
                                    <th className="border border-gray-300 p-3 text-left">Do We Collect It?</th>
                                    <th className="border border-gray-300 p-3 text-left">Why or Why Not?</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-red-50"><td className="border border-gray-300 p-3 font-medium">Your name</td><td className="border border-gray-300 p-3"><span className="text-red-600 font-bold">No</span></td><td className="border border-gray-300 p-3">We don't need it — you stay anonymous</td></tr>
                                <tr><td className="border border-gray-300 p-3 font-medium">Your email</td><td className="border border-gray-300 p-3"><span className="text-red-600 font-bold">No</span></td><td className="border border-gray-300 p-3">Only if you voluntarily contact support</td></tr>
                                <tr className="bg-red-50"><td className="border border-gray-300 p-3 font-medium">Your phone number</td><td className="border border-gray-300 p-3"><span className="text-red-600 font-bold">No</span></td><td className="border border-gray-300 p-3">Not needed for anonymous use</td></tr>
                                <tr><td className="border border-gray-300 p-3 font-medium">Device ID / IMEI</td><td className="border border-gray-300 p-3"><span className="text-red-600 font-bold">No</span></td><td className="border border-gray-300 p-3">We don't track devices at all</td></tr>
                                <tr className="bg-red-50"><td className="border border-gray-300 p-3 font-medium">Location data</td><td className="border border-gray-300 p-3"><span className="text-red-600 font-bold">No</span></td><td className="border border-gray-300 p-3">Not needed for our service</td></tr>
                                <tr><td className="border border-gray-300 p-3 font-medium">Your uploaded images</td><td className="border border-gray-300 p-3"><span className="text-amber-600 font-bold">Yes (encrypted)</span></td><td className="border border-gray-300 p-3">This is the whole point — we store your images securely, fully encrypted</td></tr>
                                <tr className="bg-red-50"><td className="border border-gray-300 p-3 font-medium">Anonymous usage stats</td><td className="border border-gray-300 p-3"><span className="text-amber-600 font-bold">Minimal</span></td><td className="border border-gray-300 p-3">Aggregate counts only — nothing that identifies you</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <PolicyBody details={[
                        { title: "Your Uploaded Images", body: "This is the main thing we store — the images you choose to upload. Here's what you should know:", points: ["Your images are stored in <strong>encrypted</strong> form (locked with a secure code)", "We only decrypt them if someone files a formal complaint (ticket) at desk.arkynox.com", "We never look at your images for any other reason", "<strong>We do NOT own your images — you do.</strong>", "We are NOT responsible for what you upload"] },
                        { title: "Anonymized Usage Metrics", body: "We collect very basic, anonymous numbers to help us improve the app:", points: ["How many images are uploaded in total (not who uploaded them)", "General file size patterns (so we can plan storage)", "Error rates (to fix bugs) — no personal info attached"] },
                        { title: "Camera & Storage Permissions", body: "The app may ask for permission to access your camera or photo gallery. This only happens when YOU choose to take or upload a photo.", points: ["Camera access — only when you tap 'Take Photo'", "Gallery access — only when you tap 'Choose from Gallery'", "No background access — we never access your photos without you asking", "You can change these permissions anytime in your device settings"] },
                        { title: "Support Tickets (desk.arkynox.com)", body: "If you contact us for help or file a complaint, we keep the details to resolve your issue.", points: ["Email address is provided voluntarily — we don't require it", "Ticket info is used only to help you", "Once resolved, ticket data is deleted when no longer needed"] },
                    ]} />

                    {/* ===== SECTION 3: CONTENT OWNERSHIP ===== */}
                    <PolicyBody no={3} title="Content Ownership — Your Images, Your Responsibility" body={[
                        "This is one of the most important sections. Please read carefully:"
                    ]} />

                    {/* Visual comparison: You vs PikDB */}
                    <div className="grid sm:grid-cols-2 gap-6 mb-10">
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                            <h4 className="font-bold text-blue-900 text-lg mb-3 text-center">&#128100; You (The User)</h4>
                            <ul className="space-y-2 text-sm text-blue-800">
                                <li className="flex items-start gap-2"><span className="text-blue-600">&#10003;</span> You OWN all images you upload</li>
                                <li className="flex items-start gap-2"><span className="text-blue-600">&#10003;</span> You are RESPONSIBLE for your content</li>
                                <li className="flex items-start gap-2"><span className="text-blue-600">&#10003;</span> You must follow the law in your country</li>
                                <li className="flex items-start gap-2"><span className="text-blue-600">&#10003;</span> You can request deletion via desk.arkynox.com</li>
                                <li className="flex items-start gap-2"><span className="text-red-500">&#10007;</span> You CANNOT blame us for your content</li>
                            </ul>
                        </div>
                        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                            <h4 className="font-bold text-purple-900 text-lg mb-3 text-center">&#9881; PikDB (The Platform)</h4>
                            <ul className="space-y-2 text-sm text-purple-800">
                                <li className="flex items-start gap-2"><span className="text-purple-600">&#10003;</span> We OWN the software and technology</li>
                                <li className="flex items-start gap-2"><span className="text-purple-600">&#10003;</span> We provide encrypted storage</li>
                                <li className="flex items-start gap-2"><span className="text-purple-600">&#10003;</span> We remove content when legally required</li>
                                <li className="flex items-start gap-2"><span className="text-red-500">&#10007;</span> We do NOT own your images</li>
                                <li className="flex items-start gap-2"><span className="text-red-500">&#10007;</span> We are NOT liable for your content</li>
                            </ul>
                        </div>
                    </div>

                    <PolicyBody points={[
                        "<strong>You Own Everything You Upload:</strong> Every image stays your property. We don't claim any ownership. Ever.",
                        "<strong>We Are Just the Platform:</strong> PikDB provides the technology (the app, the servers, the encryption). We don't own, review, monitor, or control what you upload.",
                        "<strong>Respective Individuals Are Owners:</strong> Each person who uploads content is the sole owner and solely responsible for it.",
                        "<strong>We Don't Pre-Screen:</strong> We don't look at your images before or after you upload them. We trust you to follow the law.",
                        "<strong>No Liability For User Content:</strong> PikDB and Arkynox are <strong>not liable</strong> for any content uploaded by users. All legal responsibility rests with the person who uploaded it.",
                        "<strong>Report Violations:</strong> If you see content that violates the law or your rights, file a complaint at <strong>desk.arkynox.com</strong>. We will remove it."
                    ]} />

                    {/* ===== SECTION 4: HOW WE USE DATA ===== */}
                    <PolicyBody no={4} title="How We Use Your Data" body={[
                        "We use the minimal data we have only for these purposes:"
                    ]} />

                    {/* Horizontal process flow */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-center">
                            <div className="text-2xl mb-1">&#128451;</div>
                            <h4 className="font-bold text-indigo-800 text-xs">Provide Service</h4>
                            <p className="text-indigo-700 text-xs mt-1">Store &amp; share your encrypted images</p>
                        </div>
                        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-center">
                            <div className="text-2xl mb-1">&#128737;</div>
                            <h4 className="font-bold text-indigo-800 text-xs">Prevent Abuse</h4>
                            <p className="text-indigo-700 text-xs mt-1">Stop hackers and illegal activity</p>
                        </div>
                        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-center">
                            <div className="text-2xl mb-1">&#128200;</div>
                            <h4 className="font-bold text-indigo-800 text-xs">Improve App</h4>
                            <p className="text-indigo-700 text-xs mt-1">Fix bugs using anonymous stats</p>
                        </div>
                        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-center">
                            <div className="text-2xl mb-1">&#128214;</div>
                            <h4 className="font-bold text-indigo-800 text-xs">Legal Compliance</h4>
                            <p className="text-indigo-700 text-xs mt-1">Process takedown requests</p>
                        </div>
                    </div>

                    <PolicyBody points={[
                        "<strong>NOT Used For:</strong> We do NOT use your data for advertising, marketing, profiling, selling to third parties, or any purpose other than running the service.",
                        "<strong>No Data Mining:</strong> We never analyze your images for any purpose unless a formal complaint is filed."
                    ]} />

                    {/* ===== SECTION 5: ENCRYPTION & SECURITY ===== */}
                    <PolicyBody no={5} title="Encryption & Security — How Your Images Are Protected" body={[
                        "Your images are protected by encryption. Think of encryption like a <strong>digital lock</strong> — only someone with the key can open it. Here's how it works on PikDB:"
                    ]} />

                    {/* Encryption flow diagram */}
                    <div className="bg-gray-50 border border-gray-300 rounded-xl p-6 mb-10">
                        <h4 className="font-bold text-gray-900 mb-4 text-center">How Encryption Works on PikDB</h4>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                            <div className="bg-green-100 border-2 border-green-400 rounded-lg p-3 text-center w-32">
                                <div className="text-2xl">&#128247;</div>
                                <div className="font-bold text-green-800 mt-1">Your Image</div>
                            </div>
                            <div className="text-2xl text-gray-400">&#8594;</div>
                            <div className="bg-blue-100 border-2 border-blue-400 rounded-lg p-3 text-center w-32">
                                <div className="text-2xl">&#128274;</div>
                                <div className="font-bold text-blue-800 mt-1">Encryption Lock</div>
                            </div>
                            <div className="text-2xl text-gray-400">&#8594;</div>
                            <div className="bg-purple-100 border-2 border-purple-400 rounded-lg p-3 text-center w-32">
                                <div className="text-2xl">&#128451;</div>
                                <div className="font-bold text-purple-800 mt-1">Stored Securely</div>
                            </div>
                            <div className="text-2xl text-gray-400">&#8594;</div>
                            <div className="bg-red-100 border-2 border-red-400 rounded-lg p-3 text-center w-32">
                                <div className="text-2xl">&#128196;</div>
                                <div className="font-bold text-red-800 mt-1">Ticket Filed?</div>
                            </div>
                        </div>
                        <div className="flex justify-center gap-8 mt-4 text-xs">
                            <span className="text-green-700">&#10003; No ticket? Image stays locked forever</span>
                            <span className="text-red-700">&#9888; Yes? Decrypt &amp; review only for takedown</span>
                        </div>
                    </div>

                    <PolicyBody points={[
                        "<strong>Encrypted at Rest and in Transit:</strong> Your images are encrypted both when stored (at rest) and when being sent (in transit). This means even if someone intercepts the data, they can't read it.",
                        "<strong>No Decryption Without a Ticket:</strong> We <strong>never</strong> decrypt or look at your images unless someone files a formal complaint at desk.arkynox.com. That's the only circumstance.",
                        "<strong>Limited Decryption for Takedowns:</strong> If a valid complaint is filed, we decrypt the image only to verify the claim and process the removal.",
                        "<strong>Post-Removal Deletion:</strong> Once a takedown is processed, the image is permanently deleted. It cannot be recovered.",
                        "<strong>No Proactive Scanning:</strong> We never scan your images automatically. No AI analyzing your photos. Nothing."
                    ]} />

                    {/* ===== SECTION 6: DELETION ===== */}
                    <PolicyBody no={6} title="How Content Deletion Works" body={[
                        "This is important to understand. PikDB has a <strong>two-level</strong> deletion system. Here's how it works:"
                    ]} />

                    {/* Deletion flowchart */}
                    <div className="bg-gray-50 border border-gray-300 rounded-xl p-6 mb-10">
                        <h4 className="font-bold text-gray-900 mb-4 text-center">Deletion Process Flow</h4>
                        <div className="flex flex-col items-center gap-3 text-sm">
                            {/* Level 1 */}
                            <div className="bg-amber-100 border-2 border-amber-400 rounded-lg p-4 w-64 text-center">
                                <div className="text-xl mb-1">&#128465;</div>
                                <div className="font-bold text-amber-900">Level 1: Delete in App</div>
                                <p className="text-amber-800 text-xs mt-1">You tap "Delete" in the app</p>
                                <div className="border-t border-amber-300 mt-2 pt-2 text-xs text-amber-700">
                                    Image removed from YOUR view only<br/>
                                    Encrypted data still exists on server<br/>
                                    <strong>Not permanently deleted</strong>
                                </div>
                            </div>
                            <div className="text-gray-400">&#8595;</div>
                            <div className="text-gray-500 text-xs font-bold">OR</div>
                            <div className="text-gray-400">&#8595;</div>
                            {/* Level 2 */}
                            <div className="bg-red-100 border-2 border-red-400 rounded-lg p-4 w-64 text-center">
                                <div className="text-xl mb-1">&#128196;</div>
                                <div className="font-bold text-red-900">Level 2: File a Ticket</div>
                                <p className="text-red-800 text-xs mt-1">Go to desk.arkynox.com and file a complaint</p>
                                <div className="border-t border-red-300 mt-2 pt-2 text-xs text-red-700">
                                    We review and validate the request<br/>
                                    Image is <strong>permanently deleted</strong> from all servers<br/>
                                    <strong>Cannot be recovered — ever</strong>
                                </div>
                            </div>
                            <div className="text-gray-400">&#8595;</div>
                            {/* Coming soon */}
                            <div className="bg-blue-100 border-2 border-blue-400 rounded-lg p-4 w-64 text-center">
                                <div className="text-xl mb-1">&#128752;</div>
                                <div className="font-bold text-blue-900">Coming Soon: Two Delete Types</div>
                                <p className="text-blue-800 text-xs mt-1">We're building a better system</p>
                                <div className="border-t border-blue-300 mt-2 pt-2 text-xs text-blue-700">
                                    <strong>Soft Delete</strong> — with recovery window<br/>
                                    <strong>Hard Delete</strong> — permanent &amp; irrecoverable
                                </div>
                            </div>
                        </div>
                    </div>

                    <PolicyBody details={[
                        { title: "User-Initiated Deletion (Soft Delete)", body: "When you delete an image through the PikDB app interface:", points: ["The image is removed from <strong>your personal view only</strong>", "The actual encrypted image <strong>still exists</strong> on our servers", "This is because images may be shared in groups — deleting your view doesn't delete it for everyone", "Think of it like hiding a file on your desktop — it's still in the recycle bin"] },
                        { title: "Ticket-Based Permanent Removal", body: "To permanently delete content from our servers, you must file a complaint at <strong>desk.arkynox.com</strong>:", points: ["Go to desk.arkynox.com and create a support ticket", "Provide details about the content you want removed", "Our team reviews the request to validate it", "If approved, the content is <strong>permanently and irrecoverably deleted</strong>", "<strong>Once deleted this way, the data cannot be recovered for ANY reason</strong>", "No backups, no forensic copies, nothing — it's gone forever"] },
                        { title: "Upcoming: Two Delete Types", body: "We are actively working on a better deletion system that will give you more control:", points: ["<strong>Soft Delete:</strong> Remove from view with an option to recover within a certain time window", "<strong>Hard Delete:</strong> Permanently and irrecoverably erase from all systems immediately", "This update will make it easier to manage your content", "We will announce when this feature is ready"] },
                        { title: "Retention for Legal Purposes", body: "In rare cases where content is part of an ongoing legal investigation under Indian law:", points: ["A copy may be retained only as long as required by law", "Once the legal obligation ends, the data is permanently deleted", "We will comply with valid Indian legal orders"] },
                    ]} />

                    {/* ===== SECTION 7: CHILDREN ===== */}
                    <PolicyBody no={7} title="Children's Privacy & Safety — Laws We Follow" body={[
                        "PikDB is <strong>not designed for children under 18</strong>. We take children's safety very seriously. Here are the laws from different countries that protect children online:"
                    ]} />

                    {/* Children laws table */}
                    <div className="overflow-x-auto mb-10">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="bg-red-100">
                                    <th className="border border-red-300 p-3 text-left">Country / Region</th>
                                    <th className="border border-red-300 p-3 text-left">Law</th>
                                    <th className="border border-red-300 p-3 text-left">What It Says</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-red-50"><td className="border border-red-300 p-3 font-medium">India</td><td className="border border-red-300 p-3">POCSO Act, 2012</td><td className="border border-red-300 p-3">Strictly bans sexual content involving children. We report violations to authorities.</td></tr>
                                <tr><td className="border border-red-300 p-3 font-medium">India</td><td className="border border-red-300 p-3">IT Act, 2000 (Section 67B)</td><td className="border border-red-300 p-3">Criminalizes child pornography online. Violators face serious penalties.</td></tr>
                                <tr className="bg-red-50"><td className="border border-red-300 p-3 font-medium">India</td><td className="border border-red-300 p-3">Juvenile Justice Act, 2015</td><td className="border border-red-300 p-3">Protects children from exploitation and abuse.</td></tr>
                                <tr><td className="border border-red-300 p-3 font-medium">United States</td><td className="border border-red-300 p-3">COPPA</td><td className="border border-red-300 p-3">Restricts collecting data from children under 13. We don't collect data, so we're inherently compliant.</td></tr>
                                <tr className="bg-red-50"><td className="border border-red-300 p-3 font-medium">European Union</td><td className="border border-red-300 p-3">GDPR Article 8</td><td className="border border-red-300 p-3">Requires parental consent for children under 16 for data processing.</td></tr>
                                <tr><td className="border border-red-300 p-3 font-medium">United Kingdom</td><td className="border border-red-300 p-3">Children's Code / Age Appropriate Design Code</td><td className="border border-red-300 p-3">Sets standards for online services accessible to children.</td></tr>
                                <tr className="bg-red-50"><td className="border border-red-300 p-3 font-medium">Brazil</td><td className="border border-red-300 p-3">LGPD Article 14</td><td className="border border-red-300 p-3">Requires special treatment of children's data.</td></tr>
                                <tr><td className="border border-red-300 p-3 font-medium">Australia</td><td className="border border-red-300 p-3">Online Safety Act 2021</td><td className="border border-red-300 p-3">Protects children from cyberbullying and harmful content online.</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <PolicyBody points={[
                        "<strong>Age Restriction:</strong> We do not knowingly allow anyone under 18 to use PikDB.",
                        "<strong>Zero Tolerance:</strong> Any content involving minors in inappropriate contexts will be <strong>immediately removed</strong> upon notification and reported to relevant authorities as required by Indian law.",
                        "<strong>Report Child Safety Issues:</strong> If you find content that violates children's safety laws, file a complaint immediately at <strong>desk.arkynox.com</strong>.",
                        "<strong>Other Countries:</strong> We also acknowledge children's protection laws in all jurisdictions where we operate. Child safety is a global priority."
                    ]} />

                    {/* ===== SECTION 8: DATA SHARING ===== */}
                    <PolicyBody no={8} title="Data Sharing — We Don't Sell Your Data" body={[
                        "We do not sell, rent, or trade your personal data. We do not share your uploaded content with anyone except in these very limited situations:"
                    ]} />

                    <div className="grid sm:grid-cols-3 gap-4 mb-10">
                        <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
                            <div className="text-2xl text-center mb-2">&#9729;</div>
                            <h4 className="font-bold text-gray-800 text-sm text-center">Cloud Hosting</h4>
                            <p className="text-gray-600 text-xs mt-2 text-center">We use hosting providers to store encrypted data. They <strong>cannot</strong> view your images.</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
                            <div className="text-2xl text-center mb-2">&#9878;</div>
                            <h4 className="font-bold text-gray-800 text-sm text-center">Indian Legal Orders</h4>
                            <p className="text-gray-600 text-xs mt-2 text-center">If a valid Indian court orders us to share data, we may need to comply.</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
                            <div className="text-2xl text-center mb-2">&#9888;</div>
                            <h4 className="font-bold text-gray-800 text-sm text-center">Takedown Processing</h4>
                            <p className="text-gray-600 text-xs mt-2 text-center">When processing a complaint, we may decrypt images solely for validation.</p>
                        </div>
                    </div>

                    {/* ===== SECTION 9: YOUR RIGHTS ===== */}
                    <PolicyBody no={9} title="Your Rights — What You Can Do" body={[
                        "Here are your rights regarding your data. These are based on Indian law (our governing law) and also acknowledged under international frameworks like GDPR, CCPA, and others."
                    ]} />

                    <div className="grid sm:grid-cols-2 gap-4 mb-10">
                        <div className="border border-gray-200 rounded-lg p-4 bg-white">
                            <h4 className="font-bold text-gray-800">&#128065; Right to Access</h4>
                            <p className="text-gray-600 text-sm mt-1">Ask us what data we have related to your content.</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4 bg-white">
                            <h4 className="font-bold text-gray-800">&#128465; Right to Delete</h4>
                            <p className="text-gray-600 text-sm mt-1">Request permanent deletion of content via desk.arkynox.com.</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4 bg-white">
                            <h4 className="font-bold text-gray-800">&#128221; Right to File Complaint</h4>
                            <p className="text-gray-600 text-sm mt-1">Report content that violates your rights or the law.</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4 bg-white">
                            <h4 className="font-bold text-gray-800">&#128682; Right to Opt-Out</h4>
                            <p className="text-gray-600 text-sm mt-1">Unsubscribe from any communications we send.</p>
                        </div>
                    </div>

                    <PolicyBody points={[
                        "<strong>How to Exercise Your Rights:</strong> Visit <strong>desk.arkynox.com</strong> to file any request.",
                        "<strong>Response Time:</strong> We aim to respond to all requests within 48 hours.",
                        "<strong>Governing Law:</strong> These rights are provided under Indian law. Users in other jurisdictions may have additional rights under their local laws."
                    ]} />

                    {/* ===== SECTION 10: LAWS TABLE ===== */}
                    <PolicyBody no={10} title="Laws That Apply — A Complete Reference" body={[
                        "PikDB is based in India and governed by <strong>Indian law</strong>. However, we serve users from all over the world. Below is a complete list of laws we acknowledge. <strong>Indian law is primary</strong> — other laws are listed for your awareness."
                    ]} />

                    {/* Primary: India */}
                    <div className="bg-orange-50 border-2 border-orange-400 rounded-xl p-6 mb-6">
                        <h4 className="font-bold text-orange-900 text-lg mb-3 flex items-center gap-2">
                            <span>&#127470;&#127475;</span> India — Primary Governing Law
                        </h4>
                        <p className="text-orange-800 text-sm mb-3">As an India-based company, these laws directly govern our platform:</p>
                        <div className="grid sm:grid-cols-2 gap-3 text-sm">
                            <div className="bg-white rounded-lg p-3 border border-orange-200"><strong>IT Act, 2000</strong><br/><span className="text-xs text-gray-600">Information Technology Act — governs all online activities, data protection, and cybercrime</span></div>
                            <div className="bg-white rounded-lg p-3 border border-orange-200"><strong>IT Rules, 2011</strong><br/><span className="text-xs text-gray-600">Reasonable Security Practices and Procedures for handling data</span></div>
                            <div className="bg-white rounded-lg p-3 border border-orange-200"><strong>Indian Penal Code, 1860</strong><br/><span className="text-xs text-gray-600">Sections 292-294 (obscenity), Section 499 (defamation), Section 509 (insult to modesty)</span></div>
                            <div className="bg-white rounded-lg p-3 border border-orange-200"><strong>POCSO Act, 2012</strong><br/><span className="text-xs text-gray-600">Protection of Children from Sexual Offences — zero tolerance policy</span></div>
                            <div className="bg-white rounded-lg p-3 border border-orange-200"><strong>Copyright Act, 1957</strong><br/><span className="text-xs text-gray-600">For copyright infringement takedown requests</span></div>
                            <div className="bg-white rounded-lg p-3 border border-orange-200"><strong>Juvenile Justice Act, 2015</strong><br/><span className="text-xs text-gray-600">Protection of children from exploitation</span></div>
                        </div>
                    </div>

                    {/* International laws */}
                    <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 mb-6">
                        <h4 className="font-bold text-blue-900 text-lg mb-3 flex items-center gap-2">
                            <span>&#127758;</span> International Laws — Acknowledged
                        </h4>
                        <p className="text-blue-800 text-sm mb-3">We acknowledge these laws. Our obligations are determined by Indian law, but we accept takedown requests from all jurisdictions via desk.arkynox.com.</p>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127466;&#127482; European Union</strong><br/><span className="text-xs text-gray-600">GDPR (General Data Protection Regulation) — data protection and privacy rights</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127482;&#127480; United States</strong><br/><span className="text-xs text-gray-600">CCPA, COPPA, DMCA, Section 230 — privacy, children, copyright, platform immunity</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127463;&#127479; Japan</strong><br/><span className="text-xs text-gray-600">APPI (Act on the Protection of Personal Information)</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127462;&#127480; Australia</strong><br/><span className="text-xs text-gray-600">Privacy Act 1988, Australian Privacy Principles, Online Safety Act 2021</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127472;&#127473; Brazil</strong><br/><span className="text-xs text-gray-600">LGPD (Lei Geral de Proteção de Dados) — comprehensive data protection law</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127480;&#127468; South Africa</strong><br/><span className="text-xs text-gray-600">POPIA (Protection of Personal Information Act, 2013)</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127466;&#127468; Germany</strong><br/><span className="text-xs text-gray-600">BDSG (Federal Data Protection Act) — supplements GDPR</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127467;&#127479; France</strong><br/><span className="text-xs text-gray-600">Loi Informatique et Libertés — French data protection law</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127466;&#127480; Spain</strong><br/><span className="text-xs text-gray-600">LOPDGDD (Organic Law on Data Protection and Digital Rights)</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127475;&#127473; Russia</strong><br/><span className="text-xs text-gray-600">Federal Law No. 152-FZ on Personal Data</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127470;&#127481; Turkey</strong><br/><span className="text-xs text-gray-600">KVKK (Personal Data Protection Law No. 6698)</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127528; Netherlands</strong><br/><span className="text-xs text-gray-600">Dutch GDPR Implementation Act (UAVG)</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127466;&#127474; Indonesia</strong><br/><span className="text-xs text-gray-600">Law No. 27 of 2022 on Personal Data Protection (PDP Law)</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127475;&#127479; Thailand</strong><br/><span className="text-xs text-gray-600">PDPA (Personal Data Protection Act, 2019)</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127474;&#127477; Philippines</strong><br/><span className="text-xs text-gray-600">Data Privacy Act of 2012 (Republic Act No. 10173)</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127470;&#127475; Kenya</strong><br/><span className="text-xs text-gray-600">Data Protection Act, 2019</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127466;&#127474; Nigeria</strong><br/><span className="text-xs text-gray-600">NDPR (Nigeria Data Protection Regulation, 2019)</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127474;&#127469; Sri Lanka</strong><br/><span className="text-xs text-gray-600">Personal Data Protection Act No. 9 of 2022</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127464;&#127467; Iran</strong><br/><span className="text-xs text-gray-600">Iranian data protection and cybercrime laws</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127480;&#127462; Yemen</strong><br/><span className="text-xs text-gray-600">Applicable Yemeni laws on data and content</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127472;&#473;&#127475; Kazakhstan</strong><br/><span className="text-xs text-gray-600">Law on Personal Data and Its Protection (No. 94-V)</span></div>
                        </div>
                    </div>

                    {/* ===== SECTION 11: FUTURE UPDATES ===== */}
                    <PolicyBody no={11} title="Free Service & Future Updates" body={[
                        "PikDB is currently <strong>completely free</strong>. We want to keep it that way. But the legal world is changing, and we may need to adapt:"
                    ]} />

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                            <div className="text-2xl mb-1">&#127942;</div>
                            <h4 className="font-bold text-green-800 text-sm">Free Service</h4>
                            <p className="text-green-700 text-xs mt-1">Always free to use</p>
                        </div>
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
                            <div className="text-2xl mb-1">&#128274;</div>
                            <h4 className="font-bold text-amber-800 text-sm">Future Login?</h4>
                            <p className="text-amber-700 text-xs mt-1">May add optional accounts if law requires</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                            <div className="text-2xl mb-1">&#9889;</div>
                            <h4 className="font-bold text-blue-800 text-sm">New Algorithm</h4>
                            <p className="text-blue-700 text-xs mt-1">Coming in ~2 months — bigger uploads</p>
                        </div>
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                            <div className="text-2xl mb-1">&#128465;</div>
                            <h4 className="font-bold text-purple-800 text-sm">Better Deletion</h4>
                            <p className="text-purple-700 text-xs mt-1">Soft &amp; hard delete options coming</p>
                        </div>
                    </div>

                    <PolicyBody points={[
                        "<strong>Free Forever:</strong> PikDB remains free. We won't start charging.",
                        "<strong>Possible Login Requirement:</strong> As laws evolve (especially in India), we may need to add optional or mandatory login. If we do, all images will remain encrypted and private.",
                        "<strong>Upload Limit Expansion:</strong> In about 2 months, we're launching a new algorithm that will let you upload much larger files.",
                        "<strong>Better Deletion Options:</strong> We're building a system with soft delete (recoverable) and hard delete (instant permanent removal).",
                        "<strong>No Change to Core Values:</strong> Whatever changes come, encryption, privacy, and security stay at the center of everything we do."
                    ]} />

                    {/* ===== SECTION 12: CHANGES ===== */}
                    <PolicyBody no={12} title="Changes to This Policy" body={[
                        "We may update this Privacy Policy from time to time. If we make big changes, we'll let you know through the app or our website. Continuing to use PikDB after updates means you accept the new policy."
                    ]} />

                    {/* ===== SECTION 13: CONTACT ===== */}
                    <PolicyBody no={13} title="Contact Us" body={[
                        "If you have questions, concerns, or need to report content issues, here's how to reach us:"
                    ]} />

                    <div className="bg-gray-50 border border-gray-300 rounded-xl p-6 mb-10">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="text-center">
                                <div className="text-3xl mb-2">&#128196;</div>
                                <h4 className="font-bold text-gray-800">File a Complaint</h4>
                                <p className="text-gray-600 text-sm mt-1">Visit <strong>desk.arkynox.com</strong> to submit a takedown request</p>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl mb-2">&#128231;</div>
                                <h4 className="font-bold text-gray-800">Email Support</h4>
                                <p className="text-gray-600 text-sm mt-1"><strong>support@arkynox.com</strong></p>
                            </div>
                        </div>
                        <div className="border-t border-gray-300 mt-4 pt-4 text-center text-sm text-gray-500">
                            <strong>Response Time:</strong> We aim to respond within 48 hours &nbsp;|&nbsp; <strong>Governing Law:</strong> India
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
