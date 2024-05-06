import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { Transaction } from '@server/entities/transaction'
import type { TransactionBare } from '@server/entities/transaction'

export default authenticatedProcedure.query(
  async ({ ctx: { authUser, db } }) => {
    const userId = authUser.id

    return (await db.getRepository(Transaction).find({
      where: { userId },
      order: { id: 'DESC' },
    })) as TransactionBare[]
  }
)
