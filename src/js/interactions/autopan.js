/**
 * Auto-Pan Functionality
 * Keep point visible in viewport
 */

// ── Auto-Pan Function ────────────────────────────────────────────────
function autoPanToKeepPointVisible() {
    if (!S.coord || !S.fn) return;
    const c = S.coord;
    const x0 = S.x0;
    const y0 = S.fn.f(x0);
    if (!isFinite(y0)) return;

    // Get current point position in screen coordinates
    const [px0, py0] = c.toS(x0, y0);

    // Calculate drawable area bounds (with margins)
    const marginX = 50;
    const marginY = 40;
    const leftEdge = c.pad.l + marginX;
    const rightEdge = c.W - c.pad.r - marginX;
    const topEdge = c.pad.t + marginY;
    const bottomEdge = c.H - c.pad.b - marginY;

    // Check if point is outside visible area (not just buffer)
    const isOutsideX = px0 < c.pad.l || px0 > c.W - c.pad.r;
    const isOutsideY = py0 < c.pad.t || py0 > c.H - c.pad.b;

    // Only pan if point is actually outside or very close to edge
    if (isOutsideX || isOutsideY || px0 < leftEdge || px0 > rightEdge || py0 < topEdge || py0 > bottomEdge) {
        // Calculate center of drawable area
        const centerX = (c.pad.l + c.W - c.pad.r) / 2;
        const centerY = (c.pad.t + c.H - c.pad.b) / 2;

        // Calculate how much to pan to center the point
        const panPixelsX = px0 - centerX;
        const panPixelsY = py0 - centerY;

        // Convert pixel pan to math coordinate pan
        const panDeltaX = panPixelsX / (c.W - c.pad.l - c.pad.r) * (c.xmax - c.xmin);
        const panDeltaY = -panPixelsY / (c.H - c.pad.t - c.pad.b) * (c.ymax - c.ymin);

        // Apply pan to center the point
        S.panX += panDeltaX;
        S.panY += panDeltaY;
        S.staticDirty = true;
    }
}