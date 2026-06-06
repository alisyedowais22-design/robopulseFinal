// context/RobotContext.jsx — Zustand store for robot filters
import { create } from 'zustand'

export const useRobotStore = create((set) => ({
  filter: 'all',
  sort: 'score',
  search: '',
  setFilter: (filter) => set({ filter }),
  setSort: (sort) => set({ sort }),
  setSearch: (search) => set({ search }),
}))
