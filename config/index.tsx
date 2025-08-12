import {
  Icon3dCubeSphere,
  IconBriefcase,
  IconBrush,
  IconBuilding,
  IconCode,
  IconHome,
  IconPalette,
  IconPhoneCall,
  IconPhoto,
  IconTextCaption,
  IconUser,
} from "@tabler/icons-react";

type Project = {
  title: string;
  description: string;
  href: string;
  github?: string;
  image: string;
  tags: string[];
  featured?: boolean;
};

export const NAVIGATION = [
  {
    special: false,
    topbar: false,
    title: "Home",
    href: "/",
    icon: <IconHome className="h-5 w-5" />,
  },
  {
    special: false,
    topbar: true,
    title: "Design",
    href: "/design",
    icon: <IconPalette className="h-5 w-5" />,
    subItems: [
      {
        title: "2D Design",
        href: "/design/design2d",
        icon: <IconBrush className="h-5 w-5" />,
      },
      {
        title: "3D Design",
        href: "/design/design3d",
        icon: <Icon3dCubeSphere className="h-5 w-5" />,
      },
    ],
  },
  {
    special: false,
    topbar: false,
    title: "2D Design",
    href: "/design/design2d",
    icon: <IconBrush className="h-5 w-5" />,
  },
  {
    special: false,
    topbar: false,
    title: "3D Design",
    href: "/design/design3d",
    icon: <Icon3dCubeSphere className="h-5 w-5" />,
  },
  {
    special: false,
    topbar: true,
    title: "Photography",
    href: "/photography",
    icon: <IconPhoto className="h-5 w-5" />,
    subItems: [
      {
        title: "Architecture",
        href: "/photography/architecture",
        icon: <IconBuilding className="h-5 w-5" />,
      },
      {
        title: "Portraits",
        href: "/photography/portraits",
        icon: <IconUser className="h-5 w-5" />,
      },
    ],
  },
  {
    special: false,
    topbar: false,
    title: "Architecture",
    href: "/photography/architecture",
    icon: <IconBuilding className="h-5 w-5" />,
  },
  {
    special: false,
    topbar: false,
    title: "Portraits",
    href: "/photography/portraits",
    icon: <IconUser className="h-5 w-5" />,
  },
  {
    special: false,
    topbar: false,
    title: "About",
    href: "/about",
    icon: <IconUser className="h-5 w-5" />,
  },
  {
    special: true,
    topbar: true,
    title: "Code",
    href: "https://brandnolandev.com",
    icon: <IconCode className="h-5 w-5" />,
  },

  {
    special: true,
    topbar: true,
    title: "Blog",
    href: "https://brandnolandev.com/blog",
    icon: <IconTextCaption className="h-5 w-5" />,
  },
  {
    special: false,
    topbar: true,
    title: "Contacts",
    href: "/contacts",
    icon: <IconPhoneCall className="h-5 w-5" />,
  },
];

// export const PROJECTS: Project[] = [
//   {
//     title: "Resume creator tool with AI",
//     description:
//       "Create your resume in a few minutes. The tool will help you with the content and design.",
//     href: "https://cvzdarma.cz",
//     image: "/projects/cvzdarma-project.webp",
//     tags: [
//       "Next.js 15",
//       "Tailwind CSS",
//       "Prisma",
//       "OpenAI",
//       "Server actions",
//       "shadcn/ui",
//       "nodemailer",
//       "Clerk",
//     ],
//     featured: true,
//   },
//   {
//     title: "Place of amazing portfolios",
//     description:
//       "Are you looking for inspiration for your portfolio? You're in the right place! Here you will find a collection of amazing portfolios by amazing people.",
//     href: "https://list.swajp.me",
//     github: "https://github.com/swajp/list-swajp.me",
//     image: "/projects/list-project.webp",
//     tags: [
//       "Next.js 14",
//       "Tailwind CSS",
//       "Convex",
//       "shadcn/ui",
//       "nodemailer",
//       "Clerk",
//     ],
//     featured: true,
//   },
//   {
//     title: "devkoutek.cz",
//     description:
//       "A discord place for czech developers. To show their projects and help each other.",
//     href: "https://devkoutek.cz",
//     github: "https://github.com/swajp/devkoutek.cz",
//     image: "/projects/devkoutek-project.webp",
//     tags: ["NextJS", "Tailwind CSS"],
//   },
//   {
//     title: "casecobra",
//     description:
//       "E-commerce website for a company selling cases for mobile phones.",
//     href: "https://shop-casecobra.vercel.app",
//     github: "https://github.com/swajp/casecobra",
//     image: "/projects/casecobra-project.webp",
//     tags: ["Next.js", "React", "Tailwind CSS", "Stripe", "Prisma"],
//   },
//   {
//     title: "DRIE",
//     description: "Full-stack developer, designer, and creator.",
//     href: "https://drie.cz",
//     image: "/projects/drie-project.webp",
//     tags: ["Next.js", "React", "Tailwind CSS", "Framer motion"],
//   },
//   {
//     title: "yogaboskovice",
//     description: "Website for yoga studio in Boskovice.",
//     href: "https://yogaboskovice.cz",
//     image: "/projects/yogaboskovice-project.webp",
//     tags: ["Wordpress", "Elementor"],
//   },
//   {
//     title: "mujqrkod.cz",
//     description: "QR code generator without registration. Fast and simple.",
//     href: "https://mujqrkod.vercel.app",
//     github: "https://github.com/swajp/mujqrkod",
//     image: "/projects/mujqrkod-project.webp",
//     tags: ["Next.js", "Tailwind CSS", "shadcn/ui"],
//   },
//   {
//     title: "uzx-elektro",
//     description: "A website for an company using Loxone technology",
//     href: "https://uzx-elektro.cz",
//     image: "/projects/uzxelektro-project.webp",
//     tags: ["Next.js", "Tailwind CSS"],
//   },
//   {
//     title: "uzx-security",
//     description: "A website for a security company.",
//     href: "https://uzx-security.cz",
//     image: "/projects/uzxsecurity-project.webp",
//     tags: ["Next.js", "Tailwind CSS"],
//   },
//   {
//     title: "Shortner Tool",
//     description: "Fast and simple URL shortner tool.",
//     href: "https://short.drie.cz",
//     image: "/projects/short-project.webp",
//     tags: ["Next.js", "Tailwind CSS", "MongoDB"],
//   },
//   {
//     title: "my-story",
//     description: "Share your stories with the world.",
//     href: "https://story-sharing-app-nu.vercel.app/",
//     github: "https://github.com/swajp/my-story",
//     image: "/projects/mystory-project.webp",
//     tags: ["Next.js", "Tailwind CSS", "Framer motion", "Convex"],
//   },
//   {
//     title: "LoRa",
//     description: "LoRa network offered in Boskovice.",
//     href: "https://lora.drie.cz",
//     image: "/projects/lora-project.webp",
//     tags: ["Next.js", "Tailwind CSS", "Framer motion"],
//   },
//   {
//     title: "betterUML",
//     description: "Create effectively and easy class diagrams.",
//     href: "https://better-uml.vercel.app",
//     image: "/projects/betteruml-project.webp",
//     tags: ["Next.js", "Tailwind CSS", "Framer motion"],
//   },
// ];
export const PROJECTS: Project[] = [
  {
    title: "Bank Global",
    description:
      "Bank Global was a project I worked on when experimenting with HTML, CSS, and JavaScript as a showcase of using these tools. It demonstrates skills in layout control flow, a deeper understanding of CSS and JavaScript classes, optimizing work with multiple pages, and creating an organized folder and file structure. This project provides a great introduction to creating layouts and understanding basic programming flow.",
    href: "/projects/posts/bank-global",
    image: "/projects/new/ProjectsPreviews/bank-global/Frame-2.webp",
    tags: [
      "JavaScript",
      "CSS",
      "HTML",
      "AOS",
      "Bootstrap",
      "UI Kit",
      "Animista",
    ],
    featured: false,
  },
  {
    title: "Atlas",
    description:
      "The Atlas app connects to the REST Countries and Google Maps APIs, providing users with detailed information about any country, including its flag, population, region, languages, currencies, capital, and border states, searchable by country name.",
    href: "/projects/posts/atlas",
    image: "/projects/new/ProjectsPreviews/atlas/Frame-1.webp",

    tags: [
      "JavaScript",
      "CSS",
      "HTML",
      "AOS",
      "Bootstrap",
      "Animista",
      "Lodash",
      "Axios",
    ],
    featured: false,
  },
  {
    title: "Toys Rest API",
    description:
      "The Toys REST API and Frontend is a full-stack web project for managing toys and user data. The backend, built with Node.js, Express, bcrypt, JWT, and MongoDB, handles database operations and user/toy routes. The React frontend provides a user-friendly interface for authentication, CRUD operations, and profile management.",
    href: "/projects/posts/toys-rest-api",
    image: "/projects/new/ProjectsPreviews/toys-rest-api/Frame-14.webp",
    tags: [
      "Node.js",
      "Express",
      "React",
      "JavaScript",
      "MongoDB",
      "Swagger",
      "JSONWebToken",
      "CORS",
      "Bcrypt",
      "Mongoose",
      "Dotenv",
    ],
    featured: false,
  },
  {
    title: "Ehya",
    description:
      "Ehya is a responsive layout project showcasing HTML, CSS, and JavaScript with a dynamic navbar, utilizing the BEM methodology for correct layout and block structuring.",
    href: "/projects/posts/ehya",
    image: "/projects/new/ProjectsPreviews/ehya/Frame-13.webp",
    tags: ["HTML", "CSS", "JavaScript", "BEM"],
    featured: false,
  },
  // {
  //   title: "Brio",
  //   description:
  //     "Brio - Bringing Food Really On Time is a food delivery platform focused on user-centric design and innovative architecture. Accessible at http://thebrioshop.com, it offers a modern solution for customers and restaurant partners with seamless food ordering and delivery.",
  //   href: "648207b8c3da1d9a1258ce17",
  //   image: "https://i.postimg.cc/1zG5VKYg/1-1-home-3.jpg",
  //   tags: [
  //     "React",
  //     "Node.js",
  //     "Express",
  //     "Chakra UI",
  //     "Swagger",
  //     "Axios",
  //     "RefreshToken",
  //     "Docker",
  //     "ESLint",
  //     "Prettier",
  //     "Vite",
  //     "AOS",
  //     "JavaScript",
  //     "TypeScript",
  //     "Docker-Compose",
  //     "Bcrypt",
  //     "Dotenv",
  //     "Joi",
  //     "JWT",
  //     "SendGrid",
  //     "Framer-Motion",
  //     "Leaflet",
  //     "Mapbox",
  //     "Quill",
  //     "MongoDB",
  //     "Mongoose",
  //     "UUID",
  //     "HTML",
  //     "CSS",
  //   ],
  //   featured: false,
  // },
  {
    title: "Portfolio",
    description:
      "The Portfolio project is a collection of my experience as a Full Stack developer, showcasing my professional journey, projects, expertise, and advanced features to enhance user experience.",
    href: "/projects/posts/portfolio",
    image: "/projects/new/ProjectsPreviews/portfolio/Frame-12.webp",
    tags: ["React", "Tailwind"],
    featured: false,
  },
  {
    title: "EFS Messenger",
    description:
      "EFS Messenger is a secure chat platform with end-to-end encryption and no database storage, ensuring data is only accessible while users are active. The project is currently in development.",
    href: "/projects/posts/efs-messenger",
    image: "/projects/new/ProjectsPreviews/efs-messenger/Frame-5.webp",
    tags: ["React", "Node.js", "Socket.IO", "TypeScript"],
    featured: false,
  },
  {
    title: "Uber Taxi",
    description:
      "Uber Taxi is a React Native app for iOS and Android, allowing users to order taxis by selecting origin and destination points, saving them to the Redux store, and displaying them on a map with travel time, distance, and fare calculations.",
    href: "/projects/posts/uber-taxi",
    image: "/projects/new/ProjectsPreviews/uber-taxi/Frame-16.webp",
    tags: [
      "React Native",
      "Redux",
      "Redux Toolkit",
      "Google Cloud APIs",
      "TailwindCSS for React Native",
      "Expo",
      "JavaScript",
    ],
    featured: true,
  },
  {
    title: "NexusTalk",
    description:
      "NexusTalk is a full-stack application designed to offer a seamless, dynamic, and secure user experience for real-time communication.",
    href: "/projects/posts/nexustalk",
    image: "/projects/new/ProjectsPreviews/nexustalk/Frame-9.webp",
    tags: [
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Socket.io",
      "React",
      "Redux",
      "SSR",
      "Shadcn UI",
      "Prisma",
      "PostgreSQL",
      "Clerk Auth",
      "Tailwind",
      "Supabase",
      "Zod",
      "Zustand",
      "Uploadthing",
    ],
    featured: false,
  },
  {
    title: "FlowWarp",
    description:
      "FlowWarp is a music platform combining cutting-edge technology and user-centric design, offering an unparalleled musical experience through aesthetics and functionality.",
    href: "/projects/posts/flowwarp",
    image: "/projects/new/ProjectsPreviews/flowwarp/hero.webp",
    tags: [
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Stripe",
      "React",
      "Radix",
      "SSR",
      "Supabase",
      "PostgreSQL",
      "Supabase Auth",
      "Tailwind",
      "Zod",
      "Zustand",
    ],
    featured: false,
  },
  {
    title: "Bookmarks API",
    description:
      "The Bookmarks API is a NestJS REST API project demonstrating robust backend capabilities with Prisma, Docker, and modern tools for user authentication and bookmark management.",
    href: "/projects/posts/bookmarks-api",
    image: "/projects/new/ProjectsPreviews/bookmarks-api/Frame-3.webp",
    tags: ["NestJS", "TypeScript", "Jest", "Prisma", "Passport"],
    featured: false,
  },
  {
    title: "Flask Notes",
    description:
      "Flask Notes is a Flask-based application for authenticated users to create, view, edit, and delete notes, showcasing Flask, SQLAlchemy for database operations, and Jinja for templating.",
    href: "/projects/posts/flask-notes",
    image: "/projects/new/ProjectsPreviews/flask-notes/Frame-7.webp",
    tags: [
      "Flask",
      "Python",
      "Jinja",
      "Bootstrap",
      "SQLAlchemy",
      "Flask-Login",
    ],
    featured: false,
  },
  {
    title: "Buzzer",
    description:
      "Buzzer is a sophisticated React Native and Expo chat application using Firestore and Firebase for real-time database and authentication, providing an interactive chat experience.",
    href: "/projects/posts/buzzer",
    image: "/projects/new/ProjectsPreviews/buzzer/Frame-4.webp",
    tags: ["React Native", "JavaScript", "Expo", "Firestore", "Firebase"],
    featured: false,
  },
  {
    title: "Frameio",
    description:
      "Frameio is a vibrant social network platform for dynamic posting of images, posts, and community interaction with likes, saves, and content search capabilities.",
    href: "/projects/posts/frameio",
    image: "/projects/new/ProjectsPreviews/frameio/Frame-10.webp",
    tags: [
      "React",
      "TypeScript",
      "Appwrite",
      "Zod",
      "Radix UI",
      "Shadcn UI",
      "Tanstack (React Query)",
      "React Hook Form",
      "TailwindCSS",
      "ESLint",
    ],
    featured: false,
  },
  {
    title: "WillDay",
    description:
      "WillDay is a sophisticated full-stack web application for task management in organizational settings, leveraging Next.js 14, React, Clerk Auth, Prisma, SQL, and more, deployed on Vercel as an SSR app.",
    href: "/projects/posts/willday",
    image: "/projects/new/ProjectsPreviews/willday/Frame-17.webp",
    tags: [
      "Next.js 14",
      "React",
      "TypeScript",
      "Clerk Auth",
      "Stripe",
      "Shadcn UI",
      "Tailwind CSS",
      "Prisma",
      "SQL",
      "Zod",
      "Zustand",
      "React Query",
      "Sonner",
      "UseHooks",
      "PostCSS",
      "ESLint",
    ],
    featured: true,
  },
  {
    title: "PhiShop",
    description:
      "PhiShop is an innovative online platform for buying and selling digital assets like icons and UI kits, leveraging modern web technologies for a seamless marketplace experience.",
    href: "/projects/posts/phishop",
    image: "/projects/new/ProjectsPreviews/phishop/Frame-11.webp",
    tags: [
      "Next.js 14",
      "Express",
      "PayloadCMS",
      "Shadcn UI",
      "Tailwind CSS",
      "tRPC",
      "TypeScript",
      "Resend",
      "Stripe",
      "React Hook Form",
      "Nodemailer",
      "MongoDB",
      "Zod",
      "Zustand",
      "React",
      "React-DOM",
      "React Query",
      "Lucide React",
      "Radix UI",
      "Swiper",
      "Date-fns",
      "Dotenv",
      "ESLint",
      "PostCSS",
      "Nodemon",
    ],
    featured: false,
  },
  {
    title: "YouTube Preview Gif Generator",
    description:
      "This project allows users to create GIFs from YouTube videos, offering a user-friendly interface and efficient backend architecture for capturing and sharing specific video moments.",
    href: "/projects/posts/youtube-preview-gif-generator",
    image:
      "/projects/new/ProjectsPreviews/youtube-preview-gif-generator/Frame-15.webp",
    tags: [
      "React",
      "Node.js",
      "MongoDB",
      "RabbitMQ",
      "Google Cloud Storage",
      "ffmpeg.wasm",
      "Docker",
      "Jest",
      "TypeScript",
      "Nodemon",
      "Husky",
      "Prettier",
      "ESLint",
      "AMQPLib",
      "YTDL",
      "TypeDI",
      "TypeORM",
      "Lodash",
      "CLI-Progress",
      "SWR",
      "React-YouTube",
      "Compression",
      "Cookie-Parser",
      "CORS",
      "Env",
      "Express",
      "HPP",
      "Passport",
      "Swagger",
      "Winston",
    ],
    featured: false,
  },
];
export const FOOTER_PAGES = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "About",
    href: "/about",
  },
];

export const SOCIALS = [
  {
    title: "Github",
    href: "https://github.com/brandalx",
  },
  {
    title: "Linkedin",
    href: "https://www.linkedin.com/in/brandonolan/",
  },
];

export const OTHERS = [
  {
    title: "Buy me a coffee",
    href: "https://buymeacoffee.com",
  },
];

//

export const TECH_STACK = [
  {
    title: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    title: "Java",
    href: "https://www.java.com",
  },
  {
    title: "Python",
    href: "https://www.python.org",
  },
  {
    title: "SQL",
    href: "https://www.w3schools.com/sql",
  },
  {
    title: "HTML5",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    title: "CSS3",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    title: "SASS/SCSS",
    href: "https://sass-lang.com",
  },
  {
    title: "React",
    href: "https://react.dev",
  },
  {
    title: "React Native",
    href: "https://reactnative.dev",
  },
  {
    title: "Redux",
    href: "https://redux.js.org",
  },
  {
    title: "Next.js",
    href: "https://nextjs.org",
  },

  {
    title: "Shadcn UI",
    href: "https://ui.shadcn.com",
  },

  {
    title: "Node.js",
    href: "https://nodejs.org",
  },
  {
    title: "Express",
    href: "https://expressjs.com",
  },
  {
    title: "NestJS",
    href: "https://nestjs.com",
  },
  {
    title: "Meteor",
    href: "https://www.meteor.com",
  },
  {
    title: "Flask",
    href: "https://flask.palletsprojects.com",
  },
  {
    title: "Jinja",
    href: "https://jinja.palletsprojects.com",
  },
  {
    title: "Django",
    href: "https://www.djangoproject.com",
  },
  {
    title: "Zod",
    href: "https://zod.dev",
  },
  {
    title: "Bootstrap",
    href: "https://getbootstrap.com",
  },

  {
    title: "Chakra UI",
    href: "  https://aws.amazon.com",
  },

  {
    title: "Tailwind",
    href: "https://tailwindcss.com",
  },
  {
    title: "Strapi",
    href: "https://strapi.io",
  },
  {
    title: "Material UI",
    href: "https://mui.com",
  },
  {
    title: "Zustand",
    href: "https://zustand-demo.pmnd.rs",
  },
  {
    title: "Tanstack",
    href: "https://tanstack.com",
  },
  {
    title: "LiveKit",
    href: "https://livekit.io",
  },
  {
    title: "Chart.js",
    href: "https://www.chartjs.org",
  },
  {
    title: "Apollo",
    href: "https://www.apollographql.com",
  },
  {
    title: "Three.js",
    href: "https://threejs.org",
  },
  {
    title: "MongoDB",
    href: "https://www.mongodb.com",
  },
  {
    title: "Redis",
    href: "https://redis.io",
  },
  {
    title: "PostgreSQL",
    href: "https://www.postgresql.org",
  },
  {
    title: "MySQL",
    href: "https://www.mysql.com",
  },
  {
    title: "Supabase",
    href: "https://supabase.com",
  },
  {
    title: "Firebase",
    href: "https://firebase.google.com",
  },
  {
    title: "Firestore",
    href: "https://firebase.google.com/docs/firestore",
  },
  {
    title: "Docker",
    href: "https://www.docker.com",
  },
  {
    title: "NGINX",
    href: "https://www.nginx.com",
  },
  {
    title: "Linux",
    href: "https://www.linux.org",
  },
  {
    title: "Kubernetes",
    href: "https://kubernetes.io",
  },
  {
    title: "RabbitMQ",
    href: "https://www.rabbitmq.com",
  },
  {
    title: "Git",
    href: "https://git-scm.com",
  },
  {
    title: "GitHub",
    href: "https://github.com",
  },
  {
    title: "GitLab",
    href: "https://gitlab.com",
  },
  {
    title: "Swagger",
    href: "https://swagger.io",
  },
  {
    title: "Google Cloud",
    href: "https://cloud.google.com",
  },
  {
    title: "Clerk Auth",
    href: "https://clerk.com",
  },
  {
    title: "Vite",
    href: "https://vitejs.dev",
  },
  {
    title: "Webpack",
    href: "https://webpack.js.org",
  },
  {
    title: "Prisma",
    href: "https://www.prisma.io",
  },
  {
    title: "Postman",
    href: "https://www.postman.com",
  },
  {
    title: "Mockoon",
    href: "https://mockoon.com",
  },
  {
    title: "Jest",
    href: "https://jestjs.io",
  },
  {
    title: "Cypress",
    href: "https://www.cypress.io",
  },
  {
    title: "Fastify",
    href: "https://fastify.dev",
  },
  {
    title: "GraphQL",
    href: "https://graphql.org",
  },
  {
    title: "PactumJS",
    href: "https://pactumjs.github.io",
  },
  {
    title: "Resend",
    href: "https://resend.com",
  },
  {
    title: "Stripe",
    href: "https://stripe.com",
  },
  {
    title: "WIX",
    href: "https://www.wix.com",
  },
  {
    title: "Webflow",
    href: "https://webflow.com",
  },
  {
    title: "Elementor",
    href: "https://elementor.com",
  },
  {
    title: "WordPress",
    href: "https://wordpress.org",
  },
  {
    title: "Shopify",
    href: "https://www.shopify.com",
  },
  {
    title: "Digital Ocean",
    href: "https://www.digitalocean.com",
  },
  {
    title: "Figma",
    href: "https://www.figma.com",
  },
  {
    title: "Adobe Suite",
    href: "https://www.adobe.com/creativecloud.html",
  },
  {
    title: "Illustrator",
    href: "https://www.adobe.com/products/illustrator.html",
  },
  {
    title: "Photoshop",
    href: "https://www.adobe.com/products/photoshop.html",
  },
  {
    title: "Adobe XD",
    href: "https://www.adobe.com/products/xd.html",
  },
  {
    title: "Sketch",
    href: "https://www.sketch.com",
  },
  {
    title: "Blender",
    href: "https://www.blender.org",
  },
  {
    title: "Spline",
    href: "https://spline.design",
  },
];

export const PROJECT_STUDY = {
  title: "NexusTalk",
  description:
    "NexusTalk represents the embodiment of state-of-the-art web application engineering, infused with my zeal and commitment. Developed over countless hours of focused dedication, this platform has been crafted to provide an unrivaled interactive experience for users, emphasizing both functionality and security.",
  href: "/projects/posts/nexustalk",
  image: "/projects/new/ProjectsPreviews/nexustalk/Frame-9.webp",
  tags: [
    "NextJS",
    "TypeScript",
    "JavaScript",
    "Socket.io",
    "React",
    "Redux",
    "SSR",
    " Shadcn UI",
    "Prisma",
    "PostgreSQL",
    "Clerk Auth",
    "Tailwind",
    "Supabase",
    "Zod & Zustand",
    "Uploadthing",
  ],
};

export const TV_MOMENT = {
  title: "Brio",
  description:
    "Brio - Bringing Food Really On Time is a modern food delivery platform focused on speed, convenience, and user-friendly design. Built for global deployment, it streamlines the food ordering experience for both customers and restaurants.",
  href: "/projects/posts/brio",
  image: "/projects/new/ProjectsPreviews/brio/frame-6.webp",
  tags: [
    "React",
    "NodeJS",
    "Express",
    "Chakra UI",
    "Swagger",
    "Axios",
    "RefreshToken",
    "Docker",
    "ESLint",
    "Prettier",
    "Vite",
    "AOS",
    "JavaScript",
    "TypeScript",
    "Docker-Compose",
    "Bcrypt",
    "Dotenv",
    "Joi",
    "JWT",
    "SendGrid",
    "Framer Motion",
    "Leaflet",
    "Mapbox",
    "Quill",
    "MongoDB",
    "Mongoose",
    "UUID",
    "HTML",
    "CSS",
  ],
};
