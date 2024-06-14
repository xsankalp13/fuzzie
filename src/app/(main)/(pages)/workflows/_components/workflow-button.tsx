'use client'
import WorkflowForm from '@/components/forms/workflow-form'
import CustomModal from '@/components/global/custom-modal'
import { Button } from '@/components/ui/button'
import { useModal } from '@/providers/modal-provider'
import { Plus } from 'lucide-react'
import React from 'react'

type Props = {}

const WorkflowButton = (props: Props) => {
    
  const { setOpen, setClose } = useModal()


  const HandleClick = () => {
        setOpen(
          <CustomModal
            title='Create a Workflow Automation'
            subHeading='Workflow are a powerfull that help you automate tasks.'
          
          >
            <WorkflowForm/>
          </CustomModal>
        )
    }
  return (
    <Button
        size={'icon'}
        onClick={HandleClick}
        // className='m-6'
    >
        <Plus/>
    </Button>
  )
}

export default WorkflowButton