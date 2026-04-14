# Contributing to Curve Explorer Pro

Thank you for your interest in contributing to Curve Explorer Pro! This document provides guidelines and instructions for contributing to the project.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## Code of Conduct

This project adheres to a code of conduct that all contributors are expected to follow. Please be respectful, inclusive, and constructive in all interactions.

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Text editor or IDE
- Basic knowledge of HTML, CSS, and JavaScript
- Understanding of calculus concepts (helpful but not required)

### Local Setup
1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/Curvature-Explorer.git
   cd Curvature-Explorer
   ```
3. Open `index.html` in your browser
4. Make changes and refresh to see updates

### Project Structure
```
src/
├── css/          # Stylesheets (modular CSS files)
├── js/
│   ├── config/   # Configuration and data files
│   ├── core/     # Core application logic
│   ├── rendering/# Canvas rendering modules
│   ├── interactions/ # User interaction handlers
│   ├── ui/       # UI components
│   └── features/ # Feature implementations
```

## Development Process

### Branching Strategy
- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/description` - Documentation updates

### Workflow
1. Create a new branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Test thoroughly across browsers
4. Commit with descriptive messages
5. Push to your fork
6. Open a pull request

## Coding Standards

### JavaScript
- Use ES6+ features (const, let, arrow functions, template literals)
- Follow consistent naming conventions:
  - camelCase for variables and functions
  - PascalCase for classes
  - UPPER_CASE for constants
- Add comments for complex logic
- Keep functions small and focused
- Avoid global variables when possible

### CSS
- Use CSS custom properties for theming
- Follow BEM naming convention where applicable
- Keep selectors specific but not overly nested
- Group related properties together
- Add comments for complex styles

### HTML
- Use semantic HTML5 elements
- Maintain proper indentation
- Add ARIA labels for accessibility
- Keep structure clean and organized

### Code Example
```javascript
// Good
function calculateDerivative(fn, x, h = 0.0001) {
  const forward = fn(x + h);
  const backward = fn(x - h);
  return (forward - backward) / (2 * h);
}

// Avoid
function calc(f,x,h){return (f(x+h)-f(x-h))/(2*h);}
```

## Commit Guidelines

### Commit Message Format
```
type(scope): subject

body (optional)

footer (optional)
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples
```
feat(multi): add integral visualization to multi-function mode

Implement shaded area rendering under curves in multi-function
comparison mode. Includes toggle button and color-coded fills.

Closes #42
```

```
fix(canvas): resolve dragging issue on touch devices

Fixed point dragging not working on iOS Safari due to
touch event handling. Added proper touch event listeners.
```

## Pull Request Process

### Before Submitting
1. Test your changes in multiple browsers
2. Ensure no console errors or warnings
3. Update documentation if needed
4. Add comments to complex code
5. Follow the coding standards

### PR Checklist
- [ ] Code follows project style guidelines
- [ ] Changes are well-documented
- [ ] All tests pass
- [ ] No new warnings or errors
- [ ] Screenshots included (if UI changes)
- [ ] Related issues are linked

### Review Process
1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, your PR will be merged
4. Your contribution will be credited

## Reporting Bugs

### Before Reporting
1. Check if the bug has already been reported
2. Test in multiple browsers
3. Clear browser cache and try again
4. Check browser console for errors

### Bug Report Should Include
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information
- Screenshots or screen recordings
- Console error messages

Use the bug report template when creating an issue.

## Suggesting Features

### Feature Requests Should Include
- Clear description of the feature
- Use case or problem it solves
- Proposed implementation (if you have ideas)
- Educational value or benefit
- Examples or mockups (if applicable)

Use the feature request template when creating an issue.

## Areas for Contribution

### High Priority
- Performance optimizations
- Mobile device improvements
- Accessibility enhancements
- Browser compatibility fixes
- Documentation improvements

### Feature Ideas
- Export/screenshot functionality
- Additional function types (parametric, polar)
- Enhanced visualization options
- More challenge types
- Improved UI/UX

### Good First Issues
Look for issues labeled `good-first-issue` - these are great for new contributors!

## Questions?

If you have questions about contributing:
- Open a discussion on GitHub
- Check existing issues and pull requests
- Review the documentation

## Recognition

All contributors will be recognized in the project. Thank you for helping make Curve Explorer Pro better!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
