import React, { FC, useState, ReactElement, useRef, useEffect } from "react"
import Tag from "./Tag"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

const TagInput: FC<{
    initialTags?: string[]
    suggestionsState: { loading: boolean; error: Error | null }
    suggestedTags?: string[]
    onNewTagInputChanged: (input: string) => void
    onTagsChanged: (tags: string[]) => void
}> = ({
    initialTags = [],
    suggestedTags = [],
    suggestionsState = { loading: false, error: null },
    onNewTagInputChanged,
    onTagsChanged,
}) => {
    const newTagInputRef = useRef(null)
    const [newTagInput, setNewTagInput] = useState<string>("")
    const [tags, setTags] = useState<string[]>(initialTags)
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number | undefined>(undefined)

    useEffect(() => {
        setSelectedSuggestionIndex(undefined)
    }, [suggestedTags])

    const handleUserInput = (evt: React.ChangeEvent) => {
        const target = evt.target as HTMLInputElement
        setNewTagInput(target.value)
        onNewTagInputChanged(target.value)
    }

    const handleKeyUp = (evt: React.KeyboardEvent) => {
        evt.stopPropagation()
        evt.preventDefault()
        if (evt.key === "Enter") {
            if (selectedSuggestionIndex !== undefined) {
                addTag(suggestedTags[selectedSuggestionIndex])
            } else {
                addTag(newTagInput)
            }
        }

        if (evt.key === "ArrowDown") {
            setSelectedSuggestionIndex((selectedSuggestionIndex) =>
                selectedSuggestionIndex !== undefined ? (selectedSuggestionIndex + 1) % suggestedTags.length : 0
            )
        }

        if (evt.key === "ArrowUp") {
            setSelectedSuggestionIndex((selectedSuggestionIndex) => {
                const newIndex = selectedSuggestionIndex !== undefined ? selectedSuggestionIndex - 1 : 0
                return newIndex < 0 ? suggestedTags.length - 1 : newIndex
            })
        }
    }

    const handleAddTag = (tag: string) => (evt: React.MouseEvent) => {
        addTag(tag)
    }

    const addTag = (tag: string) => {
        if (!tags.includes(tag)) {
            setTags((tags) => {
                const newTags = [...tags, tag]
                return newTags
            })
            setNewTagInput("")
            if (newTagInputRef.current) {
                const input = newTagInputRef.current! as HTMLInputElement
                input.focus()
            }
        }
    }

    const handleRemoveTag = (tag: string) => (evt: React.MouseEvent) => {
        removeTag(tag)
    }

    const removeTag = (rmTag: string) => {
        setTags((tags) => {
            const newTags = tags.filter((tag) => tag !== rmTag)
            return newTags
        })
    }

    useEffect(() => {
        onTagsChanged(tags)
    }, [tags, onTagsChanged])

    let suggestions: ReactElement[] = []
    if (suggestionsState.loading) {
        suggestions = [
            <div key="loading" className="flex flex-row items-center">
                <FontAwesomeIcon icon={faSpinner} className="fa-spin mr-1" /> Loading tags
            </div>,
        ]
    }
    if (!suggestionsState.loading && !suggestionsState.error && newTagInput.length > 0) {
        suggestions = suggestedTags.length
            ? suggestedTags.map((tag: string, index) => {
                  return (
                      <Tag
                          key={tag}
                          className="my-1"
                          highlight={selectedSuggestionIndex === index}
                          onClick={handleAddTag(tag)}
                      >
                          {tag}
                      </Tag>
                  )
              })
            : [<div key="not-found">No tag found</div>]
    }

    return (
        <div className="flex flex-row items-center rounded p-2 border w-full my-1">
            {tags.map((tag) => {
                return (
                    <Tag key={tag} className="mx-1" onDelete={handleRemoveTag(tag)}>
                        {tag}
                    </Tag>
                )
            })}
            <div className="relative w-full">
                <input
                    ref={newTagInputRef}
                    className="flex flex-grow w-full outline-none"
                    type="text"
                    value={newTagInput}
                    onChange={handleUserInput}
                    onKeyUp={handleKeyUp}
                />
                <div
                    className={` bg-gray-100 rounded border p-1 ${suggestions.length > 0 ? "absolute" : "hidden"}`}
                    style={{ top: "auto" }}
                >
                    {suggestions}
                </div>
            </div>
        </div>
    )
}

export default TagInput
