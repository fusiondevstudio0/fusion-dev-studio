import construction from "../assets/project_imgs/construction_img.jpg";
import furniture from "../assets/project_imgs/custome web 4.png";
import dental from "../assets/project_imgs/costome web 1.png";
import barber from "../assets/project_imgs/costome web 2.png";
import restaurant from "../assets/project_imgs/costome web 3.png";
import cafe from "../assets/project_imgs/wordpress2.png";
import bodybuilding from "../assets/project_imgs/wordpress1.png";

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
        img: construction,
        link: "https://fusionconstruction.vercel.app/index.html",
      },
      {
        id: "furniture-shop",
        title: "Furniture Shop",
        type: "E-commerce Website",
        img: furniture,
        link: "https://fusion-furniture-web-project.vercel.app/",
      },
      {
        id: "dental-clinic",
        title: "Dental Clinic",
        type: "Business Website",
        img: dental,
        link: "https://fusiondental-ten.vercel.app/",
      },
      {
        id: "karachi-barber",
        title: "Karachi Barber",
        type: "Business Website",
        img: barber,
        link: "https://kabeer1khan.github.io/project-1/",
      },
      {
        id: "restaurant-website",
        title: "Resturent Website",
        type: "Business Website",
        img: restaurant,
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
        img: cafe,
        link: "https://effervescent-cranachan-43ce32.netlify.app/",
      },
      {
        id: "clinic-care",
        title: "Body Building",
        type: "Healthcare Website",
        img: bodybuilding,
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
export const FEATURED_IDS = ["elite", "zaiqa-mahal", "furniture-shop"];

const ALL = CATEGORIES.flatMap((c) => c.projects);
export const FEATURED = FEATURED_IDS.map((id) => ALL.find((p) => p.id === id)).filter(Boolean);