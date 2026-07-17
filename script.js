/**
 * ============================================================================
 * ABHIJEET KANGANE — FULL-STACK AI ARCHITECT & INNOVATOR ENGINE
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initInstantZeroLagCursor();
    init3DWebGLConstellation();
    initVanillaTiltCard();
    initSFXEngine();
    initInteractiveTerminal();
    initContactForm();
    initMobileNavigation();
    initNavbarScrollEffect();
});

/* ============================================================================
   1. SUPER-FAST INSTANT ZERO-LAG HARDWARE-ACCELERATED CURSOR
   ============================================================================ */
function initInstantZeroLagCursor() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let targetX = -100;
    let targetY = -100;
    let ringX = -100;
    let ringY = -100;
    const ringSpeed = 0.32; // Super smooth magnetic follow

    window.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        
        // Instant hardware-accelerated dot positioning (zero latency)
        dot.style.transform = `translate3d(${targetX - 4}px, ${targetY - 4}px, 0)`;
    });

    // High-performance RAF animation loop for smooth trailing ring
    function animateCursor() {
        ringX += (targetX - ringX) * ringSpeed;
        ringY += (targetY - ringY) * ringSpeed;
        ring.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover magnetic expansion triggers
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .magnetic-target, .achievement-card, .project-card, .social-badge, .social-icon-btn');
    interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            dot.classList.add('hover-active');
            ring.classList.add('hover-active');
        });
        el.addEventListener('mouseleave', () => {
            dot.classList.remove('hover-active');
            ring.classList.remove('hover-active');
        });
    });
}

/* ============================================================================
   2. THREE.JS 3D QUANTUM CONSTELLATION & NEURAL NETWORK (FLAWLESS BACKGROUND)
   ============================================================================ */
function init3DWebGLConstellation() {
    const container = document.getElementById('canvas-container');
    if (!container || typeof THREE === 'undefined') return;

    // Ensure container styling is enforced
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '0';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 160;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create Circular Glowing Particle Texture dynamically (so points aren't squares!)
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(0, 242, 254, 1)');
    gradient.addColorStop(0.3, 'rgba(0, 242, 254, 0.8)');
    gradient.addColorStop(1, 'rgba(0, 242, 254, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);

    const particleCount = 220;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 380;
        positions[i + 1] = (Math.random() - 0.5) * 240;
        positions[i + 2] = (Math.random() - 0.5) * 160;
        velocities.push({
            x: (Math.random() - 0.5) * 0.25,
            y: (Math.random() - 0.5) * 0.25,
            z: (Math.random() - 0.5) * 0.15
        });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        size: 4.5,
        map: texture,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Dynamic Lines connecting nearby nodes
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x00F2FE,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending
    });
    const lineGeometry = new THREE.BufferGeometry();
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Mouse interactive physics
    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    function renderLoop() {
        const pos = geometry.attributes.position.array;
        const linePositions = [];

        // Rotate constellation gently
        particles.rotation.y += 0.0006;
        lines.rotation.y += 0.0006;

        for (let i = 0; i < particleCount; i++) {
            const idx = i * 3;
            pos[idx] += velocities[i].x;
            pos[idx + 1] += velocities[i].y;
            pos[idx + 2] += velocities[i].z;

            // Boundary checks
            if (pos[idx] < -200 || pos[idx] > 200) velocities[i].x *= -1;
            if (pos[idx + 1] < -130 || pos[idx + 1] > 130) velocities[i].y *= -1;
            if (pos[idx + 2] < -100 || pos[idx + 2] > 100) velocities[i].z *= -1;

            // Connect nearby points
            for (let j = i + 1; j < particleCount; j++) {
                const jdx = j * 3;
                const dx = pos[idx] - pos[jdx];
                const dy = pos[idx + 1] - pos[jdx + 1];
                const dz = pos[idx + 2] - pos[jdx + 2];
                const distSq = dx * dx + dy * dy + dz * dz;

                if (distSq < 1400) {
                    linePositions.push(pos[idx], pos[idx + 1], pos[idx + 2]);
                    linePositions.push(pos[jdx], pos[jdx + 1], pos[jdx + 2]);
                }
            }
        }

        geometry.attributes.position.needsUpdate = true;
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

        // Smooth camera sway with mouse
        camera.position.x += (mouseX * 25 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 18 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
        requestAnimationFrame(renderLoop);
    }
    renderLoop();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

/* ============================================================================
   3. VANILLA 3D TILT EFFECT ON HERO QUANTUM CARD
   ============================================================================ */
function initVanillaTiltCard() {
    const card = document.getElementById('hero-tilt-card');
    if (!card) return;

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
}

/* ============================================================================
   4. BUILT-IN FUTURISTIC SFX SYNTHESIZER
   ============================================================================ */
let audioCtx = null;
let sfxMuted = false;

function initSFXEngine() {
    const toggleBtn = document.getElementById('sfx-toggle');
    const iconOn = document.getElementById('sfx-icon-on');
    const iconOff = document.getElementById('sfx-icon-off');

    if (toggleBtn && iconOn && iconOff) {
        toggleBtn.addEventListener('click', () => {
            sfxMuted = !sfxMuted;
            if (sfxMuted) {
                iconOn.style.display = 'none';
                iconOff.style.display = 'block';
                toggleBtn.style.color = '#94A3B8';
                toggleBtn.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            } else {
                iconOn.style.display = 'block';
                iconOff.style.display = 'none';
                toggleBtn.style.color = '#00F2FE';
                toggleBtn.style.borderColor = 'rgba(0, 242, 254, 0.5)';
                playSFX('chime');
            }
        });
    }

    // Attach hover & click sound events
    document.querySelectorAll('a, button, .magnetic-target, .achievement-card, .project-card').forEach((el) => {
        el.addEventListener('mouseenter', () => playSFX('hover'));
        el.addEventListener('click', () => playSFX('click'));
    });
}

function playSFX(type) {
    if (sfxMuted) return;
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        const now = audioCtx.currentTime;

        if (type === 'hover') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(680, now);
            osc.frequency.exponentialRampToValueAtTime(840, now + 0.05);
            gain.gain.setValueAtTime(0.012, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
            osc.start(now);
            osc.stop(now + 0.05);
        } else if (type === 'click') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(320, now);
            osc.frequency.exponentialRampToValueAtTime(120, now + 0.08);
            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
            osc.start(now);
            osc.stop(now + 0.08);
        } else if (type === 'chime') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, now); // C5
            osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.25); // C6
            gain.gain.setValueAtTime(0.035, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
            osc.start(now);
            osc.stop(now + 0.25);
        }
    } catch (e) {
        // Silent catch if audio context blocked by browser autoplay rules
    }
}

/* ============================================================================
   5. INTERACTIVE AI TERMINAL / PLAYGROUND ENGINE
   ============================================================================ */
function initInteractiveTerminal() {
    const form = document.getElementById('term-form');
    const input = document.getElementById('term-input');
    const body = document.getElementById('term-body');
    const clearBtn = document.getElementById('clear-term-btn');
    if (!form || !input || !body) return;

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            body.innerHTML = '';
            appendTerminalOutput('Terminal cleared. Type <span class="text-amber-400 font-bold" style="color:#FFB800;font-weight:bold;">\'help\'</span> for commands.');
            playSFX('click');
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const cmd = input.value.trim().toLowerCase();
        if (!cmd) return;

        appendTerminalOutput(`<span class="text-cyan-400 font-bold" style="color:#00F2FE;font-weight:bold;">abhijeet@ai:~$</span> ${cmd}`);
        input.value = '';
        executeTerminalCommand(cmd);
    });
}

function runCommand(cmd) {
    const body = document.getElementById('term-body');
    if (!body) return;
    appendTerminalOutput(`<span class="text-cyan-400 font-bold" style="color:#00F2FE;font-weight:bold;">abhijeet@ai:~$</span> ${cmd}`);
    executeTerminalCommand(cmd);
}

function appendTerminalOutput(htmlContent) {
    const body = document.getElementById('term-body');
    if (!body) return;
    const div = document.createElement('div');
    div.innerHTML = htmlContent;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
}

function executeTerminalCommand(cmd) {
    playSFX('chime');
    setTimeout(() => {
        switch (cmd) {
            case 'help':
                appendTerminalOutput(`
                    <div style="color: #FFB800; font-weight: 700; margin-top: 8px;">AVAILABLE COMMANDS:</div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 6px; color: #E2E8F0; margin-top: 6px; padding-left: 8px;">
                        <div><strong style="color: #00F2FE;">help</strong> — Display all terminal commands</div>
                        <div><strong style="color: #00F2FE;">skills</strong> — List technical competencies & stack</div>
                        <div><strong style="color: #00F2FE;">projects</strong> — Display live flagship deployments</div>
                        <div><strong style="color: #00F2FE;">achievements</strong> — Display hackathon trophies & honors</div>
                        <div><strong style="color: #00F2FE;">cgpa</strong> — Check university academic records</div>
                        <div><strong style="color: #00F2FE;">contact</strong> — Initiate direct email & phone uplink</div>
                        <div><strong style="color: #00F2FE;">sudo</strong> — Request root administrative privilege</div>
                    </div>
                `);
                break;

            case 'skills':
                appendTerminalOutput(`
                    <div style="color: #34D399; font-weight: 700; margin-top: 8px;">[+] TECHNICAL COMPETENCY AUDIT:</div>
                    <div style="color: #CBD5E1; padding-left: 8px; margin-top: 6px; line-height: 1.6;">
                        <div>• <strong style="color: #FFFFFF;">Core Languages:</strong> Java (DSA 95%), JavaScript ES6+ (98%), C & Systems Coding (88%)</div>
                        <div>• <strong style="color: #FFFFFF;">Web & AI Stack:</strong> Next.js 14/15, Vercel AI SDK, Gemini & Groq APIs, Prompt Engineering</div>
                        <div>• <strong style="color: #FFFFFF;">Databases & Cloud:</strong> Supabase Auth/Postgres, MongoDB, Serverless Microservices</div>
                        <div>• <strong style="color: #FFFFFF;">Graphics & UI:</strong> Three.js / WebGL 3D Canvas, Tailwind CSS, Glassmorphism UI</div>
                    </div>
                `);
                break;

            case 'projects':
                appendTerminalOutput(`
                    <div style="color: #C084FC; font-weight: 700; margin-top: 8px;">[+] FLAGSHIP DEPLOYMENTS:</div>
                    <div style="color: #CBD5E1; padding-left: 8px; margin-top: 6px; line-height: 1.6;">
                        <div>1. <strong style="color: #FFB800;">AI-CareerForge</strong> (1st Runner-Up Winner) — <a href="https://ai-career-forge-nu.vercel.app/" target="_blank" style="color: #00F2FE; text-decoration: underline;">Live Production Link</a></div>
                        <div>2. <strong style="color: #00F2FE;">GateX-KSE</strong> — Campus Visitor Intelligence & Security Platform</div>
                        <div>3. <strong style="color: #C084FC;">DevPulse-AI</strong> — AI-Powered GitHub Profile Analyzer & Heatmap Engine</div>
                        <div>4. <strong style="color: #34D399;">ExamLens-AI</strong> — Historical Exam Ingestion & Smart Study Planner</div>
                    </div>
                `);
                break;

            case 'achievements':
                appendTerminalOutput(`
                    <div style="color: #FFB800; font-weight: 700; margin-top: 8px;">[+] HONORS & LEADERSHIP CREDENTIALS:</div>
                    <div style="color: #CBD5E1; padding-left: 8px; margin-top: 6px; line-height: 1.6;">
                        <div>🏆 <strong style="color: #FFFFFF;">AI Prompt Challenge (3rd Rank):</strong> State-level prompt optimization competition winner.</div>
                        <div>🥈 <strong style="color: #FFFFFF;">AI CareerForge Hackathon (1st Runner-Up):</strong> National real-time AI solution challenge.</div>
                        <div>🌟 <strong style="color: #FFFFFF;">Google Student Ambassador '26:</strong> Selected to represent Google Gemini technologies on campus.</div>
                        <div>💻 <strong style="color: #FFFFFF;">GirlScript Summer of Code (GSSoC '26):</strong> Accepted Open Source Contributor.</div>
                    </div>
                `);
                break;

            case 'cgpa':
                appendTerminalOutput(`
                    <div style="padding: 12px; margin: 8px 0; border-radius: 12px; background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.3); color: #E2E8F0; font-size: 13px;">
                        <div style="color: #34D399; font-weight: 700; margin-bottom: 4px;">=== ACADEMIC TRANSCRIPT VERIFICATION ===</div>
                        <div>Candidate: <strong style="color: #FFFFFF;">Abhijeet Tukaram Kangane</strong></div>
                        <div>Institution: <strong style="color: #FFFFFF;">Keystone School of Engineering, Pune</strong></div>
                        <div>Degree: <strong style="color: #FFFFFF;">B.E. in Computer Engineering (2024 - 2028)</strong></div>
                        <div>Cumulative GPA: <strong style="color: #FFB800; font-size: 16px;">8.59 / 10.0</strong></div>
                        <div style="margin-top: 6px; color: #34D399; font-weight: 700;">>>> STATUS: EXCELLENT ACADEMIC STANDING</div>
                    </div>
                `);
                break;

            case 'hire':
            case 'contact':
                appendTerminalOutput(`
                    <div style="color: #00F2FE; font-weight: 700; margin-top: 8px;">[+] INITIATING DIRECT UPLINK PROTOCOL...</div>
                    <div style="color: #CBD5E1; padding-left: 8px; margin-top: 6px;">
                        Direct Email: <a href="mailto:abhijeet666k@gmail.com" style="color: #00F2FE; text-decoration: underline; font-weight: bold;">abhijeet666k@gmail.com</a> | Phone/WhatsApp: <strong style="color: #FFB800;">+91 7276863023</strong>
                    </div>
                `);
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                break;

            case 'sudo':
                appendTerminalOutput(`
                    <div style="color: #34D399; font-weight: 700; margin-top: 8px;">Access Granted: Welcome, Abhijeet. All systems operational at maximum performance.</div>
                `);
                break;

            default:
                appendTerminalOutput(`
                    <div style="color: #EF4444;">Command not recognized: '${cmd}'. Type <span style="color: #FFB800; font-weight: bold;">'help'</span> for valid commands.</div>
                `);
                break;
        }
    }, 150);
}

/* ============================================================================
   6. MODAL ENGINE FOR CERTIFICATE PREVIEWS
   ============================================================================ */
function openModal(title, subtitle, description, imgSrc) {
    const modal = document.getElementById('cert-modal');
    const content = document.getElementById('modal-content');
    if (!modal || !content) return;

    content.innerHTML = `
        <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px;">
            <div>
                <span style="font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #00F2FE; text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">${subtitle}</span>
                <h3 style="font-family: 'Syne', sans-serif; font-weight: 800; font-size: clamp(22px, 3vw, 30px); color: #FFFFFF; margin: 4px 0 0 0;">${title}</h3>
            </div>
            <span style="padding: 6px 14px; border-radius: 9999px; background: rgba(52,211,153,0.2); border: 1px solid rgba(52,211,153,0.5); color: #6EE7B7; font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 700;">OFFICIALLY VERIFIED</span>
        </div>
        <div style="width: 100%; max-height: 480px; border-radius: 20px; overflow: hidden; background: #090A12; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; padding: 8px;">
            <img src="${imgSrc}" alt="${title}" style="width: 100%; height: 100%; object-fit: contain; max-height: 460px;" onerror="this.src='assets/ai.png'">
        </div>
        <p style="font-family: 'Plus Jakarta Sans', sans-serif; color: #CBD5E1; font-size: 15px; line-height: 1.6; margin: 8px 0 0 0;">${description}</p>
    `;

    modal.style.display = 'flex';
    playSFX('chime');
}

function closeModal() {
    const modal = document.getElementById('cert-modal');
    if (!modal) return;
    modal.style.display = 'none';
    playSFX('click');
}

// Close modal on Escape key or outside click
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});
document.getElementById('cert-modal')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('cert-modal')) closeModal();
});

/* ============================================================================
   7. CONTACT FORM SIMULATION
   ============================================================================ */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        playSFX('chime');
        if (feedback) {
            feedback.style.display = 'block';
            setTimeout(() => {
                feedback.style.display = 'none';
                form.reset();
            }, 5000);
        }
    });
}

/* ============================================================================
   8. MOBILE NAVIGATION & NAVBAR SCROLL
   ============================================================================ */
function initMobileNavigation() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        const isHidden = menu.style.display === 'none' || menu.style.display === '';
        menu.style.display = isHidden ? 'block' : 'none';
        playSFX('click');
    });

    menu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            menu.style.display = 'none';
            playSFX('click');
        });
    });
}

function initNavbarScrollEffect() {
    const nav = document.getElementById('navbar');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            nav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6)';
            nav.style.background = 'rgba(5, 5, 10, 0.94)';
        } else {
            nav.style.boxShadow = 'none';
            nav.style.background = 'rgba(5, 5, 10, 0.85)';
        }
    });
}
