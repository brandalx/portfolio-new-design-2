/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://design.brandnolandev.com",
  generateRobotsTxt: true,
  exclude: ["/*.php"], // Exclude any .php URLs from the sitemap

  // Add additional paths for dynamic routes
  additionalPaths: async (config) => {
    const paths = [];

    try {
      // Read projects from cache file (same as your Portfolio component)
      const fs = require("fs");
      const path = require("path");
      const projectsCachePath = path.join(
        process.cwd(),
        "public/cache/projects.json"
      );

      let allProjects = [];

      if (fs.existsSync(projectsCachePath)) {
        console.log("Reading projects from cache file...");
        allProjects = JSON.parse(fs.readFileSync(projectsCachePath, "utf8"));
        console.log(`Found ${allProjects.length} total projects in cache`);
      } else {
        console.warn("Projects cache file not found at:", projectsCachePath);
        return paths; // Return empty array if no cache file
      }

      // Generate paths for all projects
      allProjects.forEach((project) => {
        if (project.name && project.category && project.subcategory) {
          // Create slug from project name (same logic as your ImageCard routing)
          const slug = project.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

          // Build the path: /category/subcategory/project-slug
          const projectPath = `/${project.category}/${project.subcategory}/${slug}`;

          paths.push({
            loc: projectPath,
            changefreq: "weekly",
            priority: 0.6,
            lastmod: project.date || new Date().toISOString(),
          });
        }
      });

      console.log(
        `Generated ${paths.length} dynamic project routes for sitemap`
      );
    } catch (error) {
      console.error("Error generating additional paths:", error);
    }

    return paths;
  },

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
      "/photography/architecture": 0.8,
      "/photography/portraits": 0.8, // Fixed typo: was "protraits"
      "/about": 0.7,
      "/contacts": 0.7,
    };

    // Set higher priority for project pages
    const isProjectPage = path.match(/\/(design|photography)\/[^\/]+\/[^\/]+$/);
    let priority = priorityMap[path] || 0.5;

    if (isProjectPage) {
      priority = 0.6; // Project pages get medium priority
    }

    // Set change frequency based on page type
    let changefreq = "monthly";
    if (path === "/") {
      changefreq = "daily";
    } else if (path.includes("/design") || path.includes("/photography")) {
      changefreq = "weekly";
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
