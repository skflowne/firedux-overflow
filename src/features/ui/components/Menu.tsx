import React, { FC, ReactElement } from "react"

type MenuItem = FC<any>

interface MenuProps {
    className?: string
    isOpen: boolean
    items: ReactElement[]
}

const Menu: FC<MenuProps> = ({ className = "", items, isOpen, children }) => {
    return (
        <div className="relative w-full">
            {children}
            <div className={`flex flex-col ${isOpen ? "absolute" : "hidden"} ${className}`}>
                {items.map((Item) => Item)}
            </div>
        </div>
    )
}

export default Menu
