import { validates } from '@server/utils/validation'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'
import { z } from 'zod'
import { Transaction } from './transaction'

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Unique(['email'])
  @Column('text')
  email: string

  @Column('text', { select: false })
  password: string

  @Column('numeric', { precision: 10, scale: 2, default: 0 })
  balance: number

  @OneToMany(() => Transaction, (transaction) => transaction.user, {
    cascade: ['insert'],
  })
  transactions: Transaction[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export type UserBare = Omit<User, 'transactions' | 'created_at' | 'updated_at'>

export const userSchema = validates<UserBare>().with({
  id: z.number().int().positive(),
  email: z.string().trim().toLowerCase().email(),
  password: z
    .string()
    .min(8)
    .max(64)
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one capital letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
  balance: z.number().positive(),
})

export const userInsertSchema = userSchema.omit({ id: true })

export type UserInsert = z.infer<typeof userInsertSchema>

export type AuthUser = Pick<User, 'id'>

export const authUserSchema = validates<AuthUser>().with({
  id: z.number().int().positive(),
})
