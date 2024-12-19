import { useState, useContext, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { Focus } from 'databag-client-sdk'
import { ContextType } from '../../context/ContextType'
import { MediaAsset } from '../../conversation/Conversation';

export function useAudioAsset(topicId: string, asset: MediaAsset) {
  const app = useContext(AppContext) as ContextType
  const [state, setState] = useState({
    thumbUrl: null,
    dataUrl: null,
    loading: false,
    loadPercent: 0,
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateState = (value: any) => {
    setState((s) => ({ ...s, ...value }))
  }

  const setThumb = async () => {
    const { focus } = app.state;
    const assetId = asset.audio ? asset.audio.thumb : asset.encrypted ? asset.encrypted.thumb : null;
    if (focus && assetId != null) {
      try {
        const thumbUrl = await focus.getTopicAssetUrl(topicId, assetId);
        updateState({ thumbUrl });
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    setThumb();
  }, [asset]);    

  const actions = {
    unloadAudio: () => {
      updateState({ dataUrl: null });
    },
    loadAudio: async () => {
      const { focus } = app.state;
      const assetId = asset.audio ? asset.audio.hd : asset.encrypted ? asset.encrypted.parts : null;
      if (focus && assetId != null && !state.loading) {
        updateState({ loading: true, loadPercent: 0 });
        try {
          const dataUrl = await focus.getTopicAssetUrl(topicId, assetId, (loadPercent: number)=>{ updateState({ loadPercent }) });
          updateState({ dataUrl, loading: false });
        } catch (err) {
          updateState({ loading: false });
          console.log(err);
        }
      }
    }
  }

  return { state, actions }
}
