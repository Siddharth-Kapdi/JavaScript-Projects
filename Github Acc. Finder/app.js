const inputName = document.querySelector('#input')
const searchBtn = document.querySelector('#search-btn')
const repoDiv = document.querySelector('.repositories-div')

const avatarImg = document.querySelector('#avatar')
const userName = document.querySelector('#user-name')
const userId = document.querySelector('#user-id')
const userBio = document.querySelector('#user-bio')
const userLocation = document.querySelectorAll('.user-location')
const userJoinDate = document.querySelector('#user-join-date')
const profileViewLink = document.querySelector('#view-profile')
const userFollowers = document.querySelector('#followers')
const userFollowing = document.querySelector('#following')
const userRepos = document.querySelector('#repos')
const userPortFolio = document.querySelector('#user-portfolio')
const userTwitter = document.querySelector('#user-twitter')

const apiUrl = 'https://api.github.com/users/'
const user = 'siddharth-kapdi'

const fetchUserData = async (usersName) => {
  const res = await fetch(apiUrl + usersName)
  if (!res.ok) throw new Error('User not found')
  const data = await res.json()
  return data
}

const dateFormatter = (date) => {
  const dateObj = new Date(date)
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short', // "Dec"
    day: 'numeric', // "23"
    year: 'numeric', // "2024"
  })
  return formatter.format(dateObj)
}

const renderUserData = async (usersName) => {
  try {
    const gitData = await fetchUserData(usersName)

    const {
      avatar_url,
      bio,
      created_at,
      followers,
      following,
      html_url,
      location,
      login,
      name,
      public_repos,
      repos_url,
      twitter_username,
      blog,
    } = gitData
    //

    avatarImg.src = avatar_url
    userName.textContent = name || 'Not Specified'
    userId.textContent = `@${login}` || 'Not Specified'
    userBio.textContent = bio || 'Not Specified'
    userLocation.forEach((item) => (item.textContent = location || 'Not Specified'))
    userJoinDate.textContent = dateFormatter(created_at)
    profileViewLink.href = html_url || 'Not Specified'
    userFollowers.textContent = followers
    userFollowing.textContent = following
    userRepos.textContent = public_repos
    userTwitter.textContent = `${twitter_username === null ? 'Not Specified' : '@' + twitter_username}`
    userPortFolio.textContent = blog === '' ? 'Not Specified' : blog

    //
    const res = await fetch(repos_url)
    const reposData = await res.json()

    repoDiv.innerHTML = ''
    reposData.forEach((repo, index) => {
      if (index <= 5) {
        return (repoDiv.innerHTML += `
          <div class="repo">
            <div class="repo-name-description">
              <h3><i class="fa-solid fa-code-branch"></i> <span id="repo-name">${repo.name}</span></h3>
                <p id="repo-description">${repo.description === null ? 'Not Specified' : repo.description}</p>
            </div>

            <div class="repo-details">
              <p><i class="fa-solid fa-circle"></i> <span id="repo-language">${repo.language === null ? 'Not Specified' : repo.language}</span></p>
              <p><i class="fa-solid fa-star"></i> <span id="repo-stars">${repo.stargazers_count}</span></p>
              <p><i class="fa-solid fa-code-fork"></i> <span id="repo-forks">${repo.forks_count}</span></p>
              <p><i class="fa-solid fa-clock-rotate-left"></i> <span id="repo-update-date">${dateFormatter(repo.updated_at)}</span></p>
            </div>
          </div>`)
      }
    })
  } catch (err) {
    return alert('User does not exists...')
  }
}

renderUserData(user)

searchBtn.addEventListener('click', async (e) => {
  e.preventDefault()
  if (!inputName.value.trim()) return
  await renderUserData(inputName.value)
  inputName.value = ''
})
