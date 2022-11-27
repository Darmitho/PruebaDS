export const getToken = async () => {
  const body = JSON.stringify({
    username: "alumnos@alumnos.org",
    password: "m7a/s99",
  });
  const requestOptions = {
    method: "POST",
    headers: {
      Host: "18.214.103.65:8080",
      "Content-Length": body.length + 1,
      "Content-Type": "application/json",
      Accept: "application/json",
      Connection: "keep-alive",
    },
    body,
    mode: "cors",
    cache: "default",
  };

  try {
    const response = await fetch(
      "http://18.214.103.65:8080/api/auth/login",
      requestOptions
    );
    const data = await response.json();
    return data["token"];
  } catch (error) {
    console.error(error);
  }
};
