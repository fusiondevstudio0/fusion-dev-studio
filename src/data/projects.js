/* =====================================================================
   APNE PROJECTS YAHAN ADD KARO
   ---------------------------------------------------------------------
   1. Project ki image ko  public/projects/  folder me rakho
      (agar folder nahi hai to `public` ke andar `projects` naam ka folder banao)
   2. Neeche us category ki list me ek naya { ... } block copy-paste karo:
        title       -> project ka naam
        description -> 1-2 lines
        tags        -> technologies / tools
        image       -> "/projects/file-name.jpg"
        link        -> live project ka URL ('' chhor do to card clickable nahi hoga)
   Categories ke ids: custom | wordpress | 3d
   ===================================================================== */

export const CATEGORIES = [
  {
    id: 'custom',
    number: '01',
    title: 'Custom Web Development',
    tags: 'Frontend · Backend · Full-Stack',
    description: 'Fast, scalable websites and web apps built from scratch.',
  },
  {
    id: 'wordpress',
    number: '02',
    title: 'WordPress Development',
    tags: 'Themes · Plugins · WooCommerce',
    description: 'Custom WordPress sites and stores that are easy to manage.',
  },
  {
    id: '3d',
    number: '03',
    title: '3D Models in Blender',
    tags: 'Products · Characters · Animation',
    description: 'Realistic 3D models, renders and animations for brands.',
  },
]

export const PROJECTS = {
  custom: [
    {
      title: 'Mustang Car Website',
      description: 'Car dealership website built with React, HTML and TAILWIND-CSS for a seamless user experience.',
      tags: ['React', 'HTML', 'TAILWIND-CSS'],
      image: 'src/assets/project_imgs/car.jpg',
      link: 'https://car-brand-project-five.vercel.app/',
    },
    {
      title: 'Feshin E-commerce Store',
      description: 'E-commerce store built with React, HTML and Tailwind CSS, featuring a modern design and smooth user experience.',
      tags: ['React', 'HTML', 'Tailwind-css'],
      image: 'src/assets/project_imgs/feshiOne_under_30kb.webp',
      link: 'https://feshionia.vercel.app/',
    },
    {
      title: 'Shoe Store Website',
      description: 'Shoe store website built with React, HTML and Tailwind CSS, featuring a modern design and smooth user experience.',
      tags: ['React', 'HTML', 'Tailwind-css'],
      image: 'src/assets/project_imgs/shoes_web_under_30kb.jpg',
      link: 'https://shoewebproject.vercel.app/',
    },
    {
      title: 'Resturant Website',
      description: 'Resturant website built with React, HTML and Tailwind CSS, featuring a modern design and smooth user experience.',
      tags: ['React', 'HTML', 'Tailwind-css'],
      image: 'src/assets/project_imgs/selva_under_30kb.webp',
      link: 'https://my-resturent-mu.vercel.app/',
    },
  ],
  wordpress: [
    {
      title: 'Coffee Shop Website',
      description: 'Coffee shop website built with WordPress and Elementor, featuring a modern design and smooth user experience.',
      tags: ['WordPress', 'Elementor'],
      image: 'src/assets/project_imgs/wordpress2.png',
      link: 'https://effervescent-cranachan-43ce32.netlify.app/',
    },
    {
      title: 'GYM Website',
      description: 'GYM website built with WordPress and Elementor, featuring a modern design and smooth user experience.',
      tags: ['WooCommerce', 'Custom Theme'],
      image: 'src/assets/project_imgs/wordpress1.png',
      link: 'https://bright-malasada-8e4ffb.netlify.app/',
    },
  ],
  '3d': [
    {
      title: '3D Product Render',
      description: 'Short description of what you modeled and where it is used.',
      tags: ['Blender', 'Cycles'],
      image: '/projects/3d-1.jpg',
      link: 'https://example.com',
    },
    {
      title: '3D Character',
      description: 'Short description of what you modeled and where it is used.',
      tags: ['Blender', 'Animation'],
      image: '/projects/3d-2.jpg',
      link: '',
    },
  ],
}