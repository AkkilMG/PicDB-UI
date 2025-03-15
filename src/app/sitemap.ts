import { MetadataRoute } from "next";

const BASE = "https://avianintek.com";

export default async function SiteMap(): Promise<MetadataRoute.Sitemap> {
    return [
        {
            url: `${BASE}/`,
            lastModified: "2025-03-14",
            changeFrequency: "weekly",
            priority: 1.0
        }, {
            url: `${BASE}/upload`,
            lastModified: "2025-03-14",
            changeFrequency: "weekly",
            priority: 1.0
        }, {
            url: `${BASE}/dashboard`,
            lastModified: "2025-03-14",
            changeFrequency: "weekly",
            priority: 1.0
        }, {
            url: `${BASE}/policy/terms-of-service`,
            lastModified: "2025-03-14",
            changeFrequency: "monthly",
            priority: 0.3
        }, {
            url: `${BASE}/policy/policy`,
            lastModified: "2025-03-14",
            changeFrequency: "monthly",
            priority: 0.3
        }, {
            url: `${BASE}/policy/cookies`,
            lastModified: "2025-03-14",
            changeFrequency: "monthly",
            priority: 0.3
        }
    ]
}

