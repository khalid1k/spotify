import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
// import { Strategy } from "passport-http-bearer";
import { AuthService } from "./auth.service";