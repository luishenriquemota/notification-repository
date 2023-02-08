// conceito de value object
export class Content {
  private readonly content: string;

  get value(): string {
    //ainda não entendi muito bem o get
    return this.content;
  }

  private ValidateContentLength(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }

  constructor(content: string) {
    const isContentLengthValid = this.ValidateContentLength(content);

    if (!isContentLengthValid) {
      throw new Error('Content length eror');
    }

    this.content = content;
  }
}
