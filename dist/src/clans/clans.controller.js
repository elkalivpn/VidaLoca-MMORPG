"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClansController = void 0;
const common_1 = require("@nestjs/common");
const clans_service_1 = require("./clans.service");
const passport_1 = require("@nestjs/passport");
let ClansController = class ClansController {
    clansService;
    constructor(clansService) {
        this.clansService = clansService;
    }
    async createClan(req, name, tag) {
        return this.clansService.createClan(req.user.id, name, tag);
    }
    async getMyClan(req) {
        return this.clansService.getClanByUserId(req.user.id);
    }
    async joinClan(req, clanId) {
        return this.clansService.joinClan(req.user.id, clanId);
    }
    async leaveClan(req) {
        return this.clansService.leaveClan(req.user.id);
    }
    async getLeaderboard() {
        return this.clansService.getClanLeaderboard();
    }
};
exports.ClansController = ClansController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('name')),
    __param(2, (0, common_1.Body)('tag')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ClansController.prototype, "createClan", null);
__decorate([
    (0, common_1.Get)('my'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClansController.prototype, "getMyClan", null);
__decorate([
    (0, common_1.Post)('join/:clanId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('clanId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ClansController.prototype, "joinClan", null);
__decorate([
    (0, common_1.Post)('leave'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClansController.prototype, "leaveClan", null);
__decorate([
    (0, common_1.Get)('leaderboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClansController.prototype, "getLeaderboard", null);
exports.ClansController = ClansController = __decorate([
    (0, common_1.Controller)('clans'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [clans_service_1.ClansService])
], ClansController);
//# sourceMappingURL=clans.controller.js.map