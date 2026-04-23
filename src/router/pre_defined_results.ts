/**
 * Predefined fallback router results.
 */
import { EventResult } from "./result";

/**
 * Returned when an incoming event does not match any registered handler.
 */
export const ResultHandlerNotFound: EventResult = {
    _meta: {
        failed: true,
        message: "Handler not found.",
    }
}

/**
 * Returned when router execution fails with an unexpected internal error.
 */
export const ResultInternalError: EventResult = {
    _meta: {
        failed: true,
        message: "Internal error.",
    }
}
