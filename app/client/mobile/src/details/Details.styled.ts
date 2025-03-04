import {StyleSheet} from 'react-native';
import { Colors } from '../constants/Colors';

export const styles = StyleSheet.create({
  details: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  encrypted: {
    fontSize: 20,
    fontStyle: 'italic',
  },
  noAccess: {
    fontSize: 20,
    fontStyle: 'italic',
    padding: 32,
  },
  header: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 8,
    paddingLeft: 8,
    width: '100%',
    zIndex: 1,
    height: 48,
  },
  title: {
    fontSize: 20,
    flexGrow: 1,
    textAlign: 'center',
  },
  close: {
    width: 32,
  },
  closeIcon: {
    flexShrink: 0,
    marginRight: 0,
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: 'transparent',
  },
  divider: {
    width: '100%',
    height: 2,
  },
  info: {
    width: '80%',
    maxWidth: 400,
    paddingBottom: 32,
    paddingTop: 16,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4,
    paddingTop: 4,
  },
  itemLabel: {
    fontSize: 16,
    paddingLeft: 8,
  },
  itemHeader: {
    fontSize: 22,
    paddingLeft: 8,
  },
  guestSubject: {
    paddingBottom: 8,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 4,
  },
  subject: {
    width: '100%',
    height: 52,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 4,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  input: {
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
  underline: {
    display: 'none',
  },
  icon: {
    backgroundColor: 'transparent',
    padding: 0,
    margin: 0,
  },
  inputControl: {
    width: 32,
    height: 32,
    backgroundColor: 'yellow',
  },
  members: {
    flexGrow: 1,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'center',
    paddingTop: 24,
    paddingBottom: 48,
  },
  action: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  actionLabel: {
    fontSize: 12,
  },
  actionIcon: {
    position: 'relative',
    top: 8,
    backgroundColor: 'transparent',
    padding: 0,
    margin: 0, 
  },
  membership: {
  },
  members: {
    width: '100%',
  },
  card: {
    paddingBottom: 8,
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
    height: 48,
    width: '100%',
    borderBottomWidth: 1,
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  memberModal: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberSurface: {
    position: 'relative',
    width: '80%',
  },
  modalHeader: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  modalTitle: {
    flexGrow: 1,
    paddingLeft: 16,
    fontSize: 20,
  },
  modalClose: {
    backgroundColor: 'transparent',
  },
  modalMembers: {
    minHeight: 128,
    maxHeight: 256,
    width: '100%',
  },
  modalArea: {
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 4,
  },
  modalButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalButton: {
    borderRadius: 4,
    margin: 16,
  },
  noContacts: {
    width: '100%',
    height: 128,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noContactsLabel: {
    color: Colors.placeholder,
    fontSize: 20,
  },
  memberSwitch: {
    transform: [{scaleX: 0.7}, {scaleY: 0.7}],
  },
  error: {
    flexGrow: 1,
    paddingLeft: 32,
    color: Colors.offsync,
  },
});
