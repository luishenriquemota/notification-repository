import { MakeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { CountRecipientNotification } from './count-recipient-notifications';

describe('Count Notification', () => {
  it('should be able to count notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const countRecipientNotifications = new CountRecipientNotification(notificationsRepository)

    await notificationsRepository.create(MakeNotification({recipientId: "recipientId-1"}))

    await notificationsRepository.create(MakeNotification({recipientId: "recipientId-1"}))

    await notificationsRepository.create(MakeNotification({recipientId: "recipientId-2"}))

    const { count } = await countRecipientNotifications.execute({
      recipientid: 'recipientId-1'
    })

    expect(count).toEqual(2)
  });
});
