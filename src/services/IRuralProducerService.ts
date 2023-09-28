import { UpdateProducerRequest } from "../controllers/AtualizarProdutorRequest"
import { CreateProducerRequest } from "../controllers/CreateProducerRequest"
import { RuralProducerDomain } from "../domain/RuralProducer"

export interface IRuralProducerService {
  create(createProducerRequest: CreateProducerRequest): Promise<RuralProducerDomain>
  update(updateProducerRequest: UpdateProducerRequest): Promise<RuralProducerDomain>
  getByCnpjOrCpf(cpfOrCnpj: string): Promise<RuralProducerDomain>
  deleteById(id: number): Promise<boolean>
}