import { Song } from "src/modules/songs/entities/song.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("artists")
export class Artist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @OneToOne(()=> User)
    @JoinColumn()
    user: User;

    @ManyToMany(()=> Song, (song)=> song.artists)
    songs: Song[];
}