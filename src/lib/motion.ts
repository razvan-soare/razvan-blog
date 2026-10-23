// Small motion helpers for living illustrations, ported from rossark-motion-skill.
// Everything that moves is a pure function of one clock's time in milliseconds.

/** A cubic-bezier easing, same as CSS `cubic-bezier(x1, y1, x2, y2)`. */
function bezier(x1: number, y1: number, x2: number, y2: number) {
  const at = (a: number, b: number, s: number) => 3 * a * s * (1 - s) ** 2 + 3 * b * s * s * (1 - s) + s ** 3;
  return (p: number) => {
    // Find s where x(s) = p by bisection; precise enough for animation.
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 20; i++) {
      const mid = (lo + hi) / 2;
      if (at(x1, x2, mid) < p) lo = mid;
      else hi = mid;
    }
    return at(y1, y2, (lo + hi) / 2);
  };
}

/** Things that travel: a gaze, a sway, a lid closing. */
const EASE_IN_OUT = bezier(0.77, 0, 0.175, 1);
/** Things that open or arrive: a lid reopening. */
const EASE_OUT = bezier(0.23, 1, 0.32, 1);

/** A keyframe: time (ms), value, and the curve of the segment arriving here ('out', or ease-in-out). */
export type Keys = readonly (readonly [number, number, 'out'?])[];

/** The value of a track at time `t`. The last key should equal the first, so loops never jump. */
export function track(t: number, keys: Keys): number {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const k1 = keys[i];
    if (t <= k1[0]) {
      const k0 = keys[i - 1];
      const p = (t - k0[0]) / (k1[0] - k0[0] || 1);
      return k0[1] + (k1[1] - k0[1]) * (k1[2] === 'out' ? EASE_OUT(p) : EASE_IN_OUT(p));
    }
  }
  return keys[keys.length - 1][1];
}

/** A smooth back-and-forth from -1 to 1. `phase` (0 to 1) offsets one part from the next. */
export function wave(t: number, period: number, phase = 0): number {
  return Math.sin((t / period + phase) * Math.PI * 2);
}

/**
 * A smooth track through key poses `[ms, value]`, for acting (raising an arm, a lean).
 * Unlike `track` it doesn't stop at every key, and it never overshoots one (a monotone
 * cubic). Repeat a value to hold a pose.
 */
export function flow(t: number, k: readonly (readonly [number, number])[]): number {
  const n = k.length;
  if (t <= k[0][0]) return k[0][1];
  if (t >= k[n - 1][0]) return k[n - 1][1];
  let i = 0;
  while (k[i + 1][0] < t) i++;
  const slope = (j: number) => (k[j + 1][1] - k[j][1]) / (k[j + 1][0] - k[j][0]);
  const tangent = (j: number) => {
    if (j === 0 || j === n - 1) return 0;
    const a = slope(j - 1);
    const b = slope(j);
    if (a * b <= 0) return 0;
    const w0 = 2 * (k[j + 1][0] - k[j][0]) + (k[j][0] - k[j - 1][0]);
    const w1 = (k[j + 1][0] - k[j][0]) + 2 * (k[j][0] - k[j - 1][0]);
    return (w0 + w1) / (w0 / a + w1 / b);
  };
  const h = k[i + 1][0] - k[i][0];
  const s = (t - k[i][0]) / h;
  return (
    (2 * s ** 3 - 3 * s ** 2 + 1) * k[i][1] +
    (s ** 3 - 2 * s ** 2 + s) * h * tangent(i) +
    (-2 * s ** 3 + 3 * s ** 2) * k[i + 1][1] +
    (s ** 3 - s ** 2) * h * tangent(i + 1)
  );
}
