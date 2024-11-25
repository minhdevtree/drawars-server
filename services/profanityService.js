// Import bad word lists
import { enBadWords } from '../utils/badWords/en.js';
import { viBadWords } from '../utils/badWords/vi.js';
import { badWords } from '@vnphu/vn-badwords';

export function filterProfanity(input) {
  const combinedBadWords = [...new Set([...enBadWords, ...viBadWords])];
  return badWords(input, {
    replacement: '*',
    blackList: combinedBadWords,
  });
}
