import { PlantedCrop } from "../domain/enum/PlantedCropsEnum"

export interface CreateProducerRequest {
  CpfOrCnpj: string
  name: string
  farm: FarmRequest
}

export interface FarmRequest {
  name: string
  totalArea: number
  agriculturalArea: number
  vegetationArea: number
  address: AddressRequest
  plantedCrops: PlantedCrop[]
}

export interface AddressRequest {
  city: string
  state: string
}