import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HelpRequest } from './models/request.model';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { SharedService } from 'shared/shared.service';
import { UserService } from 'user/user.service';

@Injectable()
export class RequestService extends SharedService<HelpRequest>{
    constructor(@InjectModel(HelpRequest.modelName) private readonly _helpRequestModel: ModelType<HelpRequest>, private readonly _userService:UserService){
        super();
        this._model = _helpRequestModel;
    }

    async createRequest(userId:string, vm:HelpRequest){
        const newRequest = new this._model();
        let request;
        let user;
        console.log()
        try {
            user = await this._userService.findById(userId);
          } catch (e) {
            console.log(e)
            throw new InternalServerErrorException(e);
          }

          const {title, description} = vm;
          newRequest.title = title;
          newRequest.description= description;

          try{
            request = await this.create(newRequest);
          }catch (e) {
            throw new InternalServerErrorException(e);
          }
           user.requests.push(request.id);

           await this._userService.update(userId, user);

           return request;


    }

}
