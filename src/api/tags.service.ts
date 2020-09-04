import { firestore } from "firebase"

export interface Tag {
    id: string
    name: string
}

export interface TagPayload {
    name: string
}

const COLLECTION_NAME = "tags"

export const getCollectionRef = () => {
    return firestore().collection(COLLECTION_NAME)
}

export const getTagsQuery = async (query: [string, firestore.WhereFilterOp, any][]): Promise<Tag[]> => {
    let tagsRef = getCollectionRef() as firestore.Query
    query.forEach((condition) => {
        tagsRef = tagsRef.where(condition[0], condition[1], condition[2])
    })

    const res = await tagsRef.get()
    let tags: Tag[] = []
    res.docs.forEach((doc) => {
        const { name } = doc.data()
        tags.push({
            id: doc.id,
            name,
        })
    })
    return tags
}
