import {StyleSheet} from 'react-native';
import {Colors} from '../constants/Colors';

export const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    gap: 8,
  },
  cursor: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    height: '100%',
    gap: 4,
  },
  nocursor: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    height: '100%',
    gap: 4,
    cursor: 'default',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    paddingLeft: 8,
    paddingRight: 8,
  },
  image: {
    width: 32,
    height: 32,
  },
  nameSet: {
    fontSize: 16,
    textWrap: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  nameUnset: {
    fontSize: 16,
    textWrap: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontStyle: 'italic',
  },
  handle: {
    fontSize: 12,
    textWrap: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontWeight: 'bold',
  },
})

