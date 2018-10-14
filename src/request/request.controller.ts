import { Controller, Post, Req, Body, UnauthorizedException, UseGuards, Get, Query } from '@nestjs/common';
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
    const requestId = req.body.requestId;
    console.log(req.body);
    return this._requestService.updateRequest(requestId, req.body);
  }

  @Get('receiver')
  @UseGuards(AuthGuard())
  async getRequestByReciver(@Req() req) {
    const requestId = req.user.id;
    console.log(req.user);
    return this._requestService.getRequestByReceiver(requestId);
  }

  // @Get('helpers')
  // @UseGuards(AuthGuard())
  // async getHelpers(@Req() req ) {
  //   const seekerLat = req.user.lat;
  //   const seekerLong = req.user.long;
  //   const helpersCat = req.helper.cat;
  //   const seekerCat = req.user.cat;
  //   console.log(req.user)
  //   return this._requestService.getCurrentOnlineLocations(seekerLat,seekerLong,helpersCat, seekerCat);
  // }

  @Get()
  @UseGuards(AuthGuard())
  async get() {
    return this._requestService.getAll();
  }

  @Get('current')
  async getCurrent(@Query('lat') lat: number, @Query('long') long: number) {
    console.log('LAT', lat);
    console.log('LAT', long);

    return this._requestService.getCurrentOnlineLocations(lat, long);
  }
}
