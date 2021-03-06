import { User } from "../user";

describe(User.name, () => {
  it("should have the need params", () => {
    const user = new User({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "Mypass123",
    });

    expect(user).toHaveProperty("name", "John Doe");
    expect(user).toHaveProperty("email", "johndoe@gmail.com");
    expect(user).toHaveProperty("password", "Mypass123");
  });

  test.each([
    ["Mypass123", true],
    ["Mypass123", true],
    ["Abc0892", true],
    ["aBC1", false],
    ["pass123", false],
    ["12345", false],
  ])("should validate user password correctly", (password, expected) => {
    const user = new User({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password,
    });

    expect(user.validate("password")).toBe(expected);
  });

  test.each([
    ["myemail.com", false],
    ["email@gmail.com", true],
    [".john@doe.com", false],
    ["john@doe.com", true],
    ["@gmail.jonn", false],
  ])("should validate user email correctly", (email, expected) => {
    const user = new User({
      name: "John Doe",
      email,
      password: "Mypass123",
    });

    expect(user.validate("email")).toBe(expected);
  });

  it("should active a user", () => {
    const user = new User({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "Mypass123",
    });

    user.active = true;

    expect(user.isActive()).toBe(true);
  });

  it("should set activation hash ans validate", () => {
    const user = new User({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "Mypass123",
    });

    user.hash = "my_secure_hash";

    expect(user.hashMatch("any")).toBe(false);
    expect(user.hashMatch("my_secure_hash")).toBe(true);
  });
});
