import { StyleSheet } from 'react-native';
import { Colors } from 'constants/Colors';

export const styles = StyleSheet.create({
  drawerContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  drawerHeader: {
    fontFamily: 'roboto',
    color: Colors.text,
    fontSize: 20,
    padding: 16,
  },
  drawerFrame: {
    width: '80%',
    maxWidth: 400,
    paddingBottom: 32,
  },
  drawerLogo: {
    aspectRatio: 1,
    resizeMode: 'contain',
    borderRadius: 8,
    width: null,
    height: null,
  },
  drawerLogoEdit: {
    position: 'absolute',
    top: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.drawerBase,
    paddingLeft: 8,
    paddingRight: 8,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  drawerEditDivider: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerLine: {
    borderWidth: 1,
    borderColor: Colors.areaBase,
    flexGrow: 1,
  },
  drawerDivider: {
    width: '80%',
    borderWidth: 1,
    borderColor: Colors.areaBase,
    marginTop: 16,
    marginBottom: 32,
  },
  drawerName: {
    width: '80%',
    paddingLeft: 8,
    paddingRight: 8,
  },
  drawerNameSet: {
    color: Colors.text,
    fontFamily: 'roboto',
    fontSize: 48,
    flexGrow: 1,
    flexShrink: 1,
  },
  drawerNameUnset: {
    color: Colors.inputPlaceholder,
    fontFamily: 'roboto',
    fontSize: 48,
    fontStyle: 'italic',
    flexGrow: 1,
  },
  drawerNameEdit: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 8,
  },
  drawerEntry: {
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 8,
  },
  drawerActions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  drawerStatus: {
    paddingBottom: 8,
  },
  container: { 
    width: '100%',
    height: '100%',
  },  
  content: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    alignSelf: 'center',
  },
  busy: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
    paddingLeft: 16,
  },
  details: {
    minHeight: 32,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    backgroundColor: Colors.screenBase,
    borderTopWidth: 1,
    borderColor: Colors.areaBorder,
    borderLeftWidth: 0.2,
    borderRightWidth: 0.2,
    paddingLeft: 1,
    paddingRight: 1,
    display: 'flex',
    flexShrink: 1,
    flexGrow: 1,
    paddingBottom: 16,
  },
  space: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  back: {
    backgroundColor: Colors.screenBase,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginLeft: 32,
    borderColor: Colors.areaBorder,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  backLabel: {
    color: Colors.text,
    fontSize: 14,
    fontFamily: 'Roboto',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 4,
    paddingBottom: 2,
  },
  nameSet: {
    display: 'flex',
    color: Colors.text,
    fontFamily: 'roboto',
    fontSize: 48,
    flexShrink: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  nameUnset: {
    color: Colors.inputPlaceholder,
    fontFamily: 'roboto',
    fontSize: 48,
    fontStyle: 'italic',
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  username: {
    color: Colors.text,
    fontFamily: 'roboto',
    flexShrink: 1,
    fontSize: 18,
    paddingLeft: 16,
    paddingRight: 16,
  },
  usernameStatus: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 4,
  },
  status: {
    display: 'flex',
    flexGrow: 1,
    paddingRight: 16,
    alignItems: 'flex-end',
  },
  statusConnected: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 8,
    backgroundColor: Colors.connected,
  },
  statusConfirmed: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 8,
    backgroundColor: Colors.confirmed,
  },
  statusPending: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 8,
    backgroundColor: Colors.pending,
  },
  statusConnecting: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 8,
    backgroundColor: Colors.connecting,
  },
  statusRequested: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 8,
    backgroundColor: Colors.requested,
  },
  statusUnsaved: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 8,
    backgroundColor: Colors.unsaved,
  },
  statusOffsync: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 8,
    backgroundColor: Colors.offsync,
  },
  statusLabel: {
    color: Colors.text,
    fontSize: 16,
  },
  attributes: {
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: Colors.areaBase,
    borderRadius: 8,
    marginTop: 24,
    display: 'flex',
    flexShrink: 1,
  },
  actions: {
    marginLeft: 16,
    marginRight: 16,
    paddingLeft: 4,
    paddingRight: 16,
    backgroundColor: Colors.areaBase,
    borderRadius: 8,
    marginTop: 24,
    height: 72,
  },
  actionList: {
    alignItems: 'flex-end',
  },
  action: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: 12,
    paddingLeft: 12,
    paddingBottom: 12,
  },
  actionIcon: {
  },
  actionLabel: {
    color: Colors.linkText,
    fontSize: 10,
  },
  divider: {
    width: '100%',
    height: 2, 
    backgroundColor: Colors.screenBase,
  },
  entry: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 8,
  },
  description: {
    display: 'flex',
    flexShrink: 1,
  },
  descriptionIcon: {
    alignSelf: 'flex-start',
    paddingLeft: 8,
    paddingRight: 16,
  },
  drawerDescriptionIcon: {
    alignSelf: 'flex-start',
    paddingLeft: 8,
    paddingRight: 8,
  },
  icon: {
    paddingLeft: 8,
    paddingRight: 16,
  },
  drawerIcon: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  locationSet: {
    fontSize: 16,
    color: Colors.text,
    fontFamily: 'roboto',
    flex: 1,
  },
  locationUnset: {
    fontSize: 16,
    color: Colors.inputPlaceholder,
    fontFamily: 'roboto',
    fontStyle: 'italic',
    flex: 1,
  },
  descriptionSet: {
    fontSize: 16,
    color: Colors.text,
    fontFamily: 'roboto',
    flex: 1,
  },
  descriptionUnset: {
    fontSize: 16,
    color: Colors.inputPlaceholder,
    fontFamily: 'roboto',
    fontStyle: 'italic',
    flex: 1,
  },
})
