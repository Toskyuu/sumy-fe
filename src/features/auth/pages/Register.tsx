import { RegisterForm } from '@/features/auth/components/RegisterForm.tsx';

export const Register = () => {
  return (
    <>
      <h2 className="text-center text-3xl font-extrabold text-gray-900">Rejestracja</h2>
      <div className="mt-8 bg-white p-6 shadow sm:rounded-lg">
        <RegisterForm />
      </div>
    </>
  );
};
