var connection = null;
var r = require('rethinkdbdash')({
  port: 28015,
  host: 'localhost',
  db: 'stocks'
});

r.table('test').changes().run()
.then(function(cursor){
    cursor.each(console.log);
})
.error(function(err){
    console.log(err);
})

//r.tableCreate('test123').run(function(err,conn))