import { useContext, useState, useEffect } from 'react';
import { ViewportContext } from 'context/ViewportContext';
import { CardContext } from 'context/CardContext';
import { ChannelContext } from 'context/ChannelContext';
import { ConversationContext } from 'context/ConversationContext';
import { UploadContext } from 'context/UploadContext';

export function useConversation(cardId, channelId) {

  const [state, setState] = useState({
    display: null,
    image: null,
    logo: null,
    subject: null,
    topics: [],
    loadingInit: false,
    loadingMore: false,
    upload: false,
    uploadError: false,
    uploadPercent: 0,
  });

  const viewport = useContext(ViewportContext);  
  const card = useContext(CardContext);
  const channel = useContext(ChannelContext);
  const conversation = useContext(ConversationContext);
  const upload = useContext(UploadContext);

  const updateState = (value) => {
    setState((s) => ({ ...s, ...value }));
  }

  useEffect(() => {
    updateState({ display: viewport.state.display });
  }, [viewport]);

  useEffect(() => {
    let active = false;
    let uploadError = false;
    let uploadPercent = 0;
    let uploadIndex = 0;
    let uploadCount = 0;
    let uploadActive = { loaded: 0, total: 0 };
    let uploadActiveCount = 0;

    const progress = upload.state.progress.get(`${cardId ? cardId : ''}:${channelId}`);

    if (progress) {
      progress.forEach((entry) => {
        active = true;
        if (entry.error) {
          uploadError = true;
        }
        uploadIndex += entry.uploaded;
        uploadCount += entry.count;
        if (entry.active) {
          uploadActiveCount += 1;
          uploadActive.loaded += entry.active.loaded;
          uploadActive.total += entry.active.total;
        }
      });
      uploadPercent = (uploadIndex + (uploadActiveCount * (uploadActive.loaded / uploadActive.total)) / uploadCount);
      uploadPercent = Math.floor(uploadPercent * 100);
    }

    updateState({ upload: active, uploadError, uploadPercent });
  }, [cardId, channelId, upload]);

  useEffect(() => {

    let chan, image, subject, logo; 
    if (cardId) {
      const cardChan = card.state.cards.get(cardId);
      if (cardChan) {
        chan = cardChan.channels.get(channelId);
      }
    }
    else {
      chan = channel.state.channels.get(channelId);
    }

    if (chan) {
      if (!chan.contacts?.length) {
        image = 'solution';
        subject = 'Private';
      }
      else if (chan.contacts.length > 1) {
        image = 'appstore'
        subject = 'Group';
      }
      else {
        logo = card.actions.getImageUrl(chan.contacts[0]?.id);
        subject = card.actions.getName(chan.contacts[0]?.id);
      }
      const parsed = JSON.parse(chan.data.channelDetail.data);
      if (parsed.subject) {
        subject = parsed.subject;
      }
    }

    updateState({ image, subject, logo });
  }, [cardId, channelId, card, channel]);

  useEffect(() => {
    conversation.actions.setConversationId(cardId, channelId);
  }, [cardId, channelId]);

  useEffect(() => {
    let topics = Array.from(conversation.state.topics.values()).sort((a, b) => {
      const aTimestamp = a?.data?.topicDetail?.created;
      const bTimestamp = b?.data?.topicDetail?.created;
      if(aTimestamp == bTimestamp) {
        return 0;
      }
      if(aTimestamp == null || aTimestamp < bTimestamp) {
        return -1;
      }
      return 1;
    });
    const { loadingInit, loadingMore } = conversation.state;
    updateState({ topics, loadingInit, loadingMore });
  }, [conversation]);

  const actions = {
    more: () => {
      conversation.actions.addHistory();
    },
    clearUploadError: () => {
    },
    cancelUpload: () => {
    },
  };

  return { state, actions };
}

