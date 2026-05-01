import { UserRole } from "@prisma/client"

export type User = {
    id: string
    name: string
    email: string
    password: string
    role: UserRole
    phone?: string
    avatar?: string
}