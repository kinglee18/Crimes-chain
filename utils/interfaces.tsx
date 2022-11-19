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

export const  CommonColors  = {
  '0': 'Black',
  '1': 'BROWN',
  '2': 'BLUE',
  '3': 'GREEN'
}