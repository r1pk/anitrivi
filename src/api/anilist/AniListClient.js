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

  getUserProfile = async (username) => {
    const query = `
      query ($username: String) {
        user: User(name: $username) {
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

    const response = await this.#request(query, { username });

    return response.user;
  };

  getCompletedAnime = async (username) => {
    const query = `
      query ($username: String) {
        user: MediaListCollection(userName: $username, type: ANIME, status_in: [COMPLETED, REPEATING]) {
          lists {
            name
            entries {
              id: mediaId
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

    const response = await this.#request(query, { username });

    return response.user.lists.map((list) => list.entries).flat();
  };

  getAnimeDetails = async (animeId) => {
    const query = `
      query ($id: Int) {
        media: Media(id: $id, type: ANIME) {
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

    const response = await this.#request(query, { id: animeId });

    return response.media;
  };
}

export default AniList;
