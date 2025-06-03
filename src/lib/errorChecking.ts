export function isPrismaKnownRequestError(error: unknown): error is {
  code: string;
  message: string;
  name: string;
} {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    (error as any).name === "PrismaClientKnownRequestError" &&
    "code" in error &&
    typeof (error as any).code === "string"
  );
}
