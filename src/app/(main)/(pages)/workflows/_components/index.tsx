import React from 'react'
import Workflow from './workflow'

type Props = {}

const Workflows = (props: Props) => {
  return (
    <div className='relative flex flex-col gap-4'>
        <section className='flex flex-col gap-4 m-2'>
            <Workflow name='Workflow 1' description='This is a description' id='ejesi23' publish={false}/>
        </section>
    </div>
  )
}

export default Workflows