import {CogIcon, ControlsIcon, ErrorOutlineIcon, MenuIcon, SearchIcon, ImagesIcon, SquareIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'

const TITLE = 'Settings'
interface ProductOptions {
  title: string
}

export const settingsType = defineType({
  name: 'settings',
  title: TITLE,
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      default: true,
      name: 'navigation',
      title: 'Navigation',
      icon: MenuIcon,
    },
    {
      name: 'announcement-bar',
      title: 'Announcement Bar',
      icon: SquareIcon,
    },
    {
      name: 'productOptions',
      title: 'Product options',
      icon: ControlsIcon,
    },
    {
      name: 'logosIcon',
      title: 'Logo & icons',
      icon: ImagesIcon,
    },
    {
      name: 'notFoundPage',
      title: '404 page',
      icon: ErrorOutlineIcon,
    },
    {
      name: 'seo',
      title: 'SEO',
      icon: SearchIcon,
    },
  ],
  fields: [
    defineField({
      name: 'headerMenu',
      type: 'string',
      group: 'navigation',
      title: "Header Menu",
      description: 'Pass the handle/slug of menu from shopify admin',
    }),
    defineField({
      name: 'footerMenu',
      type: 'string',
      group: 'navigation',
      title: "Footer Menu",
      description: 'Pass the handle/slug of menu from shopify admin',
    }),
    defineField({
      name: 'announcementBarText',
      group: 'announcement-bar',
      title: "Announcement Bar Content",
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'textColor',
                type: 'object',
                title: 'Text Color',
                fields: [
                  {
                    name: 'hex',
                    type: 'string',
                    title: 'Hex Color',
                    validation: Rule => Rule.regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/)
                  }
                ]
              }
            ]
          }
        }
      ]
    }),
    defineField({
      name: 'customProductOptions',
      type: 'array',
      group: 'productOptions',
      of: [
        {
          name: 'customProductOption.color',
          type: 'customProductOption.color',
        },
        {
          name: 'customProductOption.size',
          type: 'customProductOption.size',
        },
      ],
      validation: (Rule) =>
        Rule.custom((options: ProductOptions[] | undefined) => {
          // Each product option type must have a unique title
          if (options) {
            const uniqueTitles = new Set(options.map((option) => option.title))
            if (options.length > uniqueTitles.size) {
              return 'Each product option type must have a unique title'
            }
          }
          return true
        }),
    }),
    defineField({
      name: 'logo',
      type: 'image',
      group: 'logosIcon',
      title: "Logo"
    }),
    // Not found page
    defineField({
      name: 'notFoundPage',
      title: '404 page',
      type: 'notFoundPage',
      group: 'notFoundPage',
    }),
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: TITLE,
      }
    },
  },
})
