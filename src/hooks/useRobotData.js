import { useEffect, useState } from 'react'
import { ROBOTS } from '../utils/mockData'
import { robotsApi } from '../api/endpoints'

export function useRobotData() {
  const [robots, setRobots] = useState(ROBOTS)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    robotsApi.getAll()
      .then((data) => {
        if (active) setRobots(data?.length ? data : ROBOTS)
      })
      .catch((err) => {
        if (active) {
          setError(err)
          setRobots(ROBOTS)
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => { active = false }
  }, [])

  return { robots, loading, error }
}
