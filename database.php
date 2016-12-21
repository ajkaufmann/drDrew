<?php

// Content of database.php

$mysqli = new mysqli("54.167.227.152", "phpUser", "allennikka", "news_site");

if($mysqli->connect_errno) {
	printf("Connection Failed: %s\n", $mysqli->connect_error);
	exit;
}

?>
