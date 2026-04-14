import { defineField, defineType } from 'sanity'

export const menuSection = defineType({
  name: 'menuSection',
  title: 'Section du menu',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'Identifiant',
      type: 'slug',
      options: { source: 'titleFr' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleFr',
      title: 'Titre (français)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'orderRank',
      title: "Ordre d'affichage",
      type: 'number',
    }),
  ],
})
