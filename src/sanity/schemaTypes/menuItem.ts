import { defineField, defineType } from 'sanity'

export const menuItem = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    defineField({
      name: 'nameFr',
      title: 'Nom (français)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nameEn',
      title: 'Name (English)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descriptionFr',
      title: 'Description (français)',
      type: 'text',
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description (English)',
      type: 'text',
    }),
    defineField({
      name: 'price',
      title: 'Prix (€)',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'section',
      title: 'Section',
      type: 'string',
      options: {
        list: ['sandwichs', 'charcuterie', 'fromages', 'accompagnements', 'desserts', 'vins-bieres', 'composez'],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dietary',
      title: 'Régimes alimentaires',
      type: 'array',
      of: [
        {
          type: 'string',
          options: { list: ['vegetarian', 'vegan', 'gluten-free'] },
        },
      ],
    }),
    defineField({
      name: 'available',
      title: 'Disponible',
      type: 'boolean',
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'orderRank',
      title: 'orderRank',
      type: 'number',
      hidden: true,
    }),
  ],
})
