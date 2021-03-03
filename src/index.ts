import "reflect-metadata";
import { createConnection, getManager } from "typeorm";
import { Photo } from "./entity/Photo";
import { PhotoMetadata } from "./entity/PhotoMetadata";
import { User } from "./entity/User";

/** 也可以使用EntityManager操作应用中的实体
 * 或使用Repository
  */
createConnection().then(async connection => {
    /** 实体操作相关代码 */
    console.log("Inserting a new user into the database...");
    const user = new User();
    const entityManager = getManager()
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

    // 创建photo
    let photo = new Photo()
    photo.name = 'Me and Bears'
    photo.description = 'a new photo'
    photo.filename = 'photo-with-bear.jpg'
    photo.views = 1
    photo.isPublished = true
    await connection.manager.save(photo)
    console.log("Saved a new photo with id: " + user.id);

    // 创建photo metadata
    let metadata = new PhotoMetadata()
    metadata.height = 640;
    metadata.width = 480;
    metadata.compressed = true;
    metadata.comment = "cybershoot";
    metadata.orientation = "portait";
    metadata.photo = photo

    // 获取实体Repository
    let metadataRepository = connection.getRepository(PhotoMetadata)
    let photoRepository = connection.getRepository(Photo)
    // 保存photo
    await photoRepository.save(photo)
    let savedPhoto = await photoRepository.find()
    console.log('all photos ', savedPhoto);

    await metadataRepository.save(metadata)

    /** 使用querybuilder用更加优雅的方式进行查找 */
    let photosQuery = await connection.getRepository(Photo)
        .createQueryBuilder("photo")
        .innerJoinAndSelect("photo.metadata", "metadata")
        .innerJoinAndSelect("photo.metadata", 'metadata')
        .getMany()
}).catch(error => console.log(error));
