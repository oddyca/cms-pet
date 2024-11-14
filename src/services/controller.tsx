export const signIn = async (email: string, password: string) => {
  const response = await fetch('http://localhost:1337/api/auth/local', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identifier: email,
      password: password,
    }),
  });
  return response;
};
