#!/usr/bin/env python3
"""
Replace emojis with icon names in JavaScript files
"""

import re
from pathlib import Path

# Emoji to icon name mapping
EMOJI_MAP = {
    '🔢': 'numbers',
    '〜': 'wave',
    '📈': 'chartUp',
    '➗': 'divide',
    '∞': 'infinity',
    '✦': 'sparkle',
    '🌙': 'moon',
    '☀️': 'sun',
    '🔗': 'link',
    '▶': 'play',
    '⏸': 'pause',
    '🎯': 'target',
    '✕': 'close',
    '📊': 'chart',
    '🌟': 'star',
    '✏️': 'pencil',
    '⚡': 'zap',
    '🌀': 'spiral',
    '🏔️': 'mountain',
    '🔮': 'crystal',
    '🔍': 'search',
    '✓': 'check',
    '❌': 'x',
    '✨': 'sparkle',
    '💡': 'bulb',
}

def replace_emojis_in_file(filepath):
    """Replace emojis with icon names in a file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Replace emojis
    for emoji, icon_name in EMOJI_MAP.items():
        content = content.replace(f"'{emoji}'", f"'{icon_name}'")
        content = content.replace(f'"{emoji}"', f'"{icon_name}"')
        content = content.replace(f'`{emoji}`', f'`{icon_name}`')
        # Also replace in text content
        content = content.replace(emoji, icon_name)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

# Process all JavaScript files
js_files = list(Path('src/js').rglob('*.js'))
modified_count = 0

print("Replacing emojis with icon names...")
print()

for filepath in js_files:
    if replace_emojis_in_file(filepath):
        print(f"  ✓ {filepath}")
        modified_count += 1

print()
print(f"✅ Modified {modified_count} files")
