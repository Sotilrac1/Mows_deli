import { menuSections as staticMenuSections, type MenuSection } from '@/data/menu'
import { client } from '@/sanity/lib/client'
import { menuSectionsQuery } from '@/sanity/queries'

export async function getMenuSections(): Promise<MenuSection[]> {
  try {
    const data = await client.fetch(menuSectionsQuery)
    if (data && data.length > 0) return data as MenuSection[]
    return staticMenuSections
  } catch {
    return staticMenuSections
  }
}
