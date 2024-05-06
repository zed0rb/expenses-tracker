import { validates } from '@server/utils/validation'
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm'
import { z } from 'zod'

import { User } from './user'

export enum TransactionTypes {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({
    type: 'enum',
    enum: TransactionTypes,
  })
  type: string

  @Column('integer')
  userId: number

  @Column('numeric', { precision: 10, scale: 2 })
  amount: number

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({
    name: 'user_id',
  })
  user: User

  @Column({
    type: 'text',
    nullable: true,
  })
  category: string

  @Column('text')
  description: string

  @CreateDateColumn()
  created_at: Date
}

export type TransactionBare = Omit<Transaction, 'user' | 'created_at'>

export const transactionSchema = validates<TransactionBare>().with({
  id: z.number().int().positive(),
  userId: z.number().positive(),
  type: z.string(),
  amount: z.number().min(0, 'Must be positive number'),
  category: z.string().max(20, 'category maximum chars 20'),
  description: z
    .string()
    .min(2, 'Description must be at least 2 characters long')
    .max(100, 'Description to long'),
})

export const transactionInsertSchema = transactionSchema.omit({ id: true })

export type TransactionInsert = z.infer<typeof transactionInsertSchema>
