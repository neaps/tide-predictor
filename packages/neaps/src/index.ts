import { getDistance } from 'geolib'
import { stations, type Station } from '@neaps/tide-database'
import tidePredictor, {
  type TimeSpan,
  type ExtremesInput
} from '@neaps/tide-predictor'
import type { GeolibInputCoordinates } from 'geolib/es/types'

type DatumOption = {
  /** Datum to return predictions in. Defaults to 'MLLW' if available for the nearest station. */
  datum?: string
}

export type ExtremesOptions = ExtremesInput & DatumOption
export type TimelineOptions = TimeSpan & DatumOption
export type WaterLevelOptions = { time: Date } & DatumOption

/**
 * Get extremes prediction using the nearest station to the given position.
 *
 * @example
 * ```ts
 * import { getExtremesPrediction } from 'neaps'
 *
 * const prediction = getExtremesPrediction({
 *   latitude: 26.7, // or `lat`
 *   longitude: -80.05, // or `lng` or `lon`
 *   start: new Date('2025-12-17'),
 *   end: new Date('2025-12-18'),
 *   datum: 'MLLW', // optional, defaults to MLLW if available
 * })
 */
export function getExtremesPrediction(
  options: GeolibInputCoordinates & ExtremesOptions
) {
  return nearestStation(options).getExtremesPrediction(options)
}

/**
 * Get timeline prediction using the nearest station to the given position.
 */
export function getTimelinePrediction(
  options: GeolibInputCoordinates & TimelineOptions
) {
  return nearestStation(options).getTimelinePrediction(options)
}

/**
 * Get water level at a specific time using the nearest station to the given position.
 */
export function getWaterLevelAtTime(
  options: GeolibInputCoordinates & WaterLevelOptions
) {
  return nearestStation(options).getWaterLevelAtTime(options)
}

/**
 * Find the nearest station to the given position.
 */
export function nearestStation(position: GeolibInputCoordinates) {
  return stationsNear(position, 1)[0]
}

/**
 * Find stations near the given position.
 * @param limit Maximum number of stations to return (default: 10)
 */
export function stationsNear(position: GeolibInputCoordinates, limit = 10) {
  return stations
    .map((station) => ({ station, distance: getDistance(position, station) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
    .map(({ station, distance }) => useStation(station, distance))
}

/**
 * Find a specific station by its ID or source ID.
 */
export function findStation(query: string) {
  const searches = [
    (s: Station) => s.id === query,
    (s: Station) => s.source.id === query
  ]

  let found: Station | undefined = undefined

  for (const search of searches) {
    found = stations.find(search)
    if (found) break
  }

  if (!found) throw new Error(`Station not found: ${query}`)

  return useStation(found)
}

export function useStation(station: Station, distance?: number) {
  // If subordinate station, use the reference station for datums and constituents
  let reference = station
  if (station.type === 'subordinate') {
    reference = findStation(station.offsets?.reference || '')
  }
  const { datums, harmonic_constituents } = reference

  // Use MLLW as the default datum if available
  const defaultDatum = 'MLLW' in datums ? 'MLLW' : undefined

  function getPredictor({ datum = defaultDatum }: DatumOption = {}) {
    let offset = 0

    if (datum) {
      const datumOffset = datums?.[datum]
      const mslOffset = datums?.['MSL']

      if (typeof datumOffset !== 'number') {
        throw new Error(
          `Station ${station.id} missing ${datum} datum. Available datums: ${Object.keys(datums || {}).join(', ')}`
        )
      }

      if (typeof mslOffset !== 'number') {
        throw new Error(
          `Station ${station.id} missing MSL datum, so predictions can't be given in ${datum}.`
        )
      }

      offset = mslOffset - datumOffset
    }

    return tidePredictor(harmonic_constituents, {
      phaseKey: 'phase_UTC',
      offset
    })
  }

  return {
    ...station,
    distance,
    datums,
    harmonic_constituents,
    defaultDatum,
    getExtremesPrediction({ datum = defaultDatum, ...input }: ExtremesOptions) {
      return {
        datum,
        distance,
        station,
        extremes: getPredictor({ datum }).getExtremesPrediction({
          ...input,
          offsets: station.offsets
        })
      }
    },

    getTimelinePrediction({
      datum = defaultDatum,
      ...params
    }: TimelineOptions) {
      if (station.type === 'subordinate') {
        throw new Error(
          `Timeline predictions are not supported for subordinate stations.`
        )
      }

      return {
        datum,
        station,
        timeline: getPredictor({ datum }).getTimelinePrediction(params)
      }
    },

    getWaterLevelAtTime({ time, datum = defaultDatum }: WaterLevelOptions) {
      if (station.type === 'subordinate') {
        throw new Error(
          `Water level predictions are not supported for subordinate stations.`
        )
      }

      return {
        datum,
        station,
        ...getPredictor({ datum }).getWaterLevelAtTime({ time })
      }
    }
  }
}
