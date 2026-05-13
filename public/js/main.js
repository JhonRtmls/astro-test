/* ================================================
    GESTOO — Main JavaScript v.6 (Astro Optimized)
   ================================================ */

document.addEventListener("astro:page-load", () => {
  // ── Scroll Reset ──
  window.scrollTo(0, 0);

  // ── Lenis Smooth Scroll ──
  if (window.lenis) {
    window.lenis.destroy();
  }
  
  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true
  });
  window.lenis = lenis;
  lenis.scrollTo(0, { immediate: true });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // ── Dynamic Background Color Scrub (Only for Home/Manifesto) ──
  const manifestoSection = document.querySelector(".manifesto-premium");
  const body = document.body;
  
  if (manifestoSection) {
    const bgBlue = getComputedStyle(document.documentElement).getPropertyValue('--blue-900').trim() || "#152A3C";
    const bgWhite = "#FFFFFF";

    // Iniciamos en blanco solo si estamos en el Home
    gsap.set(body, { backgroundColor: bgWhite });

    // Transición: Blanco -> Azul al hacer scroll
    gsap.to(body, {
      backgroundColor: bgBlue,
      scrollTrigger: {
        trigger: ".strategic-marquee",
        start: "top 90%",
        end: "top 20%",
        scrub: true,
      },
    });
  } else {
    // En cualquier otra página, aseguramos que el fondo sea el oscuro por defecto
    gsap.set(body, { backgroundColor: "var(--blue-900)" });
  }

  // ── Utility: Split text into spans (Words) ──
  const splitText = (el) => {
    const text = el.textContent.trim();
    const words = text.split(/\s+/);
    el.innerHTML = words.map((word) => `<span>${word}</span>`).join(" ");
  };

  // ── Navbar Scroll Effect ──
  const navbar = document.getElementById("navbar");
  const updateNavbar = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", updateNavbar, { passive: true });

  // ── Mobile Menu ──
  const burger = document.getElementById("navBurger");
  const mobileMenu = document.getElementById("mobileMenu");

  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");
      burger.classList.toggle("active", isOpen);
    });

    const closeBtn = document.getElementById("mobileMenuClose");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        burger.classList.remove("active");
      });
    }

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        burger.classList.remove("active");
      });
    });
  }

  // ── Custom Cursor (Optimized for v6) ──
  const cursor = document.querySelector(".cursor");
  const follower = document.querySelector(".cursor-follower");

  if (cursor && follower) {
    // Usamos quickTo para máxima fluidez y evitar saltos (GSAP 3.10+)
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });
    
    const xFollowerTo = gsap.quickTo(follower, "x", { duration: 0.4, ease: "power2.out" });
    const yFollowerTo = gsap.quickTo(follower, "y", { duration: 0.4, ease: "power2.out" });

    const moveCursor = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xFollowerTo(e.clientX - 16);
      yFollowerTo(e.clientY - 16);
    };

    window.addEventListener("mousemove", moveCursor);

    // Hover effects for interactive elements
    const interactives = document.querySelectorAll(
      "a, button, .service-item, .work-card, .brand-logo",
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(cursor, { scale: 1.5, backgroundColor: "var(--white)", duration: 0.3 });
        gsap.to(follower, { scale: 1.5, borderColor: "var(--white)", duration: 0.3 });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(cursor, { scale: 1, backgroundColor: "var(--accent-2)", duration: 0.3 });
        gsap.to(follower, { scale: 1, borderColor: "var(--accent-2)", duration: 0.3 });
      });
    });

    // Limpieza al cambiar de página para evitar duplicados
    document.addEventListener("astro:before-preparation", () => {
      window.removeEventListener("mousemove", moveCursor);
      if (window.lenis) {
        window.lenis.stop();
        window.lenis.destroy();
      }
    }, { once: true });
  }

  // ── Manifesto Animations (v.2 style) ──
  if (manifestoSection) {
    const title = manifestoSection.querySelector(".manifesto-title");
    splitText(title);

    const titleSpans = title.querySelectorAll("span");

    // Scroll-triggered text reveal
    gsap.to(titleSpans, {
      opacity: 1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: title,
        start: "top 80%",
        end: "top 20%",
        scrub: true,
      },
    });


    // Floating images parallax
    gsap.to(".img-1", {
      y: -120,
      rotate: 5,
      scrollTrigger: {
        trigger: ".manifesto-premium",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    gsap.to(".img-2", {
      y: -200,
      rotate: -8,
      scrollTrigger: {
        trigger: ".manifesto-premium",
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    });

    gsap.to(".img-3", {
      y: -150,
      rotate: 3,
      scrollTrigger: {
        trigger: ".manifesto-premium",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
      },
    });

    // Detail box reveal
    gsap.from(".manifesto-detail-box", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".manifesto-detail-box",
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
  }

  // ── Services Hub (v.5) ──
  const hubSection = document.querySelector(".services-hub");
  if (hubSection) {
    const hubCards = hubSection.querySelectorAll(".hub-card");

    // Entrance and Parallax for each card
    hubCards.forEach((card) => {
      const p = parseFloat(card.dataset.parallax) || 0.1;

      // Entrance - Using yPercent to avoid conflict with parallax y
      gsap.from(card, {
        yPercent: 30,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      });

      // Continuous Parallax Scroll - Using y
      gsap.to(card, {
        y: -180 * p,
        ease: "none",
        scrollTrigger: {
          trigger: hubSection,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Hover Effect in JS (Replacing the removed CSS transform to avoid conflicts)
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.03,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    });

    // Center circle entrance
    gsap.from(".hub-center-circle", {
      scale: 0.5,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: hubSection,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    // Rings subtle pulse/rotation
    gsap.to(".hub-ring", {
      rotation: 360,
      duration: 100,
      repeat: -1,
      ease: "none",
    });

    gsap.from(".hub-ring", {
      opacity: 0,
      stagger: 0.3,
      duration: 2,
      scrollTrigger: {
        trigger: hubSection,
        start: "top 80%",
      },
    });
  }

  // ── Problem Solver Reveal (v.4 Refined) ──
  const solverSection = document.querySelector(".solver-section");
  if (solverSection) {
    gsap.fromTo(
      ".layer-solution",
      { yPercent: 100 },
      {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".solver-section",
          start: "top top",
          end: "+=150%",
          scrub: true,
          pin: true,
          anticipatePin: 0.5,
          invalidateOnRefresh: true,
        },
      },
    );
  }

  // ── Smooth Anchors ──
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        lenis.scrollTo(target);
      }
    });
  });

  // ── Global Reveal Observer ──
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  revealElements.forEach((el) => revealObserver.observe(el));

  // Refresh ScrollTrigger after everything is loaded
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);
});
