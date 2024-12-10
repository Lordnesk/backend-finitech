import { Budget } from "src/Budget/entity/especific-budget.entity";
import { User } from "src/users/entity/users-entity";
import { 
    Entity,
    Column,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToMany,
    ManyToOne
} from "typeorm";

@Entity("available")
export class Available{
    @PrimaryColumn()
    id: number;

    @Column({ type: 'date', nullable: true })
    startDate: string; // Fecha de inicio del monto principal (opcional)
  
    @Column({ type: 'date', nullable: true })
    endDate: string; // Fecha de fin del monto principal (opcional)
  
    @Column("decimal", {precision: 10, scale: 2})
    totalAmount: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Budget, (budget) => budget.available)
    budgets: Budget[]; 

    @ManyToOne(() => User, (user) => user.availables)
    users: User;
  
}