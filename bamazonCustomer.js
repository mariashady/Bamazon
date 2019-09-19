const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
// const table = require("cli-table");

let connection = mysql.createConnection({
    host: "localhost",
    port: "3306",

    user: "root",
    password: "ilovelamp1",
    database: "Bamazon"
});

connection.connect(function(err) {
    if(err) throw err;
});

let display = function() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.table(results);
    })
};



display();


