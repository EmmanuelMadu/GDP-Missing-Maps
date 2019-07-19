<?php
	
	$key = "EO7VfPikJMz9KpZJFGaxPUnmg6RPNI7FiAkP82Nz173g"; 

	$request_headers = array(
	  "apikey"=>"EO7VfPikJMz9KpZJFGaxPUnmg6RPNI7FiAkP82Nz173g"
	);

	$imagelink = $_GET['imagelink']; 

	// $link = "https://gateway.watsonplatform.net/visual-recognition/api/v3/classify?url=".$imagelink."&version=2018-03-19&classifier_ids=Version3_295489716"; 

	$link = "https://gateway.watsonplatform.net/visual-recognition/api/v3/classify?url=".$imagelink."&version=2018-03-19&classifier_ids=Version4xchecked_854695263&threshold=0"; 


	$ch = curl_init(); 

	curl_setopt($ch, CURLOPT_HTTPHEADER, $request_headers);
    curl_setopt($ch, CURLOPT_URL, $link); 
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_USERPWD, "apikey:EO7VfPikJMz9KpZJFGaxPUnmg6RPNI7FiAkP82Nz173g");

    $head = curl_exec($ch); 

    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE); 
    curl_close($ch); 
    $jsondata = json_decode($head, true); 
    $jsondata[] = ['code' => $httpCode];
    $jsondata = json_encode($jsondata);
    echo $jsondata;

?>