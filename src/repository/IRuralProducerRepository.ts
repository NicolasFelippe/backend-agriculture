import { Dashboard } from "../domain/Dashboard";
import { RuralProducerDomain as RuralProducerDomain } from "../domain/RuralProducer";

export interface IRuralProducerRepository {
  save(ruralProducer: RuralProducerDomain): Promise<RuralProducerDomain>

  update(ruralProducer: RuralProducerDomain): Promise<RuralProducerDomain>

  getByCnpjOrCpf(CnpjOrCpf: string): Promise<RuralProducerDomain>

  existById(id: number): Promise<boolean>

  deleteById(id:number): Promise<boolean>

  dashboard(): Promise<Dashboard>
}