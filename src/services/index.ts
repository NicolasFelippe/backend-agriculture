import { ruralProducerRepositoryImpl } from "../repository";
import { RuralProducerService } from "./RuralProducerService";

const ruralProducerServiceImpl = new RuralProducerService(ruralProducerRepositoryImpl);

export { ruralProducerServiceImpl }