export const GetVoterId = () => {
  const id: string | null = JSON.parse(
    window.localStorage.getItem("ID") as string
  );

  return id;
};
