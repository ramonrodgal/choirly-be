const ObjectId = require("mongoose").Types.ObjectId;
const Choir = require("../schemas/choir");
const { fetchUserByUsername } = require("./users.models");
const { checkFieldsAndType } = require("../utils/utils");

exports.fetchChoirs = async (location) => {
  if (location) {
    const choirs = await Choir.find({ location: location });
    if (choirs.length === 0) {
      return Promise.reject({
        status: 404,
        msg: "Choirs not found, invalid location",
      });
    }
    return choirs;
  }
  return await Choir.find();
};

exports.fetchChoirById = async (choir_id) => {
  if (!ObjectId.isValid(choir_id)) {
    return Promise.reject({
      status: 400,
      msg: "Bad request. Invalid choir id",
    });
  }
  const choir = await Choir.find({ _id: choir_id });
  if (choir.length === 0) {
    return Promise.reject({ status: 404, msg: "Choir not found" });
  }
  return choir[0];
};

exports.insertChoir = async (body) => {
  const refObj = {
    name: "string",
    location: "string",
    description: "string",
    leader: "string",
  };

  if (!checkFieldsAndType(body, refObj)) {
    return Promise.reject({ status: 400, msg: "Bad Request. Invalid Body" });
  }

  const choir = new Choir(body);
  const user = await fetchUserByUsername(body.leader);

  user.groups.push(choir._id);
  choir.members.push(body.leader);

  await user.save();
  return await choir.save();
};

exports.removeChoirById = async (choir_id) => {
  if (!ObjectId.isValid(choir_id)) {
    return Promise.reject({
      status: 400,
      msg: "Bad request. Invalid choir id",
    });
  }
  const choir = await Choir.find({ _id: choir_id });

  if (choir.length === 0) {
    return Promise.reject({ status: 404, msg: "Choir not found" });
  }

  await Choir.deleteOne({ _id: choir_id });
  return choir[0];
};

exports.insertFile = async (choir_id, body) => {
  const refObj = {
    filename: "string",
    type: "string",
    path: "string",
  };

  if (!checkFieldsAndType(body, refObj)) {
    return Promise.reject({ status: 400, msg: "Bad Request. Invalid Body" });
  }

  const fileTypes = ["song", "document", "image"];
  if (!fileTypes.includes(body.type)) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request. Invalid file type",
    });
  }

  const urlRegEx =
    /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

  if (!urlRegEx.test(body.path)) {
    return Promise.reject({
      status: 400,
      msg: "Bad Resquest. Invalid path URL",
    });
  }

  const choir = await this.fetchChoirById(choir_id);

  choir.files.push(body);
  choir.save();

  return choir;
};

exports.removeFileById = async (file_id, choir_id) => {
  await this.fetchChoirById(choir_id);

  if (!ObjectId.isValid(file_id)) {
    return Promise.reject({
      status: 400,
      msg: "Bad request. Invalid file id",
    });
  }

  const updateChoir = await Choir.updateOne(
    { _id: choir_id },
    { $pull: { files: { _id: file_id } } }
  );

  if (updateChoir.modifiedCount === 0) {
    return Promise.reject({ status: 404, msg: "File not found" });
  }

  const choir = await this.fetchChoirById(choir_id);

  return choir;
};

exports.deleteMemberByUsername = async (choir_id, username) => {
  const choir = await this.fetchChoirById(choir_id);
  const user = await fetchUserByUsername(username);

  if (!choir.members.includes(username)) {
    return Promise.reject({
      status: 400,
      msg: "Bad request. The user is not a member of this choir",
    });
  }

  choir.members.splice(choir.members.indexOf(username), 1);
  choir.save();

  user.groups.splice(user.groups.indexOf(choir._id), 1);
  user.save();

  return choir;
};

exports.updateMembersByUsername = async (choir_id, username) => {
  const choir = await this.fetchChoirById(choir_id);
  const user = await fetchUserByUsername(username);

  if (choir.members.includes(username) || user.groups.includes(choir._id)) {
    return Promise.reject({
      status: 400,
      msg: "This user is already a member",
    });
  }

  choir.members.push(username);
  choir.save();

  user.groups.push(choir._id);
  user.save();

  return choir;
};
