/**
 * Math Expression Parser
 * Parse and evaluate custom functions
 */

// ── Parser ──────────────────────────────────────────────────────────
const PARSER = {
    parse(expr) {
        try {
            const clean = expr.trim()
                .replace(/\*\*/g, '^')
                .replace(/(\d)([a-df-wyz(])/gi, '$1*$2')
                .replace(/([a-df-wyz)])(\d)/gi, '$1*$2');
            const compiled = math.compile(clean);
            const f = x => {
                try {
                    const v = compiled.evaluate({
                        x
                    });
                    return typeof v === 'number' ? v : NaN;
                } catch {
                    return NaN;
                }
            };
            f(0); // test
            return {
                f,
                expr: clean
            };
        } catch {
            return null;
        }
    },
    df(f, x, h = 1e-6) {
        return (f(x + h) - f(x - h)) / (2 * h);
    },
    d2f(f, x, h = 1e-5) {
        return (f(x + h) - 2 * f(x) + f(x - h)) / (h * h);
    },
};