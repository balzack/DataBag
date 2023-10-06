import { Appearance } from 'react-native'

const LightColors = {
  theme: 'light',
  overlay: 'dark',
  statusBar: 'dark-content',
  tabBar: '#888888',
  activeTabIcon: '#448866',
  idleTabIcon: '#888888',
  activeBorder: '#338866',
  idleBorder: '#dddddd',
  activeFill: '#66aa88',
  idleFill: '#888888',
  linkText: '#338866',
  dangerText: '#ff8888',
  labelText: '#555555',
  iconText: '#fffff',
  unsetText: '#999999',
  descriptionText: '#777777',
  text: '#444444',
  screenBase: '#cccccc',
  drawerBase: '#bbbbbb',
  areaBase: '#dddddd',
  contentBase: '#bbbbbb',
  modalBase: '#ffffff',
  modalBorder: '#555555',
  modalOverlay: 'rgba(52,52,52,0.8)',
  headerBar: '#eeeeee',
  primaryButton: '#448866',
  primaryButtonText: '#ffffff',
  cancelButton: '#888888',
  cancelButtonText: '#ffffff',
  disabledButton: '#dddddd',
  disabledButtonText: '#777777',
  dangerButton: '#ff5555',
  dangerButtonText: '#ffffff',
  closeButton: '#bbbbbb',
  closeButtonText: '#444444',
  inputBase: '#dddddd',
  inputPlaceholder: '#888888',
  inputText: '#444444',
  statusText: '#ffffff',
  connectedIndicator: '#41d041',
  connectingIndicator: '#0000cc',
  requestedIndicator: '#00bbbb',
  pendingIndicator: '#bbbb00',
  confirmedIndicator: '#88bb00',
  unknownIndicator: '#dddddd',
  errorIndicator: '#ffaaaa',
  horizontalDivider: '#dddddd',
  verticalDivider: '#dddddd',
  itemDivider: '#cccccc',
  unreadIndicator: '#00aa00',
  enabledIndicator: '#8fbea7',
  disabledIndicator: '#eeeeee',
  disconnectedIndicator: '#aa0000',
  sliderGrip: '#eeeeee',
  areaBorder: '#ffffff',
  connected: '#4488FF',
  connecting: '#dd44ff',
  requested: '#448844',
  pending: '#ffaa22',
  confirmed: '#999999',
  offsync: '#ff4444',
  unsaved: '#888888',
};

const DarkColors = {
  theme: 'dark',
  overlay: 'dark',
  statusBar: 'light-content',
  tabBar: '#888888',
  activeTabIcon: '#dddddd',
  idleTabIcon: '#aaaaaa',
  activeBorder: '#aaaaaa',
  idleBorder: '#eeeeee',
  activeFill: '#559955',
  idleFill: '#888888',
  linkText: '#88eecc',
  dangerText: '#ffaaaa',
  labelText: '#eeeeee',
  iconText: '#fffff',
  unsetText: '#aaaaaa',
  descriptionText: '#bbbbbb',
  text: '#ffffff',
  screenBase: '#222222',
  drawerBase: '#333333',
  areaBase: '#444444',
  contentBase: '#000000',
  modalBase: '#1b1b1b',
  modalBorder: '#555555',
  modalOverlay: 'rgba(0,0,0,0,0.8)',
  headerBar: '#555555',
  primaryButton: '#448866',
  primaryButtonText: '#ffffff',
  cancelButton: '#606060',
  cancelButtonText: '#ffffff',
  disabledButton: '#888888',
  disabledButtonText: '#aaaaaa',
  dangerButton: '#ff5555',
  dangerButtonText: '#ffffff',
  closeButton: '#777777',
  closeButtonText: '#ffffff',
  inputBase: '#777777',
  inputPlaceholder: '#cccccc',
  inputText: '#eeeeee',
  statusText: '#ffffff',
  connectedIndicator: '#00cc00',
  connectingIndicator: '#0000cc',
  requestedIndicator: '#00bbbb',
  pendingIndicator: '#bbbb00',
  confirmedIndicator: '#88bb00',
  unknownIndicator: '#dddddd',
  errorIndicator: '#ffaaaa',
  horizontalDivider: '#999999',
  verticalDivider: '#aaaaaa',
  itemDivider: '#555555',
  unreadIndicator: '#00aa00',
  enabledIndicator: '#8fbea7',
  disabledIndicator: '#eeeeee',
  disconnectedIndicator: '#aa0000',
  sliderGrip: '#eeeeee',
  areaBorder: '#777777',
  connected: '#4488FF',
  connecting: '#dd88ff',
  requested: '#448844',
  pending: '#ffaa22',
  confirmed: '#aaaaaa',
  offsync: '#ff4444',
  unsaved: '#888888',
};

function getColor(label) {
  return Appearance.getColorScheme() === 'dark' ? DarkColors[label] : LightColors[label];
}

export const Colors = {
  theme: getColor('theme'),
  tabBar: getColor('tabBar'),
  activeTabIcon: getColor('activeTabIcon'),
  idleTabIcon: getColor('idleTabIcon'),
  idleBorder: getColor('idleBorder'),
  activeBorder: getColor('activeBorder'),
  activeFill: getColor('activeFill'),
  idleFill: getColor('idleFill'),
  linkText: getColor('linkText'),
  dangerText: getColor('dangerText'),
  labelText: getColor('labelText'),
  iconText: getColor('iconText'),
  unsetText: getColor('unsetText'),
  descriptionText: getColor('descriptionText'),
  text: getColor('text'),
  screenBase: getColor('screenBase'),
  drawerBase: getColor('drawerBase'),
  contentBase: getColor('contentBase'),
  areaBase: getColor('areaBase'),
  modalBorder: getColor('modalBorder'), 
  modalOverlay: getColor('modalOverlay'),
  modalBase: getColor('modalBase'),
  headerBar: getColor('headerBar'),
  primaryButton: getColor('primaryButton'),
  primaryButtonText: getColor('primaryButtonText'),
  cancelButton: getColor('cancelButton'),
  cancelButtonText: getColor('cancelButtonText'),
  disabledButton: getColor('disabledButton'),
  disabledButtonText: getColor('disabledButtonText'),
  dangerButton: getColor('dangerButton'),
  dangerButtonText: getColor('dangerButtonText'),
  closeButton: getColor('closeButton'),
  closeButtonText: getColor('closeButtonText'),
  inputBase: getColor('inputBase'),
  inputPlaceholder: getColor('inputPlaceholder'),
  inputText: getColor('inputText'),
  statusText: getColor('statusText'),
  connectedIndicator: getColor('connectedIndicator'),
  connectingIndicator: getColor('connectingIndicator'),
  requestedIndicator: getColor('requestedIndicator'),
  pendingIndicator: getColor('pendingIndicator'),
  confirmedIndicator: getColor('confirmedIndicator'),
  unknownIndicator: getColor('unknownIndicator'),
  errorIndicator: getColor('errorIndicator'),
  horizontalDivider: getColor('horizontalDivider'),
  verticalDivider: getColor('verticalDivider'),
  itemDivider: getColor('itemDivider'),
  unreadIndicator: getColor('unreadIndicator'),
  enabledIndicator: getColor('enabledIndicator'),
  disabledIndicator: getColor('disabledIndicator'),
  disconnectedIndicator: getColor('disconnectedIndicator'),
  sliderGrip: getColor('sliderGrip'),
  areaBorder: getColor('areaBorder'),
  connected: getColor('connected'),
  connecting: getColor('connecting'),
  requested: getColor('requested'),
  pending: getColor('pending'),
  confirmed: getColor('confirmed'),
  offsync: getColor('offsync'),
  unsaved: getColor('unsaved'),

  background: '#8fbea7',
  primary: '#448866',
  titleBackground: '#f6f6f6',
  formBackground: '#f2f2f2',
  formFocus: '#f8f8f8',
  formHover: '#efefef',
  grey: '#888888',
  white: '#ffffff',
  divider: '#dddddd',
  mask: '#dddddd',
  encircle: '#cccccc',
  alert: '#ff8888',
  enabled: '#444444',
  lightgrey: '#bbbbbb',
  disabled: '#aaaaaa',
  link: '#0077CC',
  lightText: '#686868',

  active: '#222222',
  idle: '#707070',

  error: '#ff4444',

  profileForm: '#e8e8e8',
  profileDivider: '#aaaaaa',
  statsForm: '#ededed',
  statsDivider: '#afafaf',
  channel: '#f2f2f2',
  card: '#eeeeee',

  selectHover: '#fafafa',
};

export default Colors;
