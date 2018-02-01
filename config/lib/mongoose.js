/**
 * Module dependencies.
 */
import { merge } from "lodash";
import chalk from "chalk";
import path from "path";
import mongoose from "mongoose";

import config from "../config";

// Load the mongoose models
const loadModels = (callback) => {
	// Globbing model files
	config.files.server.models.forEach((modelPath) => {
		require(path.resolve(modelPath));
	});

	if (callback) {
		callback();
	}
};

// Initialize Mongoose
const connect = (callback) => {
	const conf = config.initGlobalConfig();
	mongoose.Promise = conf.db.promise;

	const options = merge(conf.db.options || {});

	mongoose
		.connect(conf.db.uri, options)
		.then((connection) => {
			// Enabling mongoose debug mode if required
			mongoose.set("debug", conf.db.debug);

			// Call callback FN
			if (callback) callback(connection.db);
		})
		.catch((err) => {
			console.error(chalk.red("Could not connect to MongoDB!"));
			console.log(err);
		});
};

const disconnect = (cb) => {
	mongoose.connection.db
		.close((err) => {
			console.info(chalk.yellow("Disconnected from MongoDB."));
			return cb(err);
		});
};

export default {
	loadModels,
	connect,
	disconnect
};
