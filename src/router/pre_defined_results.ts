import { EventResult } from "./result";

export const ResultHandlerNotFound: EventResult = {
    _meta: {
        failed: true,
        message: "Handler not found.",
    }
}

export const ResultInternalError: EventResult = {
    _meta: {
        failed: true,
        message: "Internal error.",
    }
}