import { WorkflowFormSchema } from '@/lib/Types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'

type Props = {
    title?: string
    subTitle?: string
}

const WorkflowForm = ({subTitle, title}: Props) => {

    const form = useForm<z.infer<typeof WorkflowFormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(WorkflowFormSchema),
        defaultValues: {
            name: '',
            description: '',
        }
    })

    const isLoading = form.formState.isLoading
    const router = useRouter()
    const handleSubmit = () => {}

  return (
    <Card className='w-full max-w-[650px] border-none'>
        {title && subTitle && (
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subTitle}</CardDescription>
            </CardHeader>
        )}
        <CardContent>
            <Form {...form}>
                <form className='flex flex-col gap-4 text-left' onSubmit={form.handleSubmit(handleSubmit)}>
                    <FormField
                        disabled={isLoading}
                        control={form.control}
                        name='name'
                        render={({field}) => {
                            return (
                                <FormItem>
                                    <FormLabel className='text-lg'>Workflow Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='Workflow Name' />
                                    </FormControl>
                                </FormItem>
                            )
                        }}
                    
                    />
                    <FormField
                        disabled={isLoading}
                        control={form.control}
                        name='description'
                        render={({field}) => {
                            return (
                                <FormItem>
                                    <FormLabel className='text-lg'>Workflow Description</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='Workflow Description' />
                                    </FormControl>
                                </FormItem>
                            )
                        }}
                    

                    />
                    <Button
                        className='mt-4'
                        disabled={isLoading}
                        type='submit'
                    >
                        {isLoading ? (<><Loader2 className='mr-2 h-4 w-4 animate-spin'/> Saving </>): 'Save Settings'}
                    </Button>
                </form>
            </Form>
        </CardContent>
    </Card>
  )
}

export default WorkflowForm