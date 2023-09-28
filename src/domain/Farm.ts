import { AreasIncorretasException } from "./exceptions/AreasException"
import { AddressDomain } from "./Address"
import { PlantedCrop } from "./enum/PlantedCropsEnum"

export class FarmDomain {
  id?: number
  name!: string
  totalArea!: number
  agriculturalArea!: number
  vegetationArea!: number
  address!: AddressDomain
  plantedCrops!: PlantedCrop[]
  createdAt?: Date
  updatedAt?: Date

  public create(
    name: string,
    totalArea: number,
    agriculturalArea: number,
    vegetationArea: number,
    address: AddressDomain,
    plantedCrops: PlantedCrop[]): void {
    if ((agriculturalArea + vegetationArea) > totalArea) {
      throw new AreasIncorretasException()
    }
    this.name = name
    this.totalArea = totalArea
    this.agriculturalArea = agriculturalArea
    this.vegetationArea = vegetationArea
    this.address = address
    this.plantedCrops = plantedCrops
  }

  public update(
    id: number,
    name: string,
    totalArea: number,
    agriculturalArea: number,
    vegetationArea: number,
    address: AddressDomain,
    plantedCrops: PlantedCrop[]): void {
    if ((agriculturalArea + vegetationArea) > totalArea) {
      throw new AreasIncorretasException()
    }
    this.id = id
    this.name = name
    this.totalArea = totalArea
    this.agriculturalArea = agriculturalArea
    this.vegetationArea = vegetationArea
    this.address = address
    this.plantedCrops = plantedCrops
  }
}