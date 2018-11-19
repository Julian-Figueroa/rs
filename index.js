var jdbc = new (require("jdbc"))();
var config = {
  libpath: __dirname + "drivers/RedshiftJDBC42-1.2.16.1027.jar",
  //libs: [__dirname + 'path/to/other/jars.jar'],
  drivername: "com.amazon.redshift.jdbc41.Driver",
  url:
    "jdbc:redshift://analytics-instance.csjicti7mo5h.us-east-1.redshift.amazonaws.com:5439/quipuxanalytics",
  properties: [["user", "rsmasteruser"], ["password", "C1u5T3r_$nalyt1c5%"]]
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
