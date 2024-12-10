import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Available } from 'src/Available/entity/monthly-budget.entity';
import { Budget } from 'src/budget/entity/especific-budget.entity'; 

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Available, (available) => available.users)
  availables: Available[];

  @OneToMany(() => Budget, (budget) => budget.users)
  budgets: Budget[];
}
