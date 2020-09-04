import React, { FC, Fragment } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWindowClose } from "@fortawesome/free-solid-svg-icons"

const Tag: FC<{
    className?: string
    highlight?: boolean
    onClick?: (evt: React.MouseEvent) => void
    onDelete?: (evt: React.MouseEvent) => void
}> = ({ className, highlight = false, onClick, onDelete, children }) => {
    return (
        <div
            className={`flex flex-row items-center text-blue-100 ${
                highlight ? "bg-orange-200" : "bg-blue-400"
            } h-6 ${className}`}
            onClick={onClick}
        >
            <div className="px-2 pt-1 pb-2 items-center">{children}</div>
            {onDelete && (
                <Fragment>
                    <div className="w-px h-full bg-blue-300"></div>
                    <button type="button" className="p-1" onClick={onDelete}>
                        <FontAwesomeIcon icon={faWindowClose} />
                    </button>
                </Fragment>
            )}
        </div>
    )
}

export default Tag
