const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");



let connection = mysql.createConnection({
    host: "localhost",
    port: "3306",

    user: "root",
    password: "ilovelamp1",
    database: "Bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
});

let display = function () {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
    })
};

function start() {
    inquirer
        .prompt([{

            name: "product",
            type: "input",
            message: "What is the item_id of the product you would like to purchase?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many?"

        }
    ]) .then(function(answer){
        connection.query("SELECT * FROM products WHERE ?",
        {item_id:answer.product}, function (err, res) {
            if (err) throw err;
            if (answer.quantity > res[0].stock_quantity) {
                inquirer
                    .prompt([
                        {

                           name: "continue",
                           type: "input",
                           message: "Out of Stock. Would you like to place another order?",
           
                        }
                    ]).then(function(answer) {
                        if(answer.continue == "yes" || answer.continue == "y") {
                            start()
                        }
                    })
            }else {
                connection.query("UPDATE products SET ? WHERE ? ", [{stock_quantity:res[0].stock_quantity - answer.quantity}, {item_id:answer.product}], function (err, updateRes) {
                    if (err) throw err;
                    console.log("Total: ", res[0].price * answer.quantity);
                })
            }
            
        })
    })
}






display();


