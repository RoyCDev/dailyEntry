import { useState } from "react"

// function getActivities() {
//     const cookies = document.cookie.split("; ")
//     for (const cookie of cookies) {
//         const [name, value] = cookie.split("=")
//         if (name === "activities")
//             return JSON.parse(decodeURIComponent(value).slice(2))
//     }
// }

// function updateActivities() {

// }

function EntryPage() {
    // submit form
    // const [inputs, setInputs] = useState({ activity: [] })
    // const handleCheckBoxes = (e) => {
    //     e.target.checked ?
    //         inputs.activity.push(e.target.value) :
    //         inputs.activity = inputs.activity.filter(a => a !== e.target.value)
    //     console.log(inputs.activity)
    // }

    // render mood rating options
    const options = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "very good"]
    const renderedOptions = options.map((option, i) => {
        const rating = i + 1
        return <option key={rating} value={rating}>{rating} - {option}</option>
    })

    // sub form - add new activity
    const [newActivity, setNewActivity] = useState("")
    const handleNewActivity = (e) => setNewActivity(e.target.value)

    const handleAdd = () => {
        setNewActivity("")
    }

    // render user activities
    // const [activities, setActivities] = useState(["Activity 1", "Activity 2", "Activity 3"])
    // const renderedActivities = activities.map((a) => {
    //     return (
    //         <>
    //             <input type="checkbox" name="activity" id={a} value={a} onChange={handleCheckBoxes} hidden />
    //             <label htmlFor={a}>{a}</label>
    //         </>
    //     )
    // })

    // const handleAdd = (e) => {
    //     setActivities([...activities, newActivity])
    //     setNewActivity("")
    // }


    return (
        <form action="">
            <label htmlFor="diary"></label>
            <textarea name="diary" id="diary"></textarea>
            <br></br>

            <label htmlFor="date"></label>
            Date: <input type="date" name="date" id="date" />
            <br></br>

            Mood Rating:
            <select name="rating" id="rating">
                <option hidden>Choose mood</option>
                {renderedOptions}
            </select>

            <br></br>
            <br></br>

            <input type="button" name="add" id="add" value="+" onClick={handleAdd} />
            <input type="text" name="new-activity" id="new-activity"
                value={newActivity} onChange={handleNewActivity}
            />
            <br></br>

            {/* {renderedActivities} */}
        </form>

    )
}

export default EntryPage;