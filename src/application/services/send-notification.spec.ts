import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { SendNotification } from './send-notification';

describe('Send Notification', () => {
  it('should be able to send notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();

    const sendNotification = new SendNotification(notificationsRepository);

    await sendNotification.execute({
      recipientId: 'example-recipientId',
      content: 'solicitação de amizade',
      category: 'social',
    });

    await sendNotification.execute({
      recipientId: 'example-recipientId-2',
      content: 'solicitação de amizade',
      category: 'social',
    });

    expect(notificationsRepository.notifications).toHaveLength(2); // notifications precisa ter no minimo 2 elementos dentro dele
  });
});
