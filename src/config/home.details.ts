export const storageProviders = [
  {
    name: "AWS S3",
    costPerGB: 0.0265, // $0.0265 per GB per month (S3 Standard first 50 TB)
    color: "#FF9900",
  },
  {
    name: "Google Cloud",
    costPerGB: 0.022, // ~$0.022 per GB per month for multi-region Standard
    color: "#4285F4",
  },
  {
    name: "Azure Blob",
    costPerGB: 0.018, // $0.018 per GB per month for Hot tier
    color: "#0078D4",
  },
  {
    name: "Dropbox",
    costPerGB: 0.083, // ~$10/month for 120GB = $0.083 per GB
    color: "#0061FF",
  },
];
