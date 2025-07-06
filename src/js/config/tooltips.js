/**
 * Tooltip Definitions
 * Educational content for UI elements
 */

// ── Tooltip Concepts ────────────────────────────────────────────────
         const TIPS = {
           tangent:{
             title:'Tangent Line',
             body:'A line touching the curve at exactly one point P, with the same slope as the curve there.',
             formula:'y − f(x₀) = f′(x₀)·(x − x₀)'
           },
           normal:{
             title:'Normal Line',
             body:'Perpendicular to the tangent at P. If tangent slope is m, normal slope is −1/m.',
             formula:'y − f(x₀) = −(1/f′(x₀))·(x − x₀)'
           },
           gradient:{
             title:'Derivative f′(x₀)',
             body:'Instantaneous rate of change. Positive: rising. Negative: falling. Zero: critical point.',
             formula:"f′(x₀) = lim[h→0] (f(x₀+h)−f(x₀)) / h"
           }
         };
