export const queryAnimeListCompleted = `query($name: String) {
    MediaListCollection(userName: $name, type: ANIME, status: COMPLETED) {
        lists {
            entries {
                mediaId
                score(format: POINT_10_DECIMAL)
                media {
                    coverImage {
                        medium
                        large
                    }
                    title {
                        userPreferred
                    }
                }
            }
        }
    }
}`

export const queryAnimeListWatching = `query($name: String) {
    MediaListCollection(userName: $name, type: ANIME, status: CURRENT) {
        lists {
            entries {
                mediaId
                score(format: POINT_10_DECIMAL)
                media {
                    coverImage {
                        medium
                        large
                    }
                    title {
                        userPreferred
                    }
                }
            }
        }
    }
}`
