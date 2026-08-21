/**
 * Inline script (string) injected into <head> during SSR so the correct theme
 * class is applied BEFORE first paint — prevents a flash of the wrong theme.
 *
 * Logic:
 *  - If the visitor previously chose a theme, honor it ("light" | "dark").
 *  - Otherwise follow the OS preference via `prefers-color-scheme`.
 *  - While no explicit choice is stored, keep listening to OS changes live.
 */
export const themeScript = `
(function () {
  try {
    var root = document.documentElement;
    var mql = window.matchMedia('(prefers-color-scheme: dark)');
    var stored = localStorage.getItem('theme');

    function apply(isDark) {
      root.classList.toggle('dark', isDark);
    }

    if (stored === 'dark' || stored === 'light') {
      apply(stored === 'dark');
    } else {
      apply(mql.matches);
      var onChange = function (e) {
        if (localStorage.getItem('theme') === null) {
          apply(e.matches);
        } else {
          mql.removeEventListener('change', onChange);
        }
      };
      mql.addEventListener('change', onChange);
    }
  } catch (e) {}
})();
`;
