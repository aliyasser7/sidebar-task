document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggleBtn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const content = document.querySelector('.content');

  // initialize toggle icon based on width
  function setInitialIcon() {
    if (window.innerWidth >= 769) {
      // desktop: sidebar visible by default -> show "✖" to indicate can close
      toggleBtn.textContent = sidebar.classList.contains('collapsed') ? '☰' : '✖';
    } else {
      // mobile: sidebar hidden by default -> show hamburger
      toggleBtn.textContent = sidebar.classList.contains('active') ? '✖' : '☰';
    }
  }
  setInitialIcon();

  function openMobile() {
    sidebar.classList.add('active');
    overlay.classList.add('active');
    sidebar.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
    toggleBtn.textContent = '✖';
  }

  function closeMobile() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    sidebar.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    toggleBtn.textContent = '☰';
  }

  function collapseDesktop() {
    sidebar.classList.add('collapsed');
    content.classList.add('shift');
    toggleBtn.textContent = '☰';
  }

  function expandDesktop() {
    sidebar.classList.remove('collapsed');
    content.classList.remove('shift');
    toggleBtn.textContent = '✖';
  }

  toggleBtn.addEventListener('click', () => {
    if (window.innerWidth >= 769) {
      // desktop: collapse/expand
      if (sidebar.classList.contains('collapsed')) {
        expandDesktop();
      } else {
        collapseDesktop();
      }
    } else {
      // mobile: open/close overlay panel
      if (sidebar.classList.contains('active')) {
        closeMobile();
      } else {
        openMobile();
      }
    }
  });

  // clicking overlay closes mobile sidebar
  overlay.addEventListener('click', () => {
    closeMobile();
  });

  // keep state consistent on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 769) {
      // leaving mobile view
      overlay.classList.remove('active');
      sidebar.classList.remove('active');
      sidebar.setAttribute('aria-hidden', 'false');
      // if collapsed state is not set, ensure sidebar visible
      if (!sidebar.classList.contains('collapsed')) {
        content.classList.remove('shift');
        toggleBtn.textContent = '✖';
      } else {
        content.classList.add('shift');
        toggleBtn.textContent = '☰';
      }
    } else {
      // entering mobile view
      // remove desktop collapse class so mobile toggle works predictably
      sidebar.classList.remove('collapsed');
      content.classList.remove('shift');
      toggleBtn.textContent = '☰';
    }
  });
});
