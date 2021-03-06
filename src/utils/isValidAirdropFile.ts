import toast from 'react-hot-toast'
import { isValidAddress } from './isValidAddress'

interface AccountProps {
  address: string
  amount: number
}

interface AirdropFileProps {
  name: string
  accounts: [AccountProps]
  cw20TokenAddress: string
  start: number
  startType: string
  expiration: number
  expirationType: string
  totalAmount: number
}

const isValidAirdropFile = (file: AirdropFileProps) => {
  if (
    !file.hasOwnProperty('name') ||
    !file.hasOwnProperty('accounts') ||
    !file.hasOwnProperty('cw20TokenAddress') ||
    !file.hasOwnProperty('start') ||
    !file.hasOwnProperty('startType') ||
    !file.hasOwnProperty('expiration') ||
    !file.hasOwnProperty('expirationType') ||
    !file.hasOwnProperty('totalAmount')
  ) {
    toast.error('Missing properties in airdrop file')
    return false
  }
  if (file.accounts.length > 15000) {
    toast.error('Accounts has to be less than 15000 addresses')
    return false
  }
  if (
    file.startType !== 'timestamp' &&
    file.startType !== 'height' &&
    file.startType !== null
  ) {
    toast.error('Start type must be timestamp or height or null')
    return false
  }
  if (
    file.expirationType !== 'timestamp' &&
    file.expirationType !== 'height' &&
    file.expirationType !== null
  ) {
    toast.error('Expiration Type must be timestamp or height or null')
    return false
  }
  if (
    (file.startType === null && file.start !== null) ||
    (file.startType !== null && file.start === null)
  ) {
    toast.error('Start and start type must be set together')
    return false
  }
  if (
    (file.expirationType === null && file.expiration !== null) ||
    (file.expirationType !== null && file.expiration === null)
  ) {
    toast.error('Expiration and expiration type must be set together')
    return false
  }
  if (!isValidAddress(file.cw20TokenAddress)) {
    toast.error('Invalid cw20 token address')
    return false
  }

  return true
}

export default isValidAirdropFile
