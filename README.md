# Curve Explorer Pro

Interactive calculus visualization tool for exploring curves, tangents, and derivatives.

## Features

### Core Visualization
- 35+ preset functions across 6 categories
- Real-time tangent and normal line visualization
- Interactive point dragging with smooth animations
- Curvature circle and radius display
- Zoom & Pan with touch support
- Light/Dark themes

### Multi-Function Mode 🆕
Compare up to 3 functions simultaneously:
- **Side-by-side comparison** with distinct colors (blue, pink, green)
- **Derivative panel** showing all derivatives together
- **Integral visualization** with shaded areas under curves
- **Synchronized point markers** across all functions
- **Interactive dragging** works across all curves

### Derivative Visualization
- Dual-view mode showing f(x) and f'(x) simultaneously
- Color-coded derivative curves
- Real-time gradient calculation
- Second derivative (f'') and curvature (κ) display

### Challenge System
Interactive learning through guided exploration:
- Always visible challenge box with immediate feedback
- Visual hints showing target regions on curves
- Real-time progress bar (0-100%) tracking solution proximity
- Progress ring around point P for instant feedback
- "Warm/cold" notifications at 50% and 80% thresholds
- Celebration effects on completion
- 25+ challenges covering critical points, inflection points, and more

### Achievement System
- Track your progress with unlockable achievements
- Rewards for exploring different function types
- Special achievements for challenge completion
- Persistent progress tracking

## How to Use

### Basic Navigation
1. Select a function from the sidebar
2. Drag the point P on the canvas or use the slider
3. Watch tangent, normal, and curvature update in real-time
4. View equations and statistics in the sidebar

### Multi-Function Comparison
1. Click the **"Multi"** button in the header
2. Current function is automatically added
3. Select another function and click **"+ Add Function"**
4. Add up to 3 functions total
5. Click **"Integral"** to show shaded areas
6. Drag on canvas to move x₀ across all curves

### Custom Functions
Enter your own mathematical expressions:
- Use standard operators: `+`, `-`, `*`, `/`, `^`
- Functions: `sin`, `cos`, `tan`, `log` (natural log), `exp`, `abs`, `sqrt`
- Example: `x^2 + sin(x)`, `exp(-x^2)`, `log(x + 1)`

## Technical Details

### Architecture
- Vanilla JavaScript (no frameworks)
- Canvas-based rendering for performance
- Modular code structure with separation of concerns
- State management for reactive updates

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Touch-enabled devices supported
- Responsive design for mobile and desktop

## Development

### File Structure
```
├── index.html              # Main HTML file
├── src/
│   ├── css/               # Stylesheets
│   │   ├── base.css       # Base styles and variables
│   │   ├── multi.css      # Multi-function mode styles
│   │   └── ...
│   └── js/
│       ├── config/        # Function definitions and challenges
│       ├── core/          # Core logic (state, parser, utils)
│       ├── rendering/     # Canvas rendering modules
│       │   ├── multi.js   # Multi-function rendering
│       │   └── ...
│       ├── interactions/  # User input handling
│       ├── ui/            # UI components
│       └── features/      # Feature modules
```

### Recent Updates (March 2024)
- ✨ Multi-function comparison mode
- 🎨 Enhanced UI with better controls
- 🐛 Improved error handling and debugging
- ⚡ Performance optimizations
- 📱 Better mobile support

## License
MIT License - feel free to use and modify!
