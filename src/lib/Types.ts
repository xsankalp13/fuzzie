import { z } from 'zod'

export type PlanCardsProps = {
    title: string
    price: number
    description: string
    features: [string,string,string]
}

export const EditUserProfileSchema = z.object({
    email: z.string().email('Required'),
    name: z.string().min(5, 'Required'),
})