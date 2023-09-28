import { Request, Response } from 'express';
import { IRuralProducerService } from '../../services/IRuralProducerService';
import { CreateProducerRequest } from './CreateProducerRequest';
import { UpdateProducerRequest } from './AtualizarProdutorRequest';
import { NotFoundException } from '../../domain/exceptions/NotFoundException';
import { CpfCnpjInvalidoException } from '../../domain/exceptions/CpfCnpjInvalidoException';
import { Prisma } from '@prisma/client';

export class RuralProducerController {

  #servico: IRuralProducerService
  constructor(servico: IRuralProducerService) {
    this.#servico = servico
  }

  async create(request: Request, response: Response) {
    try {
      const createProducerRequest = request.body as CreateProducerRequest;

      const produtorCriado = await this.#servico.create(createProducerRequest);

      return response.status(201).json(produtorCriado)
    } catch (error) {
      console.log('create controller error', error)
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return response.status(400).send({ message: "CPF ou CNPJ já estão cadastrados!", error: true })
        }
      }
      if (error instanceof CpfCnpjInvalidoException) {
        return response.status(400).send({ message: error.message, error: true })
      }
      return response.status(500).send(error)
    }
  }

  async update(request: Request, response: Response) {
    try {
      const updateProducerRequest = request.body as UpdateProducerRequest;

      const retorno = await this.#servico.update(updateProducerRequest);

      return response.json(retorno)
    } catch (error) {
      console.log('update controller error', error)
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          return response.status(404).send({ message: "Produtor não foi cadastrado!", error: true })
        }
      }
      return response.status(500).send(error)
    }
  }

  async getByCNPJorCPF(request: Request, response: Response) {
    try {
      const retorno = await this.#servico.getByCnpjOrCpf(request.params.cnpj_cpf);
      return response.json(retorno)
    } catch (error) {
      console.log('getByCNPJorCPF controller error', error)
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          return response.status(404).send({ message: "Registro não existe!", error: true })
        }
      }
      return response.status(500).send(error)
    }
  }

  async deleteById(request: Request, response: Response) {
    try {
      const deleted = await this.#servico.deleteById(Number(request.params.id))
      return response.json(deleted)
    } catch (error) {
      console.log('deleteById controller error', error)
      if (error instanceof NotFoundException) {
        return response.status(404).send({ message: error.message, error: true })
      }
      return response.status(500).send(error)
    }
  }

  async dashboard(request: Request, response: Response) {
    try {
      const retorno = await this.#servico.dashboard()
      return response.json(retorno)
    } catch (error) {
      console.log('dashboard controller error: ', error)
      return response.status(500).send(error)
    }
  }
}