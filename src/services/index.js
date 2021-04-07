const mainRoute = require("express").Router();

//SERVICES ROUTES IMPORTS
const roomRoute = require("../utilities/socket/services/rooms");

//ENDPOINT
mainRoute.use("/socket-room", roomRoute);

//EXPORT
module.exports = mainRoute;
