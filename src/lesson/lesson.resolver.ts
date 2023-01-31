import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { StudentService } from 'src/student/student.service';
import { AssginStudentToLessonInput } from './assginStudentToLessonInput';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.Input';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(
    private lessonService:LessonService,
    private studentService:StudentService
  ){}
  @Query((returns) => LessonType)
  lesson(
    @Args('id') id:string
  ) {
    return this.lessonService.getLesson(id);
  }
  @Query((returns)=> [LessonType])
  getAllLesson(){
    return this.lessonService.getAllLesson();
  }

  @Mutation(returns=>LessonType)
  createLesson(
      @Args('createLessonInput') createLessonInput:CreateLessonInput,
      /*@Args('startDate') startDate:string,
      @Args('endDate') endDate:string*/
  ){
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation(returns=>LessonType)
  assginStudentToLesson(
    @Args('assginStudentToLessonInput') assginStudentToLessonInput:AssginStudentToLessonInput
  ){
    const {lessonId, studentId} = assginStudentToLessonInput
    return this.lessonService.assginStudentToLesson(lessonId, studentId)
  }

  @ResolveField()
  async student(@Parent() lesson:Lesson){
    return this.studentService.getManyStudent(lesson.student)
  }
}
