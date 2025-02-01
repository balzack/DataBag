import React, { useEffect, useState } from 'react';
import classes from './Calling.module.css'
import { useCalling } from './useCalling.hook';
import { Card } from '../card/Card';
import { Modal, Text, ActionIcon } from '@mantine/core'
import { IconEyeX, IconPhone, IconPhoneOff } from '@tabler/icons-react'
import { modals } from '@mantine/modals'
import { Colors } from '../constants/Colors'

export function Calling({ callCard }: { callCard: string }) {
  const [connecting, setConnecting] = useState(false);
  const [applyingVideo, setApplyingVideo] = useState(false);
  const [applyingAudio, setApplyingAudio] = useState(false);
  const [ignoring, setIgnoring] = useState(false);
  const [declining, setDeclining] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const { state, actions } = useCalling();

  const showError = () => {
    modals.openConfirmModal({
      title: state.strings.operationFailed,
      withCloseButton: true,
      overlayProps: {
        backgroundOpacity: 0.55,
        blur: 3,
      },
      children: <Text>{state.strings.tryAgain}</Text>,
      cancelProps: { display: 'none' },
      confirmProps: { display: 'none' },
    })
  }

  const toggleVideo = async () => {
    if (!applyingVideo) {
      setApplyingVideo(true);
      try {
        if (state.video && state.videoEnabled) {
          await actions.disableVideo();
        } else if (state.video && !state.videoEnabled) {
          await actions.enableVideo();
        }
      } catch (err) {
        console.log(err);
        showError();
      }
      setApplyingVideo(false);
    }
  }

  const toggleAudio = async () => {
    if (!applyingAudio) {
      setApplyingAudio(true);
      try {
        if (state.audio && state.audioEnabled) {
          await actions.disableAudio();
        } else if (state.audio && !state.audioEnabled) {
          await actions.enableAudio();
        }
      } catch (err) {
        console.log(err);
        showError();
      }
      setApplyingAudio(false);
    }
  }

  const end = async () => {
    if (!ending) {
      setEnding(true);
      try {
        await actions.end();
      } catch (err) {
        console.log(err);
        showError();
      }
      setEnding(false);
    }
  }

  const call = async (cardId: string) => {
    if (!connecting) {
      setConnecting(true);
      try {
        await actions.call(cardId);
      } catch (err) {
        console.log(err);
        showError();
      }
      setConnecting(false);
    }
  }

  const accept = async (callId, card) => {
    if (!accepting) {
      setAccepting(callId);
      try {
        await actions.accept(callId, card);
      } catch (err) {
        console.log(err);
        showError();
      }
      setAccepting(null);
    }
  }

  const ignore = async (callId, card) => {
    if (!ignoring) {
      setIgnoring(callId);
      try {
        await actions.ignore(callId, card);
      } catch (err) {
        console.log(err);
        showError();
      }
      setIgnoring(null);
    }
  }

  const decline = async (callId, card) => {
    if (!declining) {
      setDeclining(callId);
      try {
        await actions.decline(callId, card);
      } catch (err) {
        console.log(err);
        showError();
      }
      setDeclining(null);
    }
  }

  const alertParams = {
    title: state.strings.operationFailed,
    prompt: state.strings.tryAgain,
    cancel: {
      label: state.strings.close,
      action: () => {
        setAlert(false);
      },
    },
  };

  useEffect(() => {
    const { cardId } = callCard;
    if (cardId) {
      call(cardId);
    }
  }, [callCard]);

  const calls = state.calls.map((contact, index) => {
    const { callId, card } = contact;
    const { name, handle, node, imageUrl } = card;
    const ignoreButton = <ActionIcon variant="subtle" loading={ignoring===callId} onClick={()=>ignore(callId, card)} color={Colors.pending}><IconEyeX /></ActionIcon>
    const declineButton = <div className={classes.space}><ActionIcon variant="subtle" loading={declining===callId} onClick={()=>decline(callId, card)} color={Colors.offsync}><IconPhone className={classes.off} /></ActionIcon></div>
    const acceptButton = <ActionIcon variant="subtle" loading={accepting===callId} onClick={()=>accept(callId, card)} color={Colors.primary}><IconPhone /></ActionIcon>

    return (
      <div key={index} className={classes.caller}>
        <Card className={classes.card} placeholder={''} imageUrl={imageUrl} name={name} node={node} handle={handle} actions={[ignoreButton, declineButton, acceptButton]} />
      </div>
    )
  });

  return (
    <Modal opened={state.calls.length > 0 || connecting || state.calling} onClose={()=>{}} overlayProps={{ backgroundOpacity: 0.55, blur: 3 }} centered withCloseButton={false}>
      { !state.calling && !connecting && state.calls.length > 0 && (
        <div>
        { calls }
        </div>
      )}
      { !state.calling && connecting && (
        <div style={{ width: 100, height: 100, backgroundColor: 'green' }} />
      )}
      { state.calling && (
        <div style={{ width: 100, height: 100, backgroundColor: 'red' }} />
      )}
    </Modal>
  )
}

