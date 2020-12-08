import { queryAnimeListCompleted, queryAnimeListWatching } from './graphql/userList.js'
import { queryUserProfile } from './graphql/userProfile.js'

const variables = {
    name: 'Lewlewonics'
}

const user = {
    name: variables.name,
    completed: [],
    watching: [],
    avatar: '',
    banner: ''
}

async function GetUserAnimeListCompleted() {
    const url = 'https://graphql.anilist.co'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            query: queryAnimeListCompleted,
            variables
        })
    }
    const res = await fetch(url, options)
    const data = await res.json()
    user.completed = data.data.MediaListCollection.lists[0].entries
}

async function GetUserAnimeListWatching() {
    const url = 'https://graphql.anilist.co'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            query: queryAnimeListWatching,
            variables
        })
    }
    const res = await fetch(url, options)
    const data = await res.json()
    user.watching = data.data.MediaListCollection.lists[0].entries
}

async function GetUserProfile() {
    const header__avatar = document.querySelector('.header__avatar-img')
    const header__background = document.querySelector('.header__background')
    const url = 'https://graphql.anilist.co'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            query: queryUserProfile,
            variables
        })
    }
    const res = await fetch(url, options)
    const data = await res.json()
    user.avatar = data.data.User.avatar.large
    user.banner = data.data.User.bannerImage
    header__avatar.src = user.avatar
    header__background.src = user.banner
}

function CreateAnimeListCompleted() {
    let listElement = document.querySelector('.completed')
    user.completed.forEach(anime => {
        listElement.innerHTML += `
        <div class="list__show-container">
            <a href='https://anilist.co/anime/${anime.mediaId}' target="_blank">
                <img loading="lazy" src="${anime.media.coverImage.large}" alt="anime_cover" class="list__show-img" />
                <p class="list__show-rating>${anime.score}</p>
            </a>
        </div>
    `
    })
}

function CreateAnimeListWatching() {
    let listElement = document.querySelector('.watching')
    user.watching.forEach(anime => {
        listElement.innerHTML += `
        <div class="list__show-container">
            <a href='https://anilist.co/anime/${anime.mediaId}' target="_blank">
                <img loading="lazy" src="${anime.media.coverImage.large}" alt="anime_cover" class="list__show-img" />
                <p class="list__show-rating>${anime.score}</p>
            </a>
        </div>
    `
    })
}

async function main() {
    await GetUserAnimeListCompleted().catch(err => console.error(`User "${variables.name}" does not exist ${err}`))
    await GetUserAnimeListWatching()
    await GetUserProfile().catch(err => console.error(`User "${variables.name}" does not exist ${err}`))
    CreateAnimeListCompleted()
    CreateAnimeListWatching()
}

main()
