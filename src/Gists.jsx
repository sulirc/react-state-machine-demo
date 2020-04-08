import React from 'react'
import { useMachine } from '@xstate/react'
import { Machine } from 'xstate'

const fetchMachine = Machine({
  id: 'fetch',
  initial: 'idle',
  states: {
    idle: {
      on: {
        FETCH: 'fetching'
      },
      onEntry: 'showButton'
    },
    fetching: {
      on: {
        SUCCESS: 'success',
        ERROR: 'error'
      },
      onEntry: 'fetchGists'
    },
    success: {
      onEntry: 'showGists'
    },
    error: {
      on: {
        FETCH: 'fetching'
      },
      onEntry: 'showError'
    }
  }
})

// function fetchGists () {
//   fetch('https://api.github.com/users/gaearon/gists')
//     .then(response => response.json())
//     .then(gists => this.props.transition('SUCCESS', { gists }))
//     .catch(() => this.props.transition('ERROR'))
// }

export default function Gists() {
  const [state, send] = useMachine(fetchMachine)

  return (
    <></>
  )
}