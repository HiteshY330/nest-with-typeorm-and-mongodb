import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { LessonModule } from './lesson/lesson.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './lesson/lesson.entity';
import { StudentModule } from './student/student.module';
import { Student } from './student/student.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      /*type:'mongodb',
      url: 'mongodb://127.0.0.1:27017/school',
      synchronize: true,
      useUnifiedTopology: true,*/
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password:'root123',
      database: 'school',
      synchronize: true,
      dropSchema: true,
      entities:[
        Lesson,
        Student
      ]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile:true,
    }),
    LessonModule,
    StudentModule
  ],
})
export class AppModule {}
