import { getDistance } from 'geolib'
import stations, { type Station } from '@neaps/tide-stations'
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

export function useStation(metadata: Station, distance?: number) {
  // Use MLLW as the default datum if available
  const defaultDatum = 'MLLW' in metadata.datums ? 'MLLW' : undefined

  function getPredictor({ datum = defaultDatum }: DatumOption = {}) {
    let offset = 0

    if (datum) {
      const datumOffset = metadata.datums?.[datum]
      const mslOffset = metadata.datums?.['MSL']

      if (!datumOffset) {
        throw new Error(
          `Station ${metadata.id} missing ${datum} datum. Available datums: ${Object.keys(metadata.datums || {}).join(', ')}`
        )
      }

      if (!mslOffset) {
        throw new Error(
          `Station ${metadata.id} missing MSL datum, so predictions can't be given in ${datum}.`
        )
      }

      offset = mslOffset - datumOffset
    }

    return tidePredictor(metadata.harmonic_constituents, {
      phaseKey: 'phase_UTC',
      offset
    })
  }

  return {
    metadata,
    distance,
    defaultDatum,
    getExtremesPrediction({ datum = defaultDatum, ...input }: ExtremesOptions) {
      return {
        datum,
        distance,
        station: metadata,
        predictions: getPredictor({ datum }).getExtremesPrediction(input)
      }
    },

    getTimelinePrediction({
      datum = defaultDatum,
      ...params
    }: TimelineOptions) {
      return {
        datum,
        station: metadata,
        timeline: getPredictor({ datum }).getTimelinePrediction(params)
      }
    },

    getWaterLevelAtTime({ time, datum = defaultDatum }: WaterLevelOptions) {
      return {
        datum,
        station: metadata,
        ...getPredictor({ datum }).getWaterLevelAtTime({ time })
      }
    }
  }
}
