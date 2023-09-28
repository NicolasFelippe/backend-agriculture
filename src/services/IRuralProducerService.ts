import { UpdateProducerRequest } from "../controllers/RuralProducerController/AtualizarProdutorRequest"
import { CreateProducerRequest } from "../controllers/RuralProducerController/CreateProducerRequest"
import { Dashboard } from "../domain/Dashboard"
import { RuralProducerDomain } from "../domain/RuralProducer"

export interface IRuralProducerService {
  create(createProducerRequest: CreateProducerRequest): Promise<RuralProducerDomain>
  update(updateProducerRequest: UpdateProducerRequest): Promise<RuralProducerDomain>
  getByCnpjOrCpf(cpfOrCnpj: string): Promise<RuralProducerDomain>
  deleteById(id: number): Promise<boolean>
  dashboard(): Promise<Dashboard>
}