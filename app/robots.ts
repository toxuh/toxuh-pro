import { type MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: "*",
      allow: "/",
    },
  ],
  sitemap: "https://toxuh.pro/sitemap.xml",
});

export default robots;
