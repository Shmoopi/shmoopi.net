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
});
