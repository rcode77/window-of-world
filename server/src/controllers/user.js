const { user } = require("../../models");

exports.getUsers = async (req, res) => {
  try {
    const users = await user.findAll({
      where: {
        role: "user",
      },
      attributes: {
        exclude: ["password", "role", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await user.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      data: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    const { gender, phone, address } = req.body;
    const userImage = req.file.filename;

    let data = {
      gender,
      phone,
      address,
      userImage,
    };

    await user.update(data, {
      where: {
        id,
      },
    });

    res.send({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
