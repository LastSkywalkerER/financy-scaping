import { config } from '@/config'
import { StorageNames } from '@/core/constants'
import { logout } from '@/core/store/authSlice'
import store from '@/core/store/store'
import { messageOccurred } from '@/core/store/userMessageSlice'
import { getFromStorage } from '@/core/utilities/storageManager'
import Token from '@/types/Token'
import { AuthCredentials } from '@/types/uathData'

export class MainApi {
  private static requestService = async (
    url: string,
    method = 'GET',
    body: any = null,
    headers: { [key: string]: string } = {},
  ) => {
    try {
      headers['auth'] = getFromStorage(StorageNames.TOKEN)
      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }

      const response = await fetch(`${config.SERVERURL}${url}`, {
        method,
        body,
        headers,
      })
      const data = await response.json()

      if (!response.ok) {
        if (response.status === 401) {
          store.dispatch(logout())
        }
        throw new Error(data.message || `Can't connect to server`)
      }

      if (data.message) {
        store.dispatch(messageOccurred({ message: data.message, type: 'success' }))
      }

      return data
    } catch (error: any) {
      store.dispatch(messageOccurred({ message: error?.message, type: 'error' }))

      throw error
    }
  }

  public static registerRequest = (form: AuthCredentials) => {
    return MainApi.requestService(`/api/auth/register`, 'POST', {
      ...form,
    })
  }

  public static loginRequest = (form: AuthCredentials) => {
    return MainApi.requestService(`/api/auth/login`, 'POST', {
      ...form,
    })
  }

  public static statusRequest = () => {
    return MainApi.requestService(`/api/auth/status`)
  }

  public static getMainTable = () => {
    return MainApi.requestService('/api/table/data', 'GET')
  }

  public static getSavedTickers = () => {
    return MainApi.requestService('/api/tickers/saved', 'GET')
  }

  public static setSavedTickers = (tickers: Token[] = []) => {
    return MainApi.requestService('/api/tickers/saved', 'POST', {
      tickers,
    })
  }

  public static removeSavedTickers = (tickers: Token[] = []) => {
    return MainApi.requestService('/api/tickers/saved', 'DELETE', {
      tickers,
    })
  }

  public static updateSavedTicker = (ticker: Token, expectedPrice: number) => {
    return MainApi.requestService('/api/tickers/saved', 'PATCH', {
      symbol: ticker.symbol,
      expectedPrice,
    })
  }
}
