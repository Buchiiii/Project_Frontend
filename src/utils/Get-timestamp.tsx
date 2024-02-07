export const getTimestamp = () : number=> {
  const date = new Date();
  const timeStamp = date.getTime();
  return timeStamp;
};
