const LOGO = 'logo.png';
['navLogo', 'heroLogo', 'ftLogo'].forEach(id => { const el = document.getElementById(id); if (el) el.src = LOGO; });

// NAV
const nav = document.getElementById('nav');
const ham = document.getElementById('ham');
const mob = document.getElementById('mobNav');
window.addEventListener('scroll', () => nav.classList.toggle('stuck', scrollY > 50), { passive: true });
ham.addEventListener('click', () => mob.classList.toggle('open'));
function cm() { mob.classList.remove('open'); }

// PARALLAX
const heroBg = document.querySelector('.hero-photo');
window.addEventListener('scroll', () => {
    if (scrollY < innerHeight * 1.2) heroBg.style.transform = `translateY(${scrollY * 0.18}px)`;
}, { passive: true });

// REVEAL
const allRv = document.querySelectorAll('.rv,.rvl,.rvr,.rvu');
const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
}, { threshold: 0.1 });
allRv.forEach(el => obs.observe(el));

// COUNTERS
const cnts = document.querySelectorAll('.about-stat-n[data-t]');
let cDone = false;
const cObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting && !cDone) {
            cDone = true;
            cnts.forEach(c => {
                const t = +c.getAttribute('data-t');
                let v = 0; const s = Math.ceil(t / 60);
                const tm = setInterval(() => { v = Math.min(v + s, t); c.textContent = '+' + v; if (v >= t) clearInterval(tm); }, 22);
            });
        }
    });
}, { threshold: .3 });
if (cnts.length) cObs.observe(cnts[0]);

// LIGHTBOX
const lbEl = document.getElementById('lb');
const lbImg = document.getElementById('lbImg');
document.querySelectorAll('.gal-item').forEach(it => {
    it.addEventListener('click', () => {
        lbImg.src = it.getAttribute('data-src');
        lbEl.classList.add('on');
        document.body.style.overflow = 'hidden';
    });
});
function closeLb() { lbEl.classList.remove('on'); document.body.style.overflow = ''; }
document.getElementById('lbX').addEventListener('click', closeLb);
lbEl.addEventListener('click', e => { if (e.target === lbEl) closeLb(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });

// TESTIMONIAL SLIDER
const tt = document.getElementById('tTrack');
const pips = document.querySelectorAll('.t-pip');
let ci = 0, ato;
function gTo(i) { ci = (i + 3) % 3; tt.style.transform = `translateX(-${ci * 100}%)`; pips.forEach((p, x) => p.classList.toggle('on', x === ci)); }
function rAto() { clearInterval(ato); ato = setInterval(() => gTo(ci + 1), 5500); }
document.getElementById('tNext').addEventListener('click', () => { gTo(ci + 1); rAto(); });
document.getElementById('tPrev').addEventListener('click', () => { gTo(ci - 1); rAto(); });
pips.forEach(p => p.addEventListener('click', () => { gTo(+p.getAttribute('data-i')); rAto(); }));
ato = setInterval(() => gTo(ci + 1), 5500);

// FORM
const form = document.getElementById('cForm');
function se(id, eid, show) { document.getElementById(id).classList.toggle('e', show); const el = document.getElementById(eid); if (el) el.classList.toggle('show', show); }
form.addEventListener('submit', e => {
    e.preventDefault(); let ok = true;
    const n = document.getElementById('fN').value.trim();
    const em = document.getElementById('fE').value.trim();
    const m = document.getElementById('fM').value.trim();
    if (!n) { se('fN', 'eN', true); ok = false; } else se('fN', 'eN', false);
    if (!em || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) { se('fE', 'eE', true); ok = false; } else se('fE', 'eE', false);
    if (!m) { se('fM', 'eM', true); ok = false; } else se('fM', 'eM', false);
    if (ok) {
        const b = form.querySelector('.f-submit'); b.textContent = 'Envoi…'; b.disabled = true;
        setTimeout(() => { document.getElementById('fBody').style.display = 'none'; document.getElementById('fOk').classList.add('show'); }, 900);
    }
});
['fN', 'fE', 'fM'].forEach(id => { document.getElementById(id).addEventListener('input', () => { const m = { 'fN': 'eN', 'fE': 'eE', 'fM': 'eM' }; se(id, m[id], false); }); });