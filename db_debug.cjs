const mysql = require('mysql2/promise');
async function run() {
  const connection = await mysql.createConnection('mysql://42PGUjTrBKWPYeG.root:KzBu4PoNrt2n1iAK@gateway01.ap-southeast-1.prod.alicloud.tidbcloud.com:4000/test?ssl={"rejectUnauthorized":true}');
  try {
    const [rows] = await connection.query('SELECT `id`, `unionId`, `email`, `passwordHash`, `name`, `avatar`, `role`, `createdAt`, `updatedAt`, `lastSignInAt` FROM `users` WHERE `users`.`email` = "phaseoffsec@proton.me" LIMIT 1');
    console.log('Query successful:', rows);
  } catch (e) {
    console.error('MySQL Error:', e);
  }
  connection.end();
}
run();
