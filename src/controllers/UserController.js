const bcrypt = require('bcrypt');
const {
  findAll,
  findOne,
  save,
  update,
  remove,
  findByEmail,
} = require('../services/UserServices');

class UserController {
  async index(req, res) {
    try {
      const users = await findAll();
      return res.status(200).json({ users });
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({ error: error.message });
    }
  }

  async show(req, res) {
    try {
      const { code } = req.params;
      const user = await findOne(code);
      return res.status(200).json({ user });
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const { email, password } = req.body;

      const passwordCrypt = await bcrypt.hash(password, 12);

      const userExists = await findByEmail(email);

      if (userExists.length > 0) {
        return res.status(400).json({ error: 'Email is already in use' });
      }

      const user = await save({ email, password: passwordCrypt });
      return res.status(201).json({ user });
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { code } = req.params;
      const { password } = req.body;
      const user = await update({ code, password });
      return res.status(200).json({ user });
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({ error: error.message });
    }
  }

  async remove(req, res) {
    try {
      const { code } = req.params;
      await remove(code);
      return res.status(204).json({ message: 'user deleted' });
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
