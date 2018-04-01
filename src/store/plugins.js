const applicationPlugin = store => {
  return store.dispatch('getStates')
}

export default [ applicationPlugin ]
