const serialize = (value) => {
  if (typeof value === 'string') return value
  return JSON.stringify(value)
}

const deserialize = (value) => {
  if (typeof value !== 'string') return undefined
  try {
    return JSON.parse(value)
  } catch (e) {
    return value || undefined
  }
}

export default { serialize, deserialize }
