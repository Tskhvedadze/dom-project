const INITIAL_DATE = new Date('December 5, 2022')

const AVERAGE_TOTAL_SCORES = document.getElementById('average-score')
const ADD_DAY_TABLE = document.getElementById('add-day-table-body')
const ADD_GRADE_ROW = document.querySelectorAll('.add-grade-row')
const ADD_BTN = document.getElementById('add-day')
const REMOVE_BTN = document.getElementById('remove-day')
let daysAmount = 0

ADD_BTN.addEventListener('click', function () {
    const newDay = new Date(INITIAL_DATE.getTime() + daysAmount * 86400000 * 2)
    const dateFormat = new Intl.DateTimeFormat('en-UK', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
    }).format(newDay)

    const th = document.createElement('th')
    th.textContent = dateFormat

    ADD_DAY_TABLE.appendChild(th)

    addNewColumn(ADD_GRADE_ROW)
    updateStatistics()
    daysAmount++
})

REMOVE_BTN.addEventListener('click', function () {
    if (daysAmount > 0) {
        ADD_DAY_TABLE.lastChild.textContent = ''
        ADD_DAY_TABLE.removeChild(ADD_DAY_TABLE.lastChild)
        for (let i = 0; i < ADD_GRADE_ROW.length; i++) {
            const element = ADD_GRADE_ROW[i]
            element.lastChild.textContent = ''
            element.removeChild(element.lastChild)
        }
        daysAmount--
        updateStatistics()
    }
})

function updateStatistics() {
    const totalStudents = 10
    const grades = document.querySelectorAll('#newGradeCell')

    const amountOfGrades = grades.length
    const totalGrades = [...grades].reduce(
        (acc, cur) => acc + Number(cur.innerHTML),
        0,
    )

    const totalAverage = amountOfGrades
        ? (totalGrades / amountOfGrades).toFixed(2)
        : '0.00'
    AVERAGE_TOTAL_SCORES.textContent = totalAverage

    getEachAverage()

    // const tableRows = document.querySelectorAll('#newGradeCell')
    // const totalStudents = tableRows.length
    // console.log(totalStudents)

    // let totalGrade = 0
    // let missedDays = 0

    // tableRows.forEach((row) => {
    //     let rowGrade = 0
    //     let hasMissedDay = true

    //     row.querySelectorAll('td:not(:first-child)').forEach((dayCell) => {
    //         const grade = parseInt(dayCell.textContent) || 0
    //         rowGrade += grade

    //         if (grade > 0) {
    //             hasMissedDay = false
    //         }
    //     })

    //     if (hasMissedDay) {
    //         missedDays++
    //     }

    //     const averageGrade = rowGrade / (count + 1)
    //     row.querySelector('.average').textContent = averageGrade.toFixed(2)
    //     totalGrade += averageGrade
    // })

    // const overallAverage = (totalGrade !== 0 && totalGrade / totalStudents) || 0

    document.getElementById('num-days').textContent = daysAmount + 1
    // document.getElementById('missed-days').textContent = missedDays
    // document.getElementById('average-score').textContent = overallAverage
}

function getEachAverage() {
    const table = document.getElementById('myTable')

    for (let i = 1; i < table.rows.length; i++) {
        let row = table.rows[i]
        let total = 0

        for (let j = 2; j < row.cells.length; j++) {
            let cell = row.cells[j]
            let value = parseFloat(cell.innerHTML)

            if (!isNaN(value)) {
                total += value
            }
        }

        let average = total / (row.cells.length - 2)
        let newCell = row.children[1]

        newCell.innerHTML = isNaN(average.toFixed(2))
            ? '0.00'
            : average.toFixed(2)
    }
}

// add new Column
function addNewColumn(element) {
    for (let i = 0; i < element.length; i++) {
        let td = document.createElement('td')
        td.setAttribute('id', 'newGradeCell')
        td.textContent = 0
        element[i].appendChild(td)

        const newGradeCell = document.querySelectorAll('#newGradeCell')
        addListener(newGradeCell)
    }
}

function addListener(element) {
    for (let i = 0; i < element.length; i++) {
        element[i].onclick = function () {
            const userInput = parseInt(prompt('Enter grade', 0))
            this.textContent =
                isNaN(userInput) || !(userInput <= 5) ? 0 : userInput
            updateStatistics()
        }
    }
}
