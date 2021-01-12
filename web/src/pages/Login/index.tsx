import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FiArrowRight } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import { Input } from '../../components';

import getValidationErrors from '../../utils/getErrors';

import { Container, Wrapper, RemindContainer, Button } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [remindLogin, setRemindLogin] = useState(false);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleRemind = useCallback(() => {
    setRemindLogin(state => !state);
  }, []);

  const handleSubmit = useCallback(
    async ({ email, password }: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string().email().required('Required email field'),
          password: Yup.string().required('Required password field'),
        });

        await schema.validate(
          {
            email,
            password,
          },
          {
            abortEarly: false,
          }
        );

        await signIn({
          email,
          password,
          remind: remindLogin,
        });

        addToast({
          type: 'success',
          title: 'Successfully login',
          description: '',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Login error',
          description:
            'An error occurred while logging in, check your credentials and try again',
        });
      }
    },
    [signIn, addToast, remindLogin]
  );

  return (
    <Container>
      <Wrapper>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <fieldset>
            <legend>Sign-In</legend>
            <p>
              Don&apos;t have an account? <Link to="/signup">Sign-Up</Link>
            </p>

            <Input type="email" name="email" placeholder="E-mail" isLogin />
            <Input
              name="password"
              placeholder="Password"
              isPasswordField
              isLogin
            />

            <RemindContainer>
              <input
                type="checkbox"
                id="remind"
                value={remindLogin.toString()}
                onClick={handleRemind}
              />

              <label htmlFor="remind">Remember me</label>
            </RemindContainer>

            <Button type="submit">
              Sign in
              <FiArrowRight />
            </Button>
          </fieldset>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
