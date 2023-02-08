import { MakeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found-error';
import { ReadNotification } from './read-notification';

describe('Read Notification', () => {
  it('should be able to Read notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();

    const readNotification = new ReadNotification(notificationsRepository);

    const notification = MakeNotification({recipientId: "example-recipientId"});

    await notificationsRepository.create(notification);

    await readNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('shuld not be able to read a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const readNotification = new CancelNotification(notificationsRepository);

    expect(() => {
      return readNotification.execute({
        notificationId: 'fake-Id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
