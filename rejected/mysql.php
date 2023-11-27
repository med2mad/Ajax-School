<?php
//CORS shit
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$c= mysqli_connect ("localhost" , "root" , "" , "test") ;
if(!$c){
    exit(mysqli_connect_error());
}

if($_SERVER['REQUEST_METHOD']=='GET') {
    $q = "SELECT * FROM users WHERE name LIKE '%". $_GET['_name'] ."%'";
    if(isset($_GET['_age'])) {$q .= " AND age = '". $_GET['_age'] ."'";}
    $q .= " ORDER BY id DESC LIMIT ".$_GET['_limit'];
    $d = mysqli_query ($c, $q);

    $r= mysqli_fetch_all($d, MYSQLI_ASSOC);
    exit(json_encode($r));
}
if($_SERVER['REQUEST_METHOD']=='POST') {
    //$body = json_decode( file_get_contents('php://input') ); //if payload came as JSON body not FormData ($body->age)
    $name = mysqli_real_escape_string($c, $_POST['name']);
    $age = mysqli_real_escape_string($c, $_POST['age']);
    $photo = mysqli_real_escape_string($c, $_FILES['photo']['name']).time();
    $q = "INSERT INTO users (name, age, photo) VALUES ('". $name ."', '". $age ."', '". $photo ."')";

    mysqli_query ($c, $q);
    move_uploaded_file($_FILES['photo']['tmp_name'], "C:\Users\MED\Desktop\AJAX Paradise\public\uploads/".$photo);

    $data = ["id"=>mysqli_insert_id($c), "photo"=>$photo];
    exit (json_encode($data));
}
if($_SERVER['REQUEST_METHOD']=='PUT') { 
        
    //php PUT requests do not support FormData payload (no $_PUT), 
    //so no uploading files(the only way to upload files via ajax in FormData)
    //the solution is to make the request a POST request

    $t = explode('/', $_SERVER['REQUEST_URI']);
    $id = explode('?', $t[count($t)-1])[0];
    $q = "UPDATE users SET name='".$name."', age='".$age."', photo='".$photo."' WHERE id = ".$id;
}
if($_SERVER['REQUEST_METHOD']=='DELETE') {
    $t = explode('/', $_SERVER['REQUEST_URI']);
    $id = explode('?', $t[count($t)-1])[0];

    $q = "DELETE FROM users WHERE id = ".$id;
    mysqli_query ($c, $q);

    $lastid = explode('=', $t[count($t)-1])[1];
    $q = "SELECT * FROM users WHERE id=(SELECT Max(id) from users where id < '".$lastid."')";
    $d = mysqli_query ($c, $q);
    $r= mysqli_fetch_all($d, MYSQLI_ASSOC);
    echo(json_encode($r));
}

mysqli_close($c);
?>