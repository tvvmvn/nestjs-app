import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column,
  OneToMany,
} from "typeorm"
import { Post } from "./post.entity"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    name: string

    @Column({ default: 'default.png' })
    avatar: string

    @Column()
    bio: string

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]
}

