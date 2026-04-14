# Curve Explorer Pro - Interactive Calculus Visualization Tool

A comprehensive web-based application for visualizing mathematical functions, derivatives, tangent lines, and calculus concepts. Built with vanilla JavaScript and HTML5 Canvas for optimal performance and educational value.

## Overview

Curve Explorer Pro is an interactive calculus visualization platform designed for students, educators, and mathematics enthusiasts. Explore over 35 preset functions, visualize derivatives in real-time, and understand complex calculus concepts through interactive challenges and multi-function comparison tools.

## Key Features

### Interactive Function Visualization
- 35+ preset mathematical functions across 6 categories (polynomial, trigonometric, exponential, logarithmic, rational, special)
- Real-time tangent and normal line rendering
- Interactive point dragging with smooth canvas animations
- Curvature circle and radius of curvature display
- Zoom and pan controls with touch device support
- Customizable light and dark theme modes

### Multi-Function Comparison Mode
Compare up to 3 functions simultaneously with advanced visualization:
- Side-by-side function plotting with distinct color coding (blue, pink, green)
- Synchronized derivative panel showing all function derivatives
- Integral visualization with shaded area calculations
- Coordinated point markers across all plotted functions
- Interactive dragging functionality across multiple curves

### Derivative and Calculus Tools
- Dual-view mode displaying f(x) and f'(x) simultaneously
- Color-coded derivative curve visualization
- Real-time gradient and slope calculation
- Second derivative f''(x) computation
- Curvature kappa calculation and display
- Tangent line equations with point-slope form
- Normal line perpendicular to tangent

### Educational Challenge System
Interactive learning platform with guided mathematical exploration:
- Persistent challenge interface with immediate visual feedback
- Progressive difficulty levels for skill development
- Visual hint system highlighting target regions on curves
- Real-time progress tracking with percentage completion (0-100%)
- Dynamic progress indicators around interactive points
- Proximity-based feedback notifications at 50% and 80% thresholds
- Animated celebration effects upon challenge completion
- 25+ mathematical challenges including critical points, inflection points, maximum curvature, and derivative analysis

### Achievement and Progress Tracking
- Comprehensive achievement system with unlockable milestones
- Function exploration rewards across different mathematical categories
- Challenge completion badges and special achievements
- Persistent local storage for progress tracking
- Statistics dashboard for learning analytics

## Usage Guide

### Getting Started
1. Open the application in any modern web browser
2. Select a mathematical function from the categorized sidebar
3. Interact with point P by dragging on the canvas or using the slider control
4. Observe real-time updates to tangent lines, normal lines, and curvature
5. View detailed equations and statistical data in the information sidebar

### Multi-Function Analysis
1. Click the Multi button in the navigation header
2. The current function is automatically added to the comparison set
3. Select additional functions from the sidebar
4. Click Add Function to include them (maximum 3 functions)
5. Toggle the Integral button to display shaded area visualizations
6. Drag the point marker to analyze all functions at the same x-coordinate

### Custom Function Input
Create and visualize your own mathematical expressions:
- Supported operators: addition (+), subtraction (-), multiplication (*), division (/), exponentiation (^)
- Available functions: sin, cos, tan, log (natural logarithm), exp, abs, sqrt
- Example expressions: x^2 + sin(x), exp(-x^2), log(x + 1), 3*x^3 - 2*x + 1

## Technical Architecture

### Technology Stack
- Pure vanilla JavaScript (ES6+) with no external framework dependencies
- HTML5 Canvas API for high-performance rendering
- CSS3 with custom properties for theming
- Modular architecture with clear separation of concerns
- Reactive state management system

### Browser Compatibility
- Google Chrome (recommended, version 90+)
- Mozilla Firefox (version 88+)
- Apple Safari (version 14+)
- Microsoft Edge (version 90+)
- Full touch screen support for tablets and mobile devices
- Responsive design optimized for desktop and mobile viewports

## Project Structure

```
curve-explorer-pro/
├── index.html                    # Main application entry point
├── README.md                     # Project documentation
├── src/
│   ├── css/                      # Stylesheet modules
│   │   ├── base.css             # Base styles and CSS variables
│   │   ├── canvas.css           # Canvas-specific styles
│   │   ├── controls.css         # UI control styles
│   │   ├── multi.css            # Multi-function mode styles
│   │   └── ...                  # Additional style modules
│   └── js/                       # JavaScript modules
│       ├── config/              # Configuration files
│       │   ├── functions.js     # Function definitions
│       │   ├── challenges.js    # Challenge configurations
│       │   └── achievements.js  # Achievement definitions
│       ├── core/                # Core application logic
│       │   ├── state.js         # State management
│       │   ├── parser.js        # Expression parser
│       │   └── utils.js         # Utility functions
│       ├── rendering/           # Canvas rendering modules
│       │   ├── main.js          # Main render loop
│       │   ├── static.js        # Static layer rendering
│       │   ├── dynamic.js       # Dynamic overlay rendering
│       │   ├── derivative.js    # Derivative visualization
│       │   └── multi.js         # Multi-function rendering
│       ├── interactions/        # User interaction handlers
│       │   ├── canvas.js        # Canvas event handlers
│       │   ├── zoom.js          # Zoom controls
│       │   └── autopan.js       # Auto-pan functionality
│       ├── ui/                  # UI component modules
│       │   ├── sidebar.js       # Sidebar management
│       │   ├── slider.js        # Slider controls
│       │   ├── theme.js         # Theme switching
│       │   └── icons.js         # Icon system
│       └── features/            # Feature implementations
│           └── features.js      # Feature initialization
└── assets/                       # Static assets
    └── data/                     # Data files
```

## Development and Contribution

### Local Development
1. Clone the repository: `git clone https://github.com/Munashe-Njanji/Curvature-Explorer.git`
2. Open `index.html` in a web browser
3. No build process or dependencies required
4. Modify source files and refresh browser to see changes

### Code Organization
- Modular JavaScript architecture for maintainability
- Clear separation between rendering, interaction, and business logic
- Comprehensive inline documentation and comments
- Consistent naming conventions and code style

## Recent Updates

### March 2026 Release
- Multi-function comparison mode with synchronized visualization
- Enhanced UI controls and improved user experience
- Comprehensive error handling and debugging capabilities
- Performance optimizations for smoother animations
- Improved mobile device support and touch interactions
- Cache busting implementation for reliable updates

## Educational Applications

### For Students
- Visual understanding of derivative concepts
- Interactive exploration of function behavior
- Hands-on learning through challenge system
- Self-paced progression with achievement tracking

### For Educators
- Demonstration tool for calculus concepts
- Visual aids for classroom presentations
- Assignment creation using custom functions
- Student engagement through interactive challenges

### For Self-Learners
- Comprehensive function library for exploration
- Progressive challenge system for skill building
- Immediate visual feedback for concept reinforcement
- Achievement system for motivation and progress tracking

## Keywords and Topics

calculus visualization, interactive mathematics, derivative calculator, tangent line visualization, function graphing, mathematical education, calculus learning tool, curve analysis, mathematical visualization, educational software, STEM education, mathematics software, calculus concepts, function explorer, derivative visualization, mathematical graphing, interactive learning, web-based calculator, HTML5 canvas, JavaScript mathematics

## License

MIT License - Open source and free to use, modify, and distribute. See LICENSE file for full details.

## Support and Contact

For issues, feature requests, or contributions, please visit the GitHub repository issues page or submit a pull request.
