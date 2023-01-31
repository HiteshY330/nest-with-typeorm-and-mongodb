import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private StudentRepository: Repository<Student>,
  ) {}

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const { firstName, lastName } = createStudentInput;
    const student = this.StudentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });
    return this.StudentRepository.save(student);
  }

  async getAllStudent(): Promise<Student[]> {
    return this.StudentRepository.find();
  }

  async getStudent(id): Promise<Student> {
    return this.StudentRepository.findOne(id);
  }

  async getManyStudent(studentId: string[]): Promise<Student[]> {
    return this.StudentRepository.find({
        where:{
            id:{
                $in: studentId
            } as any
        }
    });
  }
}
