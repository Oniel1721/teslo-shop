import mongoose, { Schema, model, Model } from 'mongoose'
import { SHOP_CONSTANTS } from '../database'
import { IProduct } from '../interfaces'

const productSchema = new Schema({
  description: { type: String, required: true },
  images: [{ type: String }],
  inStock: { type: Number, required: true, default: 0 },
  price: { type: Number, required: true, default: 0 },
  sizes: [{
    type: String,
    enum: {
      values: SHOP_CONSTANTS.validSizes,
      message: '{VALUE} no es un tamaño válido'
    }
  }],
  slug: { type: String, required: true, unique: true },
  tags: [{ type: String }],
  title: { type: String, required: true },
  type: {
    type: String,
    enum: {
      values: SHOP_CONSTANTS.validTypes,
      message: '{VALUE} no es un tipo válido'
    }
  },
  gender: {
    type: String,
    enum: {
      values: SHOP_CONSTANTS.validGenders,
      message: '{VALUE} no es un genero válido'
    }
  }
}, {
  timestamps: true
})

// TODO: crear indice de Mongo

const Product:Model<IProduct> = mongoose.models.Product || model('Product', productSchema)

export default Product
