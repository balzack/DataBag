import { useState, useContext, useEffect, useRef } from 'react'
import { DisplayContext } from '../context/DisplayContext';
import { AppContext } from '../context/AppContext'
import { ContextType } from '../context/ContextType'
import { Link, type Card } from 'databag-client-sdk';

import {
  ScreenCapturePickerView,
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaiStreamTrack,
  mediaDevices,
  registerGlobals
} from 'react-native-webrtc';

export function useCalling() {
  const app = useContext(AppContext) as ContextType;
  const display = useContext(DisplayContext) as ContextType;
  const call = useRef(null as { policy: string, peer: RTCPeerConnection, link: Link, candidates: RTCIceCandidate[] } | null);
  const localStream = useRef(null);
  const remoteStream = useRef(null);
  const updatingPeer = useRef(false);
  const peerUpdate = useRef([]);

  const [state, setState] = useState({
    strings: {}, 
    ringing: [],
    calls: [],
    cards: [],
    calling: null as null | Card,
    failed: false,
    loaded: false,
    panelOffset: 0,
    local: null,
    remote: null,
    audio: null,
    audioEnabled: false,
    video: null,
    videoEnabled: false,
    videoAdded: false,
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateState = (value: any) => {
    setState((s) => ({ ...s, ...value }))
  }

  useEffect(() => {
    const calls = state.ringing
      .map(ring => ({ callId: ring.callId, card: state.cards.find(card => ring.cardId === card.cardId) }) )
      .filter(ring => (ring.card && !ring.card.blocked));
    updateState({ calls });
  }, [state.ringing, state.cards]);

  useEffect(() => {
    const { strings } = display.state;
    updateState({ strings });
  }, [display.state]);

  const constraints = {
    mandatory: {
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: false,
      VoiceActivityDetection: true
    }     
  };        

  const linkStatus = async (status: string) => {
    if (call.current) {
      const { policy, peer, link } = call.current;
      if (status === 'connected') {
        try {
          remoteStream.current = new MediaStream();
          localStream.current = await mediaDevices.getUserMedia({
            audio: true,
            video: {
              frameRate: 30,
              facingMode: 'user'
            }
          });
          const audio = localStream.current.getTracks().find(track => track.kind === 'audio');
          const video = localStream.current.getTracks().find(track => track.kind === 'video');
          if (audio) {
            audio.enabled = true;
            await updatePeer('local_track', audio);
          }
          if (video) {
            video.enabled = false;
          }
          updateState({ audio, video, audioAdded: true, audioEnabled: true, videoAdded: false, videoEnabled: false });
        } catch (err) {
          console.log(err);
          updateState({ failed: true });
        }
      } else if (status === 'closed') {
        call.current = null;
        try {
          peer.close();
          link.close();
        } catch (err) {
          console.log(err);
        } 
        localStream.current = null;
        remoteStream.current = null,
        updateState({ calling: null, failed: false, audio: null, video: null, local: null, remote: null });
      }
    }
  }

  const linkMessage = async (message: any) => {
    if (call.current) {
      const { peer, link, policy } = call.current;
      try {
        if (message.description) {
          const offer = new RTCSessionDescription(message.description);
          await peer.setRemoteDescription(offer);
          if (message.description.type === 'offer') {
            const description = await peer.createAnswer();
            await peer.setLocalDescription(description);
            link.sendMessage({ description });
          }

          if (call.current) {
            const { candidates } = call.current;
            call.current.candidates = [];
            for (const candidate of candidates) {
              await peer.addIceCandidate(candidate);
            };
          }
        } else if (message.candidate) {
          const candidate = new RTCIceCandidate(message.candidate);
          if (peer.remoteDescription == null) {
            candidates.push(candidate);
          } else {
            await peer.addIceCandidate(candidate);
          }
        }
      } catch (err) {
        console.log(err);
        updateState({ failed: true });
      }
    }
  }

  const peerCandidate = async (candidate) => {
    if (call.current && candidate) {
      const { link } = call.current;
      await link.sendMessage({ candidate });
    }
  }

  const peerNegotiate = async () => {
    if (call.current) {
      try {
        const { peer, link } = call.current;
        const description = await peer.createOffer(constraints);
        await peer.setLocalDescription(description);
        await link.sendMessage({ description });
      } catch (err) {
        console.log(err);
      }
    }
  }

  const peerTrack = async (track) => {
    if (call.current) {
      try {
        const { peer } = call.current;
        await peer.addTrack(track, localStream.current);
      } catch (err) {
        console.log(err);
      }
    }
  }

  const updatePeer = async (type: string, data: any) => {
    peerUpdate.current.push({ type, data });

    if (!updatingPeer.current) {
      updatingPeer.current = true;
      while (peerUpdate.current.length > 0) {
        const { type, data } = peerUpdate.current.shift();
        if (type === 'negotiate') {
          await peerNegotiate();
        } else if (type === 'candidate') {
          await peerCandidate(data);
        } else if (type === 'message') {
          await linkMessage(data);
        } else if (type === 'remote_track') {
          await remoteStream.current.addTrack(data, remoteStream.current);
          if (data.kind === 'video') {
            updateState({ remote: remoteStream.current });
          }
        } else if (type === 'local_track') {
          await peerTrack(data);
        }
      }
      updatingPeer.current = false;
    }
  }

  const transmit = (ice: { urls: string; username: string; credential: string }[]) => {
    const peerConnection = new RTCPeerConnection({ iceServers: ice });
    peerConnection.addEventListener( 'connectionstatechange', event => {
      console.log("CONNECTION STATE", event);
    });
    peerConnection.addEventListener( 'icecandidate', event => {
      updatePeer('candidate', event.candidate);
    });
    peerConnection.addEventListener( 'icecandidateerror', event => {
      console.log("ICE ERROR");
    });
    peerConnection.addEventListener( 'iceconnectionstatechange', event => {
      console.log("ICE STATE CHANGE", event);
    });
    peerConnection.addEventListener( 'negotiationneeded', event => {
      updatePeer('negotiate');
    });
    peerConnection.addEventListener( 'signalingstatechange', event => {
      console.log("ICE SIGNALING", event);
    });
    peerConnection.addEventListener( 'track', event => {
      updatePeer('remote_track', event.track);
    });
    return peerConnection;
  }

  useEffect(() => {
    if (app.state.session) {
      const setRinging = (ringing: { cardId: string, callId: string }[]) => {
        updateState({ ringing });
      }
      const setContacts = (cards: Card[]) => {
        updateState({ cards });
      }
      const ring = app.state.session.getRing();
      ring.addRingingListener(setRinging);
      const contact = app.state.session.getContact();
      contact.addCardListener(setContacts);
      return () => {
        ring.removeRingingListener(setRinging);
        contact.removeCardListener(setContacts);
      }
    }
  }, [app.state.session]);

  const actions = {
    end: async () => {
      if (!call.current) {
        throw new Error('no active call');
      }
      const { link, peer } = call.current;
      try {
        peer.close();
        link.close();
      } catch (err) {
        console.log(err);
      } 
      call.current = null;
      localStream.current = null;
      remoteStream.current = null;
      updateState({ calling: null, audio: null, video: null, local: null, remote: null });
    },
    accept: async (callId: string, card: Card) => {
      if (call.current) {
        throw new Error('active call in progress');
      }
      const { cardId, node } = card;
      const ring = app.state.session.getRing();
console.log("ACCEPTING");
      const link = await ring.accept(cardId, callId, node);
console.log("ACCEPTED");
      const ice = link.getIce();
      const peer = transmit(ice);
      const policy = 'impolite';
      const candidates = [];
      call.current = { policy, peer, link, candidates }; 
      link.setStatusListener(linkStatus);
      link.setMessageListener((msg) => updatePeer('message', msg));
      updateState({ calling: card });
console.log("DONE");
    },
    call: async (cardId: string) => {
      if (call.current) {
        throw new Error('active call in proegress');
      }
      const card = state.cards.find(contact => contact.cardId === cardId);
      if (!card) {
        throw new Error('calling contact not found');
      }
      const contact = app.state.session.getContact();
      const link = await contact.callCard(cardId);
      const ice = link.getIce();
      const peer = transmit(ice);
      const policy = 'polite';
      const candidates = [];
      call.current = { policy, peer, link, candidates };
      link.setStatusListener(linkStatus);
      link.setMessageListener((msg) => updatePeer('message', msg));
      updateState({ calling: card });
    },
    loaded: (e) => {
      const { width, height } = e.nativeEvent.layout;
      if (width > (height + 80)) {
        updateState({ panelOffset: 0, loaded: true });
      } else {
        updateState({ panelOffset: ((height - width) - 80) / 2, loaded: true });
      }
    },
    enableAudio: async () => {
      if (!call.current || !state.audio || !state.audioAdded) {
        throw new Error('cannot unmute audio');
      }
      state.audio.enabled = true;
      updateState({ audioEnabled: true });
    },
    disableAudio: () => {
      if (!call.current || !state.audio || !state.audioAdded) {
        throw new Error('cannot mute audio');
      }
      state.audio.enabled = false;
      updateState({ audioEnabled: false });
    },
    enableVideo: () => {
      if (!call.current || !state.video) {
        throw new Error('cannot start video');
      }
      if (!state.videoAdded) {
        call.current.peer.addTrack(state.video, localStream.current);
        const local = new MediaStream();
        local.addTrack(state.video, local);
        updateState({ local });
      }
      state.video.enabled = true;
      updateState({ videoAdded: true, videoEnabled: true });
    },
    disableVideo: () => {
      if (!call.current || !state.video) {
        throw new Error('cannot stop video');
      }
      state.video.enabled = false;
      updateState({ videoEnabled: false });
    },
  }

  return { state, actions }
}
