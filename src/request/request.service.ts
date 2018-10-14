import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HelpRequest } from './models/request.model';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { SharedService } from '../shared/shared.service';
import { UserService } from '../user/user.service';
import { FcmService } from '../shared/fcm/fcm.service';
import { SocketGateway } from '../socket/socket.gateway';

@Injectable()
export class RequestService extends SharedService<HelpRequest> {
  constructor(@InjectModel(HelpRequest.modelName) private readonly _helpRequestModel: ModelType<HelpRequest>,
              private readonly _userService: UserService,
              private readonly _fcmService: FcmService,
              private readonly _socketGatewayService: SocketGateway) {
    super();
    this._model = _helpRequestModel;
  }

  async getAll() {
    return this._model.find();
  }

  async getRequestByReceiver(receiverId) {
    return this._model.find({ receiverId });
  }

  async createRequest(vm: HelpRequest) {
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

    const { title, description, receiverId, senderId } = vm;
    newRequest.title = title;
    newRequest.receiverId = receiverId;
    newRequest.senderId = senderId;
    newRequest.description = description;

    try {
      request = await this.create(newRequest);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    if (receiver.isHelper) {
      const message = {
        title: 'Someone is asking for your assistance',
        subtitle: sender.firstName + ' ' + sender.lastName,
        body: sender.firstName + 'Needs your help with the following: ',
      };
      this._fcmService.sendNotificationToToken(receiver.fcmToken, message)
        .then(data => console.log(data))
        .catch((e) => console.log('error', e));
    }
    sender.requests.push(request.id);
    receiver.requests.push(request.id);

    await this._userService.update(senderId, sender);
    await this._userService.update(receiverId, receiver);

    return request;

  }

  async updateRequest(requestId: string, vm: HelpRequest) {
    let _request;
    const { isApproved, isComplete, isRejected } = vm;

    try {
      _request = await this._model.findById(requestId);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
console.log("ISAPPROVED", isApproved)
    _request.isApproved = isApproved;
    _request.isComplete = isComplete;
    _request.isRejected = isRejected;

    try {
      return this.update(requestId, _request);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async getCurrentOnlineLocations(seekerLat: number, seekerLng: number) {
    const clientsLocations = { ...this._socketGatewayService.clientsLocations };
    const users = [];
    const locations = {};
    Object.keys(clientsLocations).forEach(key => {
      const { lat, lng } = clientsLocations[key];
      const distance = getDistanceFromLatLonInMi(seekerLat, seekerLng, lat, lng);
      if (distance <= 10) {
        users.push(key.toString());
        locations[key] = { lat, lng, distance };
      }
    });

    // TODO: Need filter by helpCategor and isHelper
    const result = await this._userService.findByIds(users);
    return {
      users: result,
      locations,
    };
  }
}

function getDistanceFromLatLonInMi(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);  // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  ;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // Distance in km
  return (R * c) / 1.6;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
