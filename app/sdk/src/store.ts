import { Login, ProfileEntity, defaultProfileEntity, ConfigEntity, defaultConfigEntity } from './entities';
import type { ArticleRevision, ArticleDetail, ArticleItem, ChannelItem, CardItem, CardRevision, CardNotification, CardProfile, CardDetail, ChannelRevision, ChannelSummary, ChannelDetail } from './items';
import type { Logging } from './logging';

export interface Store {
  init(): Promise<Login | null>;
  setLogin(login: Login): Promise<void>;
  clearLogin(): Promise<void>;

  getSeal(guid: string): Promise<{ publicKey: string, privateKey: string } | null>;
  setSeal(guid: string, seal: { publicKey: string, privateKey: string }): Promise<void>;
  clearSeal(guid: string): Promise<void>;

  getProfileRevision(guid: string): Promise<number>;
  setProfileRevision(guid: string, revision: number): Promise<void>;
  getProfileData(guid: string): Promise<ProfileEntity>;
  setProfileData(guid: string, data: ProfileEntity): Promise<void>;

  getSettingsRevision(guid: string): Promise<number>;
  setSettingsRevision(guid: string, revision: number): Promise<void>;
  getSettingsData(guid: string): Promise<ConfigEntity>;
  setSettingsData(guid: string, data: ConfigEntity): Promise<void>;

  getContactRevision(guid: string): Promise<number>;
  setContactRevision(guid: string, revision: number): Promise<void>;

  getContacts(guid: string): Promise<CardItem[]>;
  setContactCardRevision(guid: string, cardId: string, revision: CardRevision): Promise<void>;
  setContactCardProfile(guid: string, cardId: string, profile: CardProfile): Promise<void>;
  setContactCardDetail(guid: string, cardId: string, detail: CardDetail): Promise<void>;
  setContactCardBlocked(guid: string, cardId: string, blocked: boolean): Promise<void>;

  setContactCardRemoteRevision(guid: string, cardId: string, notification: CardNotification): Promise<void>;
  setContactCardSyncRevision(guid: string, cardId: string, notification: CardNotification): Promise<void>;
  setContactCardOffsync(guid: string, cardId: string, offsync: boolean): Promise<void>;

  getContactCardArticles(guid: string): Promise<ArticleItem[]>;
  setContactCardArticleRevision(guid: string, cardId: string, articleId: string, revision: ArticleRevision): Promise<void>;
  setContactCardArticleDetail(guid: string, cardId: string, articleId: string, detail: ChannelDetail, unsealedData: any): Promise<void>;
  setContactCardArticleUnsealed(guid: string, cardId: string, articleId: string, unsealedData: any): Promise<void>;

  getContactCardChannels(guid: string): Promise<ChannelItem[]>;
  setContactCardChannelBlocked(guid: string, cardId: string, channelId: string, blocked: boolean): Promise<void>;
  setContactCardChannelRevision(guid: string, cardId: string, channelId: string, revision: ChannelRevision): Promise<void>;
  setContactCardChannelSummary(guid: string, cardId: string, channelId: string, summary: ChannelSummary): Promise<void>;
  setContactCardChannelDetail(guid: string, cardId: string, channelId: string, detail: ChannelDetail, unsealedData: any): Promise<void>;
  setContactCardChannelUnsealed(guid: string, cardId: string, channelId: string, unsealedData: any): Promise<void>;

  setContactCardChannelTopicSyncRevision(guid: string, cardId: string, channelId: string, revision: number): Promise<void>;
  setContactCardChannelTopicRemoteRevision(guid: string, cardId: string, channelId: string, revision: number): Promise<void>;
}

export interface SqlStore {
  set(stmt: string, params?: (string | number | null)[]): Promise<void>;
  get(stmt: string, params?: (string | number | null)[]): Promise<any[]>;
}

export interface WebStore {
  getValue(key: string): Promise<string>;
  setValue(key: string, value: string): Promise<void>;
  clearValue(key: string): Promise<void>;
  clearAll(): Promise<void>;
}

export class OfflineStore implements Store {

  private sql: SqlStore;
  private log: Logging;

  constructor(log: Logging, sql: SqlStore) {
    this.sql = sql;
    this.log = log;
  }

  private async getAppValue(guid: string, id: string, unset: any): Promise<any> {
    try {
      const rows = await this.sql.get(`SELECT * FROM app WHERE key='${guid}::${id}';`);
      if (rows.length == 1 && rows[0].value != null) {
        return JSON.parse(rows[0].value);
      }
    }
    catch(err) {
      console.log(err);
    }
    return unset;
  }

  private async setAppValue(guid: string, id: string, value: any): Promise<void> {
    await this.sql.set('INSERT OR REPLACE INTO app (key, value) values (?, ?)', [`${guid}::${id}`, JSON.stringify(value)]);
  }

  private async clearAppValue(guid: string, id: string): Promise<void> {
    await this.sql.set('INSERT OR REPLACE INTO app (key, value) values (?, null)', [`${guid}::${id}`]);
  }

  private async initLogin(guid: string): Promise<void> {
    await this.sql.set(`CREATE TABLE IF NOT EXISTS channel_${guid} (channel_id text, revision integer, detail_revision integer, topic_revision integer, topic_marker integer, blocked integer, sync_revision integer, detail text, unsealed_detail text, summary text, unsealed_summary text, offsync integer, read_revision integer, unique(channel_id))`);
    await this.sql.set(`CREATE TABLE IF NOT EXISTS channel_topic_${guid} (channel_id text, topic_id text, revision integer, created integer, detail_revision integer, blocked integer, detail text, unsealed_detail text, unique(channel_id, topic_id))`);
    await this.sql.set(`CREATE TABLE IF NOT EXISTS card_${guid} (card_id text, revision integer, detail_revision integer, profile_revision integer, detail text, profile text, notified_view integer, notified_article integer, notified_profile integer, notified_channel integer, offsync integer, blocked integer, unique(card_id))`);
    await this.sql.set(`CREATE TABLE IF NOT EXISTS card_channel_${guid} (card_id text, channel_id text, revision integer, detail_revision integer, topic_revision integer, topic_marker integer, sync_revision integer, detail text, unsealed_detail text, summary text, unsealed_summary text, offsync integer, blocked integer, read_revision integer, unique(card_id, channel_id))`);
    await this.sql.set(`CREATE TABLE IF NOT EXISTS card_channel_topic_${guid} (card_id text, channel_id text, topic_id text, revision integer, created integer, detail_revision integer, blocked integer, detail text, unsealed_detail text, unique(card_id, channel_id, topic_id))`);
  }

  public async init(): Promise<Login | null> {
    await this.sql.set("CREATE TABLE IF NOT EXISTS app (key text, value text, unique(key));");
    return await this.getAppValue('', 'login', null) as Login | null;
  }

  public async setLogin(login: Login): Promise<void> {
    await this.initLogin(login.guid);
    await this.setAppValue('', 'login', login);
  }

  public async clearLogin(): Promise<void> {
    await this.clearAppValue('', 'login');
  }

  public async getSeal(guid: string): Promise<{ publicKey: string, privateKey: string } | null> {
    return await this.getAppValue(guid, 'seal', null) as { publicKey: string, privateKey: string } | null;
  }

  public async setSeal(guid: string, seal: { publicKey: string, privateKey: string }): Promise<void> {
    await this.setAppValue(guid, 'seal', seal);
  }

  public async clearSeal(guid: string): Promise<void> {
    await this.clearAppValue(guid, 'seal');
  }

  public async getProfileRevision(guid: string): Promise<number> {
    return await this.getAppValue(guid, 'profile_revision', 0) as number;
  }

  public async setProfileRevision(guid: string, revision: number): Promise<void> {
    await this.setAppValue(guid, 'profile_revision', revision);
  } 
  
  public async getProfileData(guid: string): Promise<ProfileEntity> {
    return await this.getAppValue(guid, 'profile_data', defaultProfileEntity) as ProfileEntity;
  }
  
  public async setProfileData(guid: string, data: ProfileEntity): Promise<void> {
    await this.setAppValue(guid, 'profile_data', data);
  }

  public async getSettingsRevision(guid: string): Promise<number> {
    return await this.getAppValue(guid, 'account_revision', 0) as number;
  }

  public async setSettingsRevision(guid: string, revision: number): Promise<void> {
    await this.setAppValue(guid, 'account_revision', revision);
  } 
  
  public async getSettingsData(guid: string): Promise<ConfigEntity> {
    return await this.getAppValue(guid, 'account_data', defaultConfigEntity) as ConfigEntity;
  }
  
  public async setSettingsData(guid: string, data: ConfigEntity): Promise<void> {
    await this.setAppValue(guid, 'account_data', data);
  }

  public async getContactRevision(guid: string): Promise<number> {
    return 0;
  }

  public async setContactRevision(guid: string, revision: number): Promise<void> {
  }

  public async getContacts(guid: string): Promise<CardItem[]> { 
    return [];
  }

  public async setContactCardRevision(guid: string, cardId: string, revision: CardRevision): Promise<void> {
  }

  public async setContactCardProfile(guid: string, cardId: string, profile: CardProfile): Promise<void> {
  }

  public async setContactCardDetail(guid: string, cardId: string, detail: CardDetail): Promise<void> {
  }

  public async setContactCardBlocked(guid: string, cardId: string, blocked: boolean): Promise<void> {
  }

  public async setContactCardRemoteRevision(guid: string, cardId: string, notification: CardNotification): Promise<void> {
  }

  public async setContactCardSyncRevision(guid: string, cardId: string, notification: CardNotification): Promise<void> {
  }

  public async setContactCardOffsync(guid: string, cardId: string, offsync: boolean): Promise<void> {
  }

  public async getContactCardArticles(guid: string): Promise<ArticleItem[]> {
    return [];
  }

  public async setContactCardArticleRevision(guid: string, cardId: string, articleId: string, revision: ArticleRevision): Promise<void> {
  }

  public async setContactCardArticleDetail(guid: string, cardId: string, articleId: string, detail: ChannelDetail, unsealedData: any): Promise<void> {
  }

  public async setContactCardArticleUnsealed(guid: string, cardId: string, articleId: string, unsealedData: any): Promise<void> {
  }

  public async getContactCardChannels(guid: string): Promise<ChannelItem[]> {
    return [];
  }

  public async setContactCardChannelBlocked(guid: string, cardId: string, channelId: string, blocked: boolean): Promise<void> {
  }

  public async setContactCardChannelRevision(guid: string, cardId: string, channelId: string, revision: ChannelRevision): Promise<void> {
  }

  public async setContactCardChannelSummary(guid: string, cardId: string, channelId: string, summary: ChannelSummary): Promise<void> {
  }

  public async setContactCardChannelDetail(guid: string, cardId: string, channelId: string, detail: ChannelDetail, unsealedData: any): Promise<void> {
  }

  public async setContactCardChannelUnsealed(guid: string, cardId: string, channelId: string, unsealedData: any): Promise<void> {
  }

  public async setContactCardChannelTopicSyncRevision(guid: string, cardId: string, channelId: string, revision: number): Promise<void> {
  }

  public async setContactCardChannelTopicRemoteRevision(guid: string, cardId: string, channelId: string, revision: number): Promise<void> {
  }
}

export class OnlineStore implements Store {

  private web: WebStore;
  private log: Logging;

  constructor(log: Logging, web: WebStore) {
    this.web = web;
    this.log = log;
  }

  private async getAppValue(guid: string, id: string, unset: any): Promise<any> {
    const value =  await this.web.getValue(`${guid}::${id}`);
    if (value != null) {
      return JSON.parse(value);
    }
    return unset;
  }

  private async setAppValue(guid: string, id: string, value: any): Promise<void> {
    await this.web.setValue(`${guid}::${id}`, JSON.stringify(value));
  }

  private async clearAppValue(guid: string, id: string): Promise<void> {
    await this.web.clearValue(`${guid}::${id}`);
  } 

  public async init(): Promise<Login | null> {
    return await this.getAppValue('', 'login', null) as Login | null;
  }

  public async setLogin(login: Login): Promise<void> {
    await this.setAppValue('', 'login', login);
  }

  public async clearLogin(): Promise<void> {
    await this.clearAppValue('', 'login');
  }

  public async getSeal(guid: string): Promise<{ publicKey: string, privateKey: string } | null> {
    return await this.getAppValue(guid, 'seal', null) as { publicKey: string, privateKey: string } | null;
  }

  public async setSeal(guid: string, seal: { publicKey: string, privateKey: string }): Promise<void> {
    await this.setAppValue(guid, 'seal', seal);
  }

  public async clearSeal(guid: string): Promise<void> {
    await this.clearAppValue(guid, 'seal');
  }

  public async getProfileRevision(guid: string): Promise<number> {
    return 0;
  }

  public async setProfileRevision(guid: string, revision: number): Promise<void> {
  } 
  
  public async getProfileData(guid: string): Promise<ProfileEntity> {
    return defaultProfileEntity;
  }
  
  public async setProfileData(guid: string, data: ProfileEntity): Promise<void> {
  } 

  public async getSettingsRevision(guid: string): Promise<number> {
    return 0;
  }

  public async setSettingsRevision(guid: string, revision: number): Promise<void> {
  } 
  
  public async getSettingsData(guid: string): Promise<ConfigEntity> {
    return defaultConfigEntity;
  }
  
  public async setSettingsData(guid: string, data: ConfigEntity): Promise<void> {
  } 

  public async getContactRevision(guid: string): Promise<number> {
    return 0;
  }

  public async setContactRevision(guid: string, revision: number): Promise<void> {
  }

  public async getContacts(guid: string): Promise<CardItem[]> { 
    return [];
  }

  public async setContactCardRevision(guid: string, cardId: string, revision: CardRevision): Promise<void> {
  }

  public async setContactCardProfile(guid: string, cardId: string, profile: CardProfile): Promise<void> {
  }

  public async setContactCardDetail(guid: string, cardId: string, detail: CardDetail): Promise<void> {
  }

  public async setContactCardBlocked(guid: string, cardId: string, blocked: boolean): Promise<void> {
  }

  public async setContactCardRemoteRevision(guid: string, cardId: string, notification: CardNotification): Promise<void> {
  }

  public async setContactCardSyncRevision(guid: string, cardId: string, notification: CardNotification): Promise<void> {
  }

  public async setContactCardOffsync(guid: string, cardId: string, offsync: boolean): Promise<void> {
  }

  public async getContactCardArticles(guid: string): Promise<ArticleItem[]> {
    return [];
  }

  public async setContactCardArticleRevision(guid: string, cardId: string, articleId: string, revision: ArticleRevision): Promise<void> {
  }

  public async setContactCardArticleDetail(guid: string, cardId: string, articleId: string, detail: ChannelDetail, unsealedData: any): Promise<void> {
  }

  public async setContactCardArticleUnsealed(guid: string, cardId: string, articleId: string, unsealedData: any): Promise<void> {
  }

  public async getContactCardChannels(guid: string): Promise<ChannelItem[]> {
    return [];
  }

  public async setContactCardChannelBlocked(guid: string, cardId: string, channelId: string, blocked: boolean): Promise<void> {
  }

  public async setContactCardChannelRevision(guid: string, cardId: string, channelId: string, revision: ChannelRevision): Promise<void> {
  }

  public async setContactCardChannelSummary(guid: string, cardId: string, channelId: string, summary: ChannelSummary): Promise<void> {
  }

  public async setContactCardChannelDetail(guid: string, cardId: string, channelId: string, detail: ChannelDetail, unsealedData: any): Promise<void> {
  }

  public async setContactCardChannelUnsealed(guid: string, cardId: string, channelId: string, unsealedData: any): Promise<void> {
  }

  public async setContactCardChannelTopicSyncRevision(guid: string, cardId: string, channelId: string, revision: number): Promise<void> {
  }

  public async setContactCardChannelTopicRemoteRevision(guid: string, cardId: string, channelId: string, revision: number): Promise<void> {
  }
}

export class NoStore implements Store {
  constructor() {
  }

  public async init(): Promise<Login | null> {
    return null;
  }

  public async setLogin(login: Login): Promise<void> {
  }

  public async clearLogin(): Promise<void> {
  }

  public async getSeal(guid: string): Promise<{ publicKey: string, privateKey: string } | null> {
    return null;
  }

  public async setSeal(guid: string, seal: { publicKey: string, privateKey: string }): Promise<void> {
  }

  public async clearSeal(guid: string): Promise<void> {
  }
  
  public async getProfileRevision(guid: string): Promise<number> {
    return 0;
  }

  public async setProfileRevision(guid: string, revision: number): Promise<void> {
  }

  public async getProfileData(guid: string): Promise<ProfileEntity> {
    return defaultProfileEntity;
  }

  public async setProfileData(guid: string, data: ProfileEntity): Promise<void> {
  }

  public async getSettingsRevision(guid: string): Promise<number> {
    return 0;
  }

  public async setSettingsRevision(guid: string, revision: number): Promise<void> {
  }

  public async getSettingsData(guid: string): Promise<ConfigEntity> {
    return defaultConfigEntity;
  }

  public async setSettingsData(guid: string, data: ConfigEntity): Promise<void> {
  }

  public async getContactRevision(guid: string): Promise<number> {
    return 0;
  }

  public async setContactRevision(guid: string, revision: number): Promise<void> {
  }

  public async getContacts(guid: string): Promise<CardItem[]> { 
    return [];
  }

  public async setContactCardRevision(guid: string, cardId: string, revision: CardRevision): Promise<void> {
  }

  public async setContactCardProfile(guid: string, cardId: string, profile: CardProfile): Promise<void> {
  }

  public async setContactCardDetail(guid: string, cardId: string, detail: CardDetail): Promise<void> {
  }

  public async setContactCardBlocked(guid: string, cardId: string, blocked: boolean): Promise<void> {
  }

  public async setContactCardRemoteRevision(guid: string, cardId: string, notification: CardNotification): Promise<void> {
  }

  public async setContactCardSyncRevision(guid: string, cardId: string, notification: CardNotification): Promise<void> {
  }

  public async setContactCardOffsync(guid: string, cardId: string, offsync: boolean): Promise<void> {
  }

  public async getContactCardArticles(guid: string): Promise<ArticleItem[]> {
    return [];
  }

  public async setContactCardArticleRevision(guid: string, cardId: string, articleId: string, revision: ArticleRevision): Promise<void> {
  }

  public async setContactCardArticleDetail(guid: string, cardId: string, articleId: string, detail: ChannelDetail, unsealedData: any): Promise<void> {
  }

  public async setContactCardArticleUnsealed(guid: string, cardId: string, articleId: string, unsealedData: any): Promise<void> {
  }

  public async getContactCardChannels(guid: string): Promise<ChannelItem[]> {
    return [];
  }

  public async setContactCardChannelBlocked(guid: string, cardId: string, channelId: string, blocked: boolean): Promise<void> {
  }

  public async setContactCardChannelRevision(guid: string, cardId: string, channelId: string, revision: ChannelRevision): Promise<void> {
  }

  public async setContactCardChannelSummary(guid: string, cardId: string, channelId: string, summary: ChannelSummary): Promise<void> {
  }

  public async setContactCardChannelDetail(guid: string, cardId: string, channelId: string, detail: ChannelDetail, unsealedData: any): Promise<void> {
  }

  public async setContactCardChannelUnsealed(guid: string, cardId: string, channelId: string, unsealedData: any): Promise<void> {
  }

  public async setContactCardChannelTopicSyncRevision(guid: string, cardId: string, channelId: string, revision: number): Promise<void> {
  }

  public async setContactCardChannelTopicRemoteRevision(guid: string, cardId: string, channelId: string, revision: number): Promise<void> {
  }
}

