import express from 'express';
import { lobby } from '../global/GlobalVariables.js';

const router = express.Router();
router.use(express.json());

router.get('/findgame', async (req, res) => {
  try {
    let isFound = false;
    for (const [key, value] of lobby.entries()) {
      const isStarted = value.game.isStarted;
      const isFull =
        value.users.length === value.settings.players ? true : false;
      const isPublic = value.settings.visibility === 'Public' ? true : false;
      if (!isStarted && !isFull && isPublic) {
        const data = {
          room: key,
          msg: 'Successfully found a free room',
        };
        isFound = true;
        return res.json(data);
      }
    }
    if (!isFound) {
      const data = {
        room: null,
        msg: 'No free rooms found',
      };
      return res.json(data);
    }
  } catch (err) {
    console.log(err);
    const data = {
      room: null,
      msg: 'No free rooms found',
    };
    return res.json(data);
  }
});

router.get('/findgame/:room_id', (req, res) => {
  try {
    const roomId = req.params.room_id;
    const lobbyData = lobby.get(roomId);
    //room doesn't exists
    if (lobbyData === undefined) {
      const data = {
        room: null,
        msg: "room doesn't exists",
      };
      return res.json(data);
    } else {
      // room exists , checking for empty and not started of game
      const isStarted = lobbyData.game.isStarted;
      const isFull =
        lobbyData.users.length === lobbyData.settings.players ? true : false;

      if (!isStarted && !isFull) {
        const data = {
          room: roomId,
          msg: 'room found',
        };
        return res.json(data);
      } else {
        const data = {
          room: null,
          msg: 'Unable to join room : ' + roomId,
        };
        return res.json(data);
      }
    }
  } catch (err) {
    console.log(err);
    const data = {
      room: null,
      msg: 'Unable to join server',
    };
    return res.json(data);
  }
});

export default router;
