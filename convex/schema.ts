import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  guests: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    isComing: v.boolean(),
    age: v.optional(v.int64())
  })
})