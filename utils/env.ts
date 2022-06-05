/* eslint-disable no-unused-vars */

export const isClientSide = () => {
  return typeof window !== 'undefined'
}

export const isServerSide = () => {
  return typeof window === 'undefined'
}

export const isProductionMode = () => {
  return process.env.NODE_ENV === 'production'
}

export const isDevelopmentMode = () => {
  return process.env.NODE_ENV === 'development'
}

  enum ServerEnvKeys {
     MONGO_URL = 'MONGO_URL'
  }

enum ClientEnvKeys {
  NEXT_PUBLIC_TAX_RATE = 'NEXT_PUBLIC_TAX_RATE'
}

const getServerEnv = (key: ServerEnvKeys):string => {
  if (isClientSide()) return ''
  return process.env[key] ?? ''
}

const getClientEnv = (key: ClientEnvKeys):string => {
  if (isServerSide()) return ''
  return process.env[key] ?? ''
}

export const serverEnv = {
  MONGO_URL: getServerEnv(ServerEnvKeys.MONGO_URL)
}

export const clientEnv = {
  TAX_RATE: getClientEnv(ClientEnvKeys.NEXT_PUBLIC_TAX_RATE)
}
