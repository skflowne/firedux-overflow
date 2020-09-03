export type ErrorMessageBuilder = (value: any, params: any[], path?: string[]) => string

export interface ValidationResult {
    valid: boolean
    error: string | null
    path: string[]
}

export interface Constraint {
    validate: (value: any, path?: string[]) => ValidationResult
    getErrorMessage: ErrorMessageBuilder | undefined
}

class Shapor {
    constraints: Constraint[]
    shape: Record<string, Shapor> | null = null

    constructor() {
        this.constraints = []
    }

    object(shape: Record<string, any>, getErrorMessage?: ErrorMessageBuilder) {
        this.constraints.push({
            validate: (value: any, path: string[] = []) => {
                if (typeof value === "object") {
                    return { valid: true, error: null, path }
                } else {
                    return {
                        valid: false,
                        error: getErrorMessage ? getErrorMessage(value, [], path) : "not_object",
                        path,
                    }
                }
            },
            getErrorMessage: getErrorMessage,
        })
        this.shape = shape
        return this
    }

    string(getErrorMessage?: ErrorMessageBuilder) {
        this.constraints.push({
            validate: (value: any, path: string[] = []) => {
                if (typeof value === "string") {
                    return { valid: true, error: null, path }
                } else {
                    return {
                        valid: false,
                        error: getErrorMessage ? getErrorMessage(value, [], path) : "not_string",
                        path,
                    }
                }
            },
            getErrorMessage: getErrorMessage,
        })
        return this
    }

    required(getErrorMessage?: ErrorMessageBuilder) {
        this.constraints.push({
            validate: (value: any, path: string[] = []) => {
                const isInvalid = () => {
                    return {
                        valid: false,
                        error: getErrorMessage ? getErrorMessage(value, [], path) : "is_required",
                        path,
                    }
                }

                if (!!!value) {
                    return isInvalid()
                }

                if (typeof value === "string" && value.trim().length === 0) {
                    return isInvalid()
                }

                return { valid: true, error: null, path }
            },
            getErrorMessage: getErrorMessage,
        })
        return this
    }

    min(min: number, getErrorMessage?: ErrorMessageBuilder) {
        this.constraints.push({
            validate: (value: any, path: string[] = []) => {
                const isValid = () => {
                    return { valid: true, error: null, path }
                }

                const isInvalid = () => {
                    return {
                        valid: false,
                        error: getErrorMessage ? getErrorMessage(value, [min], path) : `min_length_error`,
                        path,
                    }
                }

                if (Array.isArray(value)) {
                    if (value.length >= min) {
                        return isValid()
                    } else {
                        return isInvalid()
                    }
                } else if (typeof value === "object") {
                    if (Object.keys(value).length >= min) {
                        return isValid()
                    } else {
                        return isInvalid()
                    }
                } else if (typeof value === "string") {
                    if (value.trim().length >= min) {
                        return isValid()
                    } else {
                        return isInvalid()
                    }
                } else if (typeof value === "number") {
                    if (value >= min) {
                        return isValid()
                    } else {
                        return isInvalid()
                    }
                } else {
                    return { valid: false, error: `Unknown type ${typeof value} for min constraint`, path }
                }
            },
            getErrorMessage,
        })
        return this
    }

    validate(value: any, path: string[] = []): boolean {
        if (this.shape !== null) {
            return !Object.keys(this.shape).some((key) => {
                const shapor = (this.shape as Record<string, Shapor>)[key]
                return !shapor.validate(value[key], [...path, key])
            })
        }
        return !this.constraints.some((constraint) => {
            const result = constraint.validate(value, path)
            return result.error !== null
        })
    }

    getValidationResult(value: any, path: string[] = []): ValidationResult {
        if (this.shape) {
            const keys = Object.keys(this.shape)
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i]
                const shapor = this.shape[key]
                const validationResult = shapor.getValidationResult(value[key], [...path, key])

                if (!validationResult.valid) {
                    return validationResult
                }
            }
            return { valid: true, error: null, path }
        }
        for (let i = 0; i < this.constraints.length; i++) {
            const constraint = this.constraints[i]
            const result = constraint.validate(value, path)
            if (!result.valid) {
                return result
            }
        }
        return { valid: true, error: null, path }
    }
}

export default Shapor
