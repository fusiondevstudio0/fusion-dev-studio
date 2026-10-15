const ph = (seed) => `https://picsum.photos/seed/${seed}/900/560`;

export const CATEGORIES = [
  {
    id: "websites",
    title: "Custom Websites",
    tagline: "Fast, responsive websites built from scratch.",
    projects: [
      {
        id: "elite",
        title: "Construction Business",
        type: "Custom Website",
        img: "src/assets/project_imgs/construction_img.jpg", 
        link: "https://fusionconstruction.vercel.app/index.html", 
      },
      {
        id: "karachi-barber",
        title: "Furniture Shop",
        type: "E-commerce Website",
        img: "src/assets/project_imgs/custome web 4.png",
        link: "https://fusion-furniture-web-project.vercel.app/",
      },
      {
        id: "novatech",
        title: "Dental Clinic",
        type: "Business Website",
        img: "src/assets/project_imgs/costome web 1.png",
        link: "https://fusiondental-ten.vercel.app/",
      },
      {
        id: "karachi-barber",
        title: "Karachi Barber",
        type: "Business Website",
        img: "src/assets/project_imgs/costome web 2.png",
        link: "https://kabeer1khan.github.io/project-1/",
      },
      {
        id: "karachi-barber",
        title: "Resturent Website",
        type: "Business Website",
        img: "src/assets/project_imgs/costome web 3.png",
        link: "https://fusion-custom-web-project.vercel.app/",
      },
    ],
  },
  {
    id: "wordpress",
    title: "WordPress Development",
    tagline: "Custom themes, plugins and powerful WordPress websites.",
    projects: [
      {
        id: "zaiqa-mahal",
        title: "Cafe",
        type: "Bakery Website",
        img: "src/assets/project_imgs/wordpress2.png",
        link: "https://effervescent-cranachan-43ce32.netlify.app/",
      },
      {
        id: "clinic-care",
        title: "Body Building",
        type: "Healthcare Website",
        img: "src/assets/project_imgs/wordpress1.png",
        link: "https://bright-malasada-8e4ffb.netlify.app/",
      },
      {
        id: "edu-hub",
        title: "Edu Hub",
        type: "Education Website",
        img: ph("fusion-eduhub"),
        link: "https://example.com",
      },
    ],
  },
  {
    id: "3d",
    title: "3D Models",
    tagline: "High-quality 3D models for games, products and branding.",
    projects: [
      {
        id: "cyber-helmet",
        title: "Cyber Helmet",
        type: "3D Model",
        img: ph("fusion-helmet"),
        link: "https://example.com",
      },
      {
        id: "neon-car",
        title: "Neon Car",
        type: "3D Model",
        img: ph("fusion-car"),
        link: "https://example.com",
      },
      {
        id: "robot-pet",
        title: "Robot Pet",
        type: "3D Character",
        img: ph("fusion-robot"),
        link: "https://example.com",
      },
    ],
  },
];

/* Home page ke "Featured Projects" mein kaun se 3 projects dikhen
   (upar wale projects ki id yahan likhein, isi order mein dikhenge) */
export const FEATURED_IDS = ["elite", "zaiqa-mahal", "karachi-barber"];

const ALL = CATEGORIES.flatMap((c) => c.projects);
export const FEATURED = FEATURED_IDS.map((id) => ALL.find((p) => p.id === id)).filter(Boolean);