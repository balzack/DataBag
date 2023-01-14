import { useContext, useState, useEffect } from 'react';
import { getAccountImageUrl } from 'api/getAccountImageUrl';
import { setAccountStatus } from 'api/setAccountStatus';
import { addAccountAccess } from 'api/addAccountAccess';
import { ViewportContext } from 'context/ViewportContext';
import { AppContext } from 'context/AppContext';

export function useAccountItem(item, remove) {
  
  const [state, setState] = useState({
    statusBusy: false,
    removeBusy: false,
    accessBusy: false,
    showAccess: false,
  });
 
  const app = useContext(AppContext);
  const viewport = useContext(ViewportContext); 

  const updateState = (value) => {
    setState((s) => ({ ...s, ...value }));
  }

  useEffect(() => {
    updateState({
      disabled: item?.disabled,
      activeClass: item?.disabled ? 'inactive' : 'active',
      accountId: item?.accountId,
      name: item?.name,
      guid: item?.guid,
      handle: item?.handle,
      imageUrl: item?.imageSet ? getAccountImageUrl(app.state.adminToken, item?.accountId) : null,
    });
  }, [app.state.adminToken, item]); 

  useEffect(() => {
    updateState({ display: viewport.state.display });
  }, [viewport]);

  const actions = {
    setAccessLink: async () => {
      if (!state.accessBusy) {
        updateState({ accessBusy: true });
        try {
          let access = await addAccountAccess(app.state.adminToken, item.accountId);
          updateState({ accessToken: access, showAccess: true });
        }
        catch (err) {
          window.alert(err);
        }
        updateState({ accessBusy: false });
      }
    },
    setShowAccess: (showAccess) => {
      updateState({ showAccess });
    },
    remove: async () => {
      if (!state.removeBusy) {
        updateState({ removeBusy: true });
        try {
          await remove(state.accountId);
        }
        catch(err) {
          console.log(err);
          window.alert(err);
        }
        updateState({ removeBusy: false });
      }
    },
    setStatus: async (disabled) => {
      if (!state.statusBusy) {
        updateState({ statusBusy: true });
        try {
          await setAccountStatus(app.state.adminToken, item.accountId, disabled);
          updateState({ disabled, activeClass: disabled ? 'inactive' : 'active' });
        }
        catch(err) {
          console.log(err);
          window.alert(err);
        }
        updateState({ statusBusy: false });
      }
    },
  };

  return { state, actions };
}
