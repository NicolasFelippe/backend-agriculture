export class NotFoundException extends Error {

  constructor(mensagem: string) {
    super(mensagem);
    this.name = 'NotFoundException';
    Object.setPrototypeOf(this, NotFoundException.prototype); 
  }
}
