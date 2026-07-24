const routes = [];
export function route(pattern, render) { routes.push({ pattern, render }); }
export function startRouter() {
  const renderRoute = () => {
    const path = window.location.hash.slice(1) || '/';
    const match = routes.find(({ pattern }) => pattern.test(path));
    const app = document.querySelector('#app');
    if (!match) { window.location.hash = '#/'; return; }
    match.render(path, app);
    app.focus({ preventScroll: true });
    document.querySelectorAll('.side-link').forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${path}`));
  };
  window.addEventListener('hashchange', renderRoute);
  renderRoute();
}