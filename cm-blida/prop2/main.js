// ─── CURSOR
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
});

function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
}
animRing();

document.querySelectorAll('a, button, .g-item, .service-tile, .news-article').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '18px';
        cursor.style.height = '18px';
        ring.style.width = '60px';
        ring.style.height = '60px';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        ring.style.width = '36px';
        ring.style.height = '36px';
    });
});

// ─── NAV
const nav = document.getElementById('navbar');
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');

window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

burger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
});

function closeMob() { mobileNav.classList.remove('open'); }

// ─── HERO PARALLAX
const heroBg = document.getElementById('heroBg');
window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
        heroBg.style.transform = `scale(1.06) translateY(${window.scrollY * 0.22}px)`;
    }
}, { passive: true });

// ─── SCROLL REVEAL
const allReveal = document.querySelectorAll('.reveal, .reveal-l, .reveal-r');
const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('in');
            revObs.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });
allReveal.forEach(el => revObs.observe(el));

// ─── COUNTERS + STAT BARS
const counts = document.querySelectorAll('.count[data-target]');
const statBlocks = document.querySelectorAll('.stat-block');
let counted = false;

const cntObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting && !counted) {
            counted = true;
            counts.forEach(c => {
                const target = +c.getAttribute('data-target');
                let cur = 0;
                const step = Math.ceil(target / 60);
                const t = setInterval(() => {
                    cur = Math.min(cur + step, target);
                    c.textContent = cur;
                    if (cur >= target) clearInterval(t);
                }, 22);
            });
            statBlocks.forEach(b => b.classList.add('in'));
        }
    });
}, { threshold: 0.3 });
if (counts.length) cntObs.observe(counts[0]);

// ─── GALLERY LIGHTBOX
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbClose = document.getElementById('lbClose');

document.querySelectorAll('.g-item').forEach(item => {
    item.addEventListener('click', () => {
        lbImg.src = item.getAttribute('data-src');
        lbImg.alt = item.getAttribute('data-cap') || '';
        lb.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function closeLb() { lb.classList.remove('active'); document.body.style.overflow = ''; }
lbClose.addEventListener('click', closeLb);
lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });

// ─── TESTIMONIAL SLIDER
const track = document.getElementById('testiTrack');
const progs = document.querySelectorAll('.testi-prog-item');
let cur = 0;
const total = 3;
let auto;

function goTo(i) {
    cur = (i + total) % total;
    track.style.transform = `translateX(-${cur * 100}%)`;
    progs.forEach((p, idx) => p.classList.toggle('active', idx === cur));
}

function resetAuto() { clearInterval(auto); auto = setInterval(() => goTo(cur + 1), 5500); }

document.getElementById('tNext').addEventListener('click', () => { goTo(cur + 1); resetAuto(); });
document.getElementById('tPrev').addEventListener('click', () => { goTo(cur - 1); resetAuto(); });
progs.forEach(p => p.addEventListener('click', () => { goTo(+p.getAttribute('data-i')); resetAuto(); }));
auto = setInterval(() => goTo(cur + 1), 5500);

// ─── FORM VALIDATION
const form = document.getElementById('cForm');
const fOk = document.getElementById('fOk');
const fContent = document.getElementById('fContent');

function setErr(id, errId, show) {
    document.getElementById(id).classList.toggle('err', show);
    const e = document.getElementById(errId);
    if (e) e.classList.toggle('show', show);
}

form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    const nom = document.getElementById('fNom').value.trim();
    const email = document.getElementById('fEmail').value.trim();
    const msg = document.getElementById('fMsg').value.trim();
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nom) { setErr('fNom', 'fNomErr', true); ok = false; } else setErr('fNom', 'fNomErr', false);
    if (!email || !emailRx.test(email)) { setErr('fEmail', 'fEmailErr', true); ok = false; } else setErr('fEmail', 'fEmailErr', false);
    if (!msg) { setErr('fMsg', 'fMsgErr', true); ok = false; } else setErr('fMsg', 'fMsgErr', false);

    if (ok) {
        const btn = form.querySelector('.form-submit-btn');
        btn.textContent = 'Envoi…';
        btn.disabled = true;
        setTimeout(() => {
            fContent.style.display = 'none';
            fOk.classList.add('show');
        }, 900);
    }
});

['fNom', 'fEmail', 'fMsg'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => setErr(id, id + 'Err', false));
});