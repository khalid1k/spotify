import { Playlist } from 'src/modules/playlist/entities/playlist.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  email: string;
  @Column()
  password: string;

  @OneToMany(()=> Playlist, (playLists)=> playLists.user)
  playList: Playlist[]
}
