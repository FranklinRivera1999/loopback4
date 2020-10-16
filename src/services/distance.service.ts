import {HttpErrors} from '@loopback/rest'
const {get} = require('axios')
const Errors = require('http-errors')
const API_KEY = process.env.API_KEY_MAPS

const formatDistanceMatrix = (data: any) => {
  if (data.error_message) throw new HttpErrors[400](data.error_message)
  let elements = data.rows[0].elements || []

  let dataFormat = elements.map((element: any) => {
    if (element.status != 'OK') return
    return {
      distanceText: element.distance.text,
      distanceMetric: element.distance.value,
      duration: element.duration.text
    }
  })

  return dataFormat
}

export const distanceMatrix = async (origins: string, destinations: string) => {
  let response = await get('https://maps.googleapis.com/maps/api/distancematrix/json', {
    params: {
      origins,
      destinations,
      key: API_KEY,
      units: 'metric'
    }
  })

  return formatDistanceMatrix(response.data)
}
