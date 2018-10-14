import { ModelType, prop, Ref, arrayProp } from 'typegoose';
import { SharedModel } from '../../shared/shared.model';
import { HelpRequest } from '../../request/models/request.model';

export class User extends SharedModel<User> {
  @prop({ required: true })
  password: string;
  @prop({ required: true })
  email: string;

  @prop({ required: true, default: 0 })
  rating: number;
  @prop({ required: true, default: 0 })
  ratingCount: number;
  @prop({ required: true })
  isHelper: boolean;
  @prop({ required: true, default: false })
  isVerified: boolean;
  @arrayProp({ default: [], itemsRef: HelpRequest })
  requests: Ref<HelpRequest>[];
  @prop({ required: false })
  organization?: string;
  @prop({ required: false })
  nickname?: string;
  @prop({ required: false })
  firstName?: string;
  @prop({ required: false })
  lastName?: string;
  @prop({ required: false })
  phone?: string;
  @prop({ required: false })
  fcmToken?: string;
  @prop({ required: false })
  helpCategories?: string[];

  static get model(): ModelType<User> {
    return new User().getModelForClass(User);
  }

  static get modelName(): string {
    return this.model.modelName;
  }

  static get schema() {
    return this.model.schema;
  }
}
