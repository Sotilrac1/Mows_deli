import { menuSections as staticMenuSections } from '@/data/menu'
import { client } from '@/sanity/lib/client'
import { menuSectionsQuery } from '@/sanity/queries'

export async function getMenuSections() {
  try {
    const data = await client.fetch(menuSectionsQuery)
    if (data && data.length > 0) return data
    return staticMenuSections
  } catch {
    return staticMenuSections
  }
}
