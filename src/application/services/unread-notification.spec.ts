import { MakeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found-error';
import { ReadNotification } from './read-notification';
import { UnreadNotification } from './unread-notification';

describe('Unread Notification', () => {
  it('should be able to unread notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();


    const unreadNotification = new UnreadNotification(notificationsRepository);

    const notification = MakeNotification({reatAt: new Date()});

    await notificationsRepository.create(notification);

    await unreadNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('shuld not be able to unread a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const unreadNotification = new CancelNotification(notificationsRepository);

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'fake-Id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
