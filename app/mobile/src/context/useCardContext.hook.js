import { useState, useRef, useContext } from 'react';
import { StoreContext } from 'context/StoreContext';
import { getCards } from 'api/getCards';
import { getCardProfile } from 'api/getCardProfile';
import { getCardDetail } from 'api/getCardDetail';

import { getContactChannels } from 'api/getContactChannels';
import { getContactChannelTopics } from 'api/getContactChannelTopics';
import { getContactChannelDetail } from 'api/getContactChannelDetail';
import { getContactChannelSummary } from 'api/getContactChannelSummary';

export function useCardContext() {
  const [state, setState] = useState({
    cards: new Map(),
  });
  const store = useContext(StoreContext);

  const session = useRef(null);
  const curRevision = useRef(null);
  const setRevision = useRef(null);
  const syncing = useRef(false);
  const cards = useRef(new Map());
  const cardChannels = useRef(new Map());

  const updateState = (value) => {
    setState((s) => ({ ...s, ...value }))
  }

  const setCardDetail = (cardId, detail, revision) => {
    let card = cards.current.get(cardId);
    if (card?.data) {
      card.data.cardDetail = detail;
      card.data.detailRevision = revision;
      cards.current.set(cardId, card);
    }
  }
  const setCardProfile = (cardId, profile, revision) => {
    let card = cards.current.get(cardId);
    if (card?.data) {
      card.data.cardProfile = profile;
      card.data.profileRevision = revision;
      cards.current.set(cardId, card);
    }
  }
  const setCardRevision = (cardId, revision) => {
    let card = cards.current.get(cardId);
    if (card) {
      card.revision = revision;
      cards.current.set(cardId, card);
    }
  }
  const setCardOffsync = (cardId, offsync) => {
    let card = cards.current.get(cardId);
    if (card) {
      card.offsync = offsync;
      cards.current.set(cardId, card);
    }
  }
  const clearCardChannels = (cardId) => {
    let card = cards.current.get(cardId);
    if (card) {
      card.channels = new Map();
      cards.current.set(cardId, card);
    }
  }
  const setCardChannel = (cardId, channel) => {
    let card = cards.current.get(cardId);
    if (card) {
      card.channels.set(channel.id, channel);
      cards.current.set(cardId, card);
    }
  }
  const setCardChannelDetail = (cardId, channelId, detail, revision) => {
    let card = cards.current.get(cardId);
    if (card) {
      let channel = card.channels.get(channelId);
      if (channel?.data) {
        channel.data.channelDetail = detail;
        channel.data.detailRevision = revision;
        card.channels.set(channelId, channel);
        cards.current.set(cardId, card);
      }
    }
  }
  const setCardChannelSummary = (cardId, channelId, summary, revision) => {
    let card = cards.current.get(cardId);
    if (card) {
      let channel = card.channels.get(channelId);
      if (channel?.data) {
        channel.data.channelSummary = detail;
        channel.data.topicRevision = revision;
        card.channels.set(channelId, channel);
        cards.current.set(cardId, card);
      }
    }
  }
  const setCardChannelRevision = (cardId, channelId, revision) => {
    let card = cards.current.get(cardId);
    if (card) {
      let channel = card.channels.get(channelId);
      if (channel) {
        channel.revision = revision;
        card.channels.set(channelId, channel);
        cards.current.set(cardId, card);
      }
    }
  } 
  const clearCardChannel = (cardId, channelId) => {
    let card = cards.current.get(cardId);
    if (card) {
      card.channels.delete(channelId);
      cards.current.set(cardId, card);
    }
  }

  const sync = async () => {
    if (!syncing.current && setRevision.current !== curRevision.current) {
      syncing.current = true;

      try {
        const revision = curRevision.current;
        const { server, appToken, guid } = session.current;

        // get and store
        const delta = await getCards(server, appToken, setRevision.current);

        for (let card of delta) {
          if (card.data) {
            if (card.data.cardDetail && card.data.cardProfile) {
              await store.actions.setCardItem(guid, card);
              cards.current.set(cardId, card);
            }
            else {
              const view = await store.actions.getCardItemView(guid, card.id);
              if (view == null) {
                console.log('alert: expected card not synced');
                let assembled = JSON.parse(JSON.stringify(card));
                assembled.data.cardDetail = await getCardDetail(server, appToken, card.id);
                assembled.data.cardProfile = await getCardProfile(server, appToken, card.id);
                await store.actions.setCardItem(guid, assembled);
                cards.curent.set(assembled.id, assembled);
              }
              else {
                if (view.detailRevision != detailRevision) {
                  const detail = await getCardDetail(server, appToken, card.id);
                  await store.actions.setCardItemDetail(guid, card.id, detailRevision, detail);
                  setCardDetail(card.id, detail, detailRevision);
                }
                if (view.profileRevision != profileRevision) {
                  const profile = await getCardProfile(server, appToken, card.id);
                  await store.actions.setCardItemProfile(guid, card.id, profileRevision, profile);
                  setCardProfile(card.id, profile, profileRevision);
                }
                await store.actions.setCardItemRevision(guid, card.id, card.revision);
                setCardRevision(card.id, card.revision);
              }
            }

            const status = await store.actions.getCardItemStatus(guid, card.id);
            const cardServer = status.profile.node;
            const cardToken = status.profile.guid + '.' + status.detail.token;
            if (status.detail.status === 'connected') {
              try {
                const { notifiedView, notifiedProfile, notifiedArticle, notifiedChannel } = card.data;
                if (status.notifiedView !== notifiedView) {
                  await store.actions.clearCardChannelItems(guid, card.id);
                  await updateCardChannelItems(card.id, cardServer, cardToken, notifiedView, null);
                  await store.actions.setCardItemNotifiedChannel(guid, card.id, notifiedChannel);
                  await store.actions.setCardItemNotifiedView(guid, card.id, notifiedView);
                  clearCardChannel(card.id);
                }
                else {
                  if (status.notifiedChannel != notifiedChannel) {
                    await updateCardChannelItems(card.id, cardServer, cardToken, status.notifiedChannel)
                    await store.actions.setCardItemNotifiedChannel(guid, card.id, notifiedView, notifiedChannel);
                  }
                }
                if (status.notifiedProflile != notifiedProfile) {
                  // TODO update contact profile if different
                  await store.actions.setCardItemNotifiedProfile(guid, card.id, notifiedProfile);
                }
                if (status.offsync) {
                  await store.actions.clearCardItemOffsync(guid, card.id);
                  setCardOffsync(card.id, false);
                }
              }
              catch(err) {
                console.log(err);
                await store.actions.setCardItemOffsync(guid, card.id);
                setCardOffsync(card.id, true);
              } 
            }
          }
          else {
            //TODO clear card channel topics
            await store.actions.clearCardChannelItems(guid, card.id); 
            await store.actions.clearCardItem(guid, card.id);
            cards.current.delete(card.id);
          }
        }

        setRevision.current = revision;
        await store.actions.setCardRevision(guid, revision);
      }
      catch(err) {
        console.log(err);
        syncing.current = false;
        return;
      }

      updateState({ cards: cards.current });
      syncing.current = false;
      sync();
    }
  };

  const updateCardChannelItems = async (cardId, cardServer, cardToken, notifiedView, notifiedChannel) => {
    const { guid } = session.current;
    const delta = await getContactChannels(cardServer, cardToken, notifiedView, notifiedChannel);
    for (let channel of delta) {
      if (channel.data) {
        if (channel.data.channelDetail && channel.data.channelSummary) {
          await store.actions.setCardChannelItem(guid, cardId, channel);
          setCardChannel(cardId, channel);
        }
        else {
          const { detailRevision, topicRevision, channelDetail, channelSummary } = channel.data;
          const view = await store.actions.getCardChannelItemView(guid, cardId, channel.id);
          if (view == null) {
            console.log('alert: expected channel not synced');
            let assembled = JSON.parse(JSON.stringify(channel));
            assembled.data.channelDetail = await getChannelDetail(cardServer, cardToken, channel.id);
            assembled.data.channelSummary = await getChannelSummary(cardServer, cardToken, channel.id);
            await store.actions.setCardChannelItem(guid, cardId, assembled);
            setCardChannel(cardId, assembled);
          }
          else {
            if (view.detailRevision != detailRevision) {
              const detail = await getChannelDetail(cardServer, cardToken, channel.id);
              await store.actions.setCardChannelItemDetail(guid, cardId, channel.id, detailRevision, detail);
              setCardChannelDetail(cardId, channel.id, detail, detailRevision);
            }
            if (view.topicRevision != topicRevision) {
              const summary = await getChannelSummary(cardServer, channel.id);
              await store.actions.setCardChannelItemSummary(guid, cardId, channel.id, topicRevision, summary);
              setCardChannelSummary(cardId, channel.id, summary, topicRevision);
            }
            await store.actions.setCardChannelItemRevision(guid, cardId, channel.revision);
            setCardChannelRevision(cardId, channel.id, channel.revision);
          }
        }
      }
      else {
        await store.actions.clearCardChannelItem(guid, cardId, channel.id);
        clearCardChannel(cardId, channel.id);
      }
    }
  }

  const actions = {
    setSession: async (access) => {
      const { guid, server, appToken } = access;
      cards.current = new Map();
      const cardItems = await store.actions.getCardItems(guid);
      for (item of cardItems) {
        cards.current.set(item.cardId, { ...item, channels: new Map() });
      }
      const cardChannelItems = await store.actions.getCardChannelItems(guid);
      for (item of cardChannelItems) {
        setCardChannel(item.cardId, item);
      }
      const revision = await store.actions.getCardRevision(guid);
      updateState({ cards: cards.current });
      setRevision.current = revision;
      curRevision.current = revision;
      session.current = access;
    },
    clearSession: () => {
      session.current = {};
      updateState({ account: null });
    },
    setRevision: (rev) => {
      curRevision.current = rev;
      sync();
    },
  }

  return { state, actions }
}

