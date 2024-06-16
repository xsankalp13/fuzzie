'use server'

import { db } from "@/lib/db"

export const onCreateNodeEdges = async (
    flowId: string,
    nodes: string,
    edges: string,
    flowPath: string
) => {
    try {
        const flow = await db.workflows.update({
            where: {
                id: flowId
            },
            data: {
                nodes,
                edges,
                flowPath: flowPath
            }
    
        })
        if (flow) return { message: 'Flow Saved Successfully' }
    } catch (error) {
        return { message: 'Failed to save flow 501' }
    }
    
}

export const onFlowPublish = async (workFlowId: string, state: boolean) => {
    console.log(state)
    try {
        const published = await db.workflows.update({
            where: {
                id: workFlowId,
            },
            data: {
                publish: state,
            }
        })
        if (published) return { message: 'Flow Published Successfully' }
        return { message: 'WorkFlow UnPublished 501' }
    } catch (error) {
        return { message: 'Failed to publish flow 501' }
    }
}