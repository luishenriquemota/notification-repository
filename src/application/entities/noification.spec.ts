import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('shoul be able to create a notification', () => {
    const notification = new Notification({
      category: 'notificação',
      content: new Content('notificação recebida'),
      recipientId: 'example-recipient-id',
    });

    expect(notification).toBeTruthy();
  });
});
