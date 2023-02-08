import { Content } from './content';
describe('Notification Content', () => {
  it('should be able to create a notificantion content', () => {
    const content = new Content('voce recebeu uma notificação');

    expect(content).toBeTruthy(); // verificando se o valor de content é um valor truthy
  });

  it('sould be able to create a notifiction contetn with less than 5 characters', () => {
    expect(() => new Content('aaa')).toThrow();
  });

  it('sould be able to create a notifiction contetn with more than 140 characters', () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
  });
});
