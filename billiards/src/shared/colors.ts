export interface Color {
  color: string;
  id: number;
}
export const colors = [
  { id: 1, color: 'FAE2F1' }, 
  { id: 2, color: 'F4CAE5' }, 
  { id: 3, color: 'F4BBE0' }, 
  { id: 4, color: 'F8DDD7' }, 
  { id: 5, color: 'F6CBC9' }, 
  { id: 6, color: 'F2B2B1' }, 
  { id: 7, color: 'FCF0E4' }, 
  { id: 8, color: 'BFFAFE' }, 
  { id: 9, color: 'D3FBFE' }, 
  { id: 10, color: 'E8FEFF' }, 
  { id: 11, color: 'FCF0A8' }, 
  { id: 12, color: 'FEF7C2' }, 
  { id: 13, color: 'FEFBE0' }, 
  { id: 14, color: 'F7D1AC' }, 
  { id: 15, color: 'F9D9BA' }, 
  { id: 16, color: 'EAF4FE' }, 
  { id: 17, color: 'D9ECFD' }, 
  { id: 18, color: 'CDE5FB' }, 
  { id: 19, color: 'E7EBFC' }, 
  { id: 20, color: 'E7EBFC' },
  { id: 21, color: 'DCE2FB' }, 
  { id: 22, color: 'C8D2FA' }, 
  { id: 23, color: 'F3EAFD' }, 
  { id: 24, color: 'EDF8D4' }, 
  { id: 25, color: 'F0FBDE' }, 
  { id: 26, color: 'D1FDE3' },
  { id: 27, color: 'DCFEEC' }, 
  { id: 28, color: 'EEFEF4' }, 
  { id: 29, color: 'DAC7F9' }, 
  { id: 30, color: 'F6D5EA' }, 
];

export default function getRandomColors(num: number) {
  const randomColors = [];
  const availableColors = [...colors]; // Make a copy of the colors array

  for (let i = 0; i < num; i++) {
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    randomColors.push(availableColors[randomIndex]);

    // Remove the selected color from the available colors
    availableColors.splice(randomIndex, 1);
  }
  
  return randomColors;
}