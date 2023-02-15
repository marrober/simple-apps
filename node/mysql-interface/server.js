//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');
var app     = express();
var eps     = require('ejs');
var got     = require('got');
var mysql   = require('mysql');
var http   = require('http');
var convert = require('xml-js');

app.engine('html', require('ejs').renderFile);

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

// Get the DB parameters - yeah, flat text for password is insanely silly
var dbhost = process.env.DBHOST;
var dbuser = process.env.DBUSER;
var dbpassword = process.env.DBPASSWORD;

// MySQL testing - requires a MySQL Pod running *and* an ENV set to the host (DBHOST)
app.get('/dbcreate', function (req,res) {
    console.log("DBCONNECT request received....");
    console.log("Connection info set to " + dbhost + ":" + dbuser + ":" + dbpassword );

    var connection = mysql.createConnection({host:dbhost,user:dbuser,password:dbpassword,database:sampledb});
    console.log("Created connection object....");

    connection.connect(function(err) {
        if( err ) {
            console.log( "Failed to connect.");
            throw err;
        }

        conole.log( "Connected to host " + dbhost + "...." );

        console.log( "Creating table customers....");
        var sql = "CREATE TABLE customers (name VARCHAR(25), code VARCHAR(10))";
        connection.query(sql, function (err, result) {
            if (err) {
                console.log( "Error occurred when attempting to create the table")
                throw err;
            }
            console.log("Table created....");
            console.log( "Inserting data into customers....");
            sql = "INSERT INTO customers (name,code) VALUES ('Mark','10')";
            connection.query(sql, function (err, result) {
                if (err) {
                    console.log( "Error occurred when attempting to write to the table")
                    throw err;
                }
                console.log("Data created....");
                console.log( "Selecting data from customers....");
                sql = "SELECT * FROM customers";
                connection.query(sql, function (err, result) {
                    if (err) {
                        console.log( "Error occurred when attempting to select data")
                        throw err;
                    }
                    console.log("Results from select " + result );
                });
            });
        });
    });
});

app.get('/getrows', function (req,res) {
    console.log("DBCONNECT request received....");
    console.log("Connection info set to " + dbhost + ":" + dbuser + ":" + dbpassword );

    var connection = mysql.createConnection({host:dbhost,user:dbuser,password:dbpassword,database:sampledb});
    console.log("Created connection object....");

    connection.connect(function(err) {
        if( err ) {
            console.log( "Failed to connect.");
            throw err;
        }

        console.log( "Connected to host " + dbhost + "...." );
        console.log( "Selecting data from customers....");
        sql = "SELECT * FROM customers";
        connection.query(sql, function (err, result)  {   
            if (err) {
                console.log( "Error occurred when attempting to select data")
                throw err;
            }
            console.log("Results from select " + result );
        });
    });
});
    

// error handling
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something bad happened!');
});

app.listen(port, ip);
console.log('Server running on ' + ip + ':' + port);

