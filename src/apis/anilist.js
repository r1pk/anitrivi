import { useQuery } from '@tanstack/react-query';
import { gql, request } from 'graphql-request';

import { normalizeEntryMedia } from '@/utils/normalize-entry-media';

const ENDPOINT = 'https://graphql.anilist.co';

export const useUsers = ({ searchTerm, limit = 6 }) => {
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
        { searchTerm: searchTerm, limit: limit }
      );

      return data.Page;
    },
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
        { userId: userId }
      );

      return Object.assign({}, data.MediaListCollection, {
        lists: data.MediaListCollection.lists.map((list) => ({
          name: list.name,
          entries: list.entries.map((entry) => ({
            mediaId: entry.mediaId,
            media: normalizeEntryMedia(entry.media),
          })),
        })),
      });
    },
    enabled: !!userId,
  });
};
