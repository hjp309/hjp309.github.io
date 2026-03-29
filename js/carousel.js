const AUTOPLAY_DELAY = 5000; // ms between auto-advances

// Create a global close button for expanded view
const globalCloseBtn = document.createElement('button');
globalCloseBtn.className = 'carousel-global-close';
globalCloseBtn.innerHTML = '&times;';
document.body.appendChild(globalCloseBtn);

// Create global dark underlay
const globalUnderlay = document.createElement('div');
globalUnderlay.className = 'carousel-global-underlay';
document.body.appendChild(globalUnderlay);

let activeExpandCloseFn = null;

function closeExpandedCarousel() {
  if (activeExpandCloseFn) {
    activeExpandCloseFn();
  }
}

globalCloseBtn.addEventListener('click', closeExpandedCarousel);
globalUnderlay.addEventListener('click', closeExpandedCarousel);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeExpandedCarousel();
});


document.querySelectorAll('.carousel').forEach(carousel => {
  const track   = carousel.querySelector('.carousel-track');
  const slides  = carousel.querySelectorAll('.carousel-slide');
  const prevBtn = carousel.querySelector('.carousel-prev');
  const nextBtn = carousel.querySelector('.carousel-next');
  const dotsEl  = carousel.querySelector('.carousel-dots');

  // Strip native playback controls on init so it acts like a silent GIF
  carousel.querySelectorAll('video').forEach(vid => {
    vid.removeAttribute('controls');
  });

  let current      = 0;
  let autoInterval = null;
  let isHovered    = false;
  let isVisible    = false;

  // ── Build dots ────────────────────────────────────────────────────────
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
    dot.addEventListener('click', () => { goTo(i); resetInterval(); });
    dotsEl.appendChild(dot);
  });

  // Hide controls when only one slide
  if (slides.length <= 1) {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    dotsEl.style.display  = 'none';
  }

  // ── Expand Overlay ────────────────────────────────────────────────────
  const overlay = document.createElement('div');
  overlay.className = 'carousel-expand-overlay';
  overlay.title = 'Click to expand';
  carousel.appendChild(overlay);

  const placeholder = document.createElement('div');
  placeholder.className = 'carousel-placeholder';
  placeholder.style.display = 'none';
  // Insert placeholder right before carousel
  carousel.parentNode.insertBefore(placeholder, carousel);

  overlay.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents bubbling to the carousel's own click listener

    // Show underlay and close button
    globalUnderlay.classList.add('active');
    globalCloseBtn.classList.add('active');

    // Give placeholder the same dimensions so layout doesn't jump
    placeholder.style.width = carousel.offsetWidth + 'px';
    placeholder.style.height = carousel.offsetHeight + 'px';
    placeholder.style.display = 'block';

    // Show native controls in full view
    carousel.querySelectorAll('video').forEach(vid => {
      vid.setAttribute('controls', 'controls');
    });

    // Expand carousel
    carousel.classList.add('expanded');
    document.body.style.overflow = 'hidden'; // prevent background scrolling

    activeExpandCloseFn = () => {
      globalUnderlay.classList.remove('active');
      globalCloseBtn.classList.remove('active');
      
      carousel.classList.remove('expanded');
      
      // Hide native controls again in minified default view
      carousel.querySelectorAll('video').forEach(vid => {
        vid.removeAttribute('controls');
      });

      placeholder.style.display = 'none';
      document.body.style.overflow = '';
      activeExpandCloseFn = null;
    };
  });

  // Close when clicking outside of media in expanded view
  carousel.addEventListener('click', (e) => {
    if (carousel.classList.contains('expanded')) {
      const tag = e.target.tagName.toLowerCase();
      const isMedia = tag === 'img' || tag === 'video' || tag === 'iframe';
      const isControl = e.target.closest('.carousel-btn') || e.target.closest('.carousel-dots');

      if (!isMedia && !isControl) {
        closeExpandedCarousel();
      }
    }
  });

  // ── Core navigation ───────────────────────────────────────────────────
  function goTo(index) {
    const currentVideo = slides[current].querySelector('video');
    if (currentVideo) currentVideo.pause();

    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;

    dotsEl.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });

    const nextVideo = slides[current].querySelector('video');
    if (nextVideo && isVisible) nextVideo.play().catch(() => {});
  }

  // ── Auto-advance interval ─────────────────────────────────────────────
  function startInterval() {
    if (slides.length <= 1 || autoInterval) return;
    autoInterval = setInterval(() => {
      if (isVisible && !isHovered) goTo(current + 1);
    }, AUTOPLAY_DELAY);
  }

  function stopInterval() {
    clearInterval(autoInterval);
    autoInterval = null;
  }

  // Restart interval from zero (after manual interaction)
  function resetInterval() {
    stopInterval();
    if (isVisible && !isHovered) startInterval();
  }

  // ── Hover — pause timer so users can read/interact ────────────────────
  carousel.addEventListener('mouseenter', () => {
    isHovered = true;
  });
  carousel.addEventListener('mouseleave', () => {
    isHovered = false;
  });

  // ── Manual controls ───────────────────────────────────────────────────
  prevBtn.addEventListener('click', () => { goTo(current - 1); resetInterval(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); resetInterval(); });

  carousel.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  { goTo(current - 1); resetInterval(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); resetInterval(); }
  });

  // ── IntersectionObserver — video autoplay + start/stop timer ─────────
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const video = slides[current].querySelector('video');
      if (entry.isIntersecting) {
        isVisible = true;
        if (video) video.play().catch(() => {});
        startInterval();
      } else {
        isVisible = false;
        if (video) video.pause();
        stopInterval();
      }
    });
  }, { threshold: 0.2 }); // fire when 20% of the carousel is visible

  observer.observe(carousel);
});
