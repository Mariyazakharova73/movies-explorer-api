const BAD_REQUEST_ERROR = 400;
const UNAUTHORIZAD_ERROR = 401;
const FORBIDDEN_ERROR = 403;
const NOT_FOUND_ERROR = 404;
const CONFLICT_ERROR = 409;
const INTERNAL_SERVER_ERROR = 500;

const LINK_CHECKING = /(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/;

module.exports = {
  BAD_REQUEST_ERROR,
  UNAUTHORIZAD_ERROR,
  FORBIDDEN_ERROR,
  NOT_FOUND_ERROR,
  LINK_CHECKING,
  CONFLICT_ERROR,
  INTERNAL_SERVER_ERROR,
};
