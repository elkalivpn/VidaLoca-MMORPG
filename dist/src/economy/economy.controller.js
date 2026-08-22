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
exports.EconomyController = void 0;
const common_1 = require("@nestjs/common");
const economy_service_1 = require("./economy.service");
const passport_1 = require("@nestjs/passport");
let EconomyController = class EconomyController {
    economyService;
    constructor(economyService) {
        this.economyService = economyService;
    }
    async getBalance(req) {
        return this.economyService.getBalance(req.user.id);
    }
    async addEuros(req, amount, reason) {
        return this.economyService.addEuros(req.user.id, amount, reason);
    }
    async spendEuros(req, amount, reason) {
        return this.economyService.spendEuros(req.user.id, amount, reason);
    }
    async addVidaCoins(req, amount, reason) {
        return this.economyService.addVidaCoins(req.user.id, amount, reason);
    }
    async spendVidaCoins(req, amount, reason) {
        return this.economyService.spendVidaCoins(req.user.id, amount, reason);
    }
    async purchaseWithVidaCoins(req, amount, item) {
        return this.economyService.purchaseWithVidaCoins(req.user.id, amount, item);
    }
    async purchaseWithEuros(req, amount, item) {
        return this.economyService.purchaseWithEuros(req.user.id, amount, item);
    }
};
exports.EconomyController = EconomyController;
__decorate([
    (0, common_1.Get)('balance'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EconomyController.prototype, "getBalance", null);
__decorate([
    (0, common_1.Post)('euros/add'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('amount')),
    __param(2, (0, common_1.Body)('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, String]),
    __metadata("design:returntype", Promise)
], EconomyController.prototype, "addEuros", null);
__decorate([
    (0, common_1.Post)('euros/spend'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('amount')),
    __param(2, (0, common_1.Body)('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, String]),
    __metadata("design:returntype", Promise)
], EconomyController.prototype, "spendEuros", null);
__decorate([
    (0, common_1.Post)('vidacoins/add'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('amount')),
    __param(2, (0, common_1.Body)('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, String]),
    __metadata("design:returntype", Promise)
], EconomyController.prototype, "addVidaCoins", null);
__decorate([
    (0, common_1.Post)('vidacoins/spend'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('amount')),
    __param(2, (0, common_1.Body)('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, String]),
    __metadata("design:returntype", Promise)
], EconomyController.prototype, "spendVidaCoins", null);
__decorate([
    (0, common_1.Post)('purchase/vida'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('amount')),
    __param(2, (0, common_1.Body)('item')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, String]),
    __metadata("design:returntype", Promise)
], EconomyController.prototype, "purchaseWithVidaCoins", null);
__decorate([
    (0, common_1.Post)('purchase/euros'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('amount')),
    __param(2, (0, common_1.Body)('item')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, String]),
    __metadata("design:returntype", Promise)
], EconomyController.prototype, "purchaseWithEuros", null);
exports.EconomyController = EconomyController = __decorate([
    (0, common_1.Controller)('economy'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [economy_service_1.EconomyService])
], EconomyController);
//# sourceMappingURL=economy.controller.js.map