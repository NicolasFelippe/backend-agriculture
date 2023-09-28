import { FarmDomain } from "../domain/Farm";
import { RuralProducerDomain } from "../domain/RuralProducer";

// TODO: usado any pois o tipo do prisma não estava carregando o farm. Preciso estudar para avaliar outra forma.
export function entityToDomain(ruralProducer: any) {
  return {
    id: ruralProducer?.id,
    CpfOrCnpj: ruralProducer?.CpfOrCnpj,
    name: ruralProducer?.name,
    createdAt: ruralProducer?.createdAt,
    updatedAt: ruralProducer?.updatedAt,
    farm: {
      id: ruralProducer?.farm?.id,
      agriculturalArea: ruralProducer?.farm?.agriculturalArea,
      totalArea: ruralProducer?.farm?.totalArea,
      vegetationArea: ruralProducer?.farm?.vegetationArea,
      plantedCrops: ruralProducer?.farm?.plantedCrops,
      name: ruralProducer?.farm?.name,
      address: {
        city: ruralProducer?.farm?.city,
        state: ruralProducer?.farm?.state
      }
    } as FarmDomain
  } as RuralProducerDomain
}