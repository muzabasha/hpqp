const routes = [];
export function route(pattern, render) { routes.push({ pattern, render }); }
export function startRouter() {
  const renderRoute = () => {
    const path = window.location.hash.slice(1) || '/';
    const match = routes.find(({ pattern }) => pattern.test(path));
    const app = document.querySelector('#app');
    if (!match) { window.location.hash = '#/'; return; }
    try {
      match.render(path, app);
      globalThis.MathJax?.typesetPromise?.([app]).catch(e => console.warn('MathJax error:', e));
    } catch (error) {
      console.error('Route render error:', error);
      app.innerHTML = `<div class="hero"><div class="eyebrow">Rendering Error</div><h1>Something went wrong</h1><p class="lede">${error.message}</p><div class="actions"><a class="button primary" href="#/">Return home</a></div></div>`;
    }
    app.focus({ preventScroll: true });
    document.querySelectorAll('.side-link').forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${path}`));
  };
  window.addEventListener('hashchange', renderRoute);
  window.addEventListener('DOMContentLoaded', renderRoute);
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(renderRoute, 1);
  }
}