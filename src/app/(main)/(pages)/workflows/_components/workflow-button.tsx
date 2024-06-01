'use client'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'

type Props = {}

const WorkflowButton = (props: Props) => {
    const HandleClick = () => {

    }
  return (
    <Button
        size={'icon'}
        onClick={HandleClick}
        className='m-6'
    >
        <Plus/>
    </Button>
  )
}

export default WorkflowButton