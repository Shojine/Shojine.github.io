// edit file

    // Background dim on scroll
    const heroBg = document.querySelector('.hero-bg');
    window.addEventListener('scroll', () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = window.scrollY / maxScroll;
      heroBg.style.opacity = 0.8 - (progress * 0.78); // fades from 0.5 down to ~0.02
    });

// Cursor — skip entirely on touch devices
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;
    if (!isTouchDevice) {
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    function animateCursor() {
      cursor.style.left = mx - 5 + 'px';
      cursor.style.top  = my - 5 + 'px';
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx - 18 + 'px';
      ring.style.top  = ry - 18 + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a, button, .project-card, .add-project-card, .filter-tab').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2.5)';
        ring.style.width = '60px'; ring.style.height = '60px';
        ring.style.marginLeft = '-12px'; ring.style.marginTop = '-12px';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        ring.style.width = '36px'; ring.style.height = '36px';
        ring.style.marginLeft = '0'; ring.style.marginTop = '0';
      });
    });
    } // end isTouchDevice check

    // Scroll reveal
    const observer = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 100);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Skill ratings
    const labels = ['', 'Novice', 'Advanced Beginner', 'Intermediate', 'Proficient', 'Expert'];
    document.querySelectorAll('.skill-item').forEach(item => {
      const ratingEl = item.querySelector('.skill-rating');
      if (!ratingEl) return;
      const rating = parseInt(ratingEl.dataset.rating);
      const pipContainer = document.createElement('div');
      pipContainer.className = 'skill-pips';
      for (let i = 1; i <= 5; i++) {
        const pip = document.createElement('div');
        pip.className = 'skill-pip' + (i <= rating ? ' filled' : '');
        pipContainer.appendChild(pip);
      }
      const labelEl = document.createElement('div');
      labelEl.className = 'skill-label';
      labelEl.textContent = labels[rating] || '';
      ratingEl.replaceWith(pipContainer);
      item.appendChild(labelEl);
    });

    // Category icons
    const categoryIcons = {
      game: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><line x1="6" y1="12" x2="10" y2="12"></line><line x1="8" y1="10" x2="8" y2="14"></line><line x1="15" y1="13" x2="15.01" y2="13"></line><line x1="18" y1="11" x2="18.01" y2="11"></line></svg>`,
      '3d': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,
      engine: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`
    };
    document.querySelectorAll('.project-card[data-category]').forEach(card => {
      const svg = categoryIcons[card.dataset.category];
      if (svg) {
        const icon = document.createElement('div');
        icon.className = 'card-category-icon';
        icon.innerHTML = svg;
        card.querySelector('.card-inner').appendChild(icon);
      }
    });

    // Filter
    function filterProjects(cat, btn) {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.project-card[data-category]').forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    }

    // Add project
    const phClasses = ['ph-1','ph-2','ph-3','ph-4','ph-5','ph-6'];
    let phIdx = 0;
    function addProject(e) {
      e.preventDefault();
      const title    = document.getElementById('newTitle').value;
      const tag      = document.getElementById('newTag').value;
      const desc     = document.getElementById('newDesc').value;
      const category = document.getElementById('newCategory').value;
      const link     = document.getElementById('newLink').value || '#';

      const grid = document.getElementById('portfolioGrid');
      const addCard = grid.querySelector('.add-project-card');

      const card = document.createElement('div');
      card.className = 'project-card';
      card.dataset.category = category;
      card.style.gridColumn = 'span 4';

      const ph = phClasses[phIdx % phClasses.length]; phIdx++;
      card.innerHTML = `
        <div class="card-inner">
          <div class="placeholder-visual ${ph}">
            <div class="ph-pattern"></div>
            <div class="ph-dot"></div>
          </div>
          <div class="card-overlay">
            <div class="card-tag">${tag}</div>
            <div class="card-title">${title}</div>
            <div class="card-desc">${desc}</div>
            <a href="${link}" class="card-link">View Project →</a>
          </div>
        </div>`;

      if (categoryIcons[category]) {
        const icon = document.createElement('div');
        icon.className = 'card-category-icon';
        icon.innerHTML = categoryIcons[category];
        card.querySelector('.card-inner').appendChild(icon);
      }

      grid.insertBefore(card, addCard);
      document.getElementById('addModal').classList.remove('open');
      e.target.reset();

      // Hover cursor on new card
      card.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2.5)';
        ring.style.width = '60px'; ring.style.height = '60px';
      });
      card.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        ring.style.width = '36px'; ring.style.height = '36px';
      });
    }

    // Close modal on overlay click
    document.getElementById('addModal').addEventListener('click', function(e) {
      if (e.target === this) this.classList.remove('open');
    });

    // Project modal
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.card-link')) return;
        const title = card.querySelector('.card-title').textContent;
        const desc = card.querySelector('.card-desc').textContent;
        const videoSrc = card.dataset.video;
        const imageSrc = card.querySelector('.card-visual').src;

        const linkHref = card.querySelector('.card-link')?.href || '#';
        const tag = card.querySelector('.card-tag')?.textContent || '';

        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalDesc').textContent = desc;
        document.getElementById('modalTag').textContent = tag;
        const modalLink = document.getElementById('modalLink');
        modalLink.href = linkHref;
        modalLink.style.display = (linkHref && linkHref !== window.location.href && !linkHref.endsWith('#')) ? '' : 'none';

        const videoContainer = document.getElementById('modalVideoContainer');
        const imageContainer = document.getElementById('modalImageContainer');
        const iframeContainer = document.getElementById('modalIframeContainer');
        const video = document.getElementById('modalVideo');
        const image = document.getElementById('modalImage');
        const iframe = document.getElementById('modalIframe');

        if (videoSrc && videoSrc.includes('drive.google.com')) {
          // Extract file ID and build embed URL
          const match = videoSrc.match(/\/d\/([^/]+)/);
          const embedUrl = match ? `https://drive.google.com/file/d/${match[1]}/preview` : videoSrc;
          iframe.src = embedUrl;
          iframeContainer.style.display = 'block';
          videoContainer.style.display = 'none';
          imageContainer.style.display = 'none';
        } else if (videoSrc) {
          document.getElementById('modalVideoSrc').src = videoSrc;
          video.load();
          videoContainer.style.display = 'block';
          iframeContainer.style.display = 'none';
          imageContainer.style.display = 'none';
        } else {
          image.src = imageSrc;
          imageContainer.style.display = 'block';
          videoContainer.style.display = 'none';
          iframeContainer.style.display = 'none';
        }

        document.getElementById('projectModal').classList.add('open');
      });
    });

    function closeProjectModal() {
      document.getElementById('projectModal').classList.remove('open');
      const video = document.getElementById('modalVideo');
      video.pause();
      video.currentTime = 0;
      document.getElementById('modalIframe').src = '';
    }