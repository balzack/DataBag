export type Card = {
  cardId: string;
  offsync: boolean;
  blocked: boolean;
  sealable: boolean;
  status: string;
  statusUpdated: number;
  guid: string;
  handle: string;
  name: string;
  description: string;
  location: string;
  imageUrl: string;
  imageSet: boolean;
  version: string;
  node: string;
};

export type Call = {
  cardId: string;
  callId: string;
  calleeToken: string;
  ice: { urls: string; username: string; credential: string }[];
};

export type Revision = {
  account: number;
  profile: number;
  article: number;
  group: number;
  channel: number;
  card: number;
};

export type Activity = {
  revision?: Revision;
  phone?: Call;
};

export type Channel = {
  channelId: string;
  cardId: string | null;
  lastTopic: {
    guid: string;
    sealed: boolean;
    dataType: string;
    data: any;
    created: number;
    updated: number;
    status: string;
    transform: string;
  };
  blocked: boolean;
  unread: boolean;
  sealed: boolean;
  dataType: string;
  data: any;
  created: number;
  updated: number;
  enableImage: boolean;
  enableAudio: boolean;
  enableVideo: boolean;
  enableBinary: boolean;
  //membership: Member;
  members: Member[];
};

export type Member = {
  guid: string;
  //pushEnabled: boolean;
  //canAddTopic: boolean,
  //canAddTag: boolean,
  //canAddAsset: boolean,
  //canAddParticipant: boolean,
  //canSortTopic: boolean,
  //canSortTag: boolean,
  //participants: Participant[];
};

export type Participant = {
  id: string;
  name: string;
  token: string;
  node: string;
  secure: boolean;
};

export type Topic = {
  topicId: string;
  cardId: string | null;
  channelId: string;
  guid: string;
  sealed: boolean;
  unsealed: boolean;
  dataType: string;
  data: any;
  created: number;
  updated: number;
  status: string;
  transform: string;
  sortOrder: number;
  tagCount: number;
  tagComplete: boolean;
  tags: Tag[];
};

export type Tag = {
  id: string;
  sealed: boolean;
  unsealed: boolean;
  guid: string;
  dataType: string;
  data: any;
  created: number;
  updated: number;
  sortOrder: number;
};

export type Asset = {
  path: string;
  fileType: string;
};

export type Group = {
  id: string;
  sealed: boolean;
  unsealed: boolean;
  dataType: string;
  data: string;
  created: number;
  updated: number;
  cards: string[];
};

export type Article = {
  cardId: string;
  articleId: string;
  blocked: boolean;
  sealed: boolean;
  dataType: string;
  data: any;
  created: number;
  updated: number;
  contacts?: {
    cards: string[];
    groups: string[];
  };
};

export type Config = {
  disabled: boolean;
  storageUsed: number;
  storageAvailable: number;
  forwardingAddress: string;
  searchable: boolean;
  allowUnsealed: boolean;
  pushEnabled: boolean;
  sealSet: boolean;
  sealUnlocked: boolean;
  enableIce: boolean;
  mfaEnabled: boolean;
  webPushKey: string;
};

export type Profile = {
  guid: string;
  handle: string;
  name: string;
  description: string;
  location: string;
  imageUrl: string;
  imageSet: boolean;
  sealSet: boolean;
  version: string;
  node: string;
};

export type NodeAccount = {
  accountId: number;
  guid: string;
  handle: string;
  name: string;
  description: string;
  location: string;
  imageSet: boolean;
  disabled: boolean;
};

export type NodeConfig = {
  domain: string;
  accountStorage: string;
  enableImage: boolean;
  enableAudio: boolean;
  enableVideo: boolean;
  enableBinary: boolean;
  keyType: string;
  pushSupported: boolean;
  allowUnsealed: boolean;
  transformSupported: boolean;
  enableIce: boolean;
  iceService: string;
  iceUrl: string;
  iceUsername: string;
  icePassword: string;
  enableOpenAccess: boolean;
  openAccessLimit: number;
};

export type Params = {
  topicBatch: number;
  tagBatch: number;
  articleTypes: string[];
  channelTypes: string[];
};

export type SessionParams = {
  pushType: string;
  deviceToken: string;
  notifications: { event: string; messageTitle: string }[];

  deviceId: string;
  version: string;
  appName: string;
};
