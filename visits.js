const renderVisitCounter = async () => {
  const footer = document.querySelector('.footer');
  if (!footer) {
    return;
  }

  const counterLine = document.createElement('div');
  counterLine.className = 'footer-counter';
  counterLine.textContent = 'Total visits: loading...';
  footer.appendChild(counterLine);

  const renderLocalFallback = () => {
    const localKey = 'site-local-visit-count';
    const sessionKey = 'site-local-visit-counted';
    const hasCountedInSession = sessionStorage.getItem(sessionKey) === '1';

    let localCount = Number(localStorage.getItem(localKey) || '0');
    if (!hasCountedInSession) {
      localCount += 1;
      localStorage.setItem(localKey, String(localCount));
      sessionStorage.setItem(sessionKey, '1');
    }

    counterLine.textContent = `Visits (this browser): ${localCount.toLocaleString()}`;
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
    renderLocalFallback();
  }
};

renderVisitCounter();
