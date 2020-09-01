import React, { FC } from "react"
import AuthHeader from "app/auth/components/AuthHeader"

const Header: FC<{}> = () => {
    return (
        <div className="flex flex-row items-center justify-between bg-gray-300 px-4">
            <div className="flex flex-row items-center text-xl">
                <span>Firedux</span>
                <span className="font-bold">Overflow</span>
            </div>

            <div>
                <a href="/questions">Questions</a>
            </div>

            <div className="my-2">
                <AuthHeader />
            </div>
        </div>
    )
}

export default Header
