import { prop, getModelForClass } from '@typegoose/typegoose';

export class User {
  @prop({ required: true })
  public userName!: string;

  @prop({ required: true })
  public firstName!: string;

  @prop({ required: true })
  public lastName!: string;

  @prop({ unique: true })
  public password?: string;

  @prop({ default: [] })
  public featureFlags?: string[];

  @prop()
  public linkCount?: number;

  @prop({ default: Date.now() })
  public createdAt?: Date;

  @prop({ default: Date.now() })
  public updatedAt?: Date;

  @prop({ default: 1 })
  public alive?: number;

  @prop()
  public deletedAt?: Date;
}

const UserModel = getModelForClass(User, {
  schemaOptions: { collection: 'users' },
});

export default UserModel;
