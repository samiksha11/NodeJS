var express = require('express');
var router = express.Router();
var employeeApp = express();
var connection = require('express-myconnection'),
    mysql = require('mysql'),
    path = require('path'),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator');

module.exports = router;

employeeApp.use(expressValidator());

// Create the connection.
// Data is default to new mysql installation and should be changed according to your configuration.
var conn = mysql.createConnection({
    user: "testuser",
    password: "testuser",
    database: "uipractice"
});


var employees = [{"empid":0,"firstName":"kjlkjkl","lastName":"klkjkljkl","emailId":"lkjkljkjl","phoneNum":"134","dob":"2015-03-31T18:30:00.000Z","doj":"2015-04-10T18:30:00.000Z"},{"empid":9,"firstName":"lkklj","lastName":"kljkl","emailId":"lkjklj","phoneNum":"89798798","dob":"2015-04-06T18:30:00.000Z","doj":"2015-04-26T18:30:00.000Z"},{"empid":10,"firstName":"lkjkl","lastName":"kljkl","emailId":"kljkl","phoneNum":"890809809","dob":"2015-04-05T18:30:00.000Z","doj":"2015-04-26T18:30:00.000Z"},{"empid":11,"firstName":"lkjkl","lastName":"kljkl","emailId":"kljkl","phoneNum":"87867867","dob":"2015-04-05T18:30:00.000Z","doj":"2015-04-26T18:30:00.000Z"},{"empid":12,"firstName":"jkljlk","lastName":"kljkl","emailId":"lkjklj","phoneNum":"90809890890","dob":"2015-03-31T18:30:00.000Z","doj":"2015-03-31T18:30:00.000Z"},{"empid":13,"firstName":"kljkl","lastName":"kljkljl","emailId":"kljklj","phoneNum":"90890890","dob":"2015-03-31T18:30:00.000Z","doj":"2015-03-31T18:30:00.000Z"},{"empid":14,"firstName":"kljkl","lastName":"lkjklj","emailId":"lkjklj","phoneNum":"90890890","dob":"2015-03-31T18:30:00.000Z","doj":"2015-03-31T18:30:00.000Z"},{"empid":15,"firstName":"kljkl","lastName":"lkjklj","emailId":"lkjklj","phoneNum":"90890890","dob":"2015-03-31T18:30:00.000Z","doj":"2015-03-31T18:30:00.000Z"},{"empid":16,"firstName":"lkjklj","lastName":"kljjkl","emailId":"kljkljkl","phoneNum":"890890809","dob":"2015-03-31T18:30:00.000Z","doj":"2015-03-31T18:30:00.000Z"},{"empid":20,"firstName":"kjlkjkl","lastName":"klkjkljkl","emailId":"lkjkljkjl","phoneNum":"890809809","dob":"2015-03-31T18:30:00.000Z","doj":"2015-04-10T18:30:00.000Z"},{"empid":21,"firstName":"kjlkjkl","lastName":"klkjkljkl","emailId":"lkjkljkjl","phoneNum":"890809809","dob":"2015-03-31T18:30:00.000Z","doj":"2015-04-10T18:30:00.000Z"}];

/* GET home page. */
router.get('/samplelist', function (req, res, next) {
    res.render('employeelist', {
        employees: employees,
        title: "Employee example",
        header: "Employee"
    });
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Employee Module'});
});

var employee = [{"empid":'',"firstName":"","lastName":"","emailId":"","phoneNum":"","dob":"","doj":""}];

/* GET home page. */
router.get('/employee/create', function (req, res, next) {
    res.render('employee', {
        employee: employee,
        title: "Employee Create",
        header: "Employee"
    });
});

/*------------------------------------------------------
 *  This is router middleware,invoked everytime
 *  we hit url /api and anything after /api
 *  like /api/user , /api/user/7
 *  we can use this for doing validation,authetication
 *  for every route started with /api
 --------------------------------------------------------*/
router.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});


//show the CRUD interface | GET
router.get("/employees",function (req, res, next) {

    console.log("Inside the list function call");

        var query = conn.query('SELECT * FROM employee', function (err, rows) {

            if (err) {
                console.log(err);
                return next("Mysql error, check your query");
            }

            console.log("Data from server:" + JSON.stringify(rows));
            res.render('employeelist', {title: "Employees List", employees: rows});

        });
});

//show the CRUD interface | GET
router.get("/employee/:empid",function (req, res, next) {

    var emp_id = req.params.empid;

    console.log("Inside the get function of employee"+emp_id);

    var query = conn.query('SELECT * FROM employee WHERE empid='+emp_id, function (err, rows) {

        if (err) {
            console.log(err);
            return next("Mysql error, check your query");
        }

        console.log("Data from server:" + JSON.stringify(rows));
        res.render('employee', {title: "Employee Data", employee: rows});

    });
});

//show the CRUD interface | GET
router.delete("/employee/:empid",function (req, res, next) {

    var emp_id = req.params.empid;

    console.log("Inside the delete function of employee"+emp_id);

    var query = conn.query('DELETE FROM employee WHERE empid ='+emp_id, function (err, rows) {

        if (err) {
            console.log(err);
            return next("Mysql error, check your query");
        }

        console.log("Data from server:" + JSON.stringify(rows));
        res.sendStatus(200);

    });
});

// parse a date in yyyy-mm-dd format
function parseDate(input) {
    console.log('input ='+input);
    if (input == '') {
        return '';
    }
    var parts = input.split('-');
    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    var returnDate = new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
    console.log('output=' + returnDate);
    return returnDate;
}

router.put("/employee/:empid",function (req, res, next) {

    var emp_id = req.params.empid;

    console.log("Inside the update function of employee"+emp_id);
    var dobDate = parseDate(req.body.dob);
    var dojDate = parseDate(req.body.doj);

    console.log('dob=' + dobDate + '\t doj=' + dojDate)
    //get data
    var data = {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        emailId:req.body.emailId,
        dob:dobDate,
        doj:dojDate,
        phoneNum:req.body.phoneNum
    };

    console.log("Data:" + data);

    var query = conn.query('UPDATE employee set ? WHERE empid = ? ',[data,emp_id], function (err, rows) {

        if (err) {
            console.log(err);
            return next("Mysql error, check your query");
        }

        console.log("Data from server:" + JSON.stringify(rows));
        res.sendStatus(200);

    });
});


router.post("/employee",function (req, res, next) {

    console.log("Inside the create function of employee");

    //get data
    var data = {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        emailId:req.body.emailId,
        dob:req.body.dob,
         doj:req.body.doj,
        phoneNum:req.body.phoneNum
    };

    console.log("Data:" + JSON.stringify(data));

    var query = conn.query('INSERT INTO employee set ? ',data, function (err, rows) {

        if (err) {
            res.sendStatus(500);
            console.log(err);
            return next("Mysql error, check your query");
        }

        console.log("Data from server:" + JSON.stringify(rows));
        res.sendStatus(200);

    });
});