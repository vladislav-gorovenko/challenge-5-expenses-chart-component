let weeklySpendingsContainer = document.querySelector(".weekly-spendings-container")

async function fetchInfo() {
    let res = await fetch("./data.json")
    let data = await res.json()
    createDays(data)
}

// let someText = 

function createDays(data) {
    let {c, d} = largestAmountDayCoefficientAndDay(data)
    data.forEach(({day, amount}) => {
        let dayContainerEl = document.createElement("div")
        dayContainerEl.className = "day-container"
        if (day == d) {
            dayContainerEl.className  = "day-container maximum"
        }
        dayContainerEl.innerHTML = `<div class="day-container-filling-part">
        <div class="day-container-filled" style="height: ${c*amount}%">
            <div><p class="day-container-info">$${amount}</p></div>
        </div>
        </div>
        <p class="day-container-title">${day}</p>
        `
        weeklySpendingsContainer.appendChild(dayContainerEl)
    })
}

function largestAmountDayCoefficientAndDay(data) {
    let largestAmount = 0
    let largestAmountDay = "mon"
    data.forEach(({day, amount}) => {
        if (amount > largestAmount) {
            largestAmount = amount
            largestAmountDay = day
        }
    })
    return ({c: 100/largestAmount, d: largestAmountDay})
}

fetchInfo()

// createNewDayContainerElement("hey")