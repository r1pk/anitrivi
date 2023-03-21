class AniList {
  constructor() {
    this.url = 'https://graphql.anilist.co';
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  #request = async (query, variables) => {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ query, variables }),
    });
    const { data } = await response.json();

    return data;
  };

  getUserList = async (username, limit = 8) => {
    const query = `
      query ($username: String, $limit: Int) {
        users: Page(perPage: $limit) {
          results: users(search: $username) {
            id
            name
            avatar {
              large
            }
          }
        }
      }    
    `;

    const response = await this.#request(query, { username, limit });

    return response.users.results;
  };

  getUser = async (userId) => {
    const query = `
      query ($userId: Int) {
        user: User(id: $userId) {
          name
          avatar {
            large
          }
          statistics {
            anime {
              count
            }
          }
        }
      }
    `;

    const response = await this.#request(query, { userId });

    return response.user;
  };

  getUserAnimeList = async (userId) => {
    const query = `
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
              }
            }
          }
        }
      }
    `;

    const response = await this.#request(query, { userId });

    return response.user.lists.map((list) => list.entries).flat();
  };

  getAnime = async (animeId) => {
    const query = `
      query ($animeId: Int) {
        media: Media(id: $animeId, type: ANIME) {
          title {
            romaji
            english
          }
          cover: coverImage {
            medium
            large
          }
          genres
          episodes
          season
          startDate {
            year
          }
          studios(isMain: true) {
            nodes {
              name
            }
          }
        }
      }    
    `;

    const response = await this.#request(query, { animeId });

    return response.media;
  };
}

export default AniList;
