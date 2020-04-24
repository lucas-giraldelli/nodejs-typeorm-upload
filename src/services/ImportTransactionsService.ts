import path from 'path';
import csvtojson from 'csvtojson';

import Transaction from '../models/Transaction';
import uploadConfig from '../config/upload';

import CreateTransactionService from './CreateTransactionService';

class ImportTransactionsService {
  async execute(transactionsFilename: string): Promise<Transaction[]> {
    const transactionsFilePath = path.join(
      uploadConfig.directory,
      transactionsFilename,
    );

    const transactions = await csvtojson().fromFile(transactionsFilePath);

    const createTransaction = new CreateTransactionService();

    const createdTransactions = await Promise.all(
      transactions.map(async transaction => {
        const createdTransaction = await createTransaction.execute(transaction);
        return createdTransaction;
      }),
    );

    return createdTransactions;
  }
}

export default ImportTransactionsService;
