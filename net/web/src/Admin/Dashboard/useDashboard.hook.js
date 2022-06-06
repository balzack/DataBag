import { useState, useEffect } from 'react';
import { setNodeConfig } from 'api/setNodeConfig';
import { getNodeAccounts } from 'api/getNodeAccounts';

export function useDashboard(password, config) {

  const [state, setState] = useState({
    host: "",
    storage: null,
    showSettings: false,
    busy: false,
    loading: false,
    accounts: [],
  });

  const updateState = (value) => {
    setState((s) => ({ ...s, ...value }));
  }

  const actions = {
    setHost: (value) => {
      updateState({ host: value });
    },
    setStorage: (value) => {
      updateState({ storage: value });
    },
    setShowSettings: (value) => {
      updateState({ showSettings: value });
    },
    setSettings: async () => {
      if (!state.busy) {
        updateState({ busy: true });
        try {
          await setNodeConfig(password,
            { ...state.config, domain: state.host, accountStorage: state.storage * 1073741824 });
          updateState({ showSettings: false });
        }
        catch(err) {
          console.log(err);
          window.alert(err);
        }
        updateState({ busy: false });
      }
    },
    getAccounts: async () => {
      if (!state.loading) {
        updateState({ loading: true });
        try {
          let accounts = await getNodeAccounts(password);
          updateState({ accounts });
        }
        catch(err) {
          console.log(err);
          window.alert(err);
        }
        updateState({ loading: false });
      }
    },
  };

  useEffect(() => {
    let storage = config.accountStorage / 1073741824;
    if (storage > 1) {
      storage = Math.ceil(storage);
    }
    updateState({ host: config.domain, storage: storage });
    actions.getAccounts();
  }, []);

  return { state, actions };
}

