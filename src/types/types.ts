export interface TelegramChat{
  id: number
  first_name: string
  last_name: string
  username: string
  type: "private" | "public"
}

export interface TelegramMessage {
  text: string
  date: number
  chat: TelegramChat
}

export interface Recipe {
  flour: number
  initialWater: number
  finalWater: number
  sourDough: number
  salt: number
}
