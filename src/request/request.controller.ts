import { Controller, Post, Req, Body, UnauthorizedException, UseGuards } from '@nestjs/common';
import { HelpRequest } from './models/request.model';
import { RequestService } from './request.service';
import {AuthGuard} from '@nestjs/passport';
@Controller('requests')
export class RequestController {
    constructor(private readonly _requestService:RequestService){}

    @Post('create')
    @UseGuards(AuthGuard())
    async create(@Req() req, @Body() vm: HelpRequest): Promise<boolean>{
        console.log(req.user)

        const currentUser = req.user.id;

         return this._requestService.createRequest(currentUser, vm);



    }
}
