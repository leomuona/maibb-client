import styled from "@emotion/styled";
import { useForm } from "react-hook-form";

export type FormData = {
  name: string;
  username: string;
  password: string;
  repeatPassword: string;
};

type Props = {
  onSubmit: (data: FormData) => void;
};

export function RegisterForm({ onSubmit }: Props): JSX.Element {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      username: "",
      password: "",
      repeatPassword: "",
    },
  });

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Nimi:</label>
      <input
        type="text"
        {...register("name", { required: true })}
        autoComplete="off"
      />
      <label htmlFor="username">Käyttäjätunnus:</label>
      <input
        type="text"
        {...register("username", { required: true })}
        autoComplete="off"
      />
      <label htmlFor="password">Salasana:</label>
      <input type="password" {...register("password", { required: true })} />
      <label htmlFor="repeatPassword">Vahvista salasana:</label>
      <input
        type="password"
        {...register("repeatPassword", {
          required: true,
          validate: (val: string) => {
            if (watch("password") !== val) {
              return "Salasanat eivät täsmää";
            }
          },
        })}
      />
      <input type="submit" value="Rekisteröidy" disabled={!isValid} />
    </StyledForm>
  );
}

const StyledForm = styled.form(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: theme.spacing(1),
}));
