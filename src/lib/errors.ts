/**
 * The error type services throw when a request is refused for a reason the
 * member should read.
 *
 * It lives in `lib` rather than in a service because both sides of the app need
 * it: services throw it, and `server/actions/formState.ts` turns it into a form
 * result — and `formState` is imported by client components for
 * `emptyFormState`. Defining it inside a `server-only` module pulled that whole
 * module into the client bundle and failed the build.
 *
 * `status` maps to an HTTP status for the REST layer. `field` lets a form
 * highlight the specific input that was wrong.
 */
export class ServiceError extends Error {
  constructor(
    message: string,
    readonly status = 400,
    readonly field?: string,
  ) {
    super(message);
    this.name = "ServiceError";
  }
}
