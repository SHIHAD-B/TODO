import { useState } from "react"

export const Edit = ({ data, setTodo, modal }) => {
    const [editdata, setEditData] = useState(data.task)
    //handle changes in input
    const handleChange = (event) => {
        setEditData(event.target.value)
    }

    const storedata = () => {
        setTodo((prev) => {
            return prev.map((value) => {
                if (data.id == value.id) {
                    return { ...prev, task: editdata }
                }
            })
        })
        modal()
    }

    //cancel modal 
    const cancel = () => {
        modal()
    }
    return (
        <div className="ediit">
            <input type="text" value={editdata} onChange={handleChange} />
            <div className="btn">
                <button className="btnedit" style={{ backgroundColor: "green" }} onClick={storedata} >submit</button>
                <button className="btnedit" style={{ backgroundColor: "red" }} onClick={cancel}>cancel</button>
            </div>
        </div>
    )
}