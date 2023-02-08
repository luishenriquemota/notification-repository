import { Notification } from '@application/entities/notification';
import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notifications-repository';

interface GetRecipientNotificationRequest {
  recipientid: string;
}

interface GetRecipientNotificationResponse {
  notifications: Notification[]
};

@Injectable()
export class GetRecipientNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(request: GetRecipientNotificationRequest): Promise<GetRecipientNotificationResponse> {
    const { recipientid } = request;

    const notifications = await this.notificationRepository.FindManyByrecipientId(recipientid)

  return {notifications}
  }
}
