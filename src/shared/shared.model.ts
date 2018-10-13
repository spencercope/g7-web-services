import { pre, prop, Typegoose } from 'typegoose';

@pre<T>('findOneAndUpdate', function(next) {
  this._update.updatedAt = new Date(Date.now());
  next();
})
export class SharedModel<T> extends Typegoose {
  @prop({ default: Date.now() })
  createdAt: Date;
  @prop({ default: Date.now() })
  updatedAt: Date;

  id?: string;
}