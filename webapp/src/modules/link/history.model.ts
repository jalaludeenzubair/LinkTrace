import { prop, getModelForClass } from '@typegoose/typegoose';

class MetaData {
  @prop()
  type: string;

  @prop()
  app: string;

  @prop()
  appVersion: string;

  @prop()
  deviceType: string;

  @prop()
  deviceModel: string;

  @prop()
  os: string;

  @prop()
  osVersion: string;

  @prop()
  platform: string;
}

class History {
  @prop({ required: true })
  public linkId!: string;

  @prop()
  public ip?: string;

  @prop()
  public countryCode?: string;

  @prop()
  public country?: string;

  @prop()
  public region?: string;

  @prop()
  public regionName?: string;

  @prop()
  public city?: string;

  @prop()
  public lat?: string;

  @prop()
  public lon?: string;

  @prop()
  public timezone?: string;

  @prop()
  public pinCode?: string;

  @prop()
  public metadata?: MetaData;

  @prop({ default: Date.now() })
  public createdAt?: Date;
}

const HistoryModel = getModelForClass(History, {
  schemaOptions: { collection: 'history' },
});

export default HistoryModel;
