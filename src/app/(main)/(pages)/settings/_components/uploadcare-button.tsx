'use client'
import React from 'react'
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';

type Props = {}

const UploadCareButton = (props: Props) => {
  return (
    <>
        <FileUploaderRegular pubkey="3f7a4f3505ae5616b4c4" />
    </>
  )
}

export default UploadCareButton