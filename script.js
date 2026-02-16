const observed = document.querySelectorAll('.panel, .tile, .mini-card');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  },
  { threshold: 0.12 }
);

observed.forEach((item) => revealObserver.observe(item));

const renderVisitCounter = async () => {
  const footer = document.querySelector('.footer');
  if (!footer) {
    return;
  }

  const counterLine = document.createElement('div');
  counterLine.className = 'footer-counter';
  counterLine.textContent = 'Total visits: loading...';
  footer.appendChild(counterLine);

  const renderBadgeFallback = () => {
    counterLine.textContent = 'Total visits:';
    const badgeWrap = document.createElement('div');
    badgeWrap.className = 'footer-counter-badge';
    badgeWrap.innerHTML = '<img alt="Visit counter" src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fabhijitmishra.github.io&count_bg=%23C789FF&title_bg=%2352439E&icon=github.svg&icon_color=%23E7E7E7&title=visits&edge_flat=false" />';
    footer.appendChild(badgeWrap);
  };

  try {
    const namespace = 'abhijitmishra-github-io';
    const key = 'total-visits';

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4500);
    const response = await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Counter request failed: ${response.status}`);
    }

    const data = await response.json();
    const count = typeof data.value === 'number' ? data.value : 0;
    counterLine.textContent = `Total visits: ${count.toLocaleString()}`;
  } catch {
    renderBadgeFallback();
  }
};

renderVisitCounter();
