'use strict';

/**
 * Comment.js controller
 *
 * @description: A set of functions called "actions" for managing `Comment`.
 */

module.exports = {

  /**
   * Retrieve comment records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.comment.search(ctx.query);
    } else {
      return strapi.services.comment.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a comment record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.comment.fetch(ctx.params);
  },

  /**
   * Count comment records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.comment.count(ctx.query);
  },

  /**
   * Create a/an comment record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.comment.add(ctx.request.body);
  },

  /**
   * Update a/an comment record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.comment.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an comment record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.comment.remove(ctx.params);
  }
};
