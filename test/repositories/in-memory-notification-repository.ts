import { Notification } from '@application/entities/notification';
import { NotificationRepository } from '@application/repositories/notifications-repository';

export class InMemoryNotificationRepository implements NotificationRepository {
 
  public notifications: Notification[] = [];

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (notification) => notification.id === notificationId,
    );

    if (!notification) {
      return null;
    }
    return notification;
  }

  async FindManyByrecipientId(recipientId: string): Promise<Notification[]> {
    return  this.notifications.filter(item => item.recipientId === recipientId)

  }

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }

  async CountManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(item => item.recipientId === recipientId).length
  }
}
