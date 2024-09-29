export class BackofficeError extends Error {
  readonly code: number;

  constructor(code: number, message: string) {
    super(message);

    this.name = "BackofficeError";
    this.code = code;
  }
}
