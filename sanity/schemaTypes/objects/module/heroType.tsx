import {defineArrayMember, defineField} from 'sanity'

export const heroType = defineField({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'href',
      type: 'url',
      title: 'URL',
    }),
    defineField({
      name: 'content',
      type: 'array',
      validation: (Rule) => Rule.max(1),
      of: [
        defineArrayMember({
          name: 'productWithVariant',
          type: 'productWithVariant',
        }),
        defineArrayMember({
          name: 'imageWithProductHotspots',
          type: 'imageWithProductHotspots',
        }),
      ],
    }),
  ],
})
