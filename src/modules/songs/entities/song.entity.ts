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

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'json' })
  artists: string[];

  @Column({ type: 'date' })
  releasedDate: Date;

  // Changed from date to one of these options:
  @Column({ type: 'time' })
  duration: Date;

  @Column({ type: 'text', nullable: true })
  lyrics: string;
}
