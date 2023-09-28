export interface Dashboard {
  countTotalFarms: number | null
  sumTotalAreaFarms: number | null
  sumAgricuturalArea: number | null
  sumVegetationArea: number | null
  states: StatesDashboard[]
  plantedCrops: PlantedCropsDashboard[]
}

interface PlantedCropsDashboard {
  count: number
  name: string
}

interface StatesDashboard {
  count: number
  state: string
}
