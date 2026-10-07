const WHATSAPP_NUMBER = "919876543210";

const messages = {
  trial: "Hi Forge Fitness! I'd like to book a free trial session. Please share the available timings.",
  general: "Hi Forge Fitness! I'd like to know more about your gym and memberships.",
  personal: "Hi Forge Fitness! I'm interested in Personal Training. Please share the details.",
  strength: "Hi Forge Fitness! I'm interested in Strength Training. Please share the details.",
  cardio: "Hi Forge Fitness! I'm interested in Cardio & Conditioning. Please share the details.",
  classes: "Hi Forge Fitness! I'd like to know about your Group Classes and timings.",
  weightloss: "Hi Forge Fitness! I'm interested in your Weight Loss program. Please share the details.",
  assessment: "Hi Forge Fitness! I'd like to book a Fitness Assessment."
};

function openWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

document.querySelectorAll("[data-whatsapp]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const key = link.dataset.whatsapp;
    openWhatsApp(messages[key] || messages.general);
  });
});

document.querySelectorAll("[data-plan]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const plan = link.dataset.plan;
    openWhatsApp(`Hi Forge Fitness! I'm interested in the ${plan} Membership at ₹${plan === "Starter" ? "999" : plan === "Pro" ? "1,999" : "2,999"}/month. Please share the joining details.`);
  });
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

navLinks.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => navLinks.classList.remove("open"));
});

// Close mobile menu when tapping outside it.
document.addEventListener("click", (event) => {
  if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

const sections = [...document.querySelectorAll("main section[id]")];
const navAnchors = [...document.querySelectorAll(".nav-links a")];

function updateActiveNav() {
  let current = "home";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 150) current = section.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
  });
}
window.addEventListener("scroll", updateActiveNav, {passive:true});
updateActiveNav();

const progressBar = document.getElementById("progressBar");
window.addEventListener("scroll", () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${(window.scrollY / scrollable) * 100}%`;
}, {passive:true});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold:0.12});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
