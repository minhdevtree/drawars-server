/**
 * Service to check for nearly correct words based on Levenshtein distance.
 */

class NearMatchService {
  /**
   * Calculate Levenshtein Distance between two words.
   * @param {string} a - The first word.
   * @param {string} b - The second word.
   * @returns {number} - The Levenshtein distance.
   */
  static levenshteinDistance(a, b) {
    const dp = Array.from({ length: a.length + 1 }, () =>
      Array(b.length + 1).fill(0)
    );

    for (let i = 0; i <= a.length; i++) dp[i][0] = i;
    for (let j = 0; j <= b.length; j++) dp[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        if (a[i - 1] === b[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] =
            Math.min(
              dp[i - 1][j], // Deletion
              dp[i][j - 1], // Insertion
              dp[i - 1][j - 1] // Substitution
            ) + 1;
        }
      }
    }

    return dp[a.length][b.length];
  }

  /**
   * Check if the user's guess is "nearly correct" compared to the correct word.
   * @param {string} guess - The user's guessed word.
   * @param {string} correctWord - The correct word to match.
   * @param {number} threshold - The maximum allowable Levenshtein distance for a match.
   * @returns {boolean} - True if the guess is nearly correct, otherwise false.
   */
  static isNearlyCorrect(guess, correctWord, threshold = 3) {
    const distance = this.levenshteinDistance(
      guess.toLowerCase(),
      correctWord.toLowerCase()
    );
    return distance <= threshold;
  }
  /**
   * Calculate the percentage of the correct word that is matched by the guess.
   * @param {string} guess - The user's guessed word.
   * @param {string} correctWord - The correct word to match.
   * @returns {number} - The percentage of the correct word that is matched by the guess.
   */
  static matchPercentage(guess, correctWord) {
    const normalizedPhrase1 = guess.toLowerCase();
    const normalizedPhrase2 = correctWord.toLowerCase();

    const maxLength = Math.max(
      normalizedPhrase1.length,
      normalizedPhrase2.length
    );
    if (maxLength === 0) return 100; // Both phrases are empty

    const distance = this.levenshteinDistance(
      normalizedPhrase1,
      normalizedPhrase2
    );

    const matchPercentage = ((maxLength - distance) / maxLength) * 100;

    return Math.round(matchPercentage * 100) / 100;
  }
}

export default NearMatchService;
