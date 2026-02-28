import { prop, getModelForClass } from '@typegoose/typegoose';

export class Link {
  @prop({ required: true })
  public originalUrl!: string;

  @prop({ unique: true })
  public shortenUrl?: string;

  @prop({ default: 1 })
  public alive?: number;

  @prop({ default: Date.now() })
  public createdAt?: Date;

  @prop()
  public deletedAt?: Date;

  @prop({ default: Date.now() })
  public updatedAt?: Date;
}

const LinkModel = getModelForClass(Link, {
  schemaOptions: { collection: 'links' },
});

export default LinkModel;
