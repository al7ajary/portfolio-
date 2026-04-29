const animatedElements = document.querySelectorAll(
    ".hero-text, .hero-visual, .section, .service-card"
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("show");
                }, index * 120);
            }
        });
    },
    {
        threshold: 0.18,
    }
);

animatedElements.forEach((element) => {
    element.classList.add("hidden");
    observer.observe(element);
});

document.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    document.documentElement.style.setProperty("--mouse-x", `${x * 100}%`);
    document.documentElement.style.setProperty("--mouse-y", `${y * 100}%`);

    const logo = document.querySelector(".logo-frame");
    if (logo) {
        logo.style.transform = `
      rotateX(${(y - 0.5) * -12}deg)
      rotateY(${(x - 0.5) * 12}deg)
      scale(1.02)
    `;
    }
});
window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    setTimeout(() => {
        loader.classList.add("hidden");

        // يبدأ دخول الموقع
        document.body.classList.add("loaded");

    }, 2000);
});
const scrollProgress = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;

    if (scrollProgress) {
        scrollProgress.style.width = progress + "%";
    }
});

const revealItems = document.querySelectorAll(
    ".section h2, .section > p, .service-card, .portfolio-card, .contact-form, .contact-info"
);

revealItems.forEach((item, index) => {
    item.classList.add("scroll-reveal");

    if (index % 3 === 1) item.classList.add("delay-1");
    if (index % 3 === 2) item.classList.add("delay-2");
});

const scrollObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    },
    {
        threshold: 0.18,
    }
);

revealItems.forEach((item) => {
    scrollObserver.observe(item);
});

const contactForm = document.querySelector(".contact-form");
const formSuccess = document.querySelector("#formSuccess");

if (contactForm && formSuccess) {
  contactForm.addEventListener("submit", () => {
    formSuccess.classList.add("show");
    contactForm.reset();

    setTimeout(() => {
      formSuccess.classList.remove("show");
    }, 3000);
  });
}
const contactForm = document.querySelector(".contact-form");
const formSuccess = document.querySelector("#formSuccess");

if (contactForm && formSuccess) {
  contactForm.addEventListener("submit", function () {
    setTimeout(() => {
      formSuccess.classList.add("show");
      contactForm.reset();

      setTimeout(() => {
        formSuccess.classList.remove("show");
      }, 3000);
    }, 500);
  });
}
