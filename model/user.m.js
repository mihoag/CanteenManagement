const db = require("../db/db");
module.exports = class user {
  constructor(
    id_user,
    username,
    password,
    name,
    email,
    password_changed_at,
    public_id,
    url_image,
    role,
    active,
    money
  ) {
    this.id_user = id_user;
    this.username = username;
    this.password = password;
    this.name = name;
    this.email = email;
    this.password_changed_at = password_changed_at;
    this.public_id = public_id;
    this.url_image = url_image;
    this.role = role;
    this.active = active;
    this.money = money;
  }
  // insert account into db
  static async checkExistUsername(username) {
    try {
      let data = await db.selectByID("user", "username", username);
      console.log(data);
      if (data) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }
  static async selectByUsername(username) {
    try {
      let data = db.selectByID("user", "username", username);
      return data;
    } catch (error) {
      throw error;
    }
  }
  static async insertAccount(user) {
    try {
      let data = await db.insert("user", user);
      return data.id_user;
    } catch (error) {
      throw error;
    }
  }

  static async selectMaxID() {
    try {
      let data = await db.selectMax("user", "id_user");
      return data.max;
    } catch (error) {
      throw error;
    }
  }

  static async getEmailByUsername(username) {
    try {
      let data = await db.selectByOneField("user", "username", username);
      return data;
    } catch (error) {
      throw error;
    }
  }
  static async updateProfile(user) {
    try {
      const data = await db.update("user", user, "id_user", user.id_user);
      return data;
    } catch (error) {
      throw error;
    }
  }
};
