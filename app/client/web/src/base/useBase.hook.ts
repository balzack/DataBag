import { useState, useContext, useEffect } from 'react'
import { DisplayContext } from '../context/DisplayContext'
import { ContextType } from '../context/ContextType'

export function useBase() {
  const display = useContext(DisplayContext) as ContextType
  const [state, setState] = useState({
    strings: display.state.strings,
    scheme: display.state.scheme,
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateState = (value: any) => {
    setState((s) => ({ ...s, ...value }))
  }
  
  useEffect(() => {
    const { strings, scheme } = display.state;
    updateState({ strings, scheme });
  }, [display.state]);

  const actions = {
  }

  return { state, actions }
}
