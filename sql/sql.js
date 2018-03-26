const mysql=require('mysql');
const connection=mysql.createConnection({
	host:'localhost',
	user:'root',
	port:'3306',
	password:'root',
	database:'tk'
});
connection.connect();
//查询
// var sql='select * from websites';

//新增
var addSql='INSERT INTO websites(id,name,url,alexa,country) VALUES(0,?,?,?,?)';
var addSqlParams=[
['tk工具箱','http://tk.v5cg.com/',1111,'CN'],
['cg任务大厅','http://cggogo.com/',2222,'CN'],
];

//修改
// var modSql='UPDATE websites SET name=?,url=? WHERE id=?';
// var modSqlParams=['rs素材库','http://rs.v5cg.com/',6];

//删除
//var delSql='DELETE FROM websites WHERE id=7';
connection.query(delSql,function(err,result){
	if(err){
		console.log(err);
		return;
	}
	console.log('--------------SELECT---------------');
	console.log(result);
	console.log('---------------------------------------------------\n\n');
});
connection.end();