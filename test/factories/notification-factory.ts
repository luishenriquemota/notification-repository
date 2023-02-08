import { Content } from "@application/entities/content";
import { Notification, NotificationProps } from "@application/entities/notification";

type Override = Partial<NotificationProps>

export function MakeNotification(override: Override = {}){
  return new Notification( {
    category: 'social',
    content: new Content('Nova solicitação de amizade'),
    recipientId: 'recipientId-1',
    ...override
  })
}

//Função para "Fabricar" objetos para não repetirmos codigos