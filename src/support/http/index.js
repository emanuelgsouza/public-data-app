import axios from 'axios'

export const cepApi = axios.create({
  baseURL: 'https://viacep.com.br/ws/'
})

export const ibgeApi = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/'
})
