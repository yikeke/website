import '../styles/components/positions.scss'

import React, { useState, useEffect } from 'react'
import Loading from '../components/loading'
import Link from './IntlLink'
import axios from 'axios'

const Positions = () => {
  const [positions, setPositions] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchPositions() {
    try {
      const positionRes = (
        await axios.get('https://api.lever.co/v0/postings/pingcap?mode=json')
      ).data
      setPositions(positionRes)
      setLoading(false)
    } catch (e) {
      console.log('Failed to fetch positions')
      return
    }
  }

  useEffect(() => {
    fetchPositions()
  }, [])

  return (
    <div className="PingCAP-Positions columns is-multiline">
      {loading && <Loading />}
      {positions &&
        positions.map((p) => (
          <Link
            to={p.hostedUrl}
            key={p.hostedUrl}
            className="position column is-4"
            type="outBoundLink"
          >
            <div className="position-wrapper">
              <div className="position-title">{p.text}</div>
              <div className="location">
                {p.categories.location}/{p.categories.commitment}
              </div>
            </div>
          </Link>
        ))}
    </div>
  )
}

export default Positions
