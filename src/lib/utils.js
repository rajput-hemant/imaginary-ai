import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { PROMPTS } from "../constants";

/**
 * @param  {import("class-variance-authority/dist/types").ClassValue[]} inputs
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Checks if the environment variable is set, if not, throws an error
 * @param {string} env
 * @param {string} name
 */
export function validateEnv(env, name) {
  if (!env) {
    throw new Error(`Environment variable ${name} is not set`);
  }
  return env;
}

/**
 * @returns {string} A random prompt
 */
export function getRandomPrompts() {
  return PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
}

/**
 * @returns {Crypto} The crypto object from the browser or node
 */
export function getCrypto() {
  try {
    return window.crypto;
  } catch {
    return crypto;
  }
}
