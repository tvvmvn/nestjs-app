import { MigrationInterface, QueryRunner } from "typeorm"
import { User } from 'src/user.entity';
import { Post } from 'src/post.entity';

export class Seed1691739170358 implements MigrationInterface {
  // typeorm migration:run
  public async up(queryRunner: QueryRunner): Promise<void> {

    const users = [
      {
        username: 'michelangelo',
        name: 'Michelangelo',
        avatar: 'michelangelo.jpg',
        bio: '나는 대리석 안에서 천사를 보았고 그를 자유롭게 해줄 때까지 조각했다',
      },
      {
        username: 'jobs',
        name: 'Steve Jobs',
        avatar: 'jobs.jpeg',
        bio: '이야 아이폰 많이 좋아졌다',
      },
      {
        username: 'dog',
        name: 'Mr.Loyal',
        avatar: 'dog.jpeg',
        bio: '멍',
      },
    ]

    for (let i = 0; i < users.length; i++) {
      const user = await queryRunner.manager.create<User>(User, {
        username: users[i].username,
        name: users[i].name,
        avatar: users[i].avatar,
        bio: users[i].bio,
      })

      await queryRunner.manager.save(user);
    }

    const posts = [
      {
        photos: ["david.jpg"],
        caption: "David, Galleria dell'Accademia, Florence"
      },
      {
        photos: ["pieta_1.jpg", "pieta_2.jpg"],
        caption: "Pieta, St. Peter's Basilica, Rome"
      },
      {
        photos: ["bacchus.png"],
        caption: "Bacchus, Museo Nazionale del Bargello, Florence"
      },
      {
        photos: ["angel.jpg"],
        caption: "Angel, Basilica of San Domenico, Bologna"
      },
    ]

    const user = await queryRunner.manager.findOne<User>(User, { 
      where: { username: 'michelangelo' },
      relations: { posts: true }
    })

    for (let i = 0; i < posts.length; i++) {
      const post = await queryRunner.manager.create<Post>(Post, {
        photos: posts[i].photos,
        caption: posts[i].caption
      })

      await queryRunner.manager.save(post);

      user.posts.push(post);

      await queryRunner.manager.save(user);
    }
  }

  // typeorm migration:revert
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM user`);
    await queryRunner.query(`DELETE FROM post`);
  }
}
