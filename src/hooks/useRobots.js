// hooks/useRobots.js
import { useMemo } from 'react'
import { filterRobots, sortRobots } from '../utils/helpers'
import { useRobotStore } from '../context/RobotContext'
import { useRobotData } from './useRobotData'

export function useRobots() {
  const { filter, sort, search } = useRobotStore()
  const { robots: allRobots, loading, error } = useRobotData()

  const filtered = useMemo(() => {
    let result = filterRobots(allRobots, filter)
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        r =>
          r.name.toLowerCase().includes(q) ||
          r.maker.toLowerCase().includes(q) ||
          r.country.toLowerCase().includes(q)
      )
    }
    return sortRobots(result, sort)
  }, [allRobots, filter, sort, search])

  return { robots: filtered, total: filtered.length, allRobots, loading, error }
}
