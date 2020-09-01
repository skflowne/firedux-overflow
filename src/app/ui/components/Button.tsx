import React, { FC } from "react"

type UIVariant = "danger" | "warning" | "info" | "success" | "default"

type UIVariants = Record<UIVariant, string>

const variants: UIVariants = {
    "default": "text-gray-100 bg-gray-500 hover:text-white hover:bg-gray-400",
    "danger": "text-gray-100 bg-red-500 hover:text-white hover:bg-red-400",
    "warning": "text-gray-100 bg-orange-500 hover:text-white hover:bg-orange-400",
    "info": "text-gray-100 bg-indigo-500 hover:text-white hover:bg-indigo-400",
    "success": "text-gray-100 bg-green-500 hover:text-white hover:bg-green-400",
}

const Button: FC<{ variant: UIVariant; className?: string; [x: string]: any }> = ({
    variant = "default",
    className = "",
    children,
    ...rest
}) => {
    const defaultClasses = "px-6 py-2 rounded"
    const variantClasses = variants[variant]

    console.log("rest", rest)

    return (
        <button className={`${defaultClasses} ${variantClasses} ${className}`} {...rest}>
            {children}
        </button>
    )
}

export default Button
