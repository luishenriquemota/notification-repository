import { MakeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { GetRecipientNotification } from './get-recipient-notifications';

describe('Get recipients Notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const getRecipientNotifications = new GetRecipientNotification(notificationsRepository)

    await notificationsRepository.create(MakeNotification({recipientId: "recipientId-1"}))

    await notificationsRepository.create(MakeNotification({recipientId: "recipientId-1"}))

    await notificationsRepository.create(MakeNotification({recipientId: "recipientId-2"}))

    const {notifications} = await getRecipientNotifications.execute({
      recipientid: "recipientId-1"
     })

    expect(notifications).toHaveLength(2),
    expect(notifications).toEqual(expect.arrayContaining([
      expect.objectContaining({recipientId: "recipientId-1"}),
      expect.objectContaining({recipientId: "recipientId-1"})
    ]))
  });
});
