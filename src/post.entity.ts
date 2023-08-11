import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column,
  ManyToOne
} from "typeorm"
import { User } from "./user.entity"

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column('simple-array')
    photos: string[]

    @Column()
    caption: string

    @ManyToOne(() => User, (user) => user.posts)
    user: User

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;
  
    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    updatedAt: Date;
}

