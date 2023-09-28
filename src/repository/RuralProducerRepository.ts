import { PrismaClient } from "@prisma/client";
import { RuralProducerDomain } from "../domain/RuralProducer";
import { IRuralProducerRepository } from "./IRuralProducerRepository";
import { entityToDomain } from "./Mapper";
import { Dashboard } from "../domain/Dashboard";

export class RuralProducerRepository implements IRuralProducerRepository {

  #prisma
  constructor(prisma: PrismaClient) {
    this.#prisma = prisma
  }

  async dashboard(): Promise<Dashboard> {
    const countFarms = await this.#prisma.farm.count();

    const totalAreas = await this.#prisma.farm.aggregate({
      _sum: {
        totalArea: true,
      },
    });

    const states = await this.#prisma.farm.groupBy({
      by: ['state'],
      _count: {
        state: true,
      },
    });

    const plantedCrops = await this.#prisma.plantedCrop.groupBy({
      by: ['name'],
      _count: {
        name: true,
      },
    });

    const vegetationAreaAndAgriculturalArea = await this.#prisma.farm.aggregate({
      _sum: {
        agriculturalArea: true,
        vegetationArea: true,
      },
    });

    const dashboard: Dashboard = {
      countTotalFarms: countFarms,
      sumAgricuturalArea: vegetationAreaAndAgriculturalArea._sum.agriculturalArea,
      sumTotalAreaFarms: totalAreas._sum.totalArea,
      sumVegetationArea: vegetationAreaAndAgriculturalArea._sum.vegetationArea,
      states: states.map((state) => ({ count: state._count.state,  state: state.state })),
      plantedCrops: plantedCrops.map((x) => ({
        count: x._count.name,
        name: x.name
      })),
    }

    return dashboard
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
            plantedCrops: {
              createMany: {
                data: produtor.farm.plantedCrops.map((platedCrop) => ({
                  name: platedCrop
                }))
              }
            }
          }
        }
      },
    });

    return entityToDomain(ruralProducerUpdated)
  }

  async save(ruralProducerDomain: RuralProducerDomain): Promise<RuralProducerDomain> {
    const plantedCrops = ruralProducerDomain.farm.plantedCrops.map((platedCrop) => ({
      name: platedCrop
    }));

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
            plantedCrops: {
              createMany: {
                data: plantedCrops,
                skipDuplicates: false
              }
            }
          }
        }
      },
      include: {
        farm: {
          include: {
            plantedCrops: {
            }
          }
        }
      }
    });

    return entityToDomain(ruralProducerCreated)
  }
}