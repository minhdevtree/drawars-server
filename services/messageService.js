import { io } from '../server.js';

export const failToSelectWord = roomId => {
  //sending message of failing to choose a word by admin pc
  const modName = 'Moderator';
  const chatMsg = `Time over to choose a word`;
  io.to(roomId).emit('recievedChatData', {
    userName: modName,
    chatMsg,
    type: 'failToSelectWord',
  });
};

export const userJoinedTheRoomService = (roomId, username) => {
  const modName = 'Moderator';
  const chatMsg = `${username} joined`;
  io.to(roomId).emit('recievedChatData', {
    userName: modName,
    chatMsg,
    type: 'userJoin',
  });
};

export const adminChangeMessageService = (roomId, username) => {
  const modName = 'Moderator';
  const chatMsg = `${username} is the new Admin`;
  io.to(roomId).emit('recievedChatData', {
    userName: modName,
    chatMsg,
    type: 'adminChange',
  });
};

export const adminRemovedMemberMessageService = (roomId, username) => {
  const modName = 'Moderator';
  const chatMsg = `Admin removed ${username} from the lobby`;
  io.to(roomId).emit('recievedChatData', {
    userName: modName,
    chatMsg,
    type: 'adminRemoveUser',
  });
};

export const leaveTheLobbyMessageService = (roomId, username) => {
  const modName = 'Moderator';
  const chatMsg = `${username} leaved the lobby`;
  io.to(roomId).emit('recievedChatData', {
    userName: modName,
    chatMsg,
    type: 'userLeave',
  });
};

export const blockUserFromChatMessageService = (
  roomId,
  username,
  isBlocked
) => {
  const modName = 'Moderator';
  if (isBlocked === true) {
    const chatMsg = `Admin disabled ${username} Chat`;
    io.to(roomId).emit('recievedChatData', {
      userName: modName,
      chatMsg,
      type: 'disableUserChat',
    });
  } else {
    const chatMsg = `Admin enabled ${username} Chat`;
    io.to(roomId).emit('recievedChatData', {
      userName: modName,
      chatMsg,
      type: 'enableUserChat',
    });
  }
};
