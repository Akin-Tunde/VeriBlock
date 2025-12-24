import { sha256 } from 'js-sha256';

/**
 * @param {File} file 
 * @param {string} salt - Optional user-provided secret string
 */
export async function computeHash(file, salt = "") {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  const hasher = sha256.create();
  hasher.update(bytes);
  if (salt) hasher.update(salt); 
  return hasher.hex();
}