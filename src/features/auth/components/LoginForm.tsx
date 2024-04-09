import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { Button } from '@/components/Elements/Button';
import { FormContainer } from '@/components/Elements/Form/Container';
import { TextInput } from '@/components/Elements/InputFields/Text';

interface IFormInput {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().email('Musi być poprawnym emailem').required('Email jest wymagany'),
    password: yup
      .string()
      .min(6, 'Hasło musi mieć co najmniej 6 znaków')
      .max(20, 'Hasło może mieć maksymalnie 20 znaków')
      .required('Hasło jest wymagane'),
  })
  .required();

export const LoginForm = () => {
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      // TODO: Implement login
      console.log(data);
      navigate('/');
    } catch (error) {
      console.log(error);
      // TODO: Handle error depending on backend response
      setError('Wystąpił błąd');
    } finally {
      // setLoading(false);
    }
  };

  return (
    <FormContainer title="Logowanie" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label="Email"
        size="md"
        name="email"
        {...register('email', { required: true })}
        error={errors.email?.message}
      />
      <TextInput
        label="Hasło"
        size="md"
        name="password"
        type="password"
        {...register('password')}
        error={errors.password?.message}
      />
      <Button size="md" variant="primary">
        Zaloguj się
      </Button>
      <div className="mb-1 h-6 text-xs italic text-red-500">{error || ''}</div>
    </FormContainer>
  );
};
