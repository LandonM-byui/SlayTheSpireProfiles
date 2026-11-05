export function initMenu() {
  const trigger = document.querySelector('.menu-trigger');
  const menu = document.querySelector('#site-menu');
  if (!trigger || !menu) return;
  const links = [...menu.querySelectorAll('a')];
  function setOpen(open, focusTarget = false) {
    trigger.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    if (open && focusTarget) links[0]?.focus();
    if (!open && focusTarget) trigger.focus();
  }
  trigger.addEventListener('click', () => setOpen(trigger.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && trigger.getAttribute('aria-expanded') === 'true') {
      event.preventDefault(); setOpen(false, true);
    }
  });
  document.addEventListener('pointerdown', (event) => {
    if (!trigger.parentElement.contains(event.target)) setOpen(false);
  });
  document.addEventListener('focusin', (event) => {
    if (!trigger.parentElement.contains(event.target)) setOpen(false);
  });
  links.forEach((link) => link.addEventListener('click', () => setOpen(false)));
}
