<?php
	$data = $_REQUEST['base64data'];
	$index = $_REQUEST['index'];
	$foldername = $_REQUEST['foldername'];
	$image = explode('base64,',$data);

	if(!file_exists($foldername)){
		mkdir($foldername,0777,true);
	}
	file_put_contents($foldername.'/'.$index.'.jpg',base64_decode($image[1]));
?>