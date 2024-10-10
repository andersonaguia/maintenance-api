import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CredentialsDto {
  @IsNotEmpty()
  @IsEmail(
    {},
    {
      message: "email must be a valid email",
    }
  )
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}