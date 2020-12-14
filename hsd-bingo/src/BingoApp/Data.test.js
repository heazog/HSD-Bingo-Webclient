import MyData from './Data';

test('convert LVA', async() => {
  expect(MyData.convertLVA("ISE7")).toBe("ISE1");

  expect(MyData.convertLVA("LVA1")).toBe("LVA1");
  expect(MyData.convertLVA("LVA2")).toBe("LVA2");
  expect(MyData.convertLVA("LVA3")).toBe("LVA3");
  expect(MyData.convertLVA("LVA4")).toBe("LVA4");
  expect(MyData.convertLVA("LVA5")).toBe("LVA5");
  expect(MyData.convertLVA("LVA6")).toBe("LVA6");
  expect(MyData.convertLVA("LVA7")).toBe("LVA1");
  expect(MyData.convertLVA("LVA8")).toBe("LVA2");
  expect(MyData.convertLVA("LVA9")).toBe("LVA3");
  expect(MyData.convertLVA("LVA10")).toBe("LVA4");
})

test('get functions', async() => {
  expect(MyData.getWinner()).toBe(null);
  expect(MyData.getUser()).toBe(null);
  expect(MyData.getMaster()).toBe(null);
  expect(MyData.getLobby()).toBe(null);
  expect(MyData.getBoard()).toBe(null);
})

test('get Lobbies', async() => {
  let lobbies = await MyData.getLobbies();
  expect(lobbies).toBeDefined();
  expect(lobbies[0]).toBeDefined();
  expect(lobbies[0].name).toBeDefined();
  expect(lobbies[0].users).toBeDefined();
})

test('join Lobby', async() => {
  let ret = await MyData.joinLobby("LVA1", "ME");
  expect(ret).toBeDefined();
  expect(ret.UID).toBeDefined();
  expect(ret.master).toBeDefined();
  expect(ret.UID).toBe(3);
  expect(ret.master).toBe(true);

  expect(MyData.getUser()).toBe("ME");
  expect(MyData.getMaster()).toBe(true);
})

test('get Players', async() => {
  let players = await MyData.getPlayers();
  expect(players).toBeDefined();
  expect(players[0]).toBeDefined();
  expect(players[0].name).toBeDefined();
  expect(players[0].score).toBeDefined();
  expect(players[0].status).toBeDefined();  
})

test('get JoinedLobbyStatus', async() => {
  status = await MyData.getJoinedLobbyStatus();
  expect(status).not.toBe(null);
  expect(status.gametime).toBeDefined();
})

test('get LobbyStatus', async() => {
  let status = await MyData.getLobbyStatus("LVA1");
  expect(status).toBeDefined();
  expect(status.gametime).toBeDefined();
})

test('start', async() => {
  expect(await MyData.start()).toBe(true);
})

test('requestBoard', async() => {
  expect(await MyData.requestBoard()).toBe(true);
  expect(MyData.getBoard().length).toBe(5);
})

test('makeSelection', async() => {
  expect(await MyData.makeSelection(1,2)).toBe(true);
})


test('makeSelection', async() => {
  let bingo = await MyData.bingo();
  expect(bingo).toBeDefined();
  expect(bingo.winner).toBeDefined();
})

test('highscores', async() => {
  let highscores = await MyData.highscores();
  expect(highscores).toBeDefined();
  expect(highscores.bestPlayers).toBeDefined();
  expect(highscores.quickestLobbies).toBeDefined();
})

test('disconnect', async() => {
  expect(await MyData.disconnect()).toBe(true);
})
