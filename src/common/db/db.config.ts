import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Available } from "src/Available/entity/monthly-budget.entity";
import { Budget } from "src/Budget/entity/especific-budget.entity";
import { User } from "src/users/entity/users-entity";


@Injectable()
export class Credentials implements TypeOrmOptionsFactory{

    constructor(
        private configService:ConfigService
    ){}

    createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        return({
            type: 'mysql',
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USERNAME'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_DATABASE'),
            entities: [Available, Budget, User],
            synchronize: true,
        });
    }
}