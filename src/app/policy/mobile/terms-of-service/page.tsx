"use client";

import Footer from "@/components/main/footer";
import Header from "@/components/main/header";
import { PolicyBody } from "@/components/policy/body";

export default function MobileTermsOfServicePage() {
    return (
        <div>
            <Header />
            <div className="font-sans antialiased bg-white text-gray-900">
                <div className="max-w-4xl mx-auto px-4 py-10 sm:py-20">

                    {/* ===== HEADER ===== */}
                    <div className="text-center mb-6 sm:mb-12">
                        <span className="inline-block bg-blue-100 text-blue-800 text-sm py-2 px-4 rounded-full font-medium">
                        Terms of Service (Mobile)
                        </span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-6">
                        Terms of Service
                    </h1>
                    <p className="text-gray-700 text-center mb-12 text-lg">
                        These are the rules for using PikDB. Please read them carefully — by using the app, you agree to follow them.
                    </p>
                    <p className="text-xs font-semibold uppercase text-gray-500 mb-8">
                        Updated June 20, 2026
                    </p>

                    {/* ===== QUICK SUMMARY ===== */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-10">
                        <h2 className="text-xl font-bold text-blue-900 mb-4">Quick Summary</h2>
                        <div className="grid sm:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-start gap-2"><span className="text-green-600 text-lg">&#10003;</span><span>You own your content — we just provide the platform</span></div>
                            <div className="flex items-start gap-2"><span className="text-green-600 text-lg">&#10003;</span><span>You are responsible for what you upload</span></div>
                            <div className="flex items-start gap-2"><span className="text-green-600 text-lg">&#10003;</span><span>We are NOT liable for your content</span></div>
                            <div className="flex items-start gap-2"><span className="text-green-600 text-lg">&#10003;</span><span>Anonymous use — no account needed</span></div>
                            <div className="flex items-start gap-2"><span className="text-red-500 text-lg">&#9888;</span><span>No illegal content — we remove it when reported</span></div>
                            <div className="flex items-start gap-2"><span className="text-red-500 text-lg">&#9888;</span><span>Indian law governs these terms</span></div>
                        </div>
                    </div>

                    {/* ===== REAL LIFE ANALOGY ===== */}
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
                        <h3 className="font-bold text-amber-900 mb-2">Think of It Like This</h3>
                        <p className="text-amber-800 text-sm leading-relaxed">
                            Imagine a <strong>public bulletin board</strong> in a town square. Anyone can pin a note on it. 
                            The person who owns the board doesn't write the notes — they just provide the board. 
                            If someone pins an illegal note, the board owner removes it when asked. 
                            But the <strong>person who pinned it is responsible</strong>, not the board owner. 
                            PikDB is the bulletin board. You are the person pinning notes. 
                            You own your notes. You are responsible for them. We just provide the board.
                        </p>
                    </div>

                    {/* ===== SECTION 1: ACCEPTANCE ===== */}
                    <PolicyBody no={1} title="Acceptance of Terms" body={[
                        "By downloading, opening, or using PikDB, you agree to these Terms of Service and our Privacy Policy. If you don't agree, please don't use the app. Simple as that.",
                        "These terms are a legal agreement between you and Arkynox (the company behind PikDB). We are based in <strong>India</strong>, and these terms are governed by <strong>Indian law</strong>."
                    ]} />

                    {/* ===== SECTION 2: ANONYMITY ===== */}
                    <PolicyBody no={2} title="Anonymous-First Platform — We Don't Track You" body={[
                        "PikDB is designed to protect your privacy. You don't need to tell us who you are."
                    ]} />

                    <div className="grid sm:grid-cols-3 gap-4 mb-10">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                            <div className="text-3xl mb-2">&#128373;</div>
                            <h4 className="font-bold text-green-800 text-sm">No Account Needed</h4>
                            <p className="text-green-700 text-xs mt-1">Use the app without signing up</p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                            <div className="text-3xl mb-2">&#128270;</div>
                            <h4 className="font-bold text-green-800 text-sm">No Tracking</h4>
                            <p className="text-green-700 text-xs mt-1">We don't track your device or behavior</p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                            <div className="text-3xl mb-2">&#128100;</div>
                            <h4 className="font-bold text-green-800 text-sm">You're Anonymous</h4>
                            <p className="text-green-700 text-xs mt-1">We don't know who you are</p>
                        </div>
                    </div>

                    <PolicyBody points={[
                        "<strong>No Account Required:</strong> You can upload, share, and view images without creating an account or providing any personal information.",
                        "<strong>No Device Tracking:</strong> We do not collect device IDs, advertising IDs, or any information that could identify your device.",
                        "<strong>Truly Anonymous:</strong> Your identity is not stored, tracked, or associated with your content.",
                        "<strong>Future Changes:</strong> If laws change and we need to add login features, we will. But your images will stay encrypted and private.",
                        "<strong>No Reduction in Privacy:</strong> Even if we add accounts later, encryption and privacy remain our top priorities."
                    ]} />

                    {/* ===== SECTION 3: LICENSE ===== */}
                    <PolicyBody no={3} title="Your License to Use PikDB" body={[
                        "We give you permission to use PikDB for personal, non-commercial purposes. This is a limited, non-transferable license — meaning you can't resell or give this permission to someone else. You must also follow the rules of the app store (Apple or Google) where you downloaded the app."
                    ]} />

                    {/* ===== SECTION 4: RULES ===== */}
                    <PolicyBody no={4} title="Rules of Use — What You Agree To" body={[
                        "By using PikDB, you promise to:"
                    ]} />

                    <div className="grid sm:grid-cols-2 gap-3 mb-10">
                        <div className="flex items-start gap-2 bg-white border border-gray-200 rounded-lg p-3 text-sm">
                            <span className="text-green-600 font-bold mt-0.5">&#10003;</span>
                            <span>Use PikDB only for <strong>lawful purposes</strong> following Indian law and your local laws</span>
                        </div>
                        <div className="flex items-start gap-2 bg-white border border-gray-200 rounded-lg p-3 text-sm">
                            <span className="text-green-600 font-bold mt-0.5">&#10003;</span>
                            <span>Respect others' <strong>copyrights and intellectual property</strong></span>
                        </div>
                        <div className="flex items-start gap-2 bg-white border border-gray-200 rounded-lg p-3 text-sm">
                            <span className="text-green-600 font-bold mt-0.5">&#10003;</span>
                            <span>Follow all <strong>applicable laws</strong> including Indian law</span>
                        </div>
                        <div className="flex items-start gap-2 bg-white border border-gray-200 rounded-lg p-3 text-sm">
                            <span className="text-green-600 font-bold mt-0.5">&#10003;</span>
                            <span>Be <strong>responsible</strong> for everything you upload</span>
                        </div>
                    </div>

                    {/* ===== SECTION 5: CONTENT OWNERSHIP ===== */}
                    <PolicyBody no={5} title="Content Ownership — Your Content, Your Responsibility" body={[
                        "This is the most important section. Please read it carefully. It explains who owns what and who is responsible."
                    ]} />

                    {/* Visual comparison */}
                    <div className="grid sm:grid-cols-2 gap-6 mb-10">
                        <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
                            <div className="text-center mb-3">
                                <span className="text-4xl">&#128100;</span>
                                <h4 className="font-bold text-blue-900 text-lg mt-1">You (The User)</h4>
                            </div>
                            <ul className="space-y-2 text-sm text-blue-800">
                                <li className="flex items-start gap-2"><span className="text-green-600">&#10003;</span> You OWN everything you upload</li>
                                <li className="flex items-start gap-2"><span className="text-green-600">&#10003;</span> You are RESPONSIBLE for your content</li>
                                <li className="flex items-start gap-2"><span className="text-green-600">&#10003;</span> You must follow the law</li>
                                <li className="flex items-start gap-2"><span className="text-red-500">&#10007;</span> You cannot blame us for your content</li>
                            </ul>
                        </div>
                        <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-6">
                            <div className="text-center mb-3">
                                <span className="text-4xl">&#9881;</span>
                                <h4 className="font-bold text-purple-900 text-lg mt-1">PikDB (The Platform)</h4>
                            </div>
                            <ul className="space-y-2 text-sm text-purple-800">
                                <li className="flex items-start gap-2"><span className="text-green-600">&#10003;</span> We OWN the software and technology</li>
                                <li className="flex items-start gap-2"><span className="text-green-600">&#10003;</span> We provide encrypted storage</li>
                                <li className="flex items-start gap-2"><span className="text-green-600">&#10003;</span> We remove content when reported</li>
                                <li className="flex items-start gap-2"><span className="text-red-500">&#10007;</span> We do NOT own your images</li>
                                <li className="flex items-start gap-2"><span className="text-red-500">&#10007;</span> We are NOT liable for your content</li>
                            </ul>
                        </div>
                    </div>

                    <PolicyBody points={[
                        "<strong>You Own Your Content:</strong> Every image, file, or data you upload to PikDB is YOUR property. We don't claim any ownership. Your content stays yours.",
                        "<strong>We Own the Platform:</strong> We own the app, the code, the design, the servers. But not your images.",
                        "<strong>Each Person Owns Their Own Content:</strong> If you upload it, it's yours. You are solely responsible for it.",
                        "<strong>We Are Neutral:</strong> We don't review, approve, monitor, or endorse any content. We just provide the technology.",
                        "<strong>No Liability For User Content:</strong> PikDB and Arkynox are NOT liable for any content uploaded by users. All legal responsibility rests with the person who uploaded it.",
                        "<strong>Content Takedown:</strong> If someone reports content that violates their rights or the law, we will remove it. That's the extent of our obligation.",
                        "<strong>File a Complaint:</strong> Report violations at <strong>desk.arkynox.com</strong>."
                    ]} />

                    {/* ===== SECTION 6: PROHIBITED ===== */}
                    <PolicyBody no={6} title="What Is NOT Allowed" body={[
                        "You are NOT allowed to use PikDB for any of these activities. Doing so may get you banned and could lead to legal consequences."
                    ]} />

                    <div className="grid sm:grid-cols-2 gap-3 mb-10">
                        <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-sm">
                            <span className="text-red-500 font-bold mt-0.5">&#10007;</span>
                            <span>Uploading <strong>illegal, harmful, or offensive</strong> content</span>
                        </div>
                        <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-sm">
                            <span className="text-red-500 font-bold mt-0.5">&#10007;</span>
                            <span>Uploading content that <strong>infringes copyrights</strong> or trademarks</span>
                        </div>
                        <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-sm">
                            <span className="text-red-500 font-bold mt-0.5">&#10007;</span>
                            <span>Uploading <strong>child sexual abuse material</strong> (violates POCSO Act, Indian law, and global laws)</span>
                        </div>
                        <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-sm">
                            <span className="text-red-500 font-bold mt-0.5">&#10007;</span>
                            <span><strong>Hacking, exploiting, or disrupting</strong> the platform</span>
                        </div>
                        <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-sm">
                            <span className="text-red-500 font-bold mt-0.5">&#10007;</span>
                            <span>Uploading <strong>malware, viruses, or harmful code</strong></span>
                        </div>
                        <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-sm">
                            <span className="text-red-500 font-bold mt-0.5">&#10007;</span>
                            <span>Using <strong>bots, scrapers, or automated scripts</strong> without permission</span>
                        </div>
                        <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-sm">
                            <span className="text-red-500 font-bold mt-0.5">&#10007;</span>
                            <span>Attempting to <strong>bypass encryption or security</strong> measures</span>
                        </div>
                        <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-sm">
                            <span className="text-red-500 font-bold mt-0.5">&#10007;</span>
                            <span>Using PikDB for <strong>fraudulent or malicious</strong> purposes</span>
                        </div>
                    </div>

                    <PolicyBody points={[
                        "<strong>Breaking These Rules Has Consequences:</strong> Violating these prohibitions may result in immediate termination of your access, removal of content, and reporting to relevant authorities as required by Indian law.",
                        "<strong>Zero Tolerance for Child Safety Violations:</strong> Any content involving minors in sexual contexts will be immediately removed and reported to authorities under the POCSO Act, 2012 and IT Act, 2000."
                    ]} />

                    {/* ===== SECTION 7: DELETION ===== */}
                    <PolicyBody no={7} title="How Content Deletion Works" body={[
                        "PikDB has a simple content removal system. There are two ways content gets deleted:"
                    ]} />

                    {/* Deletion flowchart */}
                    <div className="bg-gray-50 border border-gray-300 rounded-xl p-6 mb-10">
                        <h4 className="font-bold text-gray-900 mb-4 text-center">Deletion Process</h4>
                        <div className="flex flex-col items-center gap-3 text-sm">
                            <div className="bg-amber-100 border-2 border-amber-400 rounded-lg p-4 w-72 text-center">
                                <div className="text-xl mb-1">&#128465; Level 1: Delete in App</div>
                                <p className="text-amber-800 text-xs mt-1">You tap "Delete"</p>
                                <div className="border-t border-amber-300 mt-2 pt-2 text-xs text-amber-700">
                                    Image removed from <strong>your view only</strong><br/>
                                    Data still exists on server<br/>
                                    <strong>Not permanent</strong>
                                </div>
                            </div>
                            <div className="text-gray-400">&#8595;</div>
                            <div className="text-gray-500 text-xs font-bold">OR</div>
                            <div className="text-gray-400">&#8595;</div>
                            <div className="bg-red-100 border-2 border-red-400 rounded-lg p-4 w-72 text-center">
                                <div className="text-xl mb-1">&#128196; Level 2: File a Ticket</div>
                                <p className="text-red-800 text-xs mt-1">Go to desk.arkynox.com</p>
                                <div className="border-t border-red-300 mt-2 pt-2 text-xs text-red-700">
                                    We review the request<br/>
                                    <strong>Permanently deleted</strong> from all servers<br/>
                                    <strong>Cannot be recovered</strong>
                                </div>
                            </div>
                            <div className="text-gray-400">&#8595;</div>
                            <div className="bg-blue-100 border-2 border-blue-400 rounded-lg p-4 w-72 text-center">
                                <div className="text-xl mb-1">&#128752; Coming Soon</div>
                                <p className="text-blue-800 text-xs mt-1">Two Delete Types</p>
                                <div className="border-t border-blue-300 mt-2 pt-2 text-xs text-blue-700">
                                    <strong>Soft Delete</strong> — recoverable<br/>
                                    <strong>Hard Delete</strong> — instant permanent
                                </div>
                            </div>
                        </div>
                    </div>

                    <PolicyBody details={[
                        { title: "Delete in App (Soft Delete)", body: "When you delete content through the app interface:", points: ["The image is removed from <strong>your view only</strong>", "The encrypted data <strong>still exists</strong> on our servers", "This is because images shared in groups need to remain visible to others", "This is NOT a permanent deletion"] },
                        { title: "Ticket-Based Deletion (Permanent)", body: "To permanently remove content, file a complaint at desk.arkynox.com:", points: ["Submit a ticket with details about the content", "We review the request to validate it", "If approved, the content is <strong>permanently and irrecoverably deleted</strong>", "<strong>No backups, no forensic copies — gone forever</strong>"] },
                        { title: "Upcoming: Two Delete Types", body: "We're building a better system:", points: ["<strong>Soft Delete:</strong> Removes from view with a recovery option", "<strong>Hard Delete:</strong> Instantly and permanently deletes everything"] },
                    ]} />

                    {/* ===== SECTION 8: ENCRYPTION ===== */}
                    <PolicyBody no={8} title="Encryption Policy — How We Protect Data" body={[
                        "Security is built into PikDB from the ground up. Here's how encryption works:"
                    ]} />

                    <div className="bg-gray-50 border border-gray-300 rounded-xl p-6 mb-10">
                        <h4 className="font-bold text-gray-900 mb-4 text-center">Encryption Flow</h4>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                            <div className="bg-green-100 border-2 border-green-400 rounded-lg p-3 text-center w-32">
                                <span className="text-2xl">&#128247;</span>
                                <div className="font-bold text-green-800 mt-1">Your Image</div>
                            </div>
                            <span className="text-2xl text-gray-400">&#8594;</span>
                            <div className="bg-blue-100 border-2 border-blue-400 rounded-lg p-3 text-center w-40">
                                <span className="text-2xl">&#128274;</span>
                                <div className="font-bold text-blue-800 mt-1">Encrypted</div>
                                <div className="text-xs text-blue-700">Locked with secure encryption</div>
                            </div>
                            <span className="text-2xl text-gray-400">&#8594;</span>
                            <div className="bg-purple-100 border-2 border-purple-400 rounded-lg p-3 text-center w-40">
                                <span className="text-2xl">&#128451;</span>
                                <div className="font-bold text-purple-800 mt-1">Stored Safely</div>
                                <div className="text-xs text-purple-700">Nobody can view it</div>
                            </div>
                        </div>
                        <div className="flex justify-center gap-8 mt-4 text-xs">
                            <span className="text-green-700">&#10003; No ticket? Image stays locked forever</span>
                            <span className="text-red-700">&#9888; Ticket filed? Decrypt only for takedown</span>
                        </div>
                    </div>

                    <PolicyBody points={[
                        "<strong>Encrypted at Rest and in Transit:</strong> Your images are always encrypted — whether stored on our servers or being sent across the internet.",
                        "<strong>No Decryption Without a Ticket:</strong> We NEVER decrypt images unless someone files a formal complaint at desk.arkynox.com.",
                        "<strong>Limited Decryption for Takedowns Only:</strong> If a valid complaint is filed, we decrypt only to verify the claim and process removal.",
                        "<strong>Post-Processing Deletion:</strong> After takedown processing, the content is permanently deleted and cannot be recovered.",
                        "<strong>No Automated Scanning:</strong> We never scan, analyze, or decrypt your images automatically. Period."
                    ]} />

                    {/* ===== SECTION 9: APP STORES ===== */}
                    <PolicyBody no={9} title="App Store Rules" body={[
                        "These terms are between you and Arkynox — not Apple or Google. The app stores are not responsible for PikDB or its content. You must also follow the app store's terms when downloading PikDB."
                    ]} />

                    {/* ===== SECTION 10: SERVICE AVAILABILITY ===== */}
                    <PolicyBody no={10} title="Service Availability & Future Updates" body={[
                        "We try to keep PikDB running smoothly, but we can't guarantee it will be available 100% of the time. We may need to update, suspend, or discontinue services with reasonable notice."
                    ]} />

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                            <span className="text-3xl mb-1 block">&#127942;</span>
                            <h4 className="font-bold text-green-800 text-sm">Free Forever</h4>
                            <p className="text-green-700 text-xs mt-1">Always free to use</p>
                        </div>
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
                            <span className="text-3xl mb-1 block">&#9889;</span>
                            <h4 className="font-bold text-amber-800 text-sm">New Algorithm</h4>
                            <p className="text-amber-700 text-xs mt-1">~2 months — bigger uploads</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                            <span className="text-3xl mb-1 block">&#128274;</span>
                            <h4 className="font-bold text-blue-800 text-sm">Possible Login</h4>
                            <p className="text-blue-700 text-xs mt-1">If law requires in future</p>
                        </div>
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                            <span className="text-3xl mb-1 block">&#128465;</span>
                            <h4 className="font-bold text-purple-800 text-sm">Better Deletion</h4>
                            <p className="text-purple-700 text-xs mt-1">Soft &amp; hard delete coming</p>
                        </div>
                    </div>

                    <PolicyBody points={[
                        "<strong>Free Service:</strong> PikDB is free and we plan to keep it that way.",
                        "<strong>Upcoming Algorithm:</strong> In about 2 months, a new algorithm will let you upload much larger files.",
                        "<strong>Possible Future Login:</strong> If changing laws require it, we may add optional or mandatory login. Your images will stay encrypted.",
                        "<strong>Deletion Upgrade:</strong> We're building soft delete (recoverable) and hard delete (instant permanent)."
                    ]} />

                    {/* ===== SECTION 11: CONTENT RESPONSIBILITY ===== */}
                    <PolicyBody no={11} title="Content Responsibility & Disclaimer" body={[
                        "We want to be absolutely clear about our role. PikDB is a technology platform. We are not the publisher, creator, or owner of any user-uploaded content."
                    ]} />

                    <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 mb-10">
                        <h4 className="font-bold text-red-900 mb-3 text-center">&#9878; Important Legal Disclaimer</h4>
                        <ul className="space-y-2 text-sm text-red-800">
                            <li className="flex items-start gap-2"><span>&#9899;</span> All uploaded content belongs to the uploader, not us</li>
                            <li className="flex items-start gap-2"><span>&#9899;</span> We don't monitor, review, or approve any content</li>
                            <li className="flex items-start gap-2"><span>&#9899;</span> Users must follow all applicable laws</li>
                            <li className="flex items-start gap-2"><span>&#9899;</span> Report violations at desk.arkynox.com — we'll remove them</li>
                            <li className="flex items-start gap-2"><span>&#9899;</span> Legal disputes should go to the content owner, not us</li>
                            <li className="flex items-start gap-2"><span>&#9899;</span> We don't owe any duty of care regarding user content</li>
                        </ul>
                    </div>

                    {/* ===== SECTION 12: LIMITATION OF LIABILITY ===== */}
                    <PolicyBody no={12} title="Our Limits of Responsibility" body={[
                        "To the maximum extent allowed by Indian law, PikDB and Arkynox are NOT liable for:"
                    ]} />

                    <div className="grid sm:grid-cols-2 gap-3 mb-10">
                        <div className="bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm">Any user-uploaded content in any manner</div>
                        <div className="bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm">Loss of data or service disruptions</div>
                        <div className="bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm">Security breaches beyond our reasonable control</div>
                        <div className="bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm">Damages from using or not being able to use PikDB</div>
                        <div className="bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm">Legal issues from user-uploaded content</div>
                        <div className="bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm">Indirect or consequential damages of any kind</div>
                    </div>

                    <PolicyBody points={[
                        "<strong>Direct Complaints to Content Owners:</strong> If you have a legal issue with content, address it with the person who uploaded it. We are not responsible.",
                        "<strong>We Cooperate With Takedown Requests:</strong> We will process valid content removal requests via desk.arkynox.com."
                    ]} />

                    {/* ===== SECTION 13: GOVERNING LAW ===== */}
                    <PolicyBody no={13} title="Governing Law & Jurisdiction" body={[
                        "These terms are governed exclusively by <strong>Indian law</strong>. Any disputes will be handled in the courts of <strong>India</strong>."
                    ]} />

                    <div className="bg-orange-50 border-2 border-orange-400 rounded-xl p-6 mb-10">
                        <h4 className="font-bold text-orange-900 mb-3 text-center">&#9878; Legal Jurisdiction</h4>
                        <ul className="space-y-2 text-sm text-orange-800">
                            <li className="flex items-start gap-2"><span>&#9899;</span> <strong>Governing Law:</strong> Indian law (IT Act 2000, Indian Penal Code, POCSO Act, Copyright Act, and others)</li>
                            <li className="flex items-start gap-2"><span>&#9899;</span> <strong>Dispute Resolution:</strong> First try good-faith negotiation, then courts in India</li>
                            <li className="flex items-start gap-2"><span>&#9899;</span> <strong>International Users:</strong> You agree Indian law governs, no matter where you live</li>
                            <li className="flex items-start gap-2"><span>&#9899;</span> <strong>Your Local Laws:</strong> You must follow your own local laws too — that's your responsibility</li>
                        </ul>
                    </div>

                    {/* ===== SECTION 14: ALL LAWS ===== */}
                    <PolicyBody no={14} title="All Applicable Laws — Complete Reference" body={[
                        "This section lists all the laws that apply to or are acknowledged by PikDB. <strong>Indian law is primary.</strong> Other laws are listed for your awareness. We accept content takedown requests from all jurisdictions via desk.arkynox.com."
                    ]} />

                    {/* India */}
                    <div className="bg-orange-50 border-2 border-orange-400 rounded-xl p-6 mb-6">
                        <h4 className="font-bold text-orange-900 text-lg mb-3 flex items-center gap-2">
                            <span>&#127470;&#127475;</span> India — Primary Governing Law
                        </h4>
                        <p className="text-orange-800 text-sm mb-3">As an India-based company, these Indian laws directly govern us:</p>
                        <div className="grid sm:grid-cols-2 gap-3 text-sm">
                            <div className="bg-white rounded-lg p-3 border border-orange-200"><strong>Information Technology Act, 2000</strong><br/><span className="text-xs text-gray-600">India's primary law for online activities, data protection, and cybercrime</span></div>
                            <div className="bg-white rounded-lg p-3 border border-orange-200"><strong>IT Rules, 2011</strong><br/><span className="text-xs text-gray-600">Rules for reasonable security practices and data handling</span></div>
                            <div className="bg-white rounded-lg p-3 border border-orange-200"><strong>Indian Penal Code, 1860</strong><br/><span className="text-xs text-gray-600">Sections 292-294 (obscenity), 499 (defamation), 509 (insult to modesty of women)</span></div>
                            <div className="bg-white rounded-lg p-3 border border-orange-200"><strong>POCSO Act, 2012</strong><br/><span className="text-xs text-gray-600">Protection of Children from Sexual Offences — zero tolerance</span></div>
                            <div className="bg-white rounded-lg p-3 border border-orange-200"><strong>Copyright Act, 1957</strong><br/><span className="text-xs text-gray-600">For copyright infringement takedown requests</span></div>
                            <div className="bg-white rounded-lg p-3 border border-orange-200"><strong>Juvenile Justice Act, 2015</strong><br/><span className="text-xs text-gray-600">Protection of children from exploitation and abuse</span></div>
                            <div className="bg-white rounded-lg p-3 border border-orange-200"><strong>Indecent Representation of Women (Prohibition) Act, 1986</strong><br/><span className="text-xs text-gray-600">Prohibits indecent portrayal of women in media</span></div>
                        </div>
                    </div>

                    {/* Children laws */}
                    <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 mb-6">
                        <h4 className="font-bold text-red-900 text-lg mb-3">&#128118; Children's Safety Laws — Global Reference</h4>
                        <p className="text-red-800 text-sm mb-3">We take children's safety seriously. Here are the laws from around the world that protect children online:</p>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                            <div className="bg-white rounded-lg p-3 border border-red-200"><strong>India — POCSO Act, 2012</strong><br/><span className="text-xs text-gray-600">Strict prohibition of child sexual abuse material. Violators face severe criminal penalties.</span></div>
                            <div className="bg-white rounded-lg p-3 border border-red-200"><strong>India — IT Act, Sec 67B</strong><br/><span className="text-xs text-gray-600">Specifically criminalizes child pornography in electronic form.</span></div>
                            <div className="bg-white rounded-lg p-3 border border-red-200"><strong>India — Juvenile Justice Act, 2015</strong><br/><span className="text-xs text-gray-600">Protects children from exploitation, abuse, and neglect.</span></div>
                            <div className="bg-white rounded-lg p-3 border border-red-200"><strong>US — COPPA</strong><br/><span className="text-xs text-gray-600">Children's Online Privacy Protection Act — restricts data collection from children under 13.</span></div>
                            <div className="bg-white rounded-lg p-3 border border-red-200"><strong>EU — GDPR Article 8</strong><br/><span className="text-xs text-gray-600">Requires parental consent for children under 16 for data processing.</span></div>
                            <div className="bg-white rounded-lg p-3 border border-red-200"><strong>UK — Children's Code</strong><br/><span className="text-xs text-gray-600">Age Appropriate Design Code — sets standards for online services accessible to children.</span></div>
                            <div className="bg-white rounded-lg p-3 border border-red-200"><strong>Brazil — LGPD Article 14</strong><br/><span className="text-xs text-gray-600">Requires specific treatment and protection of children's data.</span></div>
                            <div className="bg-white rounded-lg p-3 border border-red-200"><strong>Australia — Online Safety Act 2021</strong><br/><span className="text-xs text-gray-600">Protects children from cyberbullying, harmful content, and online abuse.</span></div>
                        </div>
                    </div>

                    {/* International */}
                    <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 mb-10">
                        <h4 className="font-bold text-blue-900 text-lg mb-3 flex items-center gap-2">
                            <span>&#127758;</span> International Laws — Acknowledged
                        </h4>
                        <p className="text-blue-800 text-sm mb-3">We acknowledge these laws from around the world. Takedown requests from any jurisdiction can be filed at desk.arkynox.com.</p>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127466;&#127482; EU — GDPR</strong><br/><span className="text-xs text-gray-600">General Data Protection Regulation — comprehensive data protection and privacy rights</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127482;&#127480; United States</strong><br/><span className="text-xs text-gray-600">CCPA, COPPA, DMCA, Section 230 — privacy, children's safety, copyright, platform immunity</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127463;&#127479; Japan — APPI</strong><br/><span className="text-xs text-gray-600">Act on the Protection of Personal Information (Act No. 57 of 2003, amended)</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127462;&#127480; Australia</strong><br/><span className="text-xs text-gray-600">Privacy Act 1988, Australian Privacy Principles, Online Safety Act 2021</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127472;&#127473; Brazil — LGPD</strong><br/><span className="text-xs text-gray-600">Lei Geral de Proteção de Dados (Law No. 13,709/2018) — comprehensive data protection</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127480;&#127468; South Africa — POPIA</strong><br/><span className="text-xs text-gray-600">Protection of Personal Information Act, 2013</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127466;&#127468; Germany — BDSG</strong><br/><span className="text-xs text-gray-600">Federal Data Protection Act — supplements GDPR in Germany</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127467;&#127479; France</strong><br/><span className="text-xs text-gray-600">Loi Informatique et Libertés — French data protection law</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127466;&#127480; Spain — LOPDGDD</strong><br/><span className="text-xs text-gray-600">Organic Law on Data Protection and Digital Rights</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127475;&#127473; Russia — 152-FZ</strong><br/><span className="text-xs text-gray-600">Federal Law on Personal Data — Russia's primary data protection law</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127470;&#127481; Turkey — KVKK</strong><br/><span className="text-xs text-gray-600">Personal Data Protection Law No. 6698</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127528; Netherlands — UAVG</strong><br/><span className="text-xs text-gray-600">Dutch GDPR Implementation Act</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127466;&#127474; Indonesia — PDP Law</strong><br/><span className="text-xs text-gray-600">Law No. 27 of 2022 on Personal Data Protection</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127475;&#127479; Thailand — PDPA</strong><br/><span className="text-xs text-gray-600">Personal Data Protection Act, 2019</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127474;&#127477; Philippines</strong><br/><span className="text-xs text-gray-600">Data Privacy Act of 2012 (Republic Act No. 10173)</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127470;&#127475; Kenya — DPA 2019</strong><br/><span className="text-xs text-gray-600">Data Protection Act, 2019</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127466;&#127474; Nigeria — NDPR</strong><br/><span className="text-xs text-gray-600">Nigeria Data Protection Regulation, 2019</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127474;&#127469; Sri Lanka — PDPA</strong><br/><span className="text-xs text-gray-600">Personal Data Protection Act No. 9 of 2022</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127464;&#127467; Iran</strong><br/><span className="text-xs text-gray-600">Iranian Cybercrime Law and data protection regulations</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127480;&#127462; Yemen</strong><br/><span className="text-xs text-gray-600">Applicable Yemeni laws on electronic content and data</span></div>
                            <div className="bg-white rounded-lg p-3 border border-blue-200"><strong>&#127472;&#127475; Kazakhstan</strong><br/><span className="text-xs text-gray-600">Law on Personal Data and Its Protection (No. 94-V)</span></div>
                        </div>
                    </div>

                    {/* ===== SECTION 15: TERMINATION ===== */}
                    <PolicyBody no={15} title="Termination of Access" body={[
                        "We can suspend or terminate your access to PikDB if you break these rules, engage in illegal activity, or if required by law."
                    ]} />

                    {/* ===== SECTION 16: CHANGES ===== */}
                    <PolicyBody no={16} title="Changes to These Terms" body={[
                        "We may update these terms from time to time. If we make big changes, we'll let you know through the app or website. Continuing to use PikDB after updates means you accept the revised terms."
                    ]} />

                    {/* ===== SECTION 17: CONTACT ===== */}
                    <PolicyBody no={17} title="Contact Us" body={[
                        "If you have questions or need to report issues, here's how to reach us:"
                    ]} />

                    <div className="bg-gray-50 border border-gray-300 rounded-xl p-6 mb-10">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="text-center">
                                <span className="text-3xl mb-2 block">&#128196;</span>
                                <h4 className="font-bold text-gray-800">File a Complaint</h4>
                                <p className="text-gray-600 text-sm mt-1"><strong>desk.arkynox.com</strong></p>
                            </div>
                            <div className="text-center">
                                <span className="text-3xl mb-2 block">&#128231;</span>
                                <h4 className="font-bold text-gray-800">Email Support</h4>
                                <p className="text-gray-600 text-sm mt-1"><strong>support@arkynox.com</strong></p>
                            </div>
                        </div>
                        <div className="border-t border-gray-300 mt-4 pt-4 text-center text-sm text-gray-500">
                            Response within 48 hours &nbsp;|&nbsp; <strong>Governing Law:</strong> India
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
