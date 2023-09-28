import { PrismaClient } from '@prisma/client';
import { RuralProducerRepository } from './RuralProducerRepository';

const prisma = new PrismaClient();
const ruralProducerRepositoryImpl = new RuralProducerRepository(prisma);

export {
  ruralProducerRepositoryImpl
}