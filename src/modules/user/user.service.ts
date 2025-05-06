import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/createUser.dto';
import * as bcrypt from "bcryptjs";
import {v4 as uuid4} from "uuid";
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ) {}

    async create(createUserDto: createUserDto): Promise<Omit<User, "password">> {
        const salt = await bcrypt.genSalt();
        createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
        const user = new User();
        user.firstName = createUserDto.firstName;
        user.lastName = createUserDto.lastName;
        user.email = createUserDto.email;
        user.password = createUserDto.password;
        user.apiKey = uuid4();
        const savedUser = await this.userRepo.save(user);
        const {password, ...dataWithoutPassword} = user;
        return dataWithoutPassword;
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
