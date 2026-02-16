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

  try {
    const namespace = 'abhijitmishra-github-io';
    const key = 'total-visits';
    const response = await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`);

    if (!response.ok) {
      throw new Error(`Counter request failed: ${response.status}`);
    }

    const data = await response.json();
    const count = typeof data.value === 'number' ? data.value : 0;
    counterLine.textContent = `Total visits: ${count.toLocaleString()}`;
  } catch {
    counterLine.textContent = 'Total visits: unavailable';
  }
};

renderVisitCounter();
