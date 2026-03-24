const AUTOPLAY_DELAY = 5000; // ms between auto-advances

document.querySelectorAll('.carousel').forEach(carousel => {
  const track   = carousel.querySelector('.carousel-track');
  const slides  = carousel.querySelectorAll('.carousel-slide');
  const prevBtn = carousel.querySelector('.carousel-prev');
  const nextBtn = carousel.querySelector('.carousel-next');
  const dotsEl  = carousel.querySelector('.carousel-dots');

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
