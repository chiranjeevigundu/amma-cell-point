document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Business Hours Status
  updateStoreStatus();
  // Update status every minute
  setInterval(updateStoreStatus, 60000);

  // 2. Mobile Menu Toggle
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      
      // Animate burger lines
      const spans = menuBtn.querySelectorAll('span');
      if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = menuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // 3. Header Scroll Effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.backgroundColor = 'rgba(11, 15, 25, 0.95)';
      header.style.padding = '0.5rem 0';
      header.querySelector('.nav-container').style.height = '60px';
    } else {
      header.style.backgroundColor = 'rgba(11, 15, 25, 0.8)';
      header.style.padding = '0';
      header.querySelector('.nav-container').style.height = '80px';
    }
  });
});

/**
 * Calculates whether the store is open or closed based on current Indian Standard Time (IST) (9:00 AM - 9:00 PM)
 * and updates the DOM elements.
 */
function updateStoreStatus() {
  const statusIndicator = document.getElementById('statusIndicator');
  const statusText = document.getElementById('statusText');
  
  if (!statusIndicator || !statusText) return;

  // Get current hour in Indian Standard Time (IST - Asia/Kolkata timezone)
  const now = new Date();
  let currentHour;

  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      hour: 'numeric',
      hour12: false
    });
    // Strip non-numeric characters (handles LTR/RTL mark differences in browsers)
    currentHour = parseInt(formatter.format(now).replace(/\D/g, ''), 10);
  } catch (error) {
    // Fallback to client browser time if Intl is not supported
    currentHour = now.getHours();
  }
  
  const openHour = 9;   // 9:00 AM IST
  const closeHour = 21; // 9:00 PM IST

  // Check if store is open
  const isOpen = currentHour >= openHour && currentHour < closeHour;

  // Reset classes
  statusIndicator.className = 'badge-status';

  if (isOpen) {
    statusIndicator.classList.add('open');
    statusText.textContent = 'Open Now (9:00 AM - 9:00 PM IST)';
    statusText.style.color = 'var(--accent-emerald)';
  } else {
    statusIndicator.classList.add('closed');
    statusText.textContent = 'Closed Now (Opens at 9:00 AM IST)';
    statusText.style.color = 'var(--accent-rose)';
  }
}
