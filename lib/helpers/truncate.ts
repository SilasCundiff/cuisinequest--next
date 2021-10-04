export const truncate = (str: string, num: number): string => {
  return (str.length > num) ? str.substr(0, num-1) + '...' : str;
}


