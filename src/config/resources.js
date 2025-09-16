export const DEFAULT_RESOURCES = [
  {
    id: 'lab-1',
    name: 'Lab 1',
    type: 'Lab',
    capacity: 60,
    features: ['projector', 'wifi', 'whiteboard'],
    status: 'available'
  },
  {
    id: 'lab-2',
    name: 'Lab 2',
    type: 'Lab',
    capacity: 60,
    features: ['computers', 'wifi', 'printer'],
    status: 'available'
  },
  {
    id: 'lab-3',
    name: 'Lab 3',
    type: 'Lab',
    capacity: 60,
    features: ['sound', 'projector', 'microphone'],
    status: 'available'
  },
  {
    id: 'lab-4-in-1',
    name: 'Lab 4 in 1',
    type: 'Lab',
    capacity: 60,
    features: ['tv', 'wifi', 'conference-phone'],
    status: 'available'
  }
]

export const FEATURE_ICONS = {
  'projector': 'bi-projector',
  'wifi': 'bi-wifi',
  'whiteboard': 'bi-easel',
  'computers': 'bi-pc-display',
  'printer': 'bi-printer',
  'sound': 'bi-volume-up',
  'microphone': 'bi-mic',
  'tv': 'bi-tv',
  'conference-phone': 'bi-telephone'
}
