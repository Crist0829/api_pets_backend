import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Pets } from "./pet.entity"

@Entity("pet_images")
export class Images {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    url: string

    

    @ManyToOne(() => Pets, pet => pet.images, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'pet_id' })
    pet: Pets;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: string  

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: string  


} 