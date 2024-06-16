import { ConnectionProviderProps } from '@/providers/connection-provider'
import { z } from 'zod'

export type PlanCardsProps = {
    title: string
    price: number
    description: string
    features: [string,string,string]
}

export const EditUserProfileSchema = z.object({
    email: z.string().email(),
    name: z.string().min(5, 'Required'),
})

export type ConnectionTypes = 'Google Drive' | 'Notion' | 'Slack' | 'Discord'

export type Connection = {
    title: ConnectionTypes
    description: string
    image: string
    connectionKey: keyof ConnectionProviderProps
    accessTokenKey?: string
    alwaysTrue?: boolean
    slackSpecial?:boolean
}

export const WorkflowFormSchema = z.object({
    name: z.string().min(5, 'Required'),
    description: z.string().min(5, 'Required'),
})

export type EditorCanvasTypes = 'Email' | 'Condition' | 'AI' | 'Slack' | 'Google Drive' | 'Notion' | 'Custom Webhook' | 'Google Calendar' | 'Trigger' | 'Action' | 'Wait';

export type EditorCanvasCardType = {
    title: string;
    description: string;
    completed: boolean;
    current: boolean;
    metadata: any;
    type: EditorCanvasTypes;
};

export type EditorNodeType = {
    id: string;
    type: EditorCanvasCardType['type']
    position: {
        x: number;
        y: number;
    };
    data: EditorCanvasCardType;
}


export type EditorNode = EditorNodeType;

export type EditorActions = 
    {
        type: 'LOAD_DATA'
        payload: {
            elements: EditorNode[]
            edges: {
                id: string
                source: string
                target: string
            }[]
        }
    }
    | 
    {
        type: 'ADD_NODE'
        payload: {
            elements: EditorNode[]
        }
    }
    |
    {
        type: 'REDO'
    }
    |
    {
        type: 'UNDO'
    }
    |
    {
        type: 'SELECTED_ELEMENT'
        payload: {
            element: EditorNode
        }
    }

export interface Option {
    value: string
    label: string
    disable?: boolean
    /** fixed option that can't be removed. */
    fixed?: boolean
    /** Group the options by providing key. */
    [key: string]: string | boolean | undefined
}

export interface GroupOption{
    [key: string]: Option[]
}

export const nodeMapper: Record<string, string> = {
    Notion: 'notionNode',
    'Google Drive': 'googleDriveNode',
    Slack: 'slackNode',
    Discord: 'discordNode',
}