document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggleBtn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const content = document.querySelector('.content');

  
  function setInitialIcon() {
    if (window.innerWidth >= 769) {
      
      toggleBtn.textContent = sidebar.classList.contains('collapsed') ? '☰' : '✖';
    } else {
      
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
      
      if (sidebar.classList.contains('collapsed')) {
        expandDesktop();
      } else {
        collapseDesktop();
      }
    } else {
      
      if (sidebar.classList.contains('active')) {
        closeMobile();
      } else {
        openMobile();
      }
    }
  });

  
  overlay.addEventListener('click', () => {
    closeMobile();
  });

  
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 769) {
      
      overlay.classList.remove('active');
      sidebar.classList.remove('active');
      sidebar.setAttribute('aria-hidden', 'false');
      
      if (!sidebar.classList.contains('collapsed')) {
        content.classList.remove('shift');
        toggleBtn.textContent = '✖';
      } else {
        content.classList.add('shift');
        toggleBtn.textContent = '☰';
      }
    } else {
      
      sidebar.classList.remove('collapsed');
      content.classList.remove('shift');
      toggleBtn.textContent = '☰';
    }
  });
});
