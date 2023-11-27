<?php
header("Access-Control-Allow-Origin: *");//CORS shit
// header("Content-Type: application/json");
// header("Access-Control-Allow-Method: GET");
// header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Request-With");

$c= pg_connect("host=localhost dbname=test user=postgres password=5432") ;

$q ="SELECT * FROM users WHERE name LIKE '%". $_GET['_name'] ."%'";
if(isset($_GET['_age'])) {$q .= " AND age = '". $_GET['_age'] ."'";}
$q .= " ORDER BY id DESC LIMIT ".$_GET['_limit'];

$d= pg_query($c, $q);
$r= pg_fetch_all($d, MYSQLI_ASSOC);
$encoded_json = json_encode($r);
exit($encoded_json);

// $r= mysqli_fetch_array($d);
// echo 'Name = ';
// exit($r["name"]);

?>