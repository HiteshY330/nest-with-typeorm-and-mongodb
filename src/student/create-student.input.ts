import { Field, InputType } from "@nestjs/graphql";
import { MinLength ,MaxLength} from "class-validator";

@InputType()
export class CreateStudentInput{
    @Field()
    @MinLength(3)
    @MaxLength(15)
    firstName:string

    @Field()
    @MinLength(3)
    @MaxLength(15)
    lastName:string

}