import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs } from '@/components/ui/tabs'
import { EditorCanvasTypes, EditorNodeType } from '@/lib/Types'
import { CONNECTIONS, EditorCanvasDefaultCardTypes } from '@/lib/constants'
import { useNodeConnections } from '@/providers/connection-provider'
import { useEditor } from '@/providers/editor-provider'
import { TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import React from 'react'
import EditorCanvasIconHelper from './editor-canvas-card-icon-helper'
import { onDragStart } from '@/lib/editor-utils'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import RenderConnectionsAccordion from './render-connections-accordion'
import RenderOutputAccordion from './render-output-accordion'

type Props = {
    nodes: EditorNodeType[]
}

const EditorCanvasSidebar = ({nodes}: Props) => {
    const {state} = useEditor();
    const {nodeConnection } = useNodeConnections();

  return (
    <aside>
        <Tabs
            defaultValue='actions'
            className='h-screen overflow-scroll pb-24'
        >
            <TabsList className='flex gap-4 p-4 bg-transparent'>
                <TabsTrigger value='actions'>Actions</TabsTrigger>
                <TabsTrigger value='settings'>Settings</TabsTrigger>
            </TabsList>
            <Separator/>
            <TabsContent
                value='actions'
                className='flex flex-col gap-4 p-4'
            >
                {Object.entries(EditorCanvasDefaultCardTypes)
            .filter(
              ([_, cardType]) =>
                (!nodes.length && cardType.type === 'Trigger') ||
                (nodes.length && cardType.type === 'Action')
            )
            .map(([cardKey, cardValue]) => (
              <Card
                key={cardKey}
                draggable
                className="w-full cursor-grab border-black bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900"
                onDragStart={(event) =>
                  onDragStart(event, cardKey as EditorCanvasTypes)
                }
              >
                <CardHeader className="flex flex-row items-center gap-4 p-4">
                  <EditorCanvasIconHelper type={cardKey as EditorCanvasTypes} />
                  <CardTitle className="text-md">
                    {cardKey}
                    <CardDescription>{cardValue.description}</CardDescription>
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
            </TabsContent>
            <TabsContent
                value='settings'
                className='-mt-6'
            >
                <div className='px-2 py-4 text-center text-xl font-bold'>
                     {state.editor.selectedNode.data.title}
                </div>
                <Accordion type='multiple'>
                    <AccordionItem
                        value='Options'
                        className='border-y-[1px] px-2'
                    >
                        <AccordionTrigger className=' !no-underline'>
                            Account
                        </AccordionTrigger>
                        <AccordionContent>
                            {CONNECTIONS.map((connection) => (
                                <RenderConnectionsAccordion
                                    key={connection.title}
                                    state={state}
                                    connection={connection}
                                />
                            ))}
                        </AccordionContent>

                    </AccordionItem>
                    <AccordionItem
                        value='Expected Output'
                        className='px-2'
                    >   
                        <AccordionTrigger className=' !no-underline'>
                            Action
                        </AccordionTrigger>
                        <RenderOutputAccordion
                            state={state}
                            nodeConnection={nodeConnection}
                        />
                    </AccordionItem>
                </Accordion>
            </TabsContent>
        </Tabs>
    </aside>
  )
}

export default EditorCanvasSidebar