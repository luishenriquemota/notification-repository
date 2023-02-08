import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notification';
import { NotificationRepository } from '@application/repositories/notifications-repository';
import { PrismaService } from '../prsima.service';
import { PrismaNotificationMappers } from '../mappers/prisma-notification-mappers';

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {
  constructor(private prisma: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMappers.toPrisma(notification);

    await this.prisma.notification.create({
      data: raw,
    });
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMappers.toPrisma(notification)

    await this.prisma.notification.update({where:{id: raw.id}, data: raw})
  }
  
  async FindManyByrecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({where:{recipientID: recipientId}})

    return notifications.map(PrismaNotificationMappers.toDomain)
    // é a mesma coisa que isso
    // return notifications.map(item => PrismaNotificationMappers.toDomain(item))
  }
 
  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({where:{id: notificationId}})

    if(!notification){
      return null;
    }

    return PrismaNotificationMappers.toDomain(notification)
  }
 
  async CountManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({where: {recipientID: recipientId}})

    return count;
  }
}
