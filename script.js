/* ============================================================
   SNAKEPISS - MAIN SCRIPT
   ============================================================ */

document.getElementById('year').textContent = new Date().getFullYear();

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);

  const spans = navToggle.querySelectorAll('span');
  if (open) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(span => {
      span.style.transform = '';
      span.style.opacity = '';
    });
  }
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.querySelectorAll('span').forEach(span => {
      span.style.transform = '';
      span.style.opacity = '';
    });
  });
});

const showsList = document.getElementById('showsList');
const monthFmt = new Intl.DateTimeFormat('en-US', { month: 'short' });

function getEventLink(event) {
  const offer = Array.isArray(event.offers) ? event.offers.find(item => item.url) : null;
  return offer?.url || event.url || '#';
}

function getEventCity(venue) {
  return [venue?.city, venue?.region, venue?.country].filter(Boolean).join(', ');
}

function renderShows(events) {
  if (!showsList) return;

  if (!Array.isArray(events) || events.length === 0) {
    showsList.innerHTML = `
      <div class="no-shows">
        <p>NO SHOWS CURRENTLY SCHEDULED.</p>
        <p>FOLLOW US TO STAY UPDATED.</p>
      </div>
    `;
    return;
  }

  showsList.innerHTML = events.map(event => {
    const date = new Date(event.datetime);
    const venue = event.venue || {};
    const lineup = Array.isArray(event.lineup)
      ? event.lineup.filter(name => name.toUpperCase() !== 'SNAKEPISS')
      : [];
    const link = getEventLink(event);
    const button = link === '#'
      ? '<span class="ticket-btn sold-out">INFO SOON</span>'
      : `<a href="${link}" target="_blank" rel="noopener" class="ticket-btn">TICKETS</a>`;

    return `
      <div class="show-item">
        <div class="show-date">
          <span class="show-day">${String(date.getDate()).padStart(2, '0')}</span>
          <span class="show-month">${monthFmt.format(date).toUpperCase()}</span>
          <span class="show-year">${date.getFullYear()}</span>
        </div>
        <div class="show-info">
          <div class="show-venue">${venue.name || event.title || 'VENUE TBA'}</div>
          <div class="show-city">${getEventCity(venue) || 'CITY TBA'}</div>
          <div class="show-support">${lineup.length ? `w/ ${lineup.join(', ')}` : 'SNAKEPISS LIVE'}</div>
        </div>
        <div class="show-action">${button}</div>
      </div>
    `;
  }).join('');
}

renderShows(window.SNAKEPISS_SHOWS);

const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(
  '.show-item, .merch-item, .about-text, .about-visual, .embed-block, .merch-notice'
).forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.55s ease ${i * 0.05}s, transform 0.55s ease ${i * 0.05}s`;
  observer.observe(el);
});

const style = document.createElement('style');
style.textContent = `.visible { opacity: 1 !important; transform: none !important; }`;
document.head.appendChild(style);

document.querySelectorAll('.show-item[data-soldout="true"]').forEach(item => {
  const btn = item.querySelector('.ticket-btn');
  if (btn && !btn.classList.contains('sold-out')) {
    btn.classList.add('sold-out');
    btn.textContent = 'SOLD OUT';
    btn.removeAttribute('href');
  }
});
