const startBtn = document.querySelector('#start-btn')
const questionText = document.querySelector('#question')
const remainingQuestion = document.querySelector('#remaining-question')
const userScore = document.querySelector('#score')
const optionsDiv = document.querySelector('#options-div')
const endResult = document.querySelector('#result')
const resultMsg = document.querySelector('#result-msg')
const restartBtn = document.querySelector('#restart-btn')
const progressBar = document.querySelector('#progress-bar')
const startScreen = document.querySelector('#start-screen')
const quizScreen = document.querySelector('#quiz-screen')
const resultScreen = document.querySelector('#result-screen')

const quizQuestions = [
  {
    question: 'What is the capital of France?',
    answers: [
      { text: 'London', correct: false },
      { text: 'Berlin', correct: false },
      { text: 'Paris', correct: true },
      { text: 'Madrid', correct: false },
    ],
  },
  {
    question: 'Which planet is known as the Red Planet?',
    answers: [
      { text: 'Venus', correct: false },
      { text: 'Mars', correct: true },
      { text: 'Jupiter', correct: false },
      { text: 'Saturn', correct: false },
    ],
  },
  {
    question: 'What is the largest ocean on Earth?',
    answers: [
      { text: 'Atlantic Ocean', correct: false },
      { text: 'Indian Ocean', correct: false },
      { text: 'Arctic Ocean', correct: false },
      { text: 'Pacific Ocean', correct: true },
    ],
  },
  {
    question: 'Which of these is NOT a programming language?',
    answers: [
      { text: 'Java', correct: false },
      { text: 'Python', correct: false },
      { text: 'Banana', correct: true },
      { text: 'JavaScript', correct: false },
    ],
  },
  {
    question: 'What is the chemical symbol for gold?',
    answers: [
      { text: 'Go', correct: false },
      { text: 'Gd', correct: false },
      { text: 'Au', correct: true },
      { text: 'Ag', correct: false },
    ],
  },
  {
    question: 'Who wrote the play "Romeo and Juliet"?',
    answers: [
      { text: 'Charles Dickens', correct: false },
      { text: 'William Shakespeare', correct: true },
      { text: 'Jane Austen', correct: false },
      { text: 'Mark Twain', correct: false },
    ],
  },
  {
    question: 'What is the capital city of Japan?',
    answers: [
      { text: 'Seoul', correct: false },
      { text: 'Beijing', correct: false },
      { text: 'Tokyo', correct: true },
      { text: 'Kyoto', correct: false },
    ],
  },
  {
    question: 'Which gas do plants absorb from the atmosphere?',
    answers: [
      { text: 'Oxygen', correct: false },
      { text: 'Nitrogen', correct: false },
      { text: 'Carbon Dioxide', correct: true },
      { text: 'Hydrogen', correct: false },
    ],
  },
  {
    question: 'Which is the largest mammal in the world?',
    answers: [
      { text: 'African Elephant', correct: false },
      { text: 'Blue Whale', correct: true },
      { text: 'Giraffe', correct: false },
      { text: 'Hippopotamus', correct: false },
    ],
  },
  {
    question: 'How many continents are there on Earth?',
    answers: [
      { text: '5', correct: false },
      { text: '6', correct: false },
      { text: '7', correct: true },
      { text: '8', correct: false },
    ],
  },
]

let currentQuestionIndex = 0
let score = 0
let answered = false // declare outside listener

const renderQuestions = () => {
  const currentQuestion = quizQuestions[currentQuestionIndex]
  questionText.textContent = currentQuestion.question
  remainingQuestion.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`
  userScore.textContent = `Score: ${score}`

  for (let i = 0; i < currentQuestion.answers.length; i++) {
    const option = document.createElement('p')
    option.classList.add('option')
    option.textContent = currentQuestion.answers[i].text
    optionsDiv.append(option)
  }
  progressBar.value = (currentQuestionIndex / quizQuestions.length) * 100
}

const resultScreenData = () => {
  endResult.textContent = `You Score ${score} out of ${quizQuestions.length}`
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

startBtn.addEventListener('click', () => {
  quizScreen.classList.toggle('hidden')
  startScreen.classList.toggle('hidden')
  renderQuestions()
})

restartBtn.addEventListener('click', () => {
  resultScreen.classList.toggle('hidden')
  startScreen.classList.toggle('hidden')
  score = 0
  currentQuestionIndex = 0
  optionsDiv.innerHTML = ''
  answered = false // declare outside listener
})

optionsDiv.addEventListener('click', (e) => {
  e.preventDefault()
  if (answered) return
  if (e.target.closest('p') === null) {
    return
  }
  answered = true

  const currentQuestion = quizQuestions[currentQuestionIndex]
  const userChoice = currentQuestion.answers.find(
    (item) => item.text === e.target.closest('p').textContent
  )

  if (userChoice?.correct) {
    score++
    e.target.style.backgroundColor = '#3fb950'  
  } else {
    e.target.style.backgroundColor = '#f85149'
    const correctAns = currentQuestion.answers.find((item) => item.correct === true)
    document.querySelectorAll('.option').forEach((option) => {
      if (option.textContent === correctAns.text) {
        option.style.backgroundColor = '#3fb950'
      }
    })
  }

  currentQuestionIndex++

  if (currentQuestionIndex >= quizQuestions.length) {
    setTimeout(() => {
      resultScreen.classList.toggle('hidden')
      quizScreen.classList.toggle('hidden')
      resultScreenData()
    }, 1500)
  } else {
    setTimeout(() => {
      answered = false // declare outside listener
      optionsDiv.innerHTML = ''
      renderQuestions()
    }, 1500)
  }
})
