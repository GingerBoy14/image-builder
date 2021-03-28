const POSITION = {
  't-l': { title: 'top-left', calc: () => ({ x: 0, y: 0 }) },
  't-c': {
    title: 'top-center',
    calc: (item, canvas) => ({
      x: canvas.width / 2 - item.width / 2,
      y: 0
    })
  },
  't-r': {
    title: 'top-right',
    calc: (item, canvas) => ({
      x: canvas.width - item.width,
      y: 0
    })
  },

  'c-l': {
    title: 'center-left',
    calc: (item, canvas) => ({
      x: 0,
      y: canvas.height / 2 - item.height / 2
    })
  },

  'c-c': {
    title: 'center-center',
    calc: (item, canvas) => ({
      x: canvas.width / 2 - item.width / 2,
      y: canvas.height / 2 - item.height / 2
    })
  },
  'c-r': {
    title: 'center-right',
    calc: (item, canvas) => ({
      x: canvas.width - item.width,
      y: canvas.height / 2 - item.height / 2
    })
  },

  'b-l': {
    title: 'bottom-left',
    calc: (item, canvas) => ({ x: 0, y: canvas.height - item.height })
  },
  'b-c': {
    title: 'bottom-center',
    calc: (item, canvas) => ({
      x: canvas.width / 2 - item.width / 2,
      y: canvas.height - item.height
    })
  },
  'b-r': {
    title: 'bottom-right',
    calc: (item, canvas) => ({
      x: canvas.width - item.width,
      y: canvas.height - item.height
    })
  }
}

const POSITION_KEYS = Object.keys(POSITION)
const POSITION_VALUES = Object.values(POSITION)

export default POSITION

export { POSITION_KEYS, POSITION_VALUES }
