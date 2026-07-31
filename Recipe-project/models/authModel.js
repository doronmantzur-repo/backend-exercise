const bcrypt = require("bcrypt");

const users = [
  {
    id: "11111111-aaaa-4aaa-bbbb-cccccccc0001",
    name: "Doron",
    email: "doron@example.com",
    password: "$2a$10$LTLlTIjGEhq7gjuedyeRluFBe9z8rmOT0.pTtNysprPxCxCK8gIbK",
  },
];

// async function login(email, password) {
//     const user = users.find(u => u.email === email && u.password === password);
//     return user;
// }

async function login(email, password) {
  const user = users.find((u) => u.email === email);
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;
  const { password: _, ...userNoPassword } = user;
  return userNoPassword;
}

module.exports = { login };
