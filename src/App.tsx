import React, { useEffect } from "react"
import "./tailwind/index.out.css"
import { useSelector, useDispatch } from "react-redux"
import { selectReady, watchAuth } from "app/auth/store/authSlice"
import Header from "app/ui/components/Header"

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(watchAuth())
    }, [dispatch])

    const authReady = useSelector(selectReady)

    return authReady ? (
        <div className="App">
            <Header />
        </div>
    ) : (
        <div>Loading App...</div>
    )
}

export default App
