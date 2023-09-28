export class AreasIncorretasException extends Error {

  constructor(mensagem?: string) {
    super(mensagem ?? "A soma da area de vegetacao mais area de agricutavel está ultrapassando a area total da fazenda!");
    this.name = 'AreasIncorretasException';
    Object.setPrototypeOf(this, AreasIncorretasException.prototype); 
  }
}