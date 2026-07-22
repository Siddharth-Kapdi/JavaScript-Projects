const totalBalance = document.querySelector('#balance')
const totalIncome = document.querySelector('#income')
const totalExpense = document.querySelector('#expense')

const showTransactionDiv = document.querySelector('.all-transactions')
const inputDescription = document.querySelector('#description')
const inputAmount = document.querySelector('#amount')

const submitBtn = document.querySelector('#add-transaction-btn')

// data getting from localStorage
const dataStoreInLocal = () => {
  const amount = parseFloat(inputAmount.value)
  const description = inputDescription.value

  if (isNaN(amount) || description.trim() === '') {
    alert('Please fill the nessaccary details')
    return
  }

  const transaction = {
    description,
    amount,
  }
  const TransactionData = JSON.parse(localStorage.getItem('transactions')) || []
  TransactionData.unshift(transaction)
  localStorage.setItem('transactions', JSON.stringify(TransactionData))
}

// render transactions
const renderTransactions = () => {
  const TransactionData = JSON.parse(localStorage.getItem('transactions')) || []

  const expenseData = TransactionData.filter((item) => item.amount < 0)
  const incomeData = TransactionData.filter((item) => item.amount > 0)

  const totalEx = expenseData.reduce((acc, item) => (acc += item.amount), 0)
  const totalIn = incomeData.reduce((acc, item) => (acc += item.amount), 0)
  const totalBal = TransactionData.reduce((acc, item) => (acc += item.amount), 0)

  console.log(totalEx, totalIn, totalBal)

  totalBalance.textContent = `$${totalBal}`
  totalIncome.textContent = `$${totalIn}`
  totalExpense.textContent = `$${String(totalEx).replace(/-/, '')}`

  showTransactionDiv.innerHTML = ''

  TransactionData.forEach((item, index) => {
    const transactionDiv = document.createElement('div')
    transactionDiv.classList.add('transaction')
    transactionDiv.dataset.index = index
    if (item.amount < 0) {
      transactionDiv.style.borderRight = '.3rem solid #f87171'
    } else {
      transactionDiv.style.borderRight = '.3rem solid #4ade80'
    }

    transactionDiv.innerHTML = `<div class="transaction-details">
                <p id="t-description">${item.description}</p>
                <p id="t-amount">$${item.amount}</p>
              </div>
              <span class="remove-btn">❌</span>`
    showTransactionDiv.append(transactionDiv)
  })
}

renderTransactions()

submitBtn.addEventListener('click', (e) => {
  e.preventDefault()
  dataStoreInLocal()
  renderTransactions()
  inputAmount.value = ''
  inputDescription.value = ''
})

showTransactionDiv.addEventListener('click', (e) => {
  if (!e.target.closest('.remove-btn')) return // ignore clicks that aren't on delete

  e.preventDefault()

  e.target.closest('.transaction').remove()

  const TransactionData = JSON.parse(localStorage.getItem('transactions')) || []

  const index = Number(e.target.closest('[data-index]').dataset.index)
  TransactionData.splice(index, 1)

  localStorage.setItem('transactions', JSON.stringify(TransactionData))

  renderTransactions()
})
