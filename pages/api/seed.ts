import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedDatabase } from '../../database'
import { Product, User } from '../../models'
import { isDevelopmentMode } from '../../utils'

type Data = {
    message: string
}

export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
  if (!isDevelopmentMode()) {
    return res.status(401).json({ message: 'No tiene acceso a este endpoint' })
  }
  await db.connect()

  await User.deleteMany({})
  await User.insertMany(seedDatabase.initialData.users)

  await Product.deleteMany({})
  await Product.insertMany(seedDatabase.initialData.products)

  await db.disconnect()
  res.status(200).json({ message: 'Proceso realizado correctamente' })
}
