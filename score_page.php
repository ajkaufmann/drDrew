<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<title> Score Page </title>
<style type="text/css">
</style>
</head>
<body>
<?php
// login_ajax.php
require "database.php";

// header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

// $email = isset($_POST['email']) ? $_POST['email'] : NULL;
$username = isset($_POST['username']) ? $_POST['username'] : NULL;
$score = isset($_POST['score']) ? $_POST['score'] : NULL;
// var_dump($_POST);

// Use a prepared statement

  $stmt = $mysqli->prepare("INSERT INTO Leaderboard (username, score) VALUES (?, ?)");
  if(!$stmt){
    echo json_encode(array(
      "success" => false,
      "message" => "Incorrect Username or Password"
    ));
    exit;
  }

  $stmt->bind_param('si', $username, $score);

  $stmt->execute();

  $stmt->close();

// echo json_encode(array(
//   "success" => true
// ));
// exit;

$stmt = $mysqli->prepare("SELECT * FROM Leaderboard ORDER BY score DESC");
if(!$stmt){
  echo json_encode(array(
    "success" => false,
    "message" => "statement failed, User:".$username.", Date:".$score
  ));
  exit;
}

$stmt->execute();

$stmt->bind_result($username, $score, $idNum);
$rows = array();
echo "<div style='text-align: center'>";
echo "<h2>";
echo "Leaderboard:";
$i = 0;
while($stmt->fetch() && $i < 5){
        echo "<h2>";
        echo $i + 1;
        echo ".  ";
        echo $username;
        echo ":  ";
        echo $score;
        echo "<br>";
        echo "<h1>";
        $i = $i+1;
}
echo "<a href='/opening_page.html'><input type='button'value='RETURN TO HOMEPAGE'></a>";
echo "</div>";

$stmt->close();

//echo json_encode($rows);
// header("Location: opening_page.html");
// header("Location: show-users.php");
exit;
?>
</body>
</html>
