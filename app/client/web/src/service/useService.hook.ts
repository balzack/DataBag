import {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from '../context/AppContext';
import {DisplayContext} from '../context/DisplayContext';
import {ContextType} from '../context/ContextType';

export function useService() {
  const display = useContext(DisplayContext) as ContextType;
  const app = useContext(AppContext) as ContextType;

  const [state, setState] = useState({
    layout: null,
    strings: {},
  });

  const updateState = (value: any) => {
    setState(s => ({...s, ...value}));
  };

  useEffect(() => {
    const {layout, strings} = display.state;
    updateState({layout, strings});
  }, [display.state]);

  const actions = {
    logout: async () => {
      await app.actions.adminLogout();
    },
  };

  return {state, actions};
}
