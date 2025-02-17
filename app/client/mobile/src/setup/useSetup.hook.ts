import {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from '../context/AppContext';
import {DisplayContext} from '../context/DisplayContext';
import {ContextType} from '../context/ContextType';
import type { Member } from 'databag-client-sdk';

export function useSetup() {
  const app = useContext(AppContext);
  const display = useContext(DisplayContext);
  const [state, setState] = useState({
    layout: '',
    strings: {},
  });

  const updateState = (value: any) => {
    setState(s => ({...s, ...value}));
  };

  const sync = async () => {
    try {
      const service = app.state.service;
      //
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const { layout, strings} = display.state;
    updateState({ layout, strings});
  }, [display.state]);

  useEffect(() => {
    if (app.state.service) {
      sync();
    }
  }, [app.state.service]);

  const actions = {
  };

  return {state, actions};
}
