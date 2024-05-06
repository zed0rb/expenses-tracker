import { join } from 'path'
import { DataSource, type DataSourceOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { newDb } from 'pg-mem'
import * as entities from '../entities'

export function createDatabase(
  options: Partial<DataSourceOptions | { type: 'pg-mem' }> = {}
) {
  // Run with an in-memory database.
  if (options.type === 'pg-mem') {
    return createMemoryDatabase()
  }

  return new DataSource({
    // defaults
    entities,
    migrations: [relative('./migrations/**/*.ts')],
    namingStrategy: new SnakeNamingStrategy(),

    // overrides
    ...options,
    // toDo not the best way to hard code this
    connection: {
    options: `project=ep-proud-credit-a2y4qwzv`,
  },
  } as any)
}

function createMemoryDatabase(): DataSource {
  const pgMemory = newDb()

  pgMemory.public.registerFunction({
    name: 'current_database',
    implementation: () => 'test',
  })
  pgMemory.public.registerFunction({
    name: 'version',
    implementation: () => '1',
  })

  return pgMemory.adapters.createTypeormDataSource({
    type: 'postgres',
    entities,
    synchronize: true,
    logging: false,
    namingStrategy: new SnakeNamingStrategy(),
  })
}

function relative(...paths: string[]) {
  return join(import.meta.url, ...paths)
}

export type Database = DataSource
