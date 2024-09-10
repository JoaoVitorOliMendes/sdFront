import './Login.css';
import { useForm } from 'react-hook-form'
import * as Form from '@radix-ui/react-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { string, z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setCredentials } from '../../features/auth/AuthSlice';
import { useLoginMutation } from '../../features/auth/AuthApiSlice'

const userSchema = z.object({
    username: string().min(1, { message: 'Username is required'}),
    password: string().min(1, { message: 'Password is required'})
})

export default function Login() {
    const navigate = useNavigate()
    const { register, control, handleSubmit, formState } = useForm({ resolver: zodResolver(userSchema) });
    const { errors } = formState

    const [login, { isLoading }] = useLoginMutation()
    const dispatch = useDispatch()

    const handleLogin = async (val) => {
        try {
            login({user: val.username, pwd: val.password})
                .unwrap()
                .then((val) => {
                    dispatch(setCredentials({...val, user: val.username}))
                    navigate('/list')
                })
                .catch((reason) => console.log(reason))
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-950 to-red-700">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg flex items-center justify-center flex-col">
                <h1 className="text-3xl font-semibold mb-6">Login</h1>
                <Form.Root onSubmit={ handleSubmit(handleLogin) } className='w-full'>
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
                    <Form.Submit asChild>
                        <button className="w-full m-3 py-2 px-4 bg-gray-200 text-gray-500 font-semibold rounded-full shadow hover:bg-gray-900 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-gray-700">
                            Login
                        </button>
                    </Form.Submit>
                </Form.Root>
                <Link to="/cadastro" className="text-gray-500 hover:text-red-800">Create new account</Link>
            </div>
        </div>
    )
}