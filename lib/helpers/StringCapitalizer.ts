
export const StringCapitalizer = (str: string): string => {
  const capitalizedString = str.replace('_', ' ');
  const words = capitalizedString.split(' ')

  return words.map((word) => { 
    return word[0].toUpperCase() + word.substring(1); 
}).join(" ");
}