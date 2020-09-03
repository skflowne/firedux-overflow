import React, { FC } from "react"
import { Question } from "api/questions.service"

const QuestionListItem: FC<{ question: Question }> = ({ question }) => {
    return (
        <div className="flex flex-col m-2 border p-2 rounded">
            <h3 className="text-lg text-blue-500">{question.title}</h3>
            <p>{question.description}</p>
        </div>
    )
}

export default QuestionListItem
