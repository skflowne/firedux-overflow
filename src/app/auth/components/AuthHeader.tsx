import React, { FC } from "react"
import { useSelector } from "react-redux"
import { selectUser } from "app/auth/store/authSlice"
import Button from "app/ui/components/Button"
import { signIn, signOut } from "api/auth.service"

const AuthHeader: FC<{}> = () => {
    const user = useSelector(selectUser)

    const handleAuthAction = user ? signOut : signIn

    const buttonVariant = user ? "warning" : "info"

    const initials =
        user && user.displayName
            ? user.displayName
                  .split(" ")
                  .map((name) => name[0].toUpperCase())
                  .join("")
            : null

    console.log("initials", initials)

    return (
        <div className="flex flex-row items-center">
            {initials && (
                <div className="rounded-full h-8 w-8 flex items-center justify-center bg-orange-400 text-white mx-2">
                    {initials}
                </div>
            )}

            <Button variant={buttonVariant} onClick={handleAuthAction}>
                {user ? "X" : "Sign In"}
            </Button>
        </div>
    )
}

export default AuthHeader
