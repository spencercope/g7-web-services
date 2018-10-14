import { Controller, Post, Req, Body, UnauthorizedException, UseGuards, Get } from '@nestjs/common';
import { HelpRequest } from './models/request.model';
import { RequestService } from './request.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('requests')
export class RequestController {
  constructor(private readonly _requestService: RequestService) {
  }

  @Post('create')
  @UseGuards(AuthGuard())
  async create(@Body() vm: HelpRequest): Promise<boolean> {
    console.log(vm);
    return this._requestService.createRequest(vm);
  }

  @Post('update-request')
  @UseGuards(AuthGuard())
  async updateRequest(@Req() req, vm: HelpRequest): Promise<any> {
    const requestId = req.request.id;
    return this._requestService.updateRequest(requestId, vm);
  }

  @Get('receiver')
  @UseGuards(AuthGuard())
  async getRequestByReciver(@Req() req) {
    const requestId = req.body.receiverId;
    return this._requestService.getRequestByReceiver(requestId);
  }

  @Get()
  @UseGuards(AuthGuard())
  async get() {
    return this._requestService.getAll();
  }

  @Get('current')
  async getCurrent() {
    return this._requestService.getCurrentOnlineLocations(38.6325937, -90.2278455);
  }
}
