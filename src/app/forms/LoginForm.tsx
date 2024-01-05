import styled from "@emotion/styled";
import { useForm } from "react-hook-form";

type FormData = {
  username: string;
  password: string;
};

type Props = {
  onSubmit: (data: FormData) => void;
};

export function LoginForm({ onSubmit }: Props): JSX.Element {
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">Käyttäjätunnus:</label>
      <input type="text" {...register("username")} autoComplete="off" />
      <label htmlFor="password">Salasana:</label>
      <input type="password" {...register("password")} />
      <input type="submit" value="Kirjaudu" />
    </StyledForm>
  );
}

const StyledForm = styled.form(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: theme.spacing(1),
}));
