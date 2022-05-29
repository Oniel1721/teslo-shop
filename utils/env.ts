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

const getServerEnv = (key: ServerEnvKeys):string => {
  if (isClientSide()) return ''
  return process.env[key] ?? ''
}

export const serverEnv = {
  MONGO_URL: getServerEnv(ServerEnvKeys.MONGO_URL)
}
