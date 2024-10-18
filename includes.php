<?php
require $_SERVER['DOCUMENT_ROOT'] . '/backEnd/essential/constants.php';
require MONGO_CONC_PATH; // Include mongo db connection
$payLoads = isset($_POST['payLoads']) ? json_decode(base64_decode($_POST['payLoads']), true) : [];
// echo 'VK<pre>';print_r($payLoads); echo '</pre>'; die;
$collectionName = isset($payLoads['collection'])?constant($payLoads['collection']):'questionsData';
$filter = isset($payLoads['filter'])?$payLoads['filter']: [];
$options = isset($payLoads['options'])?$payLoads['options']: [];
$action = isset($payLoads['action'])?$payLoads['action']:'';
$api = isset($payLoads['api'])?$payLoads['api']:'dbHandler';
$dataArray = isset($payLoads['dataArray'])?$payLoads['dataArray']: [];
$existingCheckKeys = isset($payLoads['existingCheckKeys'])?$payLoads['existingCheckKeys']: [];
$returnInsertId = isset($payLoads['returnInsertId'])?$payLoads['returnInsertId']: [];
spl_autoload_register(function ($interfaceName) {
  $file = INTERFACES_DIR . $interfaceName . '.php';
  if (file_exists($file)) {
    include $file;
  }
});

spl_autoload_register(function ($className) {
  $file = CLASSES_DIR . $className . '.php';
  if (file_exists($file)) {
    include $file;
  }
});

spl_autoload_register(function ($factoryName) {
  $file = FACTORIES_DIR . $factoryName . '.php';
  if (file_exists($file)) {
    include $file;
  }
});

$dbType = "mongodb";
$dbHandlers = databaseFactory::create($dbType, $conc, $collectionName);
