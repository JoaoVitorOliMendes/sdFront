import { useForm } from 'react-hook-form'
import * as Form from '@radix-ui/react-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { string, z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setCredentials } from '../../features/auth/AuthSlice';
import { useLoginMutation } from '../../features/auth/AuthApiSlice'
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { useRegisterMutation } from '../../features/api/RegisterApiSlice';

const userSchema = z.object({
    username: string().min(1, { message: 'Username is required'}),
    password: string().min(1, { message: 'Password is required'}),
    confirmPassword: string().min(1, { message: 'You must confirm your password'})
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['confirmPassword']
    });
  }
})

export default function Register() {
    const navigate = useNavigate()
    const { register, control, handleSubmit, formState } = useForm({ resolver: zodResolver(userSchema) });
    const { errors } = formState

    const [login, { isLoading: loginLoading }] = useLoginMutation()
    const [apiRegister = (register), { isLoading: registerLoading }] = useRegisterMutation()
    const dispatch = useDispatch()

    const handleRegister = async (val) => {
        try {
            console.log({user: val.username, password: val.password});
            const registerData = apiRegister({user: val.username, pwd: val.password}).unwrap().catch((reason) => console.log(reason))
            console.log(registerData);
            // const userData = login({user: val.username, pwd: val.password}).unwrap().catch((reason) => console.log(reason))
            dispatch(setCredentials({...registerData, user: val.username}))
            navigate('/list')
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-950 to-red-700">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg flex items-center justify-center flex-col">
                <div className="flex items-center justify-between w-full mb-6">
                  <Link to="/login" className="lg:size-8 size-6 text-gray-500 hover:text-red-800">
                    <ArrowLeftIcon />
                  </Link>
                  <h1 className="text-3xl font-semibold justify-self-center">Register</h1>
                  <span></span>
                </div>
                <Form.Root onSubmit={ handleSubmit(handleRegister) } className='w-full'>
                    <Form.Field className="mb-4" name="username">
                        <div className="flex items-center justify-between">
                            <Form.Label className="text-gray-950 text-lg">Username</Form.Label>
                            <div className="text-right text-red-500">
                                {errors.username?.message}
                            </div>
                        </div>
                        <Form.Control asChild>
                            <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-700" {...register('username')} type="text" placeholder="Enter your username" />
                        </Form.Control>
                    </Form.Field>
                    <Form.Field className="mb-6" name="password">
                        <div className="flex items-center justify-between">
                            <Form.Label className="text-gray-950 text-lg">Password</Form.Label>
                            <div className="text-right text-red-500">
                                {errors.password?.message}
                            </div>
                        </div>
                        <Form.Control asChild>
                            <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-700" {...register('password')} type="password" placeholder="Enter your password" />
                        </Form.Control>
                    </Form.Field>
                    <Form.Field className="mb-6" name="confirmPassword">
                        <div className="flex items-center justify-between">
                            <Form.Label className="text-gray-950 text-lg">Confirm your password</Form.Label>
                            <div className="text-right text-red-500">
                                {errors.confirmPassword?.message}
                            </div>
                        </div>
                        <Form.Control asChild>
                            <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-700" {...register('confirmPassword')} type="password" placeholder="Confirm your password" />
                        </Form.Control>
                    </Form.Field>
                    <Form.Submit asChild>
                        <button className="w-full m-3 py-2 px-4 bg-gray-200 text-gray-500 font-semibold rounded-full shadow hover:bg-gray-900 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-gray-700">
                            Register
                        </button>
                    </Form.Submit>
                </Form.Root>
            </div>
        </div>
    )
}