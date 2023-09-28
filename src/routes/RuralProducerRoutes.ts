import express from 'express'
import { ruralProducerController } from '../controllers';

const ruralProducerRouter = express.Router()
ruralProducerRouter.use('/api', ruralProducerRouter)

ruralProducerRouter.post(`/rural-producers`, (request, response) => {
  return ruralProducerController.create(request, response);
})

ruralProducerRouter.put(`/rural-producers/:id`, (request, response) => {
  return ruralProducerController.update(request, response);
})

ruralProducerRouter.get(`/rural-producers/cpf-cnpj/:cnpj_cpf`, (request, response) => {
  return ruralProducerController.getByCNPJorCPF(request, response);
})

ruralProducerRouter.delete(`/rural-producers/:id`, (request, response) => {
  return ruralProducerController.deleteById(request, response);
})

ruralProducerRouter.get(`/rural-producers/dashboard`, (request, response) => {
  return ruralProducerController.dashboard(request, response);
})

export default ruralProducerRouter