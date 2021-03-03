import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Photo } from "./Photo";

/** 多对多关系，需要在orm中使用ConnectionOptions注册Album类 */
@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany((type) => Photo, (photo) => photo.albums)
  @JoinTable()
  photos: Photo[]
}