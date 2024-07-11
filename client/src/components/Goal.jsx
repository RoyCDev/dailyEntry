function Goal({ goal, onDelete }) {

    const added = new Date(goal.added_date)
    return (
        <div>
            Desc: {goal.description}
            <br></br>
            Priority: {goal.priority}
            <br></br>
            {/* Added: {added.getMonth() + 1}/{added.getDate()}/{added.getFullYear()} */}
            Added: {added.toLocaleDateString()}
            <br></br>
            <button onClick={() => onDelete(goal.id)}>Delete</button>
            <br></br>
            <br></br>
        </div>
    )
}

export default Goal