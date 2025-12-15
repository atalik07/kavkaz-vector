// Helper: smooth scroll to element by id
function smoothScrollTo(selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// PRELOADER
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    const body = document.body;
    setTimeout(() => {
        if (!preloader) return;
        preloader.style.opacity = "0";
        preloader.style.pointerEvents = "none";
        body.classList.remove("no-scroll");
    }, 400);
    setTimeout(() => {
        if (!preloader) return;
        preloader.style.display = "none";
    }, 900);
    const headerEl = document.querySelector(".header");
    requestAnimationFrame(() => {
        if (headerEl) headerEl.classList.add("header-enter");
    });
    startHeroAnimation();
});

// HEADER behaviour
const header = document.querySelector(".header");
const backToTopBtn = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    if (!header || !backToTopBtn) return;
    if (y > 40) {
        header.classList.add("scrolled");
        backToTopBtn.classList.add("visible");
    } else {
        header.classList.remove("scrolled");
        backToTopBtn.classList.remove("visible");
    }
});

// Back to top
if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        document.querySelectorAll(".nav-link.active").forEach((link) => {
            link.classList.remove("active");
        });
    });
}

// Hamburger
const hamburger = document.getElementById("hamburger");
const nav = document.querySelector(".nav");
if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        nav.classList.toggle("open");
    });
}
document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
        if (hamburger && nav) {
            hamburger.classList.remove("active");
            nav.classList.remove("open");
        }
    });
});

// Anchor scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
        const href = anchor.getAttribute("href");
        if (href && href.length > 1 && document.querySelector(href)) {
            e.preventDefault();
            smoothScrollTo(href);
        }
    });
});

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Hero Animation
function startHeroAnimation() {
    const hero = document.querySelector(".hero");
    const line1 = document.querySelector(".hero-title-line-1");
    const line2 = document.querySelector(".hero-title-line-2");
    const wordNa = document.querySelector(".hero-title-na");
    const subtitle = document.querySelector(".hero-subtitle");
    const advWrapper = document.querySelector(".hero-advantages");
    if (!hero || !line1 || !line2 || !wordNa || !subtitle || !advWrapper) return;
    [line1, line2, subtitle].forEach((el) => {
        el.classList.remove("hero-anim-in", "hero-anim-out");
    });
    wordNa.classList.remove("hero-anim-in", "hero-anim-out");
    advWrapper.classList.remove("hero-anim-in", "hero-anim-out");
    void hero.offsetWidth;
    setTimeout(() => line1.classList.add("hero-anim-in"), 150);
    setTimeout(() => line2.classList.add("hero-anim-in"), 260);
    setTimeout(() => wordNa.classList.add("hero-anim-in"), 340);
    setTimeout(() => subtitle.classList.add("hero-anim-in"), 420);
    setTimeout(() => advWrapper.classList.add("hero-anim-in"), 520);
}

// Section Animations
function initSectionAnimations() {
    const animatedElements = document.querySelectorAll(".section-anim");
    if (!animatedElements.length) return;
    animatedElements.forEach((el) => {
        el.classList.add("section-anim-out");
    });
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const el = entry.target;
                const once = el.dataset.animOnce === "true";
                const delay = parseInt(el.dataset.animDelay || "0", 10);
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        el.classList.remove("section-anim-out");
                        el.classList.add("section-anim-in");
                    }, delay);
                } else {
                    if (!once) {
                        el.classList.remove("section-anim-in");
                        el.classList.add("section-anim-out");
                    }
                }
            });
        },
        { threshold: 0.2 }
    );
    animatedElements.forEach((el) => observer.observe(el));
}

// Hero Observer
function initHeroObserver() {
    const hero = document.querySelector(".hero");
    if (!hero) return;
    const observerHero = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const line1 = document.querySelector(".hero-title-line-1");
                const line2 = document.querySelector(".hero-title-line-2");
                const wordNa = document.querySelector(".hero-title-na");
                const subtitle = document.querySelector(".hero-subtitle");
                const advWrapper = document.querySelector(".hero-advantages");
                if (!line1 || !line2 || !wordNa || !subtitle || !advWrapper) return;
                if (entry.isIntersecting) {
                    [line1, line2, wordNa, subtitle].forEach((el) => {
                        el.classList.remove("hero-anim-out");
                        el.classList.add("hero-anim-in");
                    });
                    advWrapper.classList.remove("hero-anim-out");
                    advWrapper.classList.add("hero-anim-in");
                } else {
                    [line1, line2, wordNa, subtitle].forEach((el) => {
                        el.classList.remove("hero-anim-in");
                        el.classList.add("hero-anim-out");
                    });
                    advWrapper.classList.remove("hero-anim-in");
                    advWrapper.classList.add("hero-anim-out");
                }
            });
        },
        { threshold: 0.4 }
    );
    observerHero.observe(hero);
}

// Tours Carousel
const toursCarousel = document.getElementById("toursCarousel");
const toursPrev = document.getElementById("toursPrev");
const toursNext = document.getElementById("toursNext");
if (toursCarousel && toursPrev && toursNext) {
    const scrollStep = () => {
        const card = toursCarousel.querySelector(".tour-card");
        if (!card) return 300;
        const style = window.getComputedStyle(toursCarousel);
        const gap = parseInt(style.columnGap || style.gap || "20", 10);
        return card.getBoundingClientRect().width + gap;
    };
    toursPrev.addEventListener("click", () => {
        toursCarousel.scrollBy({ left: -scrollStep(), behavior: "smooth" });
    });
    toursNext.addEventListener("click", () => {
        toursCarousel.scrollBy({ left: scrollStep(), behavior: "smooth" });
    });
}

// Active Nav Link
function initActiveNavLink() {
    const navLinks = document.querySelectorAll(".nav-link");
    if (!navLinks.length) return;
    const hero = document.getElementById("hero");
    const sections = [
        document.getElementById("tours"),
        document.getElementById("about"),
        document.getElementById("contacts")
    ].filter(Boolean);
    if (!sections.length) return;

    function clearActive() {
        navLinks.forEach((link) => link.classList.remove("active"));
    }
    function setActiveById(id) {
        navLinks.forEach((link) => {
            const href = link.getAttribute("href");
            if (href === `#${id}`) link.classList.add("active");
            else link.classList.remove("active");
        });
    }
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            const href = link.getAttribute("href") || "";
            if (href.startsWith("#") && href.length > 1) {
                const id = href.slice(1);
                setActiveById(id);
            }
        });
    });
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const id = entry.target.id;
                if (id === "hero") {
                    if (entry.isIntersecting) clearActive();
                    return;
                }
                if (entry.isIntersecting) setActiveById(id);
            });
        },
        { threshold: 0.5 }
    );
    if (hero) observer.observe(hero);
    sections.forEach((sec) => observer.observe(sec));
}

// === DESKTOP SECTION SCROLL (Восстановленная плавность с фиксом подвала) ===
function initSectionScroll() {
    // Включаем только на десктопах!
    if (window.innerWidth < 1024) return;

    const sections = [
        document.getElementById("hero"),
        document.getElementById("tours"),
        document.getElementById("about"),
        document.getElementById("contacts")
    ].filter(Boolean);

    if (sections.length === 0) return;

    let isSnapping = false;
    let currentIndex = 0;

    function scrollToIndex(index) {
        if (index < 0 || index >= sections.length) return;
        isSnapping = true;
        sections[index].scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
        currentIndex = index;
        setTimeout(() => {
            isSnapping = false;
        }, 900);
    }

    function findClosestSection() {
        const viewportCenter = window.innerHeight / 2;
        let closest = 0;
        let minDelta = Infinity;
        sections.forEach((sec, i) => {
            const rect = sec.getBoundingClientRect();
            const secCenter = rect.top + rect.height / 2;
            const delta = Math.abs(secCenter - viewportCenter);
            if (delta < minDelta) {
                minDelta = delta;
                closest = i;
            }
        });
        return closest;
    }

    window.addEventListener("wheel", (e) => {
        if (isSnapping) return;
        
        // Определяем, где мы сейчас
        currentIndex = findClosestSection();
        const isLastSection = currentIndex === sections.length - 1;

        // ЛОГИКА "ФУТЕР-ЛОВУШКИ"
        // Если мы на последней секции (Контакты) и крутим ВНИЗ, разрешаем браузеру скроллить
        if (isLastSection && e.deltaY > 0) {
            return; 
        }

        // Если мы видим футер (проскроллили ниже контактов) и крутим ВВЕРХ
        const lastSectionRect = sections[sections.length - 1].getBoundingClientRect();
        // Если дно секции контактов выше низа экрана (значит мы видим футер)
        if (isLastSection && e.deltaY < 0 && lastSectionRect.bottom < window.innerHeight) {
             return; // Даем скроллить обратно до полного появления контактов
        }

        const delta = e.deltaY;
        if (Math.abs(delta) < 4) return;

        e.preventDefault();

        if (delta > 0 && !isLastSection) {
            scrollToIndex(currentIndex + 1);
        } else if (delta < 0 && currentIndex > 0) {
            scrollToIndex(currentIndex - 1);
        }
    }, { passive: false });
}

// Init
document.addEventListener("DOMContentLoaded", () => {
    initActiveNavLink();
    initSectionAnimations();
    initHeroObserver();
    initSectionScroll(); // Запускаем нашу JS функцию для десктопа
});
