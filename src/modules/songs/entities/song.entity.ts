// import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// @Entity()
// export class Song {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   title: string;

//   @Column({ type: 'json' })
//   artists: string[];

//   @Column({ type: 'date' })
//   releasedDate: Date;

//   @Column({ type: 'date' })
//   duration: Date;

//   @Column({ type: 'text' })
//   lyrics: string;
// }

import { Artist } from 'src/modules/artist/entities/artist.entity';
import { Playlist } from 'src/modules/playlist/entities/playlist.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinColumn, JoinTable, ManyToOne } from 'typeorm';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'json' })
  artists: number[];

  @Column({ type: 'date' })
  releasedDate: Date;

  // Changed from date to one of these options:
  @Column({ type: 'time' })
  duration: Date;

  @Column({ type: 'text', nullable: true })
  lyrics: string;

  @ManyToMany(()=> Artist, (artist)=> artist.songs)
  @JoinTable({name: "songs_artist"})
  artist: Artist[];

@ManyToOne(()=>Playlist, (playList)=> playList.songs)
playList: Playlist;
}
