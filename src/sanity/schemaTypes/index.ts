import { type SchemaTypeDefinition } from 'sanity'
import { menuItem } from './menuItem'
import { menuSection } from './menuSection'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [menuSection, menuItem],
}
