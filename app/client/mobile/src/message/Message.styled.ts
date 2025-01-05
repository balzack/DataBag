import {StyleSheet} from 'react-native';
import {Colors} from '../constants/Colors';

export const styles = StyleSheet.create({
  message: {
    paddingTop: 8,
    width: '100%',
  },
  topic: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingBottom: 8,
  },
  longbone: {
    width: '100%',
    height: 12,
    borderRadius: 4,
    backgroundColor: Colors.placeholder,
    marginTop: 8,
  },
  shortbone: {
    width: '50%',
    height: 12,
    borderRadius: 4,
    backgroundColor: Colors.placeholder,
    marginTop: 8,
  },
  dot: {
    width: 64,
    height: 64,
    backgroundColor: Colors.placeholder,
    marginLeft: 48,
    borderRadius: 16,
  },
  error: {
    marginLeft: 52,
    marginTop: 8,
    marginBottom: 16,
    color: Colors.offsync,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flexStart',
    width: '100%',
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 2,
    marginLeft: 8,
  },
  body: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flexStart',
    width: '100%',
    lineHeight: '16',
    gap: '16',
    position: 'relative',
  },
  name: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
  },
  handle: {
    fontSize: 14,
  },
  unknown: {
    fontSize: 14,
    color: Colors.placeholder,
  },
  locked: {
    fontStyle: 'italic',
    color: Colors.placeholder,
  },
  text: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 8,
  },
  option: {
    backgroundColor: 'transparent',
    padding: 0,
    margin: 0,
  },
  padding: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
  },
  carousel: {
    paddingLeft: 8,
    paddingBottom: 8,
  },
  assets: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
  item: {
    width: 64,
    height: 64,
    backgroundColor: 'yellow',
  },
  message: { 
    width: '100%',
    fontSize: 14,
    padding: 0,
  },
  modal: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editArea: {
    position: 'relative',
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'center',
    width:'80%',
    maxWidth: 400,
    padding: 16,
    borderRadius: 8,
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  closeIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 20,
    paddingLeft: 4,
    paddingBottom: 4,
  },
  controls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 16,
    gap: 8,
  },
})
