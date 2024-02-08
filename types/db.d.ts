export { User, Admin }

declare global {
  interface User {
    date: Date,
    name: string,
    points?: number,
    user_id: string
  }

  interface Admin {
    user_id: string
  }

}