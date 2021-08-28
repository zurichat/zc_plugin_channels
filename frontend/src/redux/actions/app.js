import APIService from '../../utils/api'
import UtlilityService from '../../utils/utils'
import {} from './types'

const _alert = (type, message) => {
  if (type === 'success') {
    const title = message
    const description = ' '
    const status = 'info'
    const duration = 3000

    UtlilityService.showAlert(title, description, status, duration)
  }

  if (type === 'error') {
    const title = 'Something went wrong.'
    const description = ' '
    const status = 'error'
    const duration = 3000

    UtlilityService.showAlert(title, description, status, duration)
  }
}

export { _alert }
