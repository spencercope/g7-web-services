import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HelpRequest } from './models/request.model';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { SharedService } from '../shared/shared.service';
import { UserService } from '../user/user.service';
import { FcmService } from '../shared/fcm/fcm.service';

@Injectable()
export class RequestService extends SharedService<HelpRequest>{
    constructor(@InjectModel(HelpRequest.modelName) private readonly _helpRequestModel: ModelType<HelpRequest>,
     private readonly _userService:UserService,
     private readonly _fcmService: FcmService){
        super();
        this._model = _helpRequestModel;
    }
  
    async getAll(){
      return this._model.find();
    }
    async getRequestByReciver(receiverId){
      return this._model.find({receiverId: receiverId});
    }

    async createRequest(vm:HelpRequest){
        const newRequest = new this._model();
        let request;
        let sender;
        let receiver;
        try {
          sender = await this._userService.findById(vm.senderId);
          receiver = await this._userService.findById(vm.receiverId);
          } catch (e) {
            throw new InternalServerErrorException(e);
          }
          console.log("SENDER", sender);
          console.log("RECEIVER", receiver);

          const {title, description, receiverId, senderId} = vm;
          newRequest.title = title;
          newRequest.receiverId = receiverId;
          newRequest.senderId = senderId;
          newRequest.description= description;

          try{
            request = await this.create(newRequest);
          }catch (e) {
            throw new InternalServerErrorException(e);
          }

          if(receiver.isHelper){
            const message= {
              title: "Someone is asking for your assistance",
              subtitle: sender.firstName + " " + sender.lastName,
              body: sender.firstName + "Needs your help with the following: "
            }
            this._fcmService.sendNotificationToToken(receiver.fcmToken,message).then().catch((e)=>console.log(e));
          }
           sender.requests.push(request.id);
           receiver.requests.push(request.id);

           await this._userService.update(senderId, sender);
           await this._userService.update(receiverId, receiver);

           return request;

    }

    async updateRequest(requestId: string, vm:HelpRequest){
      let _request;
      const {isApproved, isComplete, isRejected } = vm;

      try {
        _request = await this._userService.findById(requestId);
        } catch (e) {
          throw new InternalServerErrorException(e);
        }
        
        _request.isApproved = isApproved;
        _request.isComplete = isComplete;
        _request.isRejected = isRejected;

        try {
          return this.update(requestId, _request);
        } catch (e) {
          throw new InternalServerErrorException(e);
        }
        
    }

}
