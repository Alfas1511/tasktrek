const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';

require("dotenv").config({
    path: envFile
});

const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const todosRoutes = require("./routes/todos");

app.use(helmet()); // Helmet middleware is used for security purposes.
app.use(express.json()); // for json format form submission
app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true })); // for if we dont know which format data is being submitted

app.use("/static", express.static("public"));// to pass static files from public folder

app.use("/api", todosRoutes);


// // ----------- Environment Management -----------------

// if (app.get("env") === "development") {
//     app.use(morgan("dev"));
//     console.log("Morgan added");
// } else {
//     console.log("Not development");
// }
// app.use(morgan("dev"));// to know about time taken by api requests
// // ------------------------------------------------------

// -------------- Adding Middleware for all routes------------
app.use((req, res, next) => {
    console.log(`${req.method}, ${req.url}`);
    next(); // next() is used to pass the middleware
});
// -------------------------------------------


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server listening in port", PORT);
});