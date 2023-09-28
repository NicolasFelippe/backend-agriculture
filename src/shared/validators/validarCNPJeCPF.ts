import { validCNPJ } from "./validateCNPJ"
import { validarCPF } from "./validateCPF"

export function validarCNPJCPF(cnpjcpf: string): boolean {
  const validado = validCNPJ(cnpjcpf);
  if(!validado){
    return validarCPF(cnpjcpf);
  }
  return validado;
}