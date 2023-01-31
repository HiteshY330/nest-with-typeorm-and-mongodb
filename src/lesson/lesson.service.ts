import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository} from 'typeorm';
import {v4 as uuid} from 'uuid';
import {CreateLessonInput} from './lesson.Input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}
  async createLesson(createLessonInput:CreateLessonInput):Promise<Lesson>{
    const {name, startDate, endDate, student} = createLessonInput;
    const lesson = this.lessonRepository.create({
        id:uuid() ,
        name,
        startDate,
        endDate,
        student
    });
    return this.lessonRepository.save(lesson);
  }

  async getLesson(id):Promise<Lesson>{
    return this.lessonRepository.findOne(id);
  }

  async getAllLesson():Promise<Lesson[]>{
    return this.lessonRepository.find()
  }

  async assginStudentToLesson(lessonId:string, studentId:string[]):Promise<Lesson>{
    const lesson = await this.lessonRepository.findOneBy({ id:lessonId })
    lesson.student = [...lesson.student, ...studentId];
    return this.lessonRepository.save(lesson)
  }
}
