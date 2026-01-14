import { PresignedHTTPRequest } from '../models/drive_file';

export type EventResult = {
  /**
   * _meta is the event result metadata.
   */
  _meta?: EventResultMetadata;
};

export type EventResultMetadata = {
  /**
   * message is the result message.
   */
  message?: string;
  /**
   * description is the result description.
   */
  description?: string;
  /**
   * failed if true means that the event handler
   * has failed for some reason.
   */
  failed?: boolean;
  /**
   * duration is the time in milliseconds
   * that the script took to handle the event.
   */
  duration?: number;
  /**
   * fileUploads is an array of file upload parameters.
   */
  fileUploads?: FileUploadURLParams[];
};

/**
 * FileUploadURLParams is a helper type to manage
 * the parameters for generating a presigned URL
 * for file uploads to S3.
 */
export type FileUploadURLParams = PresignedHTTPRequest & {
  fileID: number;
  folderID: number;
  filename: string;
};

/**
 * EventHandlerResult is a helper class to manage
 * the metadata and output of an event handler execution.
 * It automatically tracks creation time and computes
 * execution duration when requested.
 */
export class EventHandlerResult {
  private value: Record<any, any> = {};
  private meta: EventResultMetadata = {};
  private createdAt: Date;

  constructor() {
    // Marks the time when this event handler started processing.
    this.createdAt = new Date();
  }
  /**
   * set sets the message, description, and value for the result.
   * It updates the internal metadata fields and optionally assigns a value object.
   * @param message - Optional message text to set.
   * @param description - Optional description text to set.
   * @param value - Optional value object to assign. If not provided, the current value remains unchanged.
   */
  public set(message?: string, description?: string, value?: Record<any, any>): void {
    this.setMessage(message);
    this.setDescription(description);

    if (value !== undefined) {
      this.value = value;
    }
  }

  /**
   * setValue sets a value to result.
   * @param value value object.
   */
  public setValue(value: Record<any, any> = {}): void {
    this.value = value;
  }

  /**
   * setMessage sets a message to result.
   * @param message message text.
   */
  public setMessage(message?: string): void {
    this.meta.message = message;
  }

  /**
   * setDescription sets description to result.
   * @param description description text.
   */
  public setDescription(description?: string): void {
    this.meta.description = description;
  }

  /**
   * setUploadFileURL sets the upload file URL parameters.
   * @param params FileUploadURLParams object.
   */
  public setUploadFileURL(params: FileUploadURLParams): void {
    this.meta.fileUploads = [...(this.meta.fileUploads || []), params];
  }

  /**
   * setFailed marks the result as failed.
   */
  public setFailed(): void {
    this.meta.failed = true;
  }

  /**
   * calculateDuration calculates and adds the total duration (in milliseconds)
   * since the EventHandlerResult was created.
   */
  private calculateDuration(): void {
    const now = new Date();
    const duration = now.getTime() - this.createdAt.getTime();
    this.meta.duration = duration;
  }

  /**
   * get finalizes and returns the full event result object.
   * It includes both metadata (_meta) and any attached values.
   * @returns {EventResult & typeof this.value} The result object.
   */
  public get(): EventResult & typeof this.value {
    this.calculateDuration();

    return {
      _meta: this.meta,
      ...this.value,
    };
  }
}
