const connection = require("./mysql_connector")

const checkLogin = (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {

        connection.query(`SELECT * FROM user WHERE username = '${username}' AND password = '${password}'`, function (error, results, fields) {
            if (results.length) {

                let data = results[0];

                res.status(200).json({
                    ack: 1,
                    msg: "success",
                    data: data
                })

            } else {
                res.status(404).json({
                    ack: 0,
                    msg: "user id and password did not match ",
                })
            }

        });


    } else {
        res.status(404).json({
            ack: 0,
            msg: "Something went wrong "
        })
    }

}

const addUser = (req, res) => {

    const name = req.body.name;
    const address = req.body.address;
    const mobile = req.body.mobile;
    const role = req.body.role;
    const username = req.body.username;
    const password = req.body.password;


    connection.query(`SELECT * FROM user WHERE username = '${username}'`, function (error, results, fields) {
        if (results.length) {

            res.status(404).json({
                ack: 0,
                msg: "this user already exits "
            })

        } else {


            let data = {
                username: username,
                name: name,
                mobile: mobile,
                address: address,
                password: password,
                role: role
            }

            connection.query(`INSERT INTO user SET ?`, data, (error, results, fields) => {

                if (results) {
                    res.status(200).json({
                        ack: 1,
                        msg: "user has inserted "
                    })
                } else {
                    res.status(200).json({
                        ack: 0,
                        msg: `Something Went wrong while inserting  ${error}`
                    })
                }

            })

        }

    });
}

const allData = (req, res) => {


    connection.query(`SELECT * FROM user `, (error, results, fields) => {
        res.status(200).json({
            ack: 1,
            msg: "",
            data: results
        })
    })

}

module.exports = {
    checkLogin: checkLogin,
    addUser: addUser,
    allData: allData
}