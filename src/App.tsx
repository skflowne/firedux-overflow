import React, { useEffect } from "react"
import "./tailwind/index.out.css"
import { useSelector, useDispatch } from "react-redux"
import { selectReady, watchAuth } from "features/auth/store/authSlice"
import Header from "app/Header"
import QuestionCreate from "features/questions/components/QuestionCreate"
import QuestionList from "features/questions/components/QuestionList"

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(watchAuth())
    }, [dispatch])

    const authReady = useSelector(selectReady)

    return authReady ? (
        <div className="App">
            <Header />
            <QuestionCreate />
            <QuestionList />
        </div>
    ) : (
        <div>Loading App...</div>
    )
}

export default App
