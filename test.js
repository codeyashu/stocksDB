var connection = null;
var r = require('rethinkdbdash')({
  port: 28015,
  host: 'localhost',
  db: 'stocks'
});


/*
r.table('test').changes().run()
.then(function(cursor){
    cursor.each(console.log);
})
.error(function(err){
    console.log(err);
})

*/
r.table('company').get(358464).run();

var x = "13606";
r.table('oldtable').get(parseInt(x)).update({name:"yashas"}).run();