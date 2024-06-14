import { EditorCanvasCardType } from '@/lib/Types'
import { useEditor } from '@/providers/editor-provider'
import React, { useId, useMemo } from 'react'
import { Position, useNodeId } from 'reactflow'
import EditorCanvasIconHelper from './editor-canvas-card-icon-helper'
import CustomHandle from './custom-handle'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import clsx from 'clsx'

type Props = {}

const EditorCanvasCardSingle = ( {data}: {data: EditorCanvasCardType}) => {
    const {dispatch, state} = useEditor()
    const nodeId = useNodeId()
    const logo = useMemo(() => {
        return <EditorCanvasIconHelper type={data.type} />
    }, [data])

    const ids = useId()
    const cardHandleClick = (e: React.MouseEvent | React.TouchEvent ) => {
        e.stopPropagation()
        const val = state.editor.elements.find((n) => n.id === nodeId)
        if(val){
            dispatch({
                type: 'SELECTED_ELEMENT',
                payload: {
                    element: val
                }
            })
        }
    }
  return (
    <>
        {data.type !== 'Trigger' && data.type !== 'Google Drive' && (
            <CustomHandle
                type='target'
                position={Position.Top}
                style={{zIndex: 100 }}
            
            />
        )}
        <Card
            onClick={cardHandleClick}
            className='relative max-w-[400px] dark:border-muted-foreground/70'
        >
            <CardHeader
                className='flex flex-row items-center gap-4'
            >
                <div>
                    {logo}
                </div>
                <div>
                    <CardTitle className='text-md'>{data.title}</CardTitle>
                    <CardDescription>
                        <span className='text-xs text-muted-foreground/50'>
                            <b className=' text-muted-foreground/80'>ID: </b>
                            {nodeId}
                        </span>
                    </CardDescription>
                </div>
            </CardHeader>
            <Badge
                variant="secondary"
                className='absolute top-2 right-2'
            >
                {data.type}
            </Badge>
            <div
                className={clsx('absolute left-3 top-4 h-2 w-2 rounded-full',
                {
                    'bg-green-500': Math.random() < 0.6,
                    'bg-orange-500': Math.random() >= 0.6 && Math.random() < 0.8,
                    'bg-red-500': Math.random() >= 0.8
                }
                )}
            >

            </div>
        </Card>
        <CustomHandle
            type='source'
            position={Position.Bottom}
            id={ids}
        />

    </>
  )
}

export default EditorCanvasCardSingle