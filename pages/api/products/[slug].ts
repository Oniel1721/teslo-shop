import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { IProduct } from '../../../interfaces'
import { Product } from '../../../models'

type Data =
    | { message: string }
    | IProduct

const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { slug = '' } = req.query

  if (!slug) return res.status(400).json({ message: `Invalido slug: ${slug}` })

  await db.connect()
  const product = await Product.findOne({ slug }).lean()
  await db.disconnect()

  if (!product) return res.status(404).json({ message: `No existe un producto con el slug: ${slug}` })
  return res.status(200).json(product)
}

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProductBySlug(req, res)
    default:
      return res.status(400).json({
        message: 'Bad request'
      })
  }
}
