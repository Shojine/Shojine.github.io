// edit file
// Cursor 
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;
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

    // Scroll reveal
    const observer = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 100);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Skill bars
    const skillObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
            bar.style.width = bar.dataset.width + '%';
          });
        }
      });
    }, { threshold: 0.3 });
    document.querySelectorAll('.skills-list').forEach(el => skillObserver.observe(el));

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