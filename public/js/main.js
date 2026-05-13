/* ================================================
    GESTOO — Main JavaScript v.6 (Astro Optimized)
   ================================================ */

document.addEventListener("astro:page-load", () => {
  const isReload = performance.navigation && performance.navigation.type === 1;

  // ── Scroll Reset (Only on fresh navigate, not reload) ──
  if (!isReload) {
    window.scrollTo(0, 0);
  }

  // ── Lenis Smooth Scroll ──
  if (window.lenis) {
    window.lenis.destroy();
  }
  
  window.lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true
  });
  
  if (!isReload) {
    window.lenis.scrollTo(0, { immediate: true });
  }

  window.lenis.on("scroll", ScrollTrigger.update);

  if (!window.lenisTicker) {
    window.lenisTicker = (time) => {
      if (window.lenis) window.lenis.raf(time * 1000);
    };
    gsap.ticker.add(window.lenisTicker);
    gsap.ticker.lagSmoothing(0);
  }

  const manifestoSection = document.querySelector(".manifesto-premium");
  const body = document.body;

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

  if (navbar && manifestoSection) {
    ScrollTrigger.create({
      trigger: manifestoSection,
      start: "top 80px",
      end: "bottom 80px",
      onEnter: () => navbar.classList.add("nav-dark-text"),
      onLeave: () => navbar.classList.remove("nav-dark-text"),
      onEnterBack: () => navbar.classList.add("nav-dark-text"),
      onLeaveBack: () => navbar.classList.remove("nav-dark-text"),
    });
  }

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

  // ── Hero Morphing Animation (v.6) ──
  const heroVisual = document.querySelector("#heroVisual");
  const manifestoTitle = document.querySelector(".manifesto-title");
  const heroSocials = document.querySelector(".hero-socials");

  if (heroVisual && manifestoSection) {
    // 1. Main Hero Parallax Morph
    const morphTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      }
    });

    // Morph the image: perfectly calculated to land on the manifesto title
    morphTl.fromTo(heroVisual, 
      {
        y: 0,
        x: 0,
        width: "100%",
        height: "100vh",
        borderRadius: 0
      },
      {
        y: () => document.querySelector(".hero").offsetHeight + (window.innerWidth > 992 ? 200 : 100),
        x: () => window.innerWidth * 0.52,
        width: "42vw",
        height: "55vh",
        borderRadius: "40px",
        ease: "none"
      }, 0);

    // Fade out hero socials
    if (heroSocials) {
      morphTl.to(heroSocials, { opacity: 0, y: -50, duration: 0.2 }, 0);
    }
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
