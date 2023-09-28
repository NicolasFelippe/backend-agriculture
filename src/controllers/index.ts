import { ruralProducerServiceImpl } from "../services";
import { RuralProducerController } from "./RuralProducerController";

const ruralProducerController = new RuralProducerController(ruralProducerServiceImpl);

export { ruralProducerController }