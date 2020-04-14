export const readTitle = (txt: string) => {
    const match = txt.match(/\[(.*)\]\((.*)\)/);
    if (match){
      return {
        id: match[2],
        title: match[1]
      }
    }
  
    return {
      id: txt,
      title: "",
    };
  };