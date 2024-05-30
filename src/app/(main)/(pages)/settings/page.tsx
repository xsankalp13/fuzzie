import { ProfileForm } from '@/components'
import React from 'react'
import ProfilePicture from './_components/profile-picture'
import { db } from '@/lib/db'

type Props = {}

const Settings = (props: Props) => {
  // const removeProfileImage = async () => {
  //   'use server'
  //   const response = await db.user.update({
  //     where: {
  //       clerkId: authUser.id,
  //     },
  //     data: {
  //       profileImage: '',
  //     }
  //   })
  //   return response
  // }
  return (
    <div className="flex flex-col gap-4 relative">
      <h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b">
        Settings
      </h1>
      <div className='flex flex-col gap-10 p-6'>
          <div>
            <h2 className='text-2xl font-bold'>
                User Profile
            </h2>
            <span className='text-base text-white/50'> Add or update your information</span>
          </div>
          {/* <ProfilePicture/> */}
          <ProfileForm/>
      </div>
    </div>
  )
}

export default Settings