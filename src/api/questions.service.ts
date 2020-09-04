import { auth, firestore } from "firebase"
import Shapor from "lib/validation/Shapor"
import { Tag } from "./tags.service"

const COLLECTION_NAME = "questions"

export interface Question {
    id: string
    title: string
    description: string
    userId: string | null
}

export interface QuestionPayload {
    title: string
    description: string
    tags: Tag[] | string[]
}

export const QuestionShapor = new Shapor().object({
    title: new Shapor().string().min(5, (value, [min], path) => {
        return `Title should be at least ${min} characters long (currently ${value.length} characters)`
    }),
    description: new Shapor().string().min(10, (value, [min], path) => {
        return `Description should be at least ${min} characters long (currently ${value.length} characters)`
    }),
})

export const getCollectionRef = () => {
    return firestore().collection(COLLECTION_NAME)
}

export const getQuestions = async (): Promise<Question[]> => {
    const snapshot = await getCollectionRef().get()
    let questions: Question[] = []
    snapshot.forEach((doc) => {
        const { title, description, userId } = doc.data()
        questions.push({
            id: doc.id,
            title,
            description,
            userId,
        })
    })
    return questions
}

export const createQuestion = async (payload: QuestionPayload): Promise<Question> => {
    const isValidPayload = QuestionShapor.getValidationResult(payload)
    if (isValidPayload.error) {
        throw new Error(isValidPayload.error)
    }

    const userId = auth().currentUser?.uid

    if (!userId) {
        throw new Error("Can't create question without being authenticated")
    }

    const question: Question = {
        id: "",
        ...payload,
        userId,
    }

    const res = await getCollectionRef().add(question)

    const createdQuestion: Question = {
        ...question,
        id: res.id,
    }

    return createdQuestion
}
