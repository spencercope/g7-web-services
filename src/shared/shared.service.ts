import { ModelType, Typegoose, InstanceType } from 'typegoose';
import { Types } from 'mongoose';

export abstract class SharedService<T extends Typegoose> {
  protected _model: ModelType<T>;

  private toObjectId(id: string): Types.ObjectId {
    return Types.ObjectId(id);
  }

  async findAll(filter = {}, projections = {}, options = {}): Promise<InstanceType<T>[]> {
    return this._model.find(filter, projections, options).exec();
  }

  async findOne(filter = {}, projections = {}, options = {}): Promise<InstanceType<T>> {
    return this._model.findOne(filter, projections, options).exec();
  }

  async findById(id: string): Promise<InstanceType<T>> {
    return this._model.findById(this.toObjectId(id)).exec();
  }

  async create(item: InstanceType<T>): Promise<InstanceType<T>> {
    return this._model.create(item);
  }

  async delete(id: string): Promise<InstanceType<T>> {
    return this._model.findByIdAndRemove(this.toObjectId(id)).exec();
  }

  async update(id: string, item: InstanceType<T>): Promise<InstanceType<T>> {
    return this._model.findOneAndUpdate({_id: this.toObjectId(id)}, item, { new: true }).exec();
  }

  async clearCollection(filter = {}): Promise<void> {
    return this._model.deleteMany(filter).exec();
  }
}
