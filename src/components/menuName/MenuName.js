import axios from 'axios'
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
function MenuName() {
    const [createMenu, setCreateMenu] = useState('')
    const Navigate = useNavigate()
    const createTheMenu = async (e) => {
        e.preventDefault();
        setCreateMenu('')
    try {
        const response = await axios.post("http://localhost:3002/createMenu", {
            menuName:createMenu,
            username:"Faraz"
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        console.log("Response from backend that Restaurant is created in database:",response.data)
        Navigate("/dashboard")
    } catch (error) {
        console.log("error in restaurant compo", error)
    }
}
  return (
    <>
    <form
                onSubmit={createTheMenu}
                className="mb-4">
                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Menu Name
                    </label>
                    <input
                        type="text"
                        id="category"
                        value={createMenu}
                        onChange={(e) => setCreateMenu(e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                    Start The menu
                </button>
            </form>
    </>
  )
}

export default MenuName