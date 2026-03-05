/**
 * Request validation helpers — CSRF origin check and input length enforcement.
 */

const ALLOWED_ORIGINS =
  process.env.NODE_ENV === 'production'
    ? ['https://www.loveeatkeepfit.ie', 'https://loveeatkeepfit.ie']
    : ['http://localhost:3000', 'http://localhost:3001'];

/**
 * Validates the Origin or Referer header for state-mutating requests.
 * Returns true if the request origin is allowed; false otherwise.
 * Protocol-relative origins (//evil.com) are blocked.
 *
 * @param {import('next').NextApiRequest} req
 * @returns {boolean}
 */
export function validateOrigin(req) {
  const origin = req.headers['origin'] || '';
  const referer = req.headers['referer'] || '';

  // Check origin header first (most reliable)
  if (origin) {
    return ALLOWED_ORIGINS.some(o => origin === o);
  }

  // Fall back to referer for older clients
  if (referer) {
    return ALLOWED_ORIGINS.some(o => referer.startsWith(o));
  }

  // No origin headers — could be server-to-server; allow in dev, block in prod
  return process.env.NODE_ENV !== 'production';
}

/**
 * Validates field lengths. Returns an error message string if any field exceeds
 * its maximum length, or null if all are within bounds.
 *
 * @param {Record<string, unknown>} fields  e.g. { name: 'Alice', email: 'a@b.com' }
 * @param {Record<string, number>}  limits  e.g. { name: 100, email: 254 }
 * @returns {string | null}
 */
export function validateLengths(fields, limits) {
  for (const [field, max] of Object.entries(limits)) {
    const val = fields[field];
    if (val !== undefined && val !== null) {
      if (typeof val !== 'string') {
        return `${field} must be a string`;
      }
      if (val.length > max) {
        return `${field} must be ${max} characters or fewer`;
      }
    }
  }
  return null;
}
