import { useRef, useEffect, useState, useCallback } from 'react';
import { avatar } from '../constants/Icons'
import { Pressable, View, Image } from 'react-native';
import {Icon, Text, IconButton, Surface, Divider} from 'react-native-paper';
import { Topic, Card, Profile } from 'databag-client-sdk';
import { ImageAsset } from './imageAsset/ImageAsset';
import { AudioAsset } from './audioAsset/AudioAsset';
import { VideoAsset } from './videoAsset/VideoAsset';
import { BinaryAsset } from './binaryAsset/BinaryAsset';
import { useMessage } from './useMessage.hook';
import {styles} from './Message.styled';

export function Message({ topic, card, profile, host, select, selected }: { topic: Topic, card: Card | null, profile: Profile | null, host: boolean, select: (id: string)=>void, selected: string }) {
  const { state, actions } = useMessage();
  const { locked, data, created, topicId, status, transform } = topic;
  const { name, handle, node } = profile || card || { name: null, handle: null, node: null }
  const { text, textColor, textSize, assets } = data || { text: null, textColor: null, textSize: null }
  const textStyle = textColor && textSize ? { fontSize: textSize, color: textColor } : textColor ? { color: textColor } : textSize ? { fontSize: textSize } : {}
  const logoUrl = profile ? profile.imageUrl : card ? card.imageUrl : avatar;
  const timestamp = actions.getTimestamp(created);
  const [message, setMessage] = useState('');
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState('');
  const [saving, setSaving] = useState(false);

  return (
    <View style={styles.message}>
      <View style={styles.topic}>
        <View style={styles.content}>
          <Image style={styles.logo} resizeMode={'contain'} source={{uri: logoUrl}} />
          <View style={styles.body}>
            <Pressable style={styles.header} onPress={()=>select(topicId)}>
              <View style={styles.name}>
                { name && (
                  <Text style={styles.handle}>{ name }</Text>
                )}
                { !name && handle && (
                  <Text style={styles.handle}>{ `${handle}${node ? '/' + node : ''}` }</Text>
                )}
                { !name && !handle && (
                  <Text style={styles.unknown}>{ state.strings.unknownContact }</Text>
                )}
                <Text style={styles.timestamp}> { timestamp }</Text>
              </View>
            </Pressable>
            <View style={styles.padding}>
              {! locked && status === 'confirmed' && editing && (
                <View style={styles.editing}>
                </View>
              )}
              { !locked && status === 'confirmed' && text && !editing && (
                  <Text style={{ ...styles.text, ...textStyle }}>{ text }</Text>
              )}
              { !locked && status !== 'confirmed' && (
                <View style={styles.unconfirmed}>
                </View>
              )}
              { locked && (
                <Text style={styles.locked}>{ state.strings.encrypted }</Text>
              )}
            </View>
          </View>
        </View>
      </View>
      { topicId === selected && (
        <Surface style={styles.options}>
          <IconButton style={styles.option} loading={false} compact="true"  mode="contained" icon="share-variant-outline" size={24} onPress={() => {}} />
          <IconButton style={styles.option} loading={false} compact="true"  mode="contained" icon="square-edit-outline" size={24} onPress={() => {}} />
          <IconButton style={styles.option} loading={false} compact="true"  mode="contained" icon="trash-can-outline" size={24} onPress={() => {}} />
          <IconButton style={styles.option} loading={false} compact="true"  mode="contained" icon="eye-remove-outline" size={24} onPress={() => {}} />
          <IconButton style={styles.option} loading={false} compact="true"  mode="contained" icon="alert-octagon-outline" size={24} onPress={() => {}} />
        </Surface>
      )}
      <Divider style={styles.border} />
    </View>
  );
}
