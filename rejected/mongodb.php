<?php
header("Access-Control-Allow-Origin: *");//CORS shit
require 'vendor/autoload.php';
$client = new MongoDB\Client("mongodb://localhost:27017");
$db = $client->medDB;
$usersCollection = $db->users;


if($_GET['_limit']!=0){ //limit 0 means unlimited rows !!!-_-
    $q = array(['name'=>array('$regex'=>new MongoDB\BSON\Regex($_GET['_name']))]);
    if(isset($_GET['_age'])) {array_push($q, ['age'=>intval($_GET['_age'])]);}
    $options = ['sort'=>array('timestamp'=>-1),'limit'=>intval($_GET['_limit'])];

    $r = $usersCollection->find(['$and'=>$q], $options);//->sort({"timestamp":-1});
    $assocArray = iterator_to_array($r);
    $encoded_json = json_encode($assocArray);
}
else{ $encoded_json = json_encode([]); }

exit($encoded_json);

// $data = ['name' => 'scary larry' , 'age' => 40, 'photo' => ''];
// $inserted = $usersCollection->insertOne($data);
// if($inserted){echo 'inserted';}
?>