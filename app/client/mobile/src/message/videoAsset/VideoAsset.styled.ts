import {StyleSheet} from 'react-native';
import {Colors} from '../constants/Colors';

export const styles = StyleSheet.create({
  modal: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    borderRadius: 13,
    backgroundColor: '#444444',
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  video: {
    position: 'relative',
  },
  thumb: {
    borderRadius: 4,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  full: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  closeIcon: {
    backgroundColor: 'transparent',
  },
  progress: {
    position: 'absolute',
    bottom: '10%',
    width: '50%',
  },
});
