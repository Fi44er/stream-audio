const room = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const messages = room.slice(
    room.length < 10 ? 0 : -10,
    room.length,
  );

  console.log(messages);