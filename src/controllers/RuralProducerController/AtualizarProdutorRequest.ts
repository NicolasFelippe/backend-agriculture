import { PlantedCrop } from "../../domain/enum/PlantedCropsEnum"
import { CreateProducerRequest, FarmRequest } from "./CreateProducerRequest"

export interface UpdateProducerRequest extends Omit<CreateProducerRequest, 'farm'> {
  id: number
  farm: FarmUpdate
}

interface FarmUpdate extends FarmRequest{
  id: number
}