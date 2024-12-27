import { Database } from "./database.types"
import { TrilingualContent } from "./languages"

export type Authority = {
    address: TrilingualContent<string> | null
    created_at: string | null
    district: Database["public"]["Enums"]["district"] | null
    id: string
    name: TrilingualContent<string> | null
    primary_contact_number: string | null
    primary_email: string | null
    secondary_contact_numbers: string[] | null
    secondary_emails: string[] | null
    updated_at: string | null
}