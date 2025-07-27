const axios = require("axios");
const { put } = require("@vercel/blob");

async function generateCache() {
  try {
    const folderPaths = [
      "photography/portraits",
      "photography/architecture",
      "design/design2d",
      "design/design3d",
    ];

    const allProjects = [];
    let totalApiCalls = 0;

    for (const folderPath of folderPaths) {
      const [category, subcategory] = folderPath.split("/");
      const projectsMap = {};
      let nextCursor = null;

      do {
        const result = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/search`,
          {
            expression: `folder:${folderPath}/*`,
            sort_by: [{ created_at: "asc" }],
            max_results: 500,
            with_field: ["context"],
            next_cursor: nextCursor,
          },
          {
            auth: {
              username: process.env.CLOUDINARY_API_KEY,
              password: process.env.CLOUDINARY_API_SECRET,
            },
          }
        );

        totalApiCalls++;
        const resources = result.data.resources;
        nextCursor = result.data.next_cursor;

        for (const img of resources) {
          const parts = img.asset_folder?.split("/") || [];
          if (parts.length === 3) {
            const projectName = parts[2];
            if (!projectsMap[projectName]) {
              const context = img.context?.custom || img.context || {};
              projectsMap[projectName] = {
                name: projectName,
                cover: img.secure_url,
                category,
                subcategory,
                title: context.title,
                description: context.description,
                link: context.link,
                description2: context.description2,
                description3: context.description3,
                description4: context.description4,
                client: context.client,
                date: context.date,
                software: context.software,
                type: context.type,
                images: [],
              };
            }
            projectsMap[projectName].images.push({
              secure_url: img.secure_url,
              public_id: img.public_id,
              asset_id: img.asset_id,
            });
          }
        }

        if (nextCursor) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      } while (nextCursor);

      allProjects.push(...Object.values(projectsMap));
    }

    const blob = await put(
      "cache/projects.json",
      JSON.stringify(allProjects, null, 2),
      {
        access: "public",
        allowOverwrite: true,
      }
    );

    console.log(
      "Cache generated successfully at",
      blob.url,
      "with",
      totalApiCalls,
      "API calls"
    );
  } catch (error) {
    console.error(
      "Error generating cache:",
      error.response?.data || error.message
    );
    process.exit(1);
  }
}

generateCache();
