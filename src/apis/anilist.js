import { useQuery } from '@tanstack/react-query';
import { request, gql } from 'graphql-request';

const ENDPOINT = 'https://graphql.anilist.co';

export const useUsers = ({ searchTerm, limit = 6, placeholderData }) => {
  return useQuery({
    queryKey: ['users', searchTerm, limit],
    queryFn: async () => {
      const data = await request(
        ENDPOINT,
        gql`
          query getUsers($searchTerm: String, $limit: Int) {
            Page(perPage: $limit) {
              users(search: $searchTerm) {
                id
                name
                avatar {
                  large
                }
              }
            }
          }
        `,
        { searchTerm, limit }
      );

      return data.Page;
    },
    placeholderData: placeholderData,
    enabled: !!searchTerm,
  });
};

export const useUserProfile = ({ userId }) => {
  return useQuery({
    queryKey: ['user', 'profile', userId],
    queryFn: async () => {
      const data = await request(
        ENDPOINT,
        gql`
          query getUserProfile($userId: Int) {
            MediaListCollection(userId: $userId, type: ANIME, status_in: [COMPLETED, REPEATING]) {
              user {
                id
                name
                avatar {
                  large
                }
              }
              lists {
                name
                entries {
                  mediaId
                  media {
                    id
                    title {
                      romaji
                      english
                      native
                    }
                    coverImage {
                      large
                    }
                    bannerImage
                    format
                    episodes
                    averageScore
                    season
                    seasonYear
                    source(version: 3)
                    genres
                    studios {
                      edges {
                        isMain
                        node {
                          id
                          name
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        { userId }
      );

      return data.MediaListCollection;
    },
    enabled: !!userId,
  });
};
