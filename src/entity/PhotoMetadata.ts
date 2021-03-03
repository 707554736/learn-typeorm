import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Photo } from "./Photo";

@Entity()
export class PhotoMetadata {
  @PrimaryGeneratedColumn()
  id: number

  @Column('int')
  height: number

  @Column('int')
  width: number

  @Column()
  orientation: string

  @Column()
  compressed: boolean

  @Column()
  comment: string

  /** 创建一对一关系
   * @OneToOne 装饰器允许我们在两个实体之间创建一对一关系，(type) => Photo是一个函数，返回我们想与之建立关系的实体的类，type变量本身不包含任何内容
   * @JoinColumn 表明实体键的对应关系，在关系的所有者方面使用 @JoinColumn 装饰器，允许后会生成一个带有相关外键的列
   *  (photo)=>photo.metadata 用来指定反向关系，我们仅在关系的一侧使用@JoinColumn 
   */
  @OneToOne((type) => Photo, (photo) => photo.metadata)
  @JoinColumn()
  photo: Photo
}