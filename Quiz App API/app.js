// API url
const apiUrl = 'https://opentdb.com/api.php?amount=10'

// DOM Selectors

// Screens
const startScreen = document.querySelector('#start-screen')
const quizScreen = document.querySelector('#quiz-screen')
const resultScreen = document.querySelector('#result-screen')

// Buttons
const startBtn = document.querySelector('#start-btn')
const restartBtn = document.querySelector('#restart-btn')

// Rest of Dom Elements
const questionText = document.querySelector('#question')
const outOfQuestion = document.querySelector('#remaining-question')
const userScore = document.querySelector('#score')
const optionDiv = document.querySelector('#options-div')
const progressBar = document.querySelector('#progress-bar')
const userResult = document.querySelector('#result')
const resultMsg = document.querySelector('#result-msg')

// necessary variables
let currentQuestionIndex = 0
let score = 0
let answered = false
let quizData

// Get Quiz Data from API
async function getQuizData() {
  try {
    const res = await fetch(apiUrl)
    const data = await res.json()
    const { results } = data
    return results
  } catch (err) {
    console.log(err)
    alert('Something is Wrong!!!')
  }
}

// shuffle Option function
function shuffleOptions(correct, array) {
  const j = Math.floor(Math.random() * (array.length + 1))

  const shuffledArr = [...array]
  shuffledArr.splice(j, 0, correct)
  return shuffledArr
}

// Render the quiz questions and options
const renderQuestions = () => {
  const currentQuestion = quizData[currentQuestionIndex]
  const { question, correct_answer, incorrect_answers } = currentQuestion
  questionText.innerHTML = `${question}`
  outOfQuestion.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`
  userScore.textContent = `Score: ${score}`

  // adding option dynamically
  const options = shuffleOptions(correct_answer, incorrect_answers)
  options.forEach((option) => {
    const quizOption = document.createElement('p')
    quizOption.classList.add('option')
    quizOption.innerHTML = option
    optionDiv.appendChild(quizOption)
  })
  progressBar.value = (currentQuestionIndex / quizData.length) * 100
}

const resultScreenData = () => {
  userResult.textContent = `You Score ${score} out of ${quizData.length}`
  if (score === 10) {
    resultMsg.textContent = 'Perfect! Outstanding performance! 🎉'
  } else if (score === 9) {
    resultMsg.textContent = "Excellent work! You're almost perfect!"
  } else if (score === 8) {
    resultMsg.textContent = 'Great job! Keep up the good work!'
  } else if (score === 7) {
    resultMsg.textContent = "Well done! You're doing really well!"
  } else if (score === 6) {
    resultMsg.textContent = 'Nice effort! A little more practice will help.'
  } else if (score === 5) {
    resultMsg.textContent = 'Good attempt! Keep learning and improving.'
  } else if (score === 4) {
    resultMsg.textContent = "Keep practicing! You'll get better."
  } else if (score === 3) {
    resultMsg.textContent = "Don't give up! Practice makes perfect."
  } else if (score === 2) {
    resultMsg.textContent = 'Keep trying! Every attempt helps you learn.'
  } else if (score === 1) {
    resultMsg.textContent = "It's a start! Try again and you'll improve."
  } else {
    resultMsg.textContent = "Don't worry! Learn from your mistakes and try again."
  }
}

// Event Listener for toggle start screen to quiz screen
startBtn.addEventListener('click', async () => {
  quizData = await getQuizData()
  renderQuestions()
  startScreen.classList.toggle('hidden')
  quizScreen.classList.toggle('hidden')
})

restartBtn.addEventListener('click', () => {
  resultScreen.classList.toggle('hidden')
  startScreen.classList.toggle('hidden')
  score = 0
  currentQuestionIndex = 0
  optionDiv.innerHTML = ''
  answered = false
})

optionDiv.addEventListener('click', (e) => {
  e.preventDefault()
  if (answered) return
  if (e.target.closest('p') === null) {
    return
  }
  answered = true
  const currentQuestion = quizData[currentQuestionIndex]
  const { correct_answer, incorrect_answers } = currentQuestion

  if (e.target.closest('p').textContent === correct_answer) {
    score++
    e.target.style.backgroundColor = '#3fb950'
  } else {
    e.target.style.backgroundColor = '#f85149'
    const options = document.querySelectorAll('.option')
    options.forEach((option) => {
      if (option.textContent === correct_answer) {
        option.style.backgroundColor = '#3fb950'
      }
    })
  }

  currentQuestionIndex++

  if (currentQuestionIndex >= quizData.length) {
    setTimeout(() => {
      resultScreen.classList.toggle('hidden')
      quizScreen.classList.toggle('hidden')
      resultScreenData()
      answered = false // declare outside listener
    }, 1500)
  } else {
    setTimeout(() => {
      answered = false
      optionDiv.innerHTML = ''
      renderQuestions()
    }, 1500)
  }
})
