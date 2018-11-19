var jdbc = new (require("jdbc"))();
var url = process.env.host;
var user = process.env.user;
var password = process.env.password;

var config = {
  libpath: __dirname + "drivers/RedshiftJDBC42-1.2.16.1027.jar",
  //libs: [__dirname + 'path/to/other/jars.jar'],
  drivername: "com.amazon.redshift.jdbc41.Driver",
  url,
  properties: [["user", user], ["password", password]]
};

exports.handler = async event => {
  jdbc.initialize(config, (err, res) => {
    if (err) {
      console.log(err);
    }
  });

  var genericQueryHandler = (err, results) => {
    if (err) {
      console.log(err);
    } else if (results) {
      console.log(results);
    }

    jdbc.close((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Connection closed successfully!");
      }
    });
  };

  jdbc.open((err, conn) => {
    if (conn) {
      // SELECT statements are called with executeQuery
      jdbc.executeQuery(
        "select * from customer",
        genericQueryHandler
      );
    }
  });
};
