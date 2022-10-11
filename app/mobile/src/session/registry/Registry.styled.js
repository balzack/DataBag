import { StyleSheet } from 'react-native';
import { Colors } from 'constants/Colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: Colors.formBackground,
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topbar: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.divider,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 16,
    paddingRight: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searcharea: {
    borderBottomWidth: 1,
    borderColor: Colors.divider,
  },
  searchbar: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 16,
    paddingLeft: 8,
    paddingBottom: 8,
    alignItems: 'center',
  },
  inputwrapper: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 4,
    backgroundColor: Colors.white,
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 1,
    marginRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    marginLeft: 8,
  },
  inputfield: {
    flex: 1,
    textAlign: 'center',
    padding: 4,
    color: Colors.text,
    fontSize: 14,
  },
  icon: {
    paddingLeft: 8,
  },
  accounts: {
    flexGrow: 1,
    flexShrink: 1,
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    minHeight: 0,
  },
  addbottom: {
    marginRight: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 4,
  },
  bottomText: {
    color: Colors.primary,
    paddingLeft: 8,
  },
  search: {
    backgroundColor: Colors.primary,
    marginLeft: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 4,
  },
  close: {
    marginRight: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 4,
  },
  newtext: {
    paddingLeft: 8,
    color: Colors.white,
  },
  findarea: {
    borderTopWidth: 1,
    borderColor: Colors.divider,
  }
})

