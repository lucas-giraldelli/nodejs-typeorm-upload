import { getCustomRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<AppError> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    await transactionsRepository.delete({ id });

    return new AppError('', 204);
  }
}

export default DeleteTransactionService;
