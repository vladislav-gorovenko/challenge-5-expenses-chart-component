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
        // let's make on click event for mobile screen to check out info for the day
        let dayContainerFilledEl = dayContainerEl.querySelector(".day-container-filled")
        dayContainerFilledEl.addEventListener("click", (e) => {
            if (e.view.innerWidth <= 530) {
                if (e.target.parentElement.classList.contains("selected")) {
                    e.target.parentElement.classList.remove("selected")
                } else {
                    document.querySelectorAll(".day-container-filled").forEach((item) => {
                        item.classList.remove("selected")
                        e.target.parentElement.classList.add("selected")
                    })
                }
            }
        })
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