import { Song } from "src/modules/songs/entities/song.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("playlists")
export class Playlist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(()=>Song, (song)=> song.playList)
    songs: Song[];

    @ManyToOne(()=>User, (user)=> user.playList)
    user: User;
}