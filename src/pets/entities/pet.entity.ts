import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { PetsType } from "./enums"
import { IsIn, Max, Min } from "class-validator"
import { Users } from "src/users/entities/users.entity"
import { Images } from "./images.entity"
import { Exclude } from "class-transformer"

@Entity()
export class Pets {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    breed: string

    @Column({
        type: 'enum',
        enum: PetsType,
        default: PetsType.DOG,
      })
    type: PetsType

    @Column({ type: 'smallint', unsigned: true, nullable : true })
    @Min(1)
    @Max(4)
    @IsIn([1, 2, 3, 4])
    rating: number;

    @ManyToOne(() => Users, user => user.pets, { nullable: false, onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'user_id' })
    user: Users;

    @OneToMany(() => Images, images => images.pet)
    images : Images[]

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: string  

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: string  


} 