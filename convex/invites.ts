import { mutation } from './_generated/server'
import { v } from 'convex/values'

export const addInvite = mutation({
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
