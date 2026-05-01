(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animatedElements = document.querySelectorAll(".hero-text, .hero-visual, .section, .service-card");

    if ("IntersectionObserver" in window && !prefersReducedMotion) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (!entry.isIntersecting) return;
                window.setTimeout(() => entry.target.classList.add("show"), index * 90);
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.18 });
        animatedElements.forEach((element) => {
            element.classList.add("hidden");
            observer.observe(element);
        });
    } else {
        animatedElements.forEach((element) => element.classList.add("show"));
    }

    window.addEventListener("load", () => {
        const loader = document.querySelector(".loader");
        const delay = prefersReducedMotion ? 0 : 650;
        window.setTimeout(() => {
            if (loader) loader.classList.add("hidden");
            document.body.classList.add("loaded");
        }, delay);
    });

    const scrollProgress = document.querySelector(".scroll-progress");
    const updateScrollProgress = () => {
        if (!scrollProgress) return;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgress.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    };

    let scrollTicking = false;
    window.addEventListener("scroll", () => {
        if (scrollTicking) return;
        window.requestAnimationFrame(() => {
            updateScrollProgress();
            scrollTicking = false;
        });
        scrollTicking = true;
    }, { passive: true });
    updateScrollProgress();

    const cursorGlow = document.querySelector(".cursor-glow");
    let mouseTicking = false;
    let mouseX = 0;
    let mouseY = 0;

    if (cursorGlow && !prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener("mousemove", (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
            if (mouseTicking) return;
            window.requestAnimationFrame(() => {
                const x = mouseX / window.innerWidth;
                const y = mouseY / window.innerHeight;
                document.documentElement.style.setProperty("--mouse-x", `${x * 100}%`);
                document.documentElement.style.setProperty("--mouse-y", `${y * 100}%`);
                cursorGlow.style.left = `${mouseX}px`;
                cursorGlow.style.top = `${mouseY}px`;
                mouseTicking = false;
            });
            mouseTicking = true;
        }, { passive: true });
    } else if (cursorGlow) {
        cursorGlow.style.display = "none";
    }

    const revealItems = document.querySelectorAll(".section h2, .section > p, .service-card, .portfolio-card, .contact-form, .contact-info");
    revealItems.forEach((item, index) => {
        item.classList.add("scroll-reveal");
        if (index % 3 === 1) item.classList.add("delay-1");
        if (index % 3 === 2) item.classList.add("delay-2");
    });

    if ("IntersectionObserver" in window && !prefersReducedMotion) {
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("active");
                scrollObserver.unobserve(entry.target);
            });
        }, { threshold: 0.18 });
        revealItems.forEach((item) => scrollObserver.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add("active"));
    }

    const contactForm = document.querySelector(".contact-form");
    const formSuccess = document.querySelector("#formSuccess");
    if (contactForm && formSuccess) {
        contactForm.addEventListener("submit", () => {
            formSuccess.classList.add("show");
            window.setTimeout(() => contactForm.reset(), 400);
            window.setTimeout(() => formSuccess.classList.remove("show"), 3000);
        });
    }
})();
