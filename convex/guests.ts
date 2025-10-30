import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

const addGuest = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    isComing: v.boolean(),
    totalKids: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('guests', {
      firstName: args.firstName,
      lastName: args.lastName,
      isComing: args.isComing,
      totalKids: args.totalKids,
    })
  },
})

const getGuests = query({
  handler: async (ctx) => {
    return await ctx.db.query('guests').collect()
  },
})

export { addGuest, getGuests }
