import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User as IUser } from './user.interface';
import { Account } from '../account/account.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 250, unique: true })
  email: string;

  @Column({ length: 100 })
  password: string;

  @Column('datetime', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created: Date;

  @OneToMany(type => Account, account => account.owner)
  accounts: Account[];

  toJSON(): IUser {
    const { id, username, email, created } = this;
    return {
      id,
      username,
      email,
      created,
    };
  }
}
