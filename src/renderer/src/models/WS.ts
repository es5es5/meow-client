export interface WSMessageData {
  event: string
  data: {
    action: string
    data: any
  }
}
