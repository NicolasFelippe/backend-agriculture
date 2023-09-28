import { PrismaClient } from "@prisma/client";
import { RuralProducerDomain } from "../domain/RuralProducer";
import { IRuralProducerRepository } from "./IRuralProducerRepository";
import { entityToDomain } from "./Mapper";

export class RuralProducerRepository implements IRuralProducerRepository {

  #prisma
  constructor(prisma: PrismaClient) {
    this.#prisma = prisma
  }

  async deleteById(id: number): Promise<boolean> {
    try {
      await this.#prisma.ruralProducer.delete({
        where: {
          id,
        }
      })
      return true;
    } catch (error) {
      return false;
    }
  }

  async existById(id: number): Promise<boolean> {
    try {
      await this.#prisma.ruralProducer.findFirstOrThrow({
        where: {
          id,
        },
        include: {
          farm: {
          }
        }
      })
      return true;
    } catch (error) {
      return false;
    }
  }

  async getByCnpjOrCpf(cpfOrCnpj: string): Promise<RuralProducerDomain> {
    const ruralProducer = await this.#prisma.ruralProducer.findFirstOrThrow({
      where: {
        CpfOrCnpj: cpfOrCnpj
      },
      include: {
        farm: {
        }
      }
    })
    return entityToDomain(ruralProducer)
  }

  async update(produtor: RuralProducerDomain): Promise<RuralProducerDomain> {
    const ruralProducerUpdated = await this.#prisma.ruralProducer.update({
      where: {
        CpfOrCnpj: produtor.CpfOrCnpj,
      },
      data: {
        name: produtor.name,
        farm: {
          update: {
            name: produtor.farm.name,
            agriculturalArea: produtor.farm.agriculturalArea,
            totalArea: produtor.farm.totalArea,
            vegetationArea: produtor.farm.vegetationArea,
            city: produtor.farm.address.city,
            state: produtor.farm.address.state,
            plantedCrops: produtor.farm.plantedCrops,
          }
        }
      },
    });

    return entityToDomain(ruralProducerUpdated)
  }

  async save(ruralProducerDomain: RuralProducerDomain): Promise<RuralProducerDomain> {
    const ruralProducerCreated = await this.#prisma.ruralProducer.create({
      data: {
        CpfOrCnpj: ruralProducerDomain.CpfOrCnpj,
        name: ruralProducerDomain.name,
        farm: {
          create: {
            name: ruralProducerDomain.farm.name,
            agriculturalArea: ruralProducerDomain.farm.agriculturalArea,
            totalArea: ruralProducerDomain.farm.totalArea,
            vegetationArea: ruralProducerDomain.farm.vegetationArea,
            city: ruralProducerDomain.farm.address.city,
            state: ruralProducerDomain.farm.address.state,
            plantedCrops: ruralProducerDomain.farm.plantedCrops,
          }
        }
      },
      select: {
        CpfOrCnpj: true,
        createdAt: true,
        id: true,
        name: true,
        updatedAt: true,
        farm: true
      }
    });

    return entityToDomain(ruralProducerCreated)
  }
}