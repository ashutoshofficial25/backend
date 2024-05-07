const chatHandler = (io: any, socket: any) => {
  const createChat = (payload: any) => {
    console.log('log::::: =>', payload);
  };

  const deleteChat = (payload: any) => {
    console.log('log::::: => ', payload);
  };

  socket.on('chat:create', createChat);
  socket.on('chat:delete', deleteChat);
};

export default chatHandler;
