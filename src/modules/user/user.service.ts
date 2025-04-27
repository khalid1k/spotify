import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/createUser.dto';
import * as bcrypt from "bcryptjs";
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ) {}

    async create(createUserDto: createUserDto): Promise<Omit<User, "password">> {
        const salt = await bcrypt.genSalt();
        createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
        const user = await this.userRepo.save(createUserDto);
        const {password, ...dataWithoutPasswordn} = user;
        return dataWithoutPasswordn;
    }

    async findOne(data: Partial<User>): Promise<User> {
        const user = await this.userRepo.findOneBy({email: data.email});
        if(!user){
            throw new UnauthorizedException('could not find the user');
        }else {
            return user;
        }
    }
}
