import { MetadataRoute } from "next";

const BASE_URL = "https://www.pikdb.com";

export default async function SiteMap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();
    return [
        {
            url: `${BASE_URL}/`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 1.0
        }, {
            url: `${BASE_URL}/docs`,
            lastModified: now,
            changeFrequency: "monthly" as const,
            priority: 0.9
        }, {
            url: `${BASE_URL}/upload`,
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: 0.9
        }, {
            url: `${BASE_URL}/dashboard`,
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: 0.8
        }, {
            url: `${BASE_URL}/dashboard/notification`,
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: 0.7
        }, {
            url: `${BASE_URL}/dashboard/favorite`,
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: 0.7
        }, {
            url: `${BASE_URL}/dashboard/report`,
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: 0.7
        }, {
            url: `${BASE_URL}/testimonials`,
            lastModified: now,
            changeFrequency: "monthly" as const,
            priority: 0.6
        }, {
            url: `${BASE_URL}/policy/terms-of-service`,
            lastModified: now,
            changeFrequency: "yearly" as const,
            priority: 0.5
        }, {
            url: `${BASE_URL}/policy/privacy`,
            lastModified: now,
            changeFrequency: "yearly" as const,
            priority: 0.5
        }, {
            url: `${BASE_URL}/policy/cookies`,
            lastModified: now,
            changeFrequency: "yearly" as const,
            priority: 0.5
        }
    ]
}
