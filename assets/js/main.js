// Shmoopi.net - Minimal JavaScript for Mobile Menu and Go to Top

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarNav = document.querySelector('.navbar-nav');

  if (navbarToggle && navbarNav) {
    navbarToggle.addEventListener('click', function() {
      navbarNav.classList.toggle('active');
      this.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navbarToggle.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
        navbarToggle.classList.remove('active');
      }
    });

    // Close menu when clicking a link
    const navLinks = navbarNav.querySelectorAll('a');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        navbarNav.classList.remove('active');
        navbarToggle.classList.remove('active');
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Go to Top button visibility
  const gototop = document.getElementById('gototop');
  if (gototop) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        gototop.style.opacity = '1';
      } else {
        gototop.style.opacity = '0.5';
      }
    });
  }

  // Featured Products Carousel
  const carousel = document.getElementById('productCarousel');
  if (carousel) {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');

    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoRotateInterval = null;

    function goToSlide(index) {
      // Remove active class from all slides and dots
      slides.forEach(function(slide) {
        slide.classList.remove('active');
      });
      dots.forEach(function(dot) {
        dot.classList.remove('active');
      });

      // Add active class to current slide and dot
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      currentSlide = index;
    }

    function nextSlide() {
      const next = (currentSlide + 1) % totalSlides;
      goToSlide(next);
    }

    function prevSlide() {
      const prev = (currentSlide - 1 + totalSlides) % totalSlides;
      goToSlide(prev);
    }

    function startAutoRotate() {
      if (autoRotateInterval) {
        clearInterval(autoRotateInterval);
      }
      autoRotateInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoRotate() {
      if (autoRotateInterval) {
        clearInterval(autoRotateInterval);
        autoRotateInterval = null;
      }
    }

    // Arrow button click handlers
    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        stopAutoRotate();
        prevSlide();
        startAutoRotate();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        stopAutoRotate();
        nextSlide();
        startAutoRotate();
      });
    }

    // Dot click handlers
    dots.forEach(function(dot, index) {
      dot.addEventListener('click', function() {
        stopAutoRotate();
        goToSlide(index);
        startAutoRotate();
      });
    });

    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoRotate);
    carousel.addEventListener('mouseleave', startAutoRotate);

    // Start auto-rotation
    startAutoRotate();
  }

  // Apps Page Carousel
  var appsCarousel = document.getElementById('appsCarousel');
  if (appsCarousel) {
    var appSlides = appsCarousel.querySelectorAll('.carousel-slide');
    var appDots = appsCarousel.querySelectorAll('.carousel-dot');
    var appPrevBtn = document.getElementById('appsCarouselPrev');
    var appNextBtn = document.getElementById('appsCarouselNext');

    var appCurrentSlide = 0;
    var appTotalSlides = appSlides.length;
    var appAutoRotateInterval = null;

    function appGoToSlide(index) {
      appSlides.forEach(function(slide) { slide.classList.remove('active'); });
      appDots.forEach(function(dot) { dot.classList.remove('active'); });
      appSlides[index].classList.add('active');
      appDots[index].classList.add('active');
      appCurrentSlide = index;
    }

    function appNextSlide() {
      appGoToSlide((appCurrentSlide + 1) % appTotalSlides);
    }

    function appPrevSlide() {
      appGoToSlide((appCurrentSlide - 1 + appTotalSlides) % appTotalSlides);
    }

    function appStartAutoRotate() {
      if (appAutoRotateInterval) clearInterval(appAutoRotateInterval);
      appAutoRotateInterval = setInterval(appNextSlide, 5000);
    }

    function appStopAutoRotate() {
      if (appAutoRotateInterval) { clearInterval(appAutoRotateInterval); appAutoRotateInterval = null; }
    }

    if (appPrevBtn) {
      appPrevBtn.addEventListener('click', function() { appStopAutoRotate(); appPrevSlide(); appStartAutoRotate(); });
    }
    if (appNextBtn) {
      appNextBtn.addEventListener('click', function() { appStopAutoRotate(); appNextSlide(); appStartAutoRotate(); });
    }
    appDots.forEach(function(dot, index) {
      dot.addEventListener('click', function() { appStopAutoRotate(); appGoToSlide(index); appStartAutoRotate(); });
    });

    appsCarousel.addEventListener('mouseenter', appStopAutoRotate);
    appsCarousel.addEventListener('mouseleave', appStartAutoRotate);
    appStartAutoRotate();
  }

  // Scroll-Triggered Animations
  var scrollElements = document.querySelectorAll('.scroll-animate');
  if (scrollElements.length > 0 && 'IntersectionObserver' in window) {
    var scrollObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          scrollObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    scrollElements.forEach(function(el) {
      scrollObserver.observe(el);
    });
  }

  // Screenshot Carousels (iReadr page)
  document.querySelectorAll('.screenshot-carousel').forEach(function(carousel) {
    var slides = carousel.querySelectorAll('.screenshot-slide');
    var dots = carousel.querySelectorAll('.screenshot-dot');
    var prevBtn = carousel.querySelector('.screenshot-arrow-prev');
    var nextBtn = carousel.querySelector('.screenshot-arrow-next');

    var current = 0;
    var total = slides.length;

    function showSlide(index) {
      slides.forEach(function(s) { s.classList.remove('active'); });
      dots.forEach(function(d) { d.classList.remove('active'); });
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      current = index;
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        showSlide((current - 1 + total) % total);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        showSlide((current + 1) % total);
      });
    }

    dots.forEach(function(dot, i) {
      dot.addEventListener('click', function() {
        showSlide(i);
      });
    });
  });

  // Screenshot Lightbox
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lightboxImg = lightbox.querySelector('img');
    var lightboxCaption = lightbox.querySelector('.lightbox-caption');
    var lightboxClose = lightbox.querySelector('.lightbox-close');

    document.querySelectorAll('.screenshot-clickable').forEach(function(img) {
      img.addEventListener('click', function(e) {
        e.stopPropagation();
        lightboxImg.src = this.src;
        lightboxImg.alt = this.alt;
        lightboxCaption.textContent = this.getAttribute('data-caption') || '';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    lightbox.addEventListener('click', closeLightbox);
    lightboxClose.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }
});
