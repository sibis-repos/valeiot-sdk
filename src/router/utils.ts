/**
 * Helper function to wrap a response with a message.
 * Optionally merges additional data into the returned object.
 *
 * @param message - The message string to include.
 * @param data - Optional extra fields to include in the response.
 * @returns An object containing the message and any provided data.
 */
export function withMessage(message: string, data: Record<any, any>) {
    return {
        message,
        ...data // Spread additional fields if provided
    }
}

/**
 * Helper function to wrap a response with an error.
 * Optionally merges additional data into the returned object.
 *
 * @param error - The error string to include.
 * @param data - Optional extra fields to include in the response.
 * @returns An object containing the error and any provided data.
 */
export function withError(error: string, data: Record<any, any>) {
    return {
        error,
        ...data  // Spread additional fields if provided
    }
}

/**
 * Creates a standardized error response object.
 *
 * @param error - The error message string.
 * @returns An object containing the error message.
 */
export function error(error: string) {
    return {
        error
    }
}

/**
 * Creates a standardized message response object.
 *
 * @param message - The message string.
 * @returns An object containing the message.
 */
export function message(message: string) {
    return {
        message
    }
}
