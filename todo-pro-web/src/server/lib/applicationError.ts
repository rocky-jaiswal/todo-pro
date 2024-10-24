class ApplicationError extends Error {
  public readonly code: number

  constructor(message: string, code: number, cause: unknown) {
    super(message)

    this.code = code
    this.cause = cause
    this.name = 'ApplicationError'
  }
}

export default ApplicationError
