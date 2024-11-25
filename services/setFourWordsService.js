import { io } from '../server.js';
import { shuffleArray } from '../utils/shuffleArray.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

import { generalEN } from '../utils/dataWords/en/general.js';
import { generalVI } from '../utils/dataWords/vi/general.js';
import { animalEN } from '../utils/dataWords/en/animal.js';
import { animalVI } from '../utils/dataWords/vi/animal.js';
import { minecraftEN } from '../utils/dataWords/en/minecraft.js';
import { minecraftVI } from '../utils/dataWords/vi/minecraft.js';

// Khởi tạo client
const genAI = new GoogleGenerativeAI('api-key');

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Hàm tạo từ hoặc cụm từ ngẫu nhiên
export async function generateRandomWords({
  presenterSocketId,
  language = 'English',
  topic = 'everyday objects',
  numWords = 4,
}) {
  try {
    const prompt = `I am creating a drawing game where players choose a word and attempt to draw it for others to guess. Generate ${numWords} unique and creative words or short phrases in ${language} language that are closely related to the topic '${topic}.' Each word or phrase should represent an object, action, or concept that can be clearly visualized and drawn in a fun, game-like setting. Avoid abstract ideas, and focus on tangible, recognizable items, characters, or activities that are interesting and engaging for players to draw and guess. Format the response as: word1 -- word2 -- word3 -- word4.`;

    const result = await model.generateContent([prompt], {
      maxTokens: 50, // Set the maximum number of tokens
      temperature: 0.7, // Set the temperature for randomness
      topP: 0.9, // Set the top-p value for nucleus sampling
      frequencyPenalty: 0, // Set the frequency penalty
      presencePenalty: 0, // Set the presence penalty
    });

    const generatedText = result.response.text() || 'No response generated';
    const words = generatedText
      .split(' -- ')
      .filter(word => word.trim() !== '');

    const selectedWords = words.slice(0, numWords); // Lấy đúng số lượng từ yêu cầu

    io.to(presenterSocketId).emit('selectFromFourWords', {
      words: selectedWords,
    });

    return selectedWords;
  } catch (error) {
    console.error('Error generating random words:', error);
    return [];
  }
}

export const setFourWordsService = (presenterSocketId, topics) => {
  let dataArray = [];
  topics.forEach(topic => {
    switch (topic) {
      case 'generalEN':
        dataArray = dataArray.concat(generalEN);
        break;
      case 'generalVI':
        dataArray = dataArray.concat(generalVI);
        break;
      case 'animalEN':
        dataArray = dataArray.concat(animalEN);
        break;
      case 'animalVI':
        dataArray = dataArray.concat(animalVI);
        break;
      case 'minecraftEN':
        dataArray = dataArray.concat(minecraftEN);
        break;
      case 'minecraftVI':
        dataArray = dataArray.concat(minecraftVI);
        break;
      default:
        break;
    }
  });
  dataArray = shuffleArray(dataArray);
  const index = Math.floor(Math.random() * dataArray.length);
  let words = [];
  for (let i = 0; i < 4; i++) {
    words.push(dataArray[(index + i) % dataArray.length]);
  }
  io.to(presenterSocketId).emit('selectFromFourWords', { words: words });
};
