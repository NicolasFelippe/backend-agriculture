import { CpfCnpjInvalidoException } from './exceptions/CpfCnpjInvalidoException'
import { validarCNPJCPF as validateCnpjOrCpf } from '../shared/validators/validarCNPJeCPF'
import { FarmDomain } from './Farm'

export class RuralProducerDomain {
  id?: number
  CpfOrCnpj!: string
  name!: string
  farm!: FarmDomain
  createdAt?: Date
  updatedAt?: Date

  create(
    CpfOrCnpj: string,
    name: string,
    farm: FarmDomain,
    id?: number
  ): void {
    const validado = validateCnpjOrCpf(CpfOrCnpj)
    if (!validado) {
      throw new CpfCnpjInvalidoException("CPF ou CNPJ inválidos")
    }
    this.name = name
    this.CpfOrCnpj = CpfOrCnpj
    this.farm = farm
    this.id = id
  }

  update(
    id: number,
    CpfOrCnpj: string,
    nome: string,
    fazenda: FarmDomain
  ): void {
    const validado = validateCnpjOrCpf(CpfOrCnpj)
    if (!validado) {
      throw new CpfCnpjInvalidoException("CPF ou CNPJ inválidos")
    }
    this.id = id
    this.name = nome
    this.CpfOrCnpj = CpfOrCnpj
    this.farm = fazenda
    this.id = id
  }
}