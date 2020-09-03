import React, { FC, useEffect } from "react"
import QuestionListItem from "./QuestionListItem"
import Alert from "features/ui/components/Alert"
import { Question } from "api/questions.service"
import { useSelector, useDispatch } from "react-redux"
import { selectAllQuestions, selectFetching, fetchQuestions } from "../store/questionsSlice"

const QuestionList: FC<{}> = () => {
    const dispatch = useDispatch()
    const { loading, error } = useSelector(selectFetching)
    const questions: Question[] = useSelector(selectAllQuestions)

    useEffect(() => {
        dispatch(fetchQuestions())
    }, [dispatch])

    if (loading) return <Alert variant="info">Loading questions...</Alert>
    if (error) return <Alert variant="danger">Error loading questions ({questions})</Alert>

    return (
        <div className="flex flex-col">
            {questions.map((question: Question) => {
                return <QuestionListItem key={question.id} question={question} />
            })}
        </div>
    )
}

export default QuestionList
