/**
 * Icon System
 * SVG icons to replace emojis for better cross-platform consistency
 */

const ICONS = {
  // Numbers and Math
  numbers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><text x="12" y="16" text-anchor="middle" font-size="12" font-weight="bold">123</text></svg>',
  
  // Trigonometric
  wave: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0"/></svg>',
  
  // Exponential
  chartUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 17 9 11 13 15 21 7"/><polyline points="16 7 21 7 21 12"/></svg>',
  
  // Rational
  divide: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="6" r="1.5"/><line x1="5" y1="12" x2="19" y2="12"/><circle cx="12" cy="18" r="1.5"/></svg>',
  
  // Hyperbolic
  infinity: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18.178 8C19.077 8.47 20 9.4 20 11c0 1.6-.923 2.53-1.822 3-.898.47-2.003.47-3.106.47-1.104 0-2.21 0-3.106-.47C11.077 13.53 10 12.6 10 11c0-1.6.877-2.53 1.866-3 .989-.47 2.138-.47 3.268-.47s2.28 0 3.044.47zM9.866 14C8.877 13.53 8 12.6 8 11c0-1.6.923-2.53 1.822-3 .898-.47 2.003-.47 3.106-.47 1.104 0 2.21 0 3.106.47C17.923 8.47 19 9.4 19 11c0 1.6-.877 2.53-1.866 3-.989.47-2.138.47-3.268.47s-2.28 0-3.044-.47z"/></svg>',
  
  // Special
  sparkle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v18M3 12h18M6.34 6.34l11.32 11.32M17.66 6.34L6.34 17.66"/></svg>',
  
  // UI Actions
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
  pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  
  // Achievements
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
  pencil: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>',
  zap: '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  spiral: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 12c-1.5 0-2-1-2-2s.5-2 2-2 3 1 3 3-1 4-4 4-5-2-5-5 2-6 6-6 7 3 7 7-3 8-8 8"/></svg>',
  mountain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 20h18L12 4z"/><path d="M6.5 20L12 10l5.5 10"/></svg>',
  crystal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>',
  
  // Status
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
  bulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6M10 22h4M15 8a3 3 0 1 0-6 0c0 2 3 3 3 5v1"/><circle cx="12" cy="8" r="5"/></svg>',
  
  // Arrows
  arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  arrowUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>',
  arrowDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>',
  circle: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="8"/></svg>',
};

// Icon mapping from emoji to SVG
const EMOJI_TO_ICON = {
  'numbers': 'numbers',
  'wave': 'wave',
  'chartUp': 'chartUp',
  'divide': 'divide',
  'infinity': 'infinity',
  'sparkle': 'sparkle',
  'moon': 'moon',
  'sun': 'sun',
  'link': 'link',
  'play': 'play',
  'pause': 'pause',
  'target': 'target',
  'close': 'close',
  'chart': 'chart',
  'star': 'star',
  'pencil': 'pencil',
  'zap': 'zap',
  'spiral': 'spiral',
  'mountain': 'mountain',
  'crystal': 'crystal',
  'search': 'search',
  'check': 'check',
  'x': 'x',
  'sparkle': 'sparkle',
  'bulb': 'bulb',
  '→': 'arrowRight',
  '↗': 'arrowUp',
  '↘': 'arrowDown',
  '●': 'circle',
  '⊙': 'target',
};

/**
 * Create an icon element
 * @param {string} iconName - Name of the icon or emoji
 * @param {string} className - Optional CSS class
 * @returns {HTMLElement} - SVG icon element
 */
function createIcon(iconName, className = '') {
  // Check if it's an emoji that needs conversion
  const mappedIcon = EMOJI_TO_ICON[iconName] || iconName;
  const svgContent = ICONS[mappedIcon];
  
  if (!svgContent) {
    console.warn(`Icon not found: ${iconName}`);
    return document.createTextNode(iconName);
  }
  
  const wrapper = document.createElement('span');
  wrapper.className = `icon ${className}`;
  wrapper.innerHTML = svgContent;
  
  return wrapper;
}

/**
 * Replace emoji text with SVG icons in an element
 * @param {HTMLElement} element - Element to process
 */
function replaceEmojisWithIcons(element) {
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  
  const nodesToReplace = [];
  let node;
  
  while (node = walker.nextNode()) {
    const text = node.textContent;
    // Check if text contains any emoji
    for (const emoji in EMOJI_TO_ICON) {
      if (text.includes(emoji)) {
        nodesToReplace.push(node);
        break;
      }
    }
  }
  
  nodesToReplace.forEach(node => {
    let text = node.textContent;
    const parent = node.parentNode;
    const fragment = document.createDocumentFragment();
    
    let lastIndex = 0;
    for (const emoji in EMOJI_TO_ICON) {
      const index = text.indexOf(emoji);
      if (index !== -1) {
        // Add text before emoji
        if (index > lastIndex) {
          fragment.appendChild(document.createTextNode(text.substring(lastIndex, index)));
        }
        // Add icon
        fragment.appendChild(createIcon(emoji));
        lastIndex = index + emoji.length;
      }
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
    }
    
    parent.replaceChild(fragment, node);
  });
}

/**
 * Initialize icon system - replace all emojis on page load
 */
function initIcons() {
  // Replace placeholder icons in HTML
  const shareBtn = document.querySelector('#shareBtn .btn-icon');
  if (shareBtn) shareBtn.replaceWith(createIcon('link'));
  
  const chIcon = document.querySelector('.ch-icon');
  if (chIcon) chIcon.replaceWith(createIcon('target'));
  
  const canvasIcon = document.querySelector('.canvas-icon');
  if (canvasIcon) canvasIcon.replaceWith(createIcon('chartUp'));
  
  const derivIcon = document.querySelector('.deriv-icon');
  if (derivIcon) derivIcon.replaceWith(createIcon('chart'));
  
  const animIcon = document.querySelector('.anim-icon');
  if (animIcon) animIcon.replaceWith(createIcon('play'));
  
  const challengeIcon = document.querySelector('.challenge-icon');
  if (challengeIcon) challengeIcon.replaceWith(createIcon('target'));
  
  // Replace emojis in the entire document
  replaceEmojisWithIcons(document.body);
}
