import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "src/users/users.module";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { SessionSerializer } from "./session.serializer";
import { AuthController } from "./auth.controller";

@Module(
    {
        imports:[
            PassportModule.register({session:true}),
            UsersModule,
        ],
        providers:[
            AuthService,
            LocalStrategy,
            SessionSerializer
        ],

        controllers:[
            AuthController
        ]
    }
)

export class AuthModule{}