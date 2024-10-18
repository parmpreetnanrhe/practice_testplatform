<?php
$response = [];
$result = null;

switch ($action) {
  case 'select':
    $data = $dbHandlers->findData($filter, $options);
    $result = !empty($data);
    $response['data'] = $data;
    break;
  case 'insert':
    $result = $dbHandlers->insertData($dataArray);
    if ($returnInsertId == 1) {
      $response['insertId'] = $result;
    }
    // $result = $insertResult->isAcknowledged();
    break;
  case 'insertUpdate':
    $result = $dbHandlers->insertOrUpdateData(['data' => $dataArray, 'existingCheckKeys' => $existingCheckKeys]);
    // $result = $insertResult->isAcknowledged();
    break;
  case 'update':
    $result = $dbHandlers->updateData($filter, $options);
    // $result = $updateResult->isAcknowledged();
    break;
  case 'delete':
    $result = $dbHandlers->deleteData($filter);
    // $result = $deleteResult->isAcknowledged();
    break;
  default:
    $result = false;
    break;
}

if ($result) {
  $response['success'] = 1;
  $response['message'] = "Operation was successful.";
  $response['result'] = $result;
  $response['filter'] = $filter;
  $response['options'] = $options;
} else {
  $response['success'] = 0;
  $response['message'] = "Operation failed.";
  $response['result'] = $result;
  $response['filter'] = $filter;
  $response['options'] = $options;
}
echo json_encode($response, true);
