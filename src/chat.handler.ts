const chatHandler = (io: any, socket: any) => {
  socket.on('join', ({ userId }: { userId: string }) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });

  const createChat = (payload: any) => {
    console.log('log::::: =>', payload);
  };

  const deleteChat = (payload: any) => {
    console.log('log::::: => ', payload);
  };

  socket.on('sendMessage', async (data: any) => {
    const { from, to, contactId, message, media } = data;

    console.log('log: ', data);

    const res = await io.to(to).emit('newMessage', message);

    console.log('log: res', res);
  });
  socket.on('chat:delete', deleteChat);
};

export default chatHandler;
