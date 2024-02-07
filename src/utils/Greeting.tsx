export const greeting = (name: string) => {
    const currentDate = new Date();
    const timestamp = currentDate.getHours();
    let greeting = "hey";

    if (Number(timestamp) < 12 && Number(timestamp) >= 0) {
      greeting = "Good morning, " + name;
    }

    if (Number(timestamp) >= 12 && Number(timestamp) < 16) {
      greeting = "Good afternoon, " + name;
    }

    if (Number(timestamp) >= 16) {
      greeting = "Good evening, " + name;
    }

    return greeting;
  };