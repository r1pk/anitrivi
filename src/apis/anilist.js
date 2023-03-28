import { useQuery } from '@tanstack/react-query';
import { request, gql } from 'graphql-request';

const ENDPOINT = 'https://graphql.anilist.co';

export const useUsers = (searchTerm, limit = 6) => {
  return useQuery(
    ['users', searchTerm, limit],
    async () => {
      const data = await request(
        ENDPOINT,
        gql`
          query ($searchTerm: String, $limit: Int) {
            users: Page(perPage: $limit) {
              results: users(search: $searchTerm) {
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

      return data.users.results;
    },
    { enabled: !!searchTerm }
  );
};

export const useUserAnime = (userId) => {
  return useQuery(
    ['user', 'anime', userId],
    async () => {
      const data = await request(
        ENDPOINT,
        gql`
          query ($userId: Int) {
            user: MediaListCollection(userId: $userId, type: ANIME, status_in: [COMPLETED, REPEATING]) {
              lists {
                name
                entries {
                  mediaId
                  media {
                    title {
                      romaji
                      english
                    }
                    coverImage {
                      large
                    }
                    format
                    episodes
                    season
                    seasonYear
                    source(version: 3)
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

      return data.user.lists.map((list) => list.entries).flat();
    },
    { enabled: !!userId }
  );
};
