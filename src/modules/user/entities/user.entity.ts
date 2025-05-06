import { ApiProperty } from '@nestjs/swagger';
import { Playlist } from 'src/modules/playlist/entities/playlist.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({
    example: 'json',
    description: 'provide the firstname of the user'
  })
  @Column()
  firstName: string;
  @ApiProperty({
    example: 'Doe',
    description: "provide the lastname of the user"
  })
  @Column()
  lastName: string;
  @ApiProperty({
    example: 'jasondoa@gmail.com',
    description: "provide the email"
  })
  @Column({unique: true})
  email: string;
  @ApiProperty({
    example: 'test123#$',
    description: 'provide the password of the user'
  })
  @Column()
  password: string;
  @Column()
  apiKey: string;

  @OneToMany(()=> Playlist, (playLists)=> playLists.user)
  playList: Playlist[]
}
