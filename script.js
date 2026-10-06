const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const overlay = document.getElementById("overlay");

/* navbar stays fixed, background turns glassy/blurred after scrolling down */
function handleScroll() {
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", handleScroll);
handleScroll();

/* hamburger toggle -> slide menu in from the right */
function toggleMenu() {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.style.overflow = navLinks.classList.contains("active")
    ? "hidden"
    : "";
}

hamburger.addEventListener("click", toggleMenu);
overlay.addEventListener("click", toggleMenu);

/* close menu when a link is clicked (mobile) */
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks.classList.contains("active")) {
      toggleMenu();
    }
  });
});

/* ================= SERVICE DETAIL MODAL ================= */

const serviceData = {
  website: {
    title: "Custom Website",
    desc: "Fully bespoke websites built from scratch to match your brand identity, tailored for performance, scalability and conversions.",
    plans: [
      {
        name: "Basic",
        price: "$199",
        icon: "fa-regular fa-star",
        features: [
          "Up to 5 responsive pages",
          "Mobile-first design",
          "Basic on-page SEO setup",
          "Contact form integration",
          "1 round of revisions",
          "Delivery in 2 weeks",
          "Email support",
        ],
        cta: "Choose Basic",
      },
      {
        name: "Premium",
        price: "$799",
        icon: "fa-solid fa-crown",
        badge: "Most Popular",
        highlighted: true,
        features: [
          "Unlimited custom pages",
          "Fully custom UI/UX design",
          "Advanced SEO optimization",
          "CMS integration (edit content yourself)",
          "E-commerce ready setup",
          "Unlimited revisions",
          "Priority support & 4 week delivery",
        ],
        cta: "Choose Premium",
      },
      {
        name: "Standard",
        price: "$499",
        icon: "fa-solid fa-bolt",
        features: [
          "Up to 10 responsive pages",
          "Custom themed design",
          "SEO optimization",
          "Contact form + newsletter signup",
          "3 rounds of revisions",
          "Delivery in 3 weeks",
          "Live chat support",
        ],
        cta: "Choose Standard",
      },
    ],
  },

  wordpress: {
    title: "WordPress Website",
    desc: "Flexible, easy-to-manage WordPress builds — from quick theme setups to fully custom, plugin-powered platforms.",
    plans: [
      {
        name: "Basic",
        price: "$179",
        icon: "fa-regular fa-star",
        features: [
          "Pre-built premium theme setup",
          "Up to 5 pages configured",
          "Essential plugin installation",
          "Basic theme customization",
          "Mobile responsive layout",
          "Delivery in 1 week",
          "Email support",
        ],
        cta: "Choose Basic",
      },
      {
        name: "Premium",
        price: "$699",
        icon: "fa-solid fa-crown",
        badge: "Most Popular",
        highlighted: true,
        features: [
          "Fully custom theme design",
          "Unlimited pages",
          "Premium plugin suite included",
          "WooCommerce store setup",
          "Advanced SEO configuration",
          "Deep customization & animations",
          "Priority support & 3 week delivery",
        ],
        cta: "Choose Premium",
      },
      {
        name: "Standard",
        price: "$399",
        icon: "fa-solid fa-bolt",
        features: [
          "Custom-styled theme",
          "Up to 8 pages",
          "Core plugin bundle",
          "Moderate customization",
          "SEO basics configured",
          "Contact & newsletter forms",
          "Delivery in 2 weeks",
        ],
        cta: "Choose Standard",
      },
    ],
  },

  "3d": {
    title: "3D Modeling",
    desc: "High-quality 3D models and assets crafted for games, product visualization, animation and interactive web experiences.",
    plans: [
      {
        name: "Basic",
        price: "$129",
        icon: "fa-regular fa-star",
        features: [
          "1 detailed 3D model",
          "Basic texturing",
          "Low-poly optimization",
          "Standard file formats (.obj, .fbx)",
          "2 rounds of revisions",
          "Delivery in 1 week",
          "Email support",
        ],
        cta: "Choose Basic",
      },
      {
        name: "Premium",
        price: "$549",
        icon: "fa-solid fa-crown",
        badge: "Most Popular",
        highlighted: true,
        features: [
          "Up to 5 detailed 3D models",
          "Advanced texturing & lighting",
          "Rigging & animation ready",
          "All industry file formats",
          "Game/web optimized exports",
          "Unlimited revisions",
          "Priority support & fast delivery",
        ],
        cta: "Choose Premium",
      },
      {
        name: "Standard",
        price: "$249",
        icon: "fa-solid fa-bolt",
        features: [
          "Up to 3 3D models",
          "Texturing & materials included",
          "Game-ready optimization",
          "2 file formats delivered",
          "3 rounds of revisions",
          "Delivery in 10 days",
          "Live chat support",
        ],
        cta: "Choose Standard",
      },
    ],
  },
};

const serviceModal = document.getElementById("serviceModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalPlans = document.getElementById("modalPlans");

function buildPlanCard(plan) {
  const featuresHTML = plan.features
    .map(
      (f) =>
        `<li><i class="fa-solid fa-circle-check"></i><span>${f}</span></li>`,
    )
    .join("");

  return `
    <div class="plan-card ${plan.highlighted ? "plan-premium" : ""}">
      ${plan.badge ? `<div class="plan-badge">${plan.badge}</div>` : ""}
      <div class="plan-icon"><i class="${plan.icon}"></i></div>
      <div class="plan-name">${plan.name}</div>
      <div class="plan-price">${plan.price}<span> /project</span></div>
      <ul class="plan-features">${featuresHTML}</ul>
      <a href="#" class="plan-select">${plan.cta}</a>
    </div>
  `;
}

function openModal(serviceKey) {
  const data = serviceData[serviceKey];
  if (!data) return;

  modalTitle.textContent = data.title + " — Details";
  modalDesc.textContent = data.desc;
  modalPlans.innerHTML = data.plans.map(buildPlanCard).join("");

  serviceModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

/* Plan "Choose" buttons -> close modal + scroll to contact form */
modalPlans.addEventListener("click", (e) => {
  const planBtn = e.target.closest(".plan-select");
  if (!planBtn) return;

  e.preventDefault();
  closeModal();

  setTimeout(() => {
    const contactSection = document.getElementById("contect");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 350); // modal close animation ke baad scroll ho
});

function closeModal() {
  serviceModal.classList.remove("active");
  document.body.style.overflow = "";
}

document.querySelectorAll(".view-btn a[data-service]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    openModal(link.getAttribute("data-service"));
  });
});

modalClose.addEventListener("click", closeModal);

serviceModal.addEventListener("click", (e) => {
  if (e.target === serviceModal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && serviceModal.classList.contains("active")) {
    closeModal();
  }
});

const serviceCard = document.querySelectorAll(".card1, .card2, .card3");
const projectCards = document.querySelectorAll(".box1");
const teamCard = document.querySelectorAll(".team_card");

const revealCards = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
      }
    });
  },
  { threshold: 0.5 },
);

serviceCard.forEach((card) => revealCards.observe(card));
projectCards.forEach((card) => revealCards.observe(card));
teamCard.forEach((card) => revealCards.observe(card));

const filterLinks = document.querySelectorAll(".projects_list a[data-filter]");
const filterBoxes = document.querySelectorAll(".box1");
const FADE_DURATION = 700; // .box1 ke opacity transition (0.7s) se match

function filterProjects(filter) {
  filterBoxes.forEach((box) => {
    const match =
  (filter === "all" && !box.dataset.only) || box.dataset.category === filter;

    // agar pehle se koi hide-timer pending tha to usko cancel karo
    if (box._hideTimer) {
      clearTimeout(box._hideTimer);
      box._hideTimer = null;
    }

    if (match) {
      box.style.display = "";
      void box.offsetWidth; // reflow force taake transition trigger ho
      requestAnimationFrame(() => box.classList.add("reveal"));
    } else {
      box.classList.remove("reveal");
      box._hideTimer = setTimeout(() => {
        box.style.display = "none";
        box._hideTimer = null;
      }, FADE_DURATION);
    }
  });
}

filterLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    filterLinks.forEach((l) => l.classList.remove("filter-active"));
    link.classList.add("filter-active");

    filterProjects(link.dataset.filter);
  });
});

/* ================= CONTACT FORM (EmailJS) ================= */

const EMAILJS_SERVICE_ID = "service_8j6a1a1";
const EMAILJS_TEMPLATE_ID = "template_s3vb4ld";

const sendBtn = document.getElementById("sendBtn");
const cName = document.getElementById("cName");
const cEmail = document.getElementById("cEmail");
const cMessage = document.getElementById("cMessage");

function flagField(field) {
  field.style.borderColor = "rgba(255, 120, 120, 0.7)";
  setTimeout(() => {
    field.style.borderColor = "";
  }, 900);
}

sendBtn.addEventListener("click", () => {
  const name = cName.value.trim();
  const email = cEmail.value.trim();
  const message = cMessage.value.trim();

  // empty-field check
  let hasError = false;
  [cName, cEmail, cMessage].forEach((field) => {
    if (!field.value.trim()) {
      flagField(field);
      hasError = true;
    }
  });
  if (hasError) return;

  // email format check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    flagField(cEmail);
    return;
  }

  const btnText = sendBtn.querySelector(".btn_text");
  const icon = sendBtn.querySelector("i");

  sendBtn.disabled = true;
  btnText.textContent = "Sending...";

  // names must match the {{...}} variables in the EmailJS template
  const templateParams = {
    name: name,                              // {{name}}
    email: email,                            // {{email}}
    message: message,                        // {{message}}
    title: "New Contact Form Message",       // {{title}}  (Subject: Contact Us: {{title}})
    time: new Date().toLocaleString(),       // {{time}}
  };

  emailjs
    .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(() => {
      sendBtn.classList.add("sent");
      btnText.textContent = "Message Sent";
      icon.classList.replace("fa-paper-plane", "fa-check");

      setTimeout(() => {
        sendBtn.classList.remove("sent");
        sendBtn.disabled = false;
        btnText.textContent = "Send Message";
        icon.classList.replace("fa-check", "fa-paper-plane");
        cName.value = "";
        cEmail.value = "";
        cMessage.value = "";
      }, 1800);
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      btnText.textContent = "Failed - Try Again";
      setTimeout(() => {
        sendBtn.disabled = false;
        btnText.textContent = "Send Message";
      }, 2000);
    });
});


const contactBox = document.querySelector(".contect_box");

const revealContact = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        revealContact.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 },
);

if (contactBox) revealContact.observe(contactBox);

const footerBox = document.querySelector(".footer_box");

const revealFooter = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        revealFooter.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

if (footerBox) revealFooter.observe(footerBox);

/* footer ke service links bhi modal khole (jaise service cards) */
document.querySelectorAll(".footer_links a[data-service]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    openModal(link.getAttribute("data-service"));
  });
});

const aboutModal = document.getElementById("aboutModal");
const aboutModalClose = document.getElementById("aboutModalClose");
const aboutMoreBtn = document.getElementById("aboutMoreBtn");

function openAboutModal() {
  aboutModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeAboutModal() {
  aboutModal.classList.remove("active");
  document.body.style.overflow = "";
}

if (aboutMoreBtn) {
  aboutMoreBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openAboutModal();
  });
}

aboutModalClose.addEventListener("click", closeAboutModal);

aboutModal.addEventListener("click", (e) => {
  if (e.target === aboutModal) closeAboutModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && aboutModal.classList.contains("active")) {
    closeAboutModal();
  }
});


document.querySelectorAll(".box1 .arrow_project a").forEach((arrow) => {
  arrow.addEventListener("click", (e) => {
    e.preventDefault();

    const card = arrow.closest(".box1");
    const category = card.dataset.category; 

    filterLinks.forEach((l) => {
      l.classList.toggle("filter-active", l.dataset.filter === category);
    });

    filterProjects(category);

    document
      .getElementById("projects")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  });
});