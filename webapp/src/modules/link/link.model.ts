import { prop, getModelForClass } from '@typegoose/typegoose';

class History {
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
  public org?: string;

  @prop()
  public zip?: string;

  @prop({ default: Date.now() })
  public createdAt?: Date;
}

export class Link {
  @prop({ required: true })
  public originalUrl!: string;

  @prop({ unique: true })
  public shortenUrl?: string;

  @prop()
  public history?: History[];

  @prop({ default: 1 })
  public alive?: number;

  @prop({ default: Date.now() })
  public createdAt?: Date;

  @prop({ default: Date.now() })
  public updatedAt?: Date;
}

const LinkModel = getModelForClass(Link, {
  schemaOptions: { collection: 'links' },
});

export default LinkModel;
