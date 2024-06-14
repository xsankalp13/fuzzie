'use client'
import { EditorCanvasCardType, EditorNodeType } from '@/lib/Types';
import { useEditor } from '@/providers/editor-provider';
import React, { useCallback, useMemo } from 'react'
import ReactFlow, { ReactFlowInstance } from 'reactflow';
import 'reactflow/dist/style.css';
import EditorCanvasCardSingle from './editor-canvas-card-single';
import { toast } from 'sonner';
import { usePathname } from 'next/navigation';
import { EditorCanvasDefaultCardTypes } from '@/lib/constants';
import { v4 } from 'uuid';
type Props = {}

const initialNodes: EditorNodeType[] = []

const initialEdges: { id: string; source: string; target: string }[] = []

const EditorCanvas = (props: Props) => {
    const { dispatch, state } = useEditor();
    const [reactFlowInstance, setReactFlowInstance] = React.useState<ReactFlowInstance>()
    const pathname = usePathname()
    
    const onDrop = useCallback(
      (event: any) => {
        event.preventDefault()
  
        const type: EditorCanvasCardType['type'] = event.dataTransfer.getData(
          'application/reactflow'
        )
  
        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
          return
        }
  
        const triggerAlreadyExists = state.editor.elements.find(
          (node) => node.type === 'Trigger'
        )
  
        if (type === 'Trigger' && triggerAlreadyExists) {
          toast('Only one trigger can be added to automations at the moment')
          return
        }
  
        // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
        // and you don't need to subtract the reactFlowBounds.left/top anymore
        // details: https://reactflow.dev/whats-new/2023-11-10
        if (!reactFlowInstance) return
        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        })
  
        const newNode = {
          id: v4(),
          type,
          position,
          data: {
            title: type,
            description: EditorCanvasDefaultCardTypes[type].description,
            completed: false,
            current: false,
            metadata: {},
            type: type,
          },
        }
        //@ts-ignore
        setNodes((nds) => nds.concat(newNode))
      },
      [reactFlowInstance, state]
    )


    const nodeTypes = useMemo(() => ({
        Action: EditorCanvasCardSingle,
        Trigger: EditorCanvasCardSingle,
        Email: EditorCanvasCardSingle,
        Condition: EditorCanvasCardSingle,
        AI: EditorCanvasCardSingle,
        Slack: EditorCanvasCardSingle,
        'Google Drive': EditorCanvasCardSingle,
        Notion: EditorCanvasCardSingle,
        Discord: EditorCanvasCardSingle,
        'Custom Webhook': EditorCanvasCardSingle,
        'Google Calendar': EditorCanvasCardSingle,
        Wait: EditorCanvasCardSingle,

    }), [])
  return (
    <></>
  )
}

export default EditorCanvas