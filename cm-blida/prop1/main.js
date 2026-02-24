const logoSrc = 'logo.png';
document.getElementById('navLogo').src = logoSrc;
document.getElementById('ftLogo').src = logoSrc;

// NAV
const nav = document.getElementById('navbar');
const burger = document.getElementById('burger');
const mob = document.getElementById('mobMenu');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 50), { passive: true });
burger.addEventListener('click', () => mob.classList.toggle('open'));
function cmob() { mob.classList.remove('open') }

// PARALLAX
const hbg = document.getElementById('heroBg');
window.addEventListener('scroll', () => {
    if (scrollY < innerHeight) hbg.style.transform = `scale(1.08) translateY(${scrollY * 0.22}px)`;
}, { passive: true });

// REVEAL
const rvEls = document.querySelectorAll('.reveal,.reveal-l,.reveal-r');
const rvObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); rvObs.unobserve(e.target) } });
}, { threshold: 0.1 });
rvEls.forEach(el => rvObs.observe(el));

// COUNTERS
const cEls = document.querySelectorAll('.stat-n[data-target]');
let cDone = false;
const cObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting && !cDone) {
            cDone = true;
            cEls.forEach(c => {
                const t = +c.getAttribute('data-target');
                let v = 0; const s = Math.ceil(t / 60);
                const tm = setInterval(() => { v = Math.min(v + s, t); c.textContent = '+' + v; if (v >= t) clearInterval(tm) }, 22);
            });
        }
    });
}, { threshold: 0.3 });
if (cEls.length) cObs.observe(cEls[0]);

// LIGHTBOX
const lb = document.getElementById('lb');
const lbImg = document.getElementById('lbImg');
document.querySelectorAll('.gal-item').forEach(it => {
    it.addEventListener('click', () => {
        lbImg.src = it.getAttribute('data-src');
        lb.classList.add('on');
        document.body.style.overflow = 'hidden';
    });
});
function closeLb() { lb.classList.remove('on'); document.body.style.overflow = '' }
document.getElementById('lbX').addEventListener('click', closeLb);
lb.addEventListener('click', e => { if (e.target === lb) closeLb() });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb() });

// SLIDER
const tt = document.getElementById('tTrack');
const dots = document.querySelectorAll('.testi-dot');
let ci = 0; let at;
function gTo(i) { ci = (i + 3) % 3; tt.style.transform = `translateX(-${ci * 100}%)`; dots.forEach((d, x) => d.classList.toggle('on', x === ci)) }
function rAt() { clearInterval(at); at = setInterval(() => gTo(ci + 1), 5500) }
document.getElementById('tNext').addEventListener('click', () => { gTo(ci + 1); rAt() });
document.getElementById('tPrev').addEventListener('click', () => { gTo(ci - 1); rAt() });
dots.forEach(d => d.addEventListener('click', () => { gTo(+d.getAttribute('data-i')); rAt() }));
at = setInterval(() => gTo(ci + 1), 5500);

// FORM
const form = document.getElementById('cForm');
function se(id, eid, show) {
    document.getElementById(id).classList.toggle('err', show);
    const e = document.getElementById(eid); if (e) e.classList.toggle('on', show);
}
form.addEventListener('submit', e => {
    e.preventDefault(); let ok = true;
    const n = document.getElementById('fNom').value.trim();
    const em = document.getElementById('fEmail').value.trim();
    const m = document.getElementById('fMsg').value.trim();
    if (!n) { se('fNom', 'eNom', true); ok = false } else se('fNom', 'eNom', false);
    if (!em || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) { se('fEmail', 'eEmail', true); ok = false } else se('fEmail', 'eEmail', false);
    if (!m) { se('fMsg', 'eMsg', true); ok = false } else se('fMsg', 'eMsg', false);
    if (ok) {
        const b = form.querySelector('.submit-btn'); b.textContent = 'Envoi…'; b.disabled = true;
        setTimeout(() => { document.getElementById('fBody').style.display = 'none'; document.getElementById('fDone').classList.add('on') }, 900);
    }
});
['fNom', 'fEmail', 'fMsg'].forEach(id => document.getElementById(id).addEventListener('input', () => se(id, 'e' + id.slice(1).replace('om', 'Nom').replace('mail', 'Email').replace('sg', 'Msg'), false)));