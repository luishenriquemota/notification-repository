import { Replace } from '@helpers/replace';
import { Content } from './content';
import { randomUUID } from 'node:crypto';

export interface NotificationProps {
  recipientId: string;
  content: Content; // Estou fazendo algumas validações no meu Content e depois quero recebe-lo aqui ja com essas validaçoes isso é chamado de value object
  category: string;
  reatAt?: Date | null; // estou dizendo que quero que esse campo seja ou undefined ou Date ou Nulo
  canceledAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private _id: string;
  private props: NotificationProps;

  constructor(props: Replace<NotificationProps, { createdAt?: Date }>, id?: string) {
    // Passando o Replace aqui para dizer que o campo createdAt aqui ele não sera um campo obrigatorio
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(), // se o campo for informado ele ira usar o campo informado se não ele ira criar um new Date
    };
  }

  public get id() {
    return this._id;
  }

  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  public get recipientId(): string {
    return this.props.recipientId;
  }

  public set content(content: Content) {
    this.props.content = content;
  }

  public get content(): Content {
    return this.props.content;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  public get category(): string {
    return this.props.category;
  }

  public read() {
    this.props.reatAt = new Date();
  }

  public unread(){
    this.props.reatAt = null
  }

  public get readAt(): Date | null | undefined {
    return this.props.reatAt;
  }

  public cancel() {
    this.props.canceledAt = new Date();
  }

  public get canceledAt(): Date | null | undefined {
    return this.props.canceledAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
