<?php
header("Access-Control-Allow-Origin: localhost/projectGalore/");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Content-Type: application/json; charset=UTF-8");
//header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


require __DIR__.'/classes/configdb.php';
require_once('vendor/autoload.php');
use \Firebase\JWT\JWT; 


function msg($success,$status,$message,$extra = []){
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ],$extra);
}



// GET DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));
$returnData = [];

//include_once("../includes/config.php");

//include_once("./classes/configdb.php");

if($_SERVER['REQUEST_METHOD'] == "POST" && $_POST['crud_req'] == "signup")
signup($link);



if($_SERVER['REQUEST_METHOD'] == "GET")
logout($link);

if($_SERVER['REQUEST_METHOD'] == "PUT")
update_login($link);

if($_SERVER['REQUEST_METHOD'] == "DELETE")
delete_user($link);

if($_SERVER['REQUEST_METHOD'] == "POST" && $_POST['crud_req'] == "login")
login($link);





function logout($link){};

function update_login($link){};

function delete_user($link){};


                    //login function.
function login($link)
{

   // $returnData = msg(1,201,'Login successful.');

   
    $username = "";
    $password = "";
    $username_err = "";
    $password_err = "";
 

    //$returnData = msg(1,201,'You have successfully loggedin.');

    if (empty(trim($_POST["username"]))) {
        $username_err = "Please enter your username.";
        $returnData = msg(0, 422, $username_err);
    } else {
        $username = trim($_POST["username"]);
    }

    //validate phone number.
    if (empty(trim($_POST["password"]))) {
        $password_err = "Please enter your password.";
        $returnData = msg(0, 422, $password_err);
    } else {
        $password = trim($_POST["password"]);
    }
   // $returnData = msg(0, 422, $username);
 

    //Validating inputs
    if (empty($username_err) && empty($password_err)) {

 //Select statement
        $sql = "SELECT id, username, pass, category FROM userlogin WHERE username = ? ";
        if ($stmt = mysqli_prepare($link, $sql)) {
            //bind the variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_username);
     
            //set parameters
            $param_username = $username;
    
            //executing the statement
            if (mysqli_stmt_execute($stmt)) {
                //store result
                mysqli_stmt_store_result($stmt);

                //checking if username exits, if yes verified password
                if (mysqli_stmt_num_rows($stmt) > 0) {
             
             //Bind result variables
                    mysqli_stmt_bind_result($stmt, $id, $username, $hashed_password, $category);
            
             
                    if (mysqli_stmt_fetch($stmt)) {
                        if (password_verify($password, $hashed_password)) {
                            //if password is correct, start new session
                            // echo $category;
                            $date1 = date("F j, Y"); 
                            $tim = date("g:i a");
                            $login_date = $date1. " at ".$tim;
                            //$login_date=date('y/m/d h:i:s');
                            $sql4= "UPDATE userlogin SET history= 'Last seen on: $login_date' WHERE username='$username' AND category='$category'";
                            // $sql4 = "UPDATE login SET history = 'Last seen on: $login_date' WHERE username=$username";
                            if (mysqli_query($link, $sql4)) {
                                                              
                                $userid = $id;
                                $issuedAt = time();
                                $expirationTime = $issuedAt + 1800;  // jwt valid for 60 seconds from the issued time
                                $payload = array(
                                   // 'userid' => $userid,
                                    'iat' => $issuedAt,
                                    'exp' => $expirationTime,
                                    'iss' => 'localhost/projectGalore/validation',
                                    'aud' => 'localhost/projectGalore/'
                                );
                                $key = 'GALOREkey%visions6689#king%';
                                $alg = 'HS512';
                                $jwt = JWT::encode($payload, $key, $alg);
                                $token = $jwt;
                                $expire=time()+60*60;
                                $httponly='HttpOnly';
                                $path = 'path=/';

                               
                                header ("Set-Cookie: token=$token; $expire; $path; $httponly");
                                $returnData = [
                                    'success' => 1,
                                    'message' => 'You have successfully logged in.',
                                    //'token' => $token,
                                    'category' => $category
                                ];
                                session_start();
                                $_SESSION['userlogin'] = $username;
                               $_SESSION['category'] = $category;
                               $_SESSION["id"] = $userid;
                               // header("location: read_login.php");
                               
                               
                            //$returnData = msg(100, 201, 'You have successfully logged in22.');
                            } else {
                                $returnData = msg(0, 200, "unable to update history");
                            }
                        } else {
                            $password_err = "Wrong password or wrong username.";
                            $returnData = msg(0, 422, $password_err);
                        }
                    }
                } else {
                    $username_err = "Wrong password or wrong username.";
                    $returnData = msg(0, 422, $username_err);
                }
            } else {
                $returnData = msg(0, 422, "Error! Please try again later.");
            }
            //close statement
            mysqli_stmt_close($stmt);
        }
    }
    //close connection
 mysqli_close($link);

    echo json_encode($returnData);
};