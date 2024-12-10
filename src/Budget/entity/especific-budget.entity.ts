import { Available } from "src/Available/entity/monthly-budget.entity";
import { User } from "src/users/entity/users-entity";
import { 
    Entity,
    Column,
    ManyToOne,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

@Entity("budget")

export class Budget{
    @PrimaryColumn()
    id: number;

    @Column({type: "date"})
    durationDate: string;

    @Column({type: "text"})
    description: string;

    @Column()
    amount: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Available, (aviable) => aviable.budgets)
    available: Available; 

    @ManyToOne(() => User, (user) => user.budgets)
    users: User;
}