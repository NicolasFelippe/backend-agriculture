import { UpdateProducerRequest } from "../controllers/AtualizarProdutorRequest";
import { AddressRequest, CreateProducerRequest } from "../controllers/CreateProducerRequest";
import { AddressDomain } from "../domain/Address";
import { FarmDomain } from "../domain/Farm";
import { RuralProducerDomain } from "../domain/RuralProducer";
import { NotFoundException } from "../exceptions/NotFoundException";
import { IRuralProducerRepository } from "../repository/IRuralProducerRepository";
import { IRuralProducerService } from "./IRuralProducerService";

export class RuralProducerService implements IRuralProducerService {

  #repository
  constructor(produtorRepository: IRuralProducerRepository) {
    this.#repository = produtorRepository
  }

  async getByCnpjOrCpf(cpfOrCnpj: string): Promise<RuralProducerDomain> {
    return await this.#repository.getByCnpjOrCpf(cpfOrCnpj)
  }

  async update(updateProducerRequest: UpdateProducerRequest): Promise<RuralProducerDomain> {
    await this.getByCnpjOrCpf(updateProducerRequest.CpfOrCnpj);

    const farmDomain = new FarmDomain();
    farmDomain.update(
      updateProducerRequest.id,
      updateProducerRequest.farm.name,
      updateProducerRequest.farm.totalArea,
      updateProducerRequest.farm.agriculturalArea,
      updateProducerRequest.farm.vegetationArea,
      {
        ...updateProducerRequest.farm.address
      } as AddressDomain,
      updateProducerRequest.farm.plantedCrops
    );

    const ruralProducerDomain = new RuralProducerDomain();
    ruralProducerDomain.update(
      updateProducerRequest.id,
      updateProducerRequest.CpfOrCnpj,
      updateProducerRequest.name,
      farmDomain
    );

    return await this.#repository.update(ruralProducerDomain);
  }

  async create(createProducerRequest: CreateProducerRequest): Promise<RuralProducerDomain> {

    const { farm, ...producerRequest } = createProducerRequest;

    const fazendaDomain = new FarmDomain();
    fazendaDomain.create(
      farm.name,
      farm.totalArea,
      farm.agriculturalArea,
      farm.vegetationArea,
      {
        ...farm.address
      } as AddressRequest,
      farm.plantedCrops
    );

    const produtorDomain = new RuralProducerDomain();
    produtorDomain.create(
      producerRequest.CpfOrCnpj,
      producerRequest.name,
      fazendaDomain
    );

    return await this.#repository.save(produtorDomain);
  }

  async deleteById(id: number): Promise<boolean> {
    const exist = await this.#repository.existById(id);
    if (exist) {
      return await this.#repository.deleteById(id)
    }
    throw new NotFoundException(`Não existe registro com o id: ${id}`);
  }
}