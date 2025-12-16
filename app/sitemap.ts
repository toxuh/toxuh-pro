import { type MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://toxuh.pro",
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  },
];

export default sitemap;
