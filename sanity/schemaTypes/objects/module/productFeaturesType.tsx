import {TagIcon} from '@sanity/icons'
import pluralize from 'pluralize-esm'
import {defineField} from 'sanity'

export const productFeaturesType = defineField({
  name: 'products',
  title: 'Products',
  type: 'object',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'products',
      type: 'array',
      of: [{type: 'productReference'}],
    }),
    defineField({
      name: 'layout',
      type: 'string',
      initialValue: 'card',
      options: {
        direction: 'horizontal',
        layout: 'radio',
        list: [
          {
            title: 'Cards (large)',
            value: 'card',
          },
          {
            title: 'Pills (small)',
            value: 'pill',
          },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      products: 'products',
    },
    prepare({products}) {
      return {
        subtitle: 'Products',
        title: products.length > 0 ? pluralize('product', products.length, true) : 'No products',
        media: TagIcon,
      }
    },
  },
})
