import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshTokenStrategy } from './strategies/jwt.strategy';
import { RoleModule } from '../role/role.module';

@Module({
  /*imports:[
    TypeOrmModule.forFeature([AuthRepository])
],*/
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    RoleModule,
    JwtModule.register({
      secret: /*process.env.SECRETKEY || */ 'ABA-SecretKey',
      signOptions: { expiresIn: process.env.EXPIRESIN || '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtRefreshTokenStrategy],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
