import React, { FC, useState, FormEvent, useEffect } from "react"

import { QuestionPayload, QuestionShapor } from "api/questions.service"

import Button from "features/ui/components/Button"
import Alert from "features/ui/components/Alert"
import { useDispatch, useSelector } from "react-redux"
import { postQuestion, selectCreating } from "../store/questionsSlice"

const QuestionCreate: FC<{}> = () => {
    const dispatch = useDispatch()
    const creatingState = useSelector(selectCreating)
    const [question, setQuestion] = useState<QuestionPayload>({ title: "", description: "" })

    const [touched, setTouched] = useState<Record<string, boolean>>({
        title: false,
        description: false,
    })

    useEffect(() => {
        if (creatingState.error || creatingState.loading) return

        setQuestion({ title: "", description: "" })
        setTouched({ title: false, description: false })
    }, [creatingState])

    const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault()

        dispatch(postQuestion(question))
    }

    const handleChange = (evt: any) => {
        evt.persist()

        setQuestion((question) => {
            return {
                ...question,
                [evt.target.name]: evt.target.value,
            }
        })
        setTouched((touched) => {
            return {
                ...touched,
                [evt.target.name]: true,
            }
        })
    }

    const isValidQuestion = QuestionShapor.getValidationResult(question)

    return (
        <div>
            {creatingState.loading && <Alert variant="info">Posting...</Alert>}
            {false && <Alert variant="success">Question posted!</Alert>}
            {creatingState.error && (
                <Alert variant="danger">
                    An error occured while posting your question: {creatingState.error.message}
                </Alert>
            )}
            {isValidQuestion.error && touched[isValidQuestion.path[0]] && (
                <Alert variant="danger">{isValidQuestion.error}</Alert>
            )}
            <form className="flex flex-col items-center w-4/5 mx-auto" onSubmit={onSubmit}>
                <input
                    className="border w-full p-2 my-1 rounded"
                    type="text"
                    placeholder="What's your question ?"
                    name="title"
                    value={question.title}
                    onChange={handleChange}
                />
                <textarea
                    className="p-2 border w-full h-48 resize-y rounded"
                    name="description"
                    placeholder="Give details"
                    value={question.description}
                    onChange={handleChange}
                ></textarea>
                <Button variant="info" className="my-2" type="submit" disabled={isValidQuestion.valid === false}>
                    Ask question
                </Button>
            </form>
        </div>
    )
}

export default QuestionCreate
