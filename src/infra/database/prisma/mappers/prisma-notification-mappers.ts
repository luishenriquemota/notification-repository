import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification'; // notificação de nival da nossa aplicação
import {Notification as RawNotification} from "@prisma/client" // notificação do nivel do banco de dados

export class PrismaNotificationMappers {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      recipientID: notification.recipientId,
      category: notification.category,
      content: notification.content.value,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
      canceledAt: notification.canceledAt
    };
  }

  static toDomain(raw: RawNotification): Notification{
    return new Notification({

      category: raw.category,
      content: new Content(raw.content),
      recipientId: raw.recipientID,
      reatAt: raw.readAt,
      canceledAt: raw.canceledAt,
      createdAt: raw.createdAt
    }, raw.id)
  }
}
