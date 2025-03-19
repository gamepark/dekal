export enum Position {
  TopLeft, TopCenter, TopRight, BottomLeft, BottomRight,
  BottomCenter
}

export const isTopPosition = (position: Position) => {
  return position === Position.TopLeft || position === Position.TopCenter || position === Position.TopRight
}

export const isLeftPosition = (position: Position) => {
  return position === Position.TopLeft || position === Position.BottomLeft
}

export const playerPositions = [
  [Position.BottomLeft, Position.BottomRight], // 2 players
  [Position.BottomLeft, Position.BottomCenter, Position.BottomRight], // 3 players
  [Position.BottomLeft, Position.TopLeft, Position.TopRight, Position.BottomRight], // 4 players
  [Position.BottomLeft, Position.TopLeft, Position.TopCenter, Position.TopRight, Position.BottomRight], // 5 players
  [Position.BottomLeft, Position.TopLeft, Position.TopCenter, Position.TopRight, Position.BottomRight, Position.BottomCenter] // 6 players
]
