// Call ApolloServer and startStandaloneServer
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// Connection to MongoDB
import mongoose from "mongoose";
mongoose
  .connect("mongodb://localhost:27017/", { dbName: "Enterprise" })
  .then((r) => console.log("Connected to MongoDB"));

// Load models
import "./models/professions.js";
import "./models/employers.js";
import "./models/professionals.js";
import "./models/application.js";
import "./models/jobPosting.js";
import "./models/resume.js";

// Load data resources
import { typeDefs } from "./data/schema_db.js";
import { resolvers } from "./data/resolvers.js";

// Publish data resources
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Run Apollo Server
const { url } = await startStandaloneServer(server, {
  listen: { port: 2000 },
});

console.log(`Server ready at ${url}`);
