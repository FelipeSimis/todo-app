import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FiArrowRight } from 'react-icons/fi';

import { useAuth } from '../../../hooks/auth';
import { useToast } from '../../../hooks/toast';

import { Input } from '../../../components';

import getValidationErrors from '../../../utils/getErrors';

import { Container, Wrapper, Button } from '../styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { push } = useHistory();

  const { signUp } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async ({ name, email, password }: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Required name field'),
          email: Yup.string().email().required('Required email field'),
          password: Yup.string().min(
            8,
            'Password must be at least 8 characters long'
          ),
        });

        await schema.validate(
          {
            name,
            email,
            password,
          },
          {
            abortEarly: false,
          }
        );

        await signUp({
          name,
          email,
          password,
        });

        addToast({
          type: 'success',
          title: 'Successful registration',
          description: 'You can now log on to your account',
        });

        push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'E-mail address already in use',
          description: 'Try again with a different e-mail address',
        });
      }
    },
    [signUp, addToast, push]
  );

  return (
    <Container>
      <Wrapper>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <fieldset>
            <legend>Create account</legend>
            <p>
              Already have an account? <Link to="/">Sign-In</Link>
            </p>

            <Input type="text" name="name" placeholder="Name" isLogin />
            <Input type="email" name="email" placeholder="E-mail" isLogin />
            <Input
              name="password"
              placeholder="Password"
              isPasswordField
              isLogin
            />

            <Button type="submit">
              Submit
              <FiArrowRight />
            </Button>
          </fieldset>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default SignUp;
