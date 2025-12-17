import { MetadataRoute } from "next";

const BASE_URL = "https://picdb.arkynox.com";

export default async function SiteMap(): Promise<MetadataRoute.Sitemap> {
    return [
        {
            url: `${BASE_URL}/`,
            lastModified: new Date("2025-12-17"),
            changeFrequency: "weekly",
            priority: 1.0
        }, {
            url: `${BASE_URL}/docs`,
            lastModified: new Date("2025-11-22"),
            changeFrequency: "monthly" as const,
            priority: 0.9
        }, {
            url: `${BASE_URL}/upload`,
            lastModified: new Date("2025-12-17"),
            changeFrequency: "weekly" as const,
            priority: 0.9
        }, {
            url: `${BASE_URL}/dashboard`,
            lastModified: new Date("2025-12-17"),
            changeFrequency: "weekly" as const,
            priority: 0.8
        }, {
            url: `${BASE_URL}/dashboard/notification`,
            lastModified: new Date("2025-12-17"),
            changeFrequency: "weekly" as const,
            priority: 0.7
        }, {
            url: `${BASE_URL}/dashboard/favorite`,
            lastModified: new Date("2025-12-17"),
            changeFrequency: "weekly" as const,
            priority: 0.7
        }, {
            url: `${BASE_URL}/dashboard/report`,
            lastModified: new Date("2025-12-17"),
            changeFrequency: "weekly" as const,
            priority: 0.7
        }, {
            url: `${BASE_URL}/policy/terms-of-service`,
            lastModified: new Date("2025-12-17"),
            changeFrequency: "yearly" as const,
            priority: 0.5
        }, {
            url: `${BASE_URL}/policy/privacy`,
            lastModified: new Date("2025-12-17"),
            changeFrequency: "yearly" as const,
            priority: 0.5
        }, {
            url: `${BASE_URL}/policy/cookies`,
            lastModified: new Date("2025-12-17"),
            changeFrequency: "yearly" as const,
            priority: 0.5
        }
    ]
}

