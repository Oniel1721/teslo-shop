import mongoose from 'mongoose'
import { isDevelopmentMode } from '../utils'
import { serverEnv } from '../utils/env'

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */
const mongoConnection = {
  isConnected: 0
}

export const connect = async () => {
  if (mongoConnection.isConnected) {
    console.log('Ya estabamos conectados')
    return undefined
  }

  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState

    if (mongoConnection.isConnected === 1) {
      console.log('Usando conexión anterior')
      return undefined
    }

    await mongoose.disconnect()
  }

  await mongoose.connect(serverEnv.MONGO_URL || '')
  mongoConnection.isConnected = 1
  console.log('Conectado a MongoDB:', serverEnv.MONGO_URL)
}

export const disconnect = async () => {
  if (isDevelopmentMode()) return undefined

  if (mongoConnection.isConnected === 0) return undefined

  await mongoose.disconnect()
  mongoConnection.isConnected = 0

  console.log('Desconectado de MongoDB')
}
