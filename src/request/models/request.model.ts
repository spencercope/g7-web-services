import { SharedModel } from '../../shared/shared.model';
import { ModelType, prop } from 'typegoose';

export class HelpRequest extends SharedModel<HelpRequest>{
    @prop({ required: true })
    title: string;
    @prop({ required: true })
    description: string;
    @prop({ default: false, required: true })
    isRejected: boolean;
    @prop({ default: false, required: true })
    isApproved: boolean;
    @prop({ default: false, required: true })
    isComplete: boolean;


  static get model(): ModelType<HelpRequest> {
    return new HelpRequest().getModelForClass(HelpRequest);
  }

  static get modelName(): string {
    return this.model.modelName;
  }

  static get schema() {
    return this.model.schema;
  }
} 