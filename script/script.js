const firstLectureDate = new Date('December 5, 2022')

const addDayTableBody = document.getElementById('add-day-table-body')
const addGradeRow = document.querySelectorAll('.add-grade-row')
const addDayButton = document.getElementById('add-day')
const removeDayButton = document.getElementById('remove-day')
let count = 0

console.log(addGradeRow)

addDayButton.addEventListener('click', function () {
    count++
    const newDayDate = new Date(
        firstLectureDate.getTime() + count * 86400000 * 2,
    )

    const dateFormat = new Intl.DateTimeFormat('en-UK', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
    }).format(newDayDate)

    const newDateCell = document.createElement('th')
    const newDayOfWeekCell = document.createElement('td')
    newDateCell.textContent = dateFormat

    addDayTableBody.appendChild(newDateCell)

    for (let i = 0; i < addGradeRow.length; i++) {
        let newCell = document.createElement('td')
        newCell.setAttribute('id', 'newGradeCell')
        newCell.textContent = 0
        addGradeRow[i].appendChild(newCell)
    }

    const newGradeCell = document.querySelectorAll('#newGradeCell')

    for (var i = 0; i < newGradeCell.length; i++) {
        newGradeCell[i].onclick = function () {
            // add your onclick code here
            console.log('Cell clicked!')
        }
    }

    updateStatistics()
})

removeDayButton.addEventListener('click', function () {
    if (count > 0) {
        addDayTableBody.lastChild.textContent = ''
        addDayTableBody.removeChild(addDayTableBody.lastChild)
        for (let i = 0; i < addGradeRow.length; i++) {
            const element = addGradeRow[i]
            element.lastChild.textContent = ''
            element.removeChild(element.lastChild)
        }
        count--
        updateStatistics()
    }

    let lastChild = this.parentNode.lastChild
})

function updateStatistics() {
    const tableRows = document.querySelectorAll('#grades-table tbody tr')
    const totalStudents = tableRows.length
    let totalGrade = 0
    let missedDays = 0

    tableRows.forEach((row) => {
        let rowGrade = 0
        let hasMissedDay = true

        row.querySelectorAll('td:not(:first-child)').forEach((dayCell) => {
            const grade = parseInt(dayCell.textContent) || 0
            rowGrade += grade

            if (grade > 0) {
                hasMissedDay = false
            }
        })

        if (hasMissedDay) {
            missedDays++
        }

        const averageGrade = rowGrade / (count + 1)
        row.querySelector('.average').textContent = averageGrade.toFixed(2)
        totalGrade += averageGrade
    })

    const overallAverage = totalGrade / totalStudents
    document.getElementById('num-days').textContent = count + 1
    document.getElementById('missed-days').textContent = missedDays
    document.getElementById('average-score').textContent = overallAverage
}
