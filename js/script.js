/* ============================================================
   VENNEVE — Steven Filbert
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Year ---------- */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Nav: mobile toggle ---------- */
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  const closeNav = () => {
    navLinks.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  };

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
    });

    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* ---------- Nav: hairline on scroll ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (nav) nav.classList.toggle('is-stuck', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Hero: typed status line ---------- */
  const target = document.getElementById('typetext');
  if (target) {
    const lines = [
      'AZ-900 / MS-900 certified',
      'Active Directory home lab, domain to permissions',
      'ServiceNow + ITIL, built and documented',
      'Splunk detection labs, Sydney based',
      '3+ years front line, 100-150 people a shift'
    ];

    if (reduced) {
      target.textContent = lines[0];
    } else {
      let li = 0, ci = 0, deleting = false;

      const tick = () => {
        const full = lines[li];
        ci = deleting ? ci - 1 : ci + 1;
        target.textContent = full.slice(0, ci);

        let wait = deleting ? 26 : 52;

        if (!deleting && ci === full.length) { wait = 2100; deleting = true; }
        else if (deleting && ci === 0) { deleting = false; li = (li + 1) % lines.length; wait = 320; }

        setTimeout(tick, wait);
      };
      tick();
    }
  }

  /* ---------- Reveal on scroll ---------- */
  const revealables = document.querySelectorAll('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    revealables.forEach(el => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        setTimeout(() => entry.target.classList.add('is-in'), i * 70);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealables.forEach(el => io.observe(el));
  }

  /* ---------- Gallery ---------- */
  const galleries = {
    activedirectory: [
      'images/active_directory_lab/09-ou-structure.png',
      'images/active_directory_lab/16-search-lockedout.png',
      'images/active_directory_lab/23-gpresult-before.png',
      'images/active_directory_lab/25-gpresult-after.png',
      'images/active_directory_lab/29-share-and-ntfs-acl.png',
      'images/active_directory_lab/31-sfilbert-denied.png'
    ],
    safeus: [
      'images/safeus/HomeScreen.png',
      'images/safeus/LoginScreen.png',
      'images/safeus/SignupScreen.png',
      'images/safeus/UploadScreen.png',
      'images/safeus/ArticleScreen.png',
      'images/safeus/StatusScreen.png',
      'images/safeus/ReportDetailScreen.png',
      'images/safeus/ProfileScreen.png'
    ],
    kerberoasting: [
      'images/kerberoasting_troubleshooting_lab/01-dashboard.png',
      'images/kerberoasting_troubleshooting_lab/02-raw-events.png',
      'images/kerberoasting_troubleshooting_lab/03-extracted-table.png',
      'images/kerberoasting_troubleshooting_lab/04-encryption-baseline.png',
      'images/kerberoasting_troubleshooting_lab/05-detection.png',
      'images/kerberoasting_troubleshooting_lab/06-source-ip-volume.png'
    ],
    servicenow: [
      'images/servicenow/all-tickets-overview.png',
      'images/servicenow/01-view-switch.png',
      'images/servicenow/02-incident-logged.png',
      'images/servicenow/03-incident-resolved.png',
      'images/servicenow/04-vpn-escalation.png',
      'images/servicenow/05-p1-major-incident.png'
    ],
    // Drop SecureLink dashboard screenshots in here when you have them.
    securelink: []
  };

  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const modalCount = document.getElementById('modalCount');
  const btnClose = document.getElementById('modalClose');
  const btnPrev = document.getElementById('modalPrev');
  const btnNext = document.getElementById('modalNext');

  let shots = [];
  let idx = 0;
  let lastFocused = null;

  const paint = () => {
    modalImg.src = shots[idx];
    modalImg.alt = `Project screenshot ${idx + 1} of ${shots.length}`;
    modalCount.textContent = `${idx + 1} / ${shots.length}`;
    const multi = shots.length > 1;
    btnPrev.style.display = multi ? '' : 'none';
    btnNext.style.display = multi ? '' : 'none';
  };

  const open = key => {
    shots = galleries[key] || [];
    if (!shots.length) return;
    idx = 0;
    lastFocused = document.activeElement;
    paint();
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    btnClose.focus();
  };

  const close = () => {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  };

  const step = n => {
    if (!shots.length) return;
    idx = (idx + n + shots.length) % shots.length;
    paint();
  };

  document.querySelectorAll('[data-gallery]').forEach(btn => {
    btn.addEventListener('click', () => open(btn.dataset.gallery));
  });

  if (modal) {
    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', () => step(-1));
    btnNext.addEventListener('click', () => step(1));
    modal.addEventListener('click', e => { if (e.target === modal) close(); });

    document.addEventListener('keydown', e => {
      if (!modal.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    });
  }
});