import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "./auth.service";
import { AuthConstants } from "./auth.constant";
import { payloadType } from "src/common/types/payload.type";
@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
constructor() {
super({
jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 1.
ignoreExpiration: false, // 2.
secretOrKey: process.env.JWT_SECRET, // 3.
});
}
async validate(payload: payloadType) {
// 4.
return { userId: payload.userId, email: payload.email, artistId: payload.artistId }; // 5.
}
}