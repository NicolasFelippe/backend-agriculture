export class CpfCnpjInvalidoException extends Error {

  constructor(mensagem?: string) {
    super(mensagem);
    this.name = 'CpfCnpjInvalidoException';
    Object.setPrototypeOf(this, CpfCnpjInvalidoException.prototype); 
  }
}