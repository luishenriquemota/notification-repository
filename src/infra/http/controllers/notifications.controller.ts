import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from '@application/services/send-notification';
import { CreateNotificationBody } from '@infra/http/dtos/create-notification';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@application/services/cancel-notification';
import { ReadNotification } from '@application/services/read-notification';
import { UnreadNotification } from '@application/services/unread-notification';
import { GetRecipientNotification } from '@application/services/get-recipient-notifications';
import { CountRecipientNotification } from '@application/services/count-recipient-notifications';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private getRecipientNotification: GetRecipientNotification,
    private countRecipientNotification: CountRecipientNotification,
    ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/read')
  async read(@Param('id') id: string){
    await this.readNotification.execute({notificationId: id})
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string){
    await this.unreadNotification.execute({notificationId: id})
  }

  @Get("from/:recipientId")
  async getFromrecipient(@Param('recipientId') recipientId: string){
    const {notifications} = await this.getRecipientNotification.execute({
      recipientid: recipientId
    })
    return {notifications: notifications.map(NotificationViewModel.ToHTTP)} //retirar para ver como retorna
  }

  @Get('count/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string){
    const {count} = await this.countRecipientNotification.execute({
      recipientid: recipientId
    })

    return {count}
  }

 
  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      category,
      content,
    });
    return { notification: NotificationViewModel.ToHTTP(notification) };
  }
}
