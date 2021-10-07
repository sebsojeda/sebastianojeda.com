import { useForm, SubmitHandler } from "react-hook-form";
import { css } from "@emotion/react";
import Navigation from "./navigation";
import { useEffect } from "react";

type LoginFormInputs = {
  email: string;
};

const Styles = {
  layout: css`
    color: var(--color-foreground);
    background-color: var(--color-background);
    font-family: Inter, Arial, Helvetica, sans-serif;
    min-height: 100vh;
    display: flex;
    justify-content: center;
  `,
  container: css`
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    padding: 1rem;
    align-items: center;
    justify-content: center;
  `,
  form: css`
    display: flex;
    flex-direction: column;
    width: 18rem;
  `,
  input: css`
    color: var(--color-foreground);
    background-color: transparent;
    border: none;
    padding: 1rem;
    outline: none;
    border: 1px solid var(--color-accent-2);
    border-radius: 5px;
    outline: none;
    margin: 3rem 0 1rem 0;
    :focus,
    :hover {
      border-color: var(--color-foreground);
    }
  `,
  submit: css`
    border: 1px solid var(--color-success);
    background-color: var(--color-success);
    color: #fff;
    border-radius: 5px;
    padding: 1rem;
    margin-bottom: 10rem;
    :hover {
      cursor: pointer;
      background-color: var(--color-background);
      color: var(--color-success);
    }
  `,
};

export default function Login() {
  const { handleSubmit, register, reset, formState } =
    useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async ({ email }) => {
    await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
      credentials: "same-origin",
    });
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ email: "" });
    }
  }, [formState, reset]);

  return (
    <div css={Styles.layout}>
      <div css={Styles.container}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} css={Styles.form}>
          <input
            {...register("email", { required: true })}
            css={Styles.input}
            placeholder="Email Address"
          />
          <input
            type="submit"
            value="Continue with Email"
            css={Styles.submit}
          />
        </form>
      </div>
    </div>
  );
}
