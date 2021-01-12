import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import User from './User';

@Entity('todos')
class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  task: string;

  @Column({
    default: false,
  })
  completed: boolean;

  @ManyToOne(() => User, user => user.tasks)
  @JoinColumn({ name: 'userId' })
  provider: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Todo;
