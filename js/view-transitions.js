(function () {
  if (!document.startViewTransition) return;

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var id = link.getAttribute('href');
    if (!id || id === '#') return;
    var target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    document.startViewTransition(function () {
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();
