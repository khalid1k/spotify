import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './modules/songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './modules/songs/songs.controller';
import { TypeOrmModule } from './dataSource/typeOrm.module';
import { CatsModule } from './modules/cats/cats.module';
import { UserModule } from './modules/user/user.module';
import { ArtistModule } from './modules/artist/artist.module';
import { PlaylistModule } from './modules/playlist/playlist.module';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [TypeOrmModule, SongsModule, CatsModule, UserModule, ArtistModule, PlaylistModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs'); // option no 1
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'songs', method: RequestMethod.POST }); //option no 2

    consumer.apply(LoggerMiddleware).forRoutes(SongsController); //option no 3
  }
}
