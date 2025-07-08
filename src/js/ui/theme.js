/**
 * Theme System
 * Light/dark mode management
 */

// ── Theme System ──────────────────────────────────────────────────────
function initTheme() {
    // Detect system theme preference
    const savedTheme = localStorage.getItem('cepro_theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    let theme = savedTheme || 'auto';
    if (theme === 'auto') {
        theme = systemPrefersDark ? 'dark' : 'light';
    }

    applyTheme(theme);
    updateThemeButton(theme);

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const savedTheme = localStorage.getItem('cepro_theme');
        if (!savedTheme || savedTheme === 'auto') {
            const newTheme = e.matches ? 'dark' : 'light';
            applyTheme(newTheme);
            updateThemeButton(newTheme);
            S.staticDirty = true;
            scheduleRedraw();
        }
    });
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    S.currentTheme = theme;
}

function updateThemeButton(theme) {
    const btn = document.getElementById('themeBtn');
    if (theme === 'light') {
        btn.textContent = '☀️';
        btn.title = 'Switch to Dark Mode';
    } else {
        btn.textContent = '🌙';
        btn.title = 'Switch to Light Mode';
    }
}

function cycleTheme() {
    const current = S.currentTheme || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('cepro_theme', next);
    applyTheme(next);
    updateThemeButton(next);
    S.staticDirty = true;
    scheduleRedraw();
    showToast(`${next==='dark'?'🌙':'☀️'} ${next.charAt(0).toUpperCase()+next.slice(1)} mode activated`, 'success');
}

function initThemeButton(){
    document.getElementById('themeBtn').addEventListener('click', cycleTheme);
}