// js/main.js

// Wait until DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // ── Load Header ───────────────────────────────────────
    fetch('components/header.html')
      .then(response => {
        if (!response.ok) throw new Error('Header fetch failed');
        return response.text();
      })
      .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
        // Once header is loaded → initialize search functionality
        initSearchBar();
      })
      .catch(err => console.error('Error loading header:', err));
  
    // ── Load Footer ───────────────────────────────────────
    fetch('components/footer.html')
      .then(response => {
        if (!response.ok) throw new Error('Footer fetch failed');
        return response.text();
      })
      .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;
      })
      .catch(err => console.error('Error loading footer:', err));
  
    // ── Search bar toggle functionality ───────────────────
    function initSearchBar() {
      const openBtn  = document.getElementById('open-search');
      const closeBtn = document.getElementById('close-search');
      const overlay  = document.getElementById('search-overlay');
  
      // Safety check
      if (!openBtn || !closeBtn || !overlay) {
        console.warn('Search elements not found in header');
        return;
      }
  
      function openSearch() {
        overlay.classList.add('active');
        // Focus input after animation
        setTimeout(() => {
          overlay.querySelector('input')?.focus();
        }, 450);
      }
  
      function closeSearch() {
        overlay.classList.remove('active');
      }
  
      openBtn.addEventListener('click', openSearch);
      closeBtn.addEventListener('click', closeSearch);
  
      // Nice-to-have UX features
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
          closeSearch();
        }
      });
  
      overlay.addEventListener('click', e => {
        if (e.target === overlay) closeSearch();
      });
    }
  });
  