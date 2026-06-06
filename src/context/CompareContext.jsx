// context/CompareContext.jsx — Zustand store for robot comparison
import { create } from 'zustand'
import { ROBOTS } from '../utils/mockData'

export const useCompareStore = create((set) => ({
  robotA: ROBOTS.find(r => r.id === 'tesla-optimus') || null,
  robotB: ROBOTS.find(r => r.id === 'figure-03') || null,
  selectingSlot: null, // 'A' or 'B'
  modalOpen: false,
  setRobotA: (robot) => set({ robotA: robot }),
  setRobotB: (robot) => set({ robotB: robot }),
  openModal: (slot) => set({ selectingSlot: slot, modalOpen: true }),
  closeModal: () => set({ modalOpen: false, selectingSlot: null }),
  selectRobot: (robot) => set((state) => {
    if (state.selectingSlot === 'A') return { robotA: robot, modalOpen: false, selectingSlot: null }
    if (state.selectingSlot === 'B') return { robotB: robot, modalOpen: false, selectingSlot: null }
    return {}
  }),
}))
