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