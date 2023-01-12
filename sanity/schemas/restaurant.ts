import {defineType} from 'sanity'

export default defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'short_description',
      type: 'string',
      title: 'Short description',
      //max 200 chars
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image of the Restaurant',
    },
    {
      name: 'lat',
      type: 'number',
      title: 'Latitude of the Restaurant',
    },
    {
      name: 'long',
      type: 'number',
      title: 'Longitude of the Restaurant',
    },
    {
      name: 'address',
      type: 'string',
      title: 'Restaurant address',
      validation(rule) {
        return rule.required()
      },
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Enter a rating from (1-5 Stars)',
      validation: (rule) =>
        rule.required().min(1).max(5).error('Please enter a value between 1 and 5'),
    },
    {
      name: 'type',
      title: 'Category',
      validation: (rule) => rule.required(),
      type: 'reference',
      to: [{type: 'category'}],
    },
    {
      name: 'dishes',
      type: 'array',
      title: 'Dishes',
      of: [{type: 'reference', to: [{type: 'dish'}]}],
    },
  ],
})
