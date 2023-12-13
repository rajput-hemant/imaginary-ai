import { clsx } from "clsx";
import FileSaver from "file-saver";
import { twMerge } from "tailwind-merge";

import { surpriseMePrompts } from "../constants";

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

export function getRandomPrompts(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];
  if (randomPrompt === prompt) return getRandomPrompts(prompt);
  return randomPrompt;
}

export async function downloadImage(_id, photo) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
