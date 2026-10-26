const menuButton=document.querySelector('.menu-toggle');
const menu=document.querySelector('#navigation');
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menu.classList.toggle('is-open',open);menuButton.querySelector('span').textContent=open?'−':'＋'});
menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{menuButton.setAttribute('aria-expanded','false');menu.classList.remove('is-open');menuButton.querySelector('span').textContent='＋'}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('is-open')){menuButton.click();menuButton.focus()}});
const photos=[...document.querySelectorAll('.gallery-photo')];
const box=document.querySelector('.lightbox');
if(box && photos.length){let current=0;const display=(i)=>{current=(i+photos.length)%photos.length;const original=photos[current].querySelector('img');const img=box.querySelector('figure img');img.src=original.src;img.alt=original.alt;box.querySelector('figcaption').textContent=`${current+1} / ${photos.length} · ${original.alt}`;};photos.forEach((p,i)=>p.addEventListener('click',()=>{display(i);box.showModal();document.body.classList.add('modal-open')}));box.querySelector('.lightbox-close').addEventListener('click',()=>box.close());box.querySelector('.lightbox-prev').addEventListener('click',()=>display(current-1));box.querySelector('.lightbox-next').addEventListener('click',()=>display(current+1));box.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();display(current+1)}if(e.key==='ArrowLeft'){e.preventDefault();display(current-1)}});box.addEventListener('click',e=>{if(e.target===box)box.close()});box.addEventListener('close',()=>{document.body.classList.remove('modal-open');photos[current].focus()});if(photos.length===1){box.querySelector('.lightbox-prev').hidden=true;box.querySelector('.lightbox-next').hidden=true;}}

// Progressive enhancement: all content remains visible without JavaScript.
// A wider reset boundary prevents flicker when items cross the viewport edge.
(() => {
  if (!('IntersectionObserver' in window)) return;
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const items = [...document.querySelectorAll('.hero-copy > *, .hero-visual, .brand-strip, .section-heading, .portfolio-card, .portfolio > .demo-note, .portrait-space, .about-copy > *, .gallery-heading > *, .category-nav, .gallery-intro > .demo-note, .gallery-photo, .sports-empty, .gallery-end, .contact-section > *, .footer-pattern, footer > *')];
  let entranceObserver, resetObserver;
  function configureMotion() {
    entranceObserver?.disconnect();
    resetObserver?.disconnect();
    items.forEach(item => item.classList.remove('scroll-reveal', 'is-visible'));
    if (motionPreference.matches) return;
    entranceObserver = new IntersectionObserver(entries => {
      entries.forEach(({target, isIntersecting}) => {
        if (isIntersecting) target.classList.add('is-visible');
      });
    }, {rootMargin: '0px 0px -40px 0px', threshold: 0});
    resetObserver = new IntersectionObserver(entries => {
      entries.forEach(({target, isIntersecting}) => {
        if (!isIntersecting && !target.contains(document.activeElement)) target.classList.remove('is-visible');
      });
    }, {rootMargin: '64px 0px 64px 0px', threshold: 0});
    items.forEach(item => {
      item.classList.add('scroll-reveal');
      entranceObserver.observe(item);
      resetObserver.observe(item);
    });
  }
  document.addEventListener('focusin', event => {
    event.target.closest('.scroll-reveal')?.classList.add('is-visible');
  });
  motionPreference.addEventListener('change', configureMotion);
  configureMotion();
})();
