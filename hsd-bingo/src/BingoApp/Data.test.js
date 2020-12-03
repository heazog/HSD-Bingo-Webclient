import MyData from './Data';

test('Data: getSpyList Test', async() => {
  let spies = await MyData.getSpyList();


  expect(spies).toBeDefined();
  expect(spies[0]).toBeDefined();
  expect(spies[0].id).toBeDefined();
  expect(spies[0].abc).not.toBeDefined();
})

