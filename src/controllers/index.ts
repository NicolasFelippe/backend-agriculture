import { ruralProducerServiceImpl } from "../services";
import { RuralProducerController } from "./RuralProducerController/RuralProducerController";

const ruralProducerController = new RuralProducerController(ruralProducerServiceImpl);

export { ruralProducerController }