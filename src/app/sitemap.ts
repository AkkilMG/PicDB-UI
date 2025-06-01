import { MetadataRoute } from "next";

const BASE_URL = "https://picdb.avianintek.com";

export default async function SiteMap(): Promise<MetadataRoute.Sitemap> {
    return [
        {
            url: `${BASE_URL}/`,
            lastModified: "2025-06-01",
            changeFrequency: "weekly",
            priority: 1.0
        }, {
            url: `${BASE_URL}/upload`,
            lastModified: "2025-06-01",
            changeFrequency: "weekly" as const,
            priority: 0.9
        }, {
            url: `${BASE_URL}/dashboard`,
            lastModified: "2025-06-01",
            changeFrequency: "weekly" as const,
            priority: 0.9
        }, {
            url: `${BASE_URL}/dashboard/favorite`,
            lastModified: "2025-06-01",
            changeFrequency: "weekly" as const,
            priority: 0.7
        }, {
            url: `${BASE_URL}/dashboard/report`,
            lastModified: "2025-06-01",
            changeFrequency: "weekly" as const,
            priority: 0.7
        }, {
            url: `${BASE_URL}/policy/terms-of-service`,
            lastModified: "2025-03-14",
            changeFrequency: "yearly" as const,
            priority: 0.5
        }, {
            url: `${BASE_URL}/policy/policy`,
            lastModified: "2025-03-14",
            changeFrequency: "yearly" as const,
            priority: 0.3
        }, {
            url: `${BASE_URL}/policy/cookies`,
            lastModified: "2025-03-14",
            changeFrequency: "yearly" as const,
            priority: 0.3
        }
    ]
}

