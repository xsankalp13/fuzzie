import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { discord, googleDrive, notion } from '../../../../../../public'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

type Props = {
    name: string
    description: string
    id: string
    publish: boolean | undefined
}

const Workflow = ({name,description,id,publish}: Props) => {
  return (
    <Card className='flex w-full items-center justify-between'>
        <CardHeader className='flex flex-row gap-2'>
            <Link
                href={`/workflows/editor/${id}`}
            >
                <div className='flex flex-row gap-2'>
                    <Image
                        src={googleDrive}
                        alt='google drive'
                        width={30}
                        height={30}
                        className='object-contain'
                    />
                    <Image
                        src={notion}
                        alt='notion'
                        width={30}
                        height={30}
                        className='object-contain'
                    />
                    <Image
                        src={discord}
                        alt='discord'
                        width={30}
                        height={30}
                        className='object-contain'
                    />
                </div>
                <div>
                    <CardTitle className='text-lg'> {name}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
            </Link>
        </CardHeader>
        <div className='flex flex-col items-center gap-2 p-4'>
            <Label htmlFor='airplane-mode' className=' text-muted-foreground'>
                On
            </Label>
            <Switch
                id='airplane-mode'
                // onClick={() => {}}
                // defaultChecked={publish}
            />
        </div>
    </Card>
  )
}

export default Workflow