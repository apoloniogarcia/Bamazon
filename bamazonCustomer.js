var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "apple2003",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  //console.log("connected as id " + connection.threadId);
  console.log("")
  console.log("=====WELCOME TO BAMAZON!!!=====")
  console.log("")
  //connection.end();
  listItems();
});

function listItems() {
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log("Product ID - " + res[i].item_id + " | " + res[i].product_name + " | $" + res[i].price);
    }
    console.log("-----------------------------------");
    chooseProduct();
  });
}

function chooseProduct(){
	inquirer.prompt([
		{
      		type: "input",
      		name: "item",
      		message: "Enter the Product ID of what you want to buy - "
      	},
      	{
      		type: "input",
      		name: "quantity",
      		message: "How many ya'll want?"
      	},
    ])
	.then(function(inquirerResponse) {
			console.log("You added item " + inquirerResponse.item + " to your cart!")
	});
	
}