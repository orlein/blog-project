import { UsersLikeArticles } from '../models/UsersLikeArticles';
import { UsersLikeComments } from '../models/UsersLikeComments';
export abstract class LikeService {
  public static cancelArticleLikeDislike = (userId: number, articleId: number) => async (ldc: number): Promise<any> => {
    const userLikeArticle = await UsersLikeArticles.findOne({ where: { userId: userId, articleId: articleId }})
    if(userLikeArticle) {
      const likeOrDislike = userLikeArticle.likeOrDislike === ldc ? 0 : ldc;
      const result = await UsersLikeArticles.update(
        { likeOrDislike }, 
        { where: { 
          userId: userId, 
          articleId: articleId }
        })
      return result;
    } else {
      const result = await UsersLikeArticles.create<UsersLikeArticles>({
        userId,
        articleId,
        likeOrDislike: ldc
      })
      return result;
    }
  }

  public static cancelCommentLikeDislike = (userId: number, commentId: number) => async (ldc: number): Promise<any> => {
    const userLikeComment = await UsersLikeComments.findOne({ where: { userId: userId, commentId: commentId }})
    if(userLikeComment) {
      const likeOrDislike = userLikeComment.likeOrDislike === ldc ? 0 : ldc;
      const result = await UsersLikeArticles.update(
        { likeOrDislike }, 
        { where: { 
          userId: userId, 
          commentId: commentId }
        })
      return result;
    } else {
      const result = await UsersLikeArticles.create<UsersLikeArticles>({
        userId: userId,
        commentId: commentId,
        likeOrDislike: ldc
      })
      return result;
    }
  }
}