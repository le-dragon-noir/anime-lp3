import { ApiSourceEnum } from "../enums/ApiSourceEnum"
import { userActionForPost } from "./UserAction"
import { chunkArray } from "../utils/ArrayUtils"

const apiSource = ApiSourceEnum.ANILIST

export async function getTenNewestThreads (page) {
  const query = `
  query {
    Page(page: ${page}, perPage: 20) {
      threads(sort: CREATED_AT_DESC) {
        id
        title
        createdAt
        user {
          id
          name
          avatar {
            medium
          }
        }
      }
    }
  }
  `
  const response = await userActionForPost(apiSource, { query }) 
  return response.data.Page.threads
}

export async function getStarterMedias(page) {
  const query = `
  query {
    Page(page: ${page}, perPage: 8) {
      media {
        id
        title {
          romaji
          english
          native
          userPreferred
        }
        coverImage {
          extraLarge
          large
          medium
          color
        }
        bannerImage
      }
    }
  }
  `
  const response = await userActionForPost(apiSource, { query }) 
  return chunkArray(response.data.Page.media, 2)
}

export async function getTopReviews(page) {
  const query = `
  query {
    Page(page: ${page}, perPage: 20) {
      reviews(sort: RATING_DESC) {
        id
        rating
        summary
        body
        media {
          id
          title {
            romaji
          }
          coverImage {
            medium
          }
        }
      }
    }
  }
  `
  const response = await userActionForPost(apiSource, { query }) 
  return response.data.Page.reviews
}