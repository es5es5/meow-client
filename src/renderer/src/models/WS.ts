export type WSMessageData = {
  event: string
  data: {
    action: string
    data: any
  }
}
