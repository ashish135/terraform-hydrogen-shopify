
import {defineField} from 'sanity'
import {SquareIcon} from '@sanity/icons'

export const featuredProduct = defineField({
  name: 'FeaturedProduct',
  title: 'Featured Product',
  type: 'document',
  icon: SquareIcon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }],
      description: 'Select the product you want to feature.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      productTitle: 'product.store.title',
      media: 'product.mainImage',
    },
    prepare({ title, productTitle, media }) {
      return {
        title: title || 'No Title',
        subtitle: productTitle ? productTitle : 'No product selected',
        media: media,
      };
    },
  },
})
