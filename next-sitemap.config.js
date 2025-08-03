/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://design.brandnolandev.com",
  generateRobotsTxt: true,
  exclude: ["/*.php"], // Exclude any .php URLs from the sitemap
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: ["/*.php$"], // Prevent crawlers from accessing .php URLs
      },
      {
        userAgent: "*",
        allow: "/", // Allow crawling of all other URLs
      },
    ],
  },
  // Customize priorities for specific pages
  transform: async (config, path) => {
    // Define custom priorities for main pages
    const priorityMap = {
      "/": 1.0,
      "/design": 0.9,
      "/photography": 0.9,
      "/design/design2d": 0.8,
      "/design/design3d": 0.8,
      "/photography": 0.8,
      "/photography/architecture": 0.8,
      "/photography/protraits": 0.8,
      "/about": 0.7,
      "/contacts": 0.7,
    };

    // Set default priority for other pages
    const defaultPriority = 0.5;

    return {
      loc: path,
      changefreq: "daily", // Adjust as needed
      priority: priorityMap[path] || defaultPriority, // Use custom priority or fallback
      lastmod: new Date().toISOString(),
    };
  },
};
//   additionalPaths: async (config) => {
//     // Dynamically import CatalogData
//     const { CatalogData } = require("./app/data/catalogDataForSiteMap.js");

//     // Map over CatalogData to create sitemap entries for PDFs
//     const pdfPaths = CatalogData.map((item) => ({
//       loc: `${config.siteUrl}${item.downloadLink}`,
//       changefreq: "monthly",
//       priority: 0.4, // Lower priority than regular pages
//       lastmod: new Date().toISOString(),
//     }));

//     return pdfPaths;
//   },
// };
