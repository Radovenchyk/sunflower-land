/*

    This file contains everything related to Plaza Username.

    This file also import a list of profanity words used to check if the username is valid.

*/

import { Profanity, ProfanityOptions } from "@2toad/profanity";
import profanity from "./utils/profanity";

const PROFANITY_LIST = JSON.parse(
  Buffer.from(profanity, "base64").toString("utf-8")
);
const REGEX = new RegExp(/^[\w*?!, '-]+$/);
const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

const PROFANITY_OPTIONS = new ProfanityOptions();
PROFANITY_OPTIONS.wholeWord = false;

const PROFANITY = new Profanity(PROFANITY_OPTIONS);
PROFANITY.addWords(PROFANITY_LIST);

export const validateUsername = (username?: string) => {
  // If this function returns null, it means the username is valid.
  // If this function returns a string, it means the username is invalid and the string is the reason why.

  if (!username) return "Username is required";

  username = username.replace(/[_-]/g, "");

  if (PROFANITY.exists(username)) return "Username contains profanity";
  if (username.length < 3) return "Username is too short (min 3 characters)";
  if (username.length > 12) return "Username is too long (max 12 characters)";
  if (!REGEX.test(username)) return "Username contains invalid characters";
  if (username.includes(" ")) return "Username contains invalid characters";
  if (!ALPHABET.includes(username[0].toLowerCase()))
    return "Username must start with a letter";

  return null;
};
