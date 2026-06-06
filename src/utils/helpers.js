// utils/helpers.js

export const formatPrice = (num) => {
  if (!num || num === 0) return 'N/A'
  if (num >= 999999) return 'TBA'
  return `$${num.toLocaleString()}`
}

export const getScoreColor = (score) => {
  if (score >= 90) return '#00F0C8'
  if (score >= 80) return '#6C63FF'
  if (score >= 70) return '#F5C842'
  return '#FF4060'
}

export const getScoreLabel = (score) => {
  if (score >= 90) return 'Exceptional'
  if (score >= 80) return 'Excellent'
  if (score >= 70) return 'Good'
  if (score >= 60) return 'Average'
  return 'Below Average'
}

export const filterRobots = (robots, filter) => {
  switch (filter) {
    case 'available':
      return robots.filter(r => r.availClass === 'available')
    case 'under30k':
      return robots.filter(r => r.priceNum > 0 && r.priceNum < 30000)
    case 'us':
      return robots.filter(r => r.countryCode === 'US')
    case 'china':
      return robots.filter(r => r.countryCode === 'CN')
    case 'home':
      return robots.filter(r => r.tags.includes('home'))
    case 'industrial':
      return robots.filter(r => r.tags.includes('industrial'))
    default:
      return robots
  }
}

export const sortRobots = (robots, sort) => {
  const arr = [...robots]
  switch (sort) {
    case 'score':
      return arr.sort((a, b) => b.score - a.score)
    case 'price-low':
      return arr.sort((a, b) => {
        if (a.priceNum === 0 || a.priceNum >= 999999) return 1
        if (b.priceNum === 0 || b.priceNum >= 999999) return -1
        return a.priceNum - b.priceNum
      })
    case 'price-high':
      return arr.sort((a, b) => b.priceNum - a.priceNum)
    case 'name':
      return arr.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return arr
  }
}

export const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

import { ROBOT_IMAGES } from './robotImages'

export const getRobotImage = (robot) => {
  return ROBOT_IMAGES[robot.id] || null
}