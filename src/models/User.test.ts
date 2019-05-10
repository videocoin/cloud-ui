import { User } from './User';

test('can create a instance of a model', () => {
  const user = User.create({
    id: '123',
    name: 'User',
    email: 'test@example.com',
    activated: false,
    account: null,
  });

  expect(user.name).toBe('User');
});
