'use client'
import { EditUserProfileSchema } from '@/lib/Types';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { User } from '@prisma/client';

type Props = {
    user: any,
    onUpdate?: any
}

const ProfileForm = ({user, onUpdate}: Props) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const form = useForm<z.infer<typeof EditUserProfileSchema>>({
        mode: 'onChange',
        resolver: zodResolver(EditUserProfileSchema),
        defaultValues: {
            email: user.email ,
            name: user.name,
        }
    });
    const HandleClick = async (e:React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(prev => !prev);
    }
    const HandleSubmit =async (
        values: z.infer<typeof EditUserProfileSchema>
    ) => {
        setIsLoading(true)
        await onUpdate(values.name)
        setIsLoading(false)   
    }

    useEffect(() => {
        form.reset({name:user.name, email:user.email})
    }, [user])
  return (
    <Form {...form}>
        <form className='flex flex-col gap-6' onSubmit={form.handleSubmit(HandleSubmit)}>
            <FormField 
                disabled={isLoading} 
                control={form.control} 
                name='name'
                render={( { field }) => {
                    return (
                        <FormItem>
                            <FormLabel className='text-lg'>User full name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder='John Doe' />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )
                }}
            
            
            />
            <FormField 
                disabled={ true} 
                control={form.control} 
                name='email'
                render={( { field }) => {
                    return (
                        <FormItem>
                            <FormLabel className='text-lg'>Email</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder='johndoe@email.com' type='email'/>

                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )
                }
            }
            />
            <Button
                type='submit'
                className='self-start hover:bg-[#2F006B] hover:text-white'

            >
                {
                    isLoading ? (
                        <>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin '/> 
                            Saving User Settings
                        </>
                    ) : (
                        'Save User Settings'
                    )
                }
            </Button>
        </form>
    </Form>
  )
}

export default ProfileForm