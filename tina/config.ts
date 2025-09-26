import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "template/assets/images",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            required: false,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "featuredImage",
            label: "Featured Image",
            required: true,
          },
          {
            type: "datetime",
            name: "publishDate",
            label: "Publish Date",
            required: true,
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            required: true,
            options: [
              "Design",
              "Development", 
              "Business",
              "Technology",
              "Marketing",
              "Tutorial"
            ],
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            required: false,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "project",
        label: "Projects",
        path: "content/projects",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Project Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Short Description",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "featuredImage",
            label: "Featured Image",
            required: true,
          },
          {
            type: "object",
            name: "gallery",
            label: "Image Gallery",
            list: true,
            fields: [
              {
                type: "image",
                name: "image",
                label: "Gallery Image",
                required: true,
              },
              {
                type: "string",
                name: "alt",
                label: "Alt Text",
                required: false,
              },
            ],
          },
          {
            type: "string",
            name: "videoUrl",
            label: "YouTube Video URL",
            required: false,
            description: "Leave empty to use default video",
          },
          {
            type: "string",
            name: "projectLink",
            label: "Project Link",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            required: true,
            options: [
              "AI Automation",
              "CRM Setup", 
              "Email Marketing",
              "Data Migration",
              "System Integration",
              "Web Development",
              "Consulting"
            ],
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "description",
            label: "Full Description",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "datetime",
            name: "projectDate",
            label: "Project Completion Date",
            required: true,
          },
          {
            type: "string",
            name: "clientName",
            label: "Client Name",
            required: true,
          },
          {
            type: "string",
            name: "clientCompany",
            label: "Client Company",
            required: false,
          },
          {
            type: "string",
            name: "technologies",
            label: "Technologies Used",
            list: true,
            required: false,
          },
          {
            type: "string",
            name: "duration",
            label: "Project Duration",
            required: false,
            description: "e.g., 2 weeks, 1 month",
          },
          {
            type: "string",
            name: "status",
            label: "Project Status",
            required: true,
            options: [
              "Completed",
              "In Progress",
              "On Hold",
              "Cancelled"
            ],
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured Project",
            required: false,
          },
        ],
      },
      {
        name: "testimonial",
        label: "Testimonials",
        path: "content/testimonials",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Client Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "company",
            label: "Company",
            required: true,
          },
          {
            type: "string",
            name: "quote",
            label: "Testimonial Quote",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "avatar",
            label: "Client Avatar",
            required: true,
          },
          {
            type: "number",
            name: "rating",
            label: "Rating (1-5)",
            required: true,
            min: 1,
            max: 5,
          },
          {
            type: "string",
            name: "type",
            label: "Card Type",
            required: true,
            options: ["primary", "dark", "light"],
          },
        ],
      },
      {
        name: "team",
        label: "Team Members",
        path: "content/team",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "position",
            label: "Position",
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "Profile Image",
            required: true,
          },
          {
            type: "string",
            name: "twitter",
            label: "Twitter URL",
            required: false,
          },
          {
            type: "string",
            name: "behance",
            label: "Behance URL",
            required: false,
          },
          {
            type: "string",
            name: "linkedin",
            label: "LinkedIn URL",
            required: false,
          },
        ],
      },
      {
        name: "pricing",
        label: "Pricing Plans",
        path: "content/pricing",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Plan Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "number",
            name: "price",
            label: "Price",
            required: true,
          },
          {
            type: "string",
            name: "currency",
            label: "Currency",
            required: true,
            options: ["$", "€", "£", "¥"],
          },
          {
            type: "string",
            name: "period",
            label: "Period",
            required: true,
            options: ["/month", "/year", "one-time"],
          },
          {
            type: "boolean",
            name: "popular",
            label: "Most Popular",
            required: false,
          },
          {
            type: "number",
            name: "originalPrice",
            label: "Original Price (for discount)",
            required: false,
          },
          {
            type: "string",
            name: "features",
            label: "Features",
            list: true,
            required: true,
          },
          {
            type: "string",
            name: "buttonText",
            label: "Button Text",
            required: true,
          },
          {
            type: "string",
            name: "buttonLink",
            label: "Button Link",
            required: true,
          },
        ],
      },
    ],
  },
});
