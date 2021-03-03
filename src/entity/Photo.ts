import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToOne, ManyToOne, ManyToMany } from "typeorm"
import { Album } from "./Album"
import { Author } from "./Author"
import { PhotoMetadata } from "./PhotoMetadata"

@Entity()
export class Photo {
  /** 自动生成id的主键 */
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  name: string
  @Column("text")
  description: string
  @Column()
  filename: string
  @Column("double")
  views: number
  @Column()
  isPublished: boolean

  /** 在photo和photometadata之间建立双向关系 */
  @OneToOne((type) => PhotoMetadata, (metadata) => metadata.photo, {
    /** 设置casdade可以在保存其他对象的同时保存相关对象, 此处设置后保存一个photo对象后，metadata也会自动保存 */
    cascade: true
  })
  metadata: PhotoMetadata

  @ManyToOne((type) => Author, (author) => author.photos)
  author: Author

  @ManyToMany((type) => Album, (album) => album.photos)
  albums: Album[]
}
