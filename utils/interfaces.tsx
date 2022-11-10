export interface coordinates {
    lat: number,
    lng: number
  }


export interface CircleProps {
  coordinates: coordinates,
  radius: number,
  draggable?: boolean,
  editable?: boolean,
}

export enum Genre {
  MALE = 0, FEMALE = 1, OTHER = 2
}

export enum CommonColors {
  BLACK = 0, BROWN = 1, BLUE = 2, GREEN = 3
}