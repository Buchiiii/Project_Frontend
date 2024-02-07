export const convertTimeStampToDate = (timeStamp: any) => {
  const formatedDate = new Date(timeStamp).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return formatedDate;
};
