import React, { FC } from "react"
import type { UIVariant, UIVariants } from "features/ui/components/types"

const variants: UIVariants = {
    default: "text-white bg-gray-500",
    danger: "text-white bg-red-500",
    warning: "text-white bg-orange-500",
    success: "text-white bg-green-500",
    info: "text-white bg-blue-500",
}

const Alert: FC<{ variant: UIVariant }> = ({ variant = "default", children }) => {
    return <div className={`p-2 ${variants[variant]}`}>{children}</div>
}

export default Alert
