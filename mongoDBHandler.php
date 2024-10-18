<?php
final class mongoDBHandler implements databaseHandlerInterface
{
  private $conc;
  private $dbName;
  private $collection;
  private $collectionName;

  public function __construct($conc, $collectionName)
  {
    $this->conc = $conc;
    $this->collectionName = $collectionName;
    $this->dbName = MONGO_DB_NAME; // Assuming MONGO_DB_NAME is a constant defined elsewhere
    $this->collection = $this->conc->{$this->dbName}->$collectionName;
  }

  public function insertData($data)
  {
    try {
      if (count($data) > 1) {
        $insertResult = $this->collection->insertMany($data);
      } else {
        $insertResult = $this->collection->insertOne($data[0]);
      }
      if ($insertResult->getInsertedCount() !== count($data) || !$insertResult->getInsertedId()) {
        throw new Exception("Failed to insert some documents.");
      }
      if (count($data) > 1) {
        return true;
      } else {
        return $insertResult->getInsertedId();
      }
    } catch (Exception $e) {
      // Log the error message or handle it as needed
      error_log($e->getMessage());
      return false;
    }
    return $insertResult;
  }

  public function findData($filter = [], $options = [])
  {
    try {
      return json_decode(json_encode($this->collection->find($filter, $options)->toArray(), true), true);
    } catch (Exception $e) {
      // Log the error message or handle it as needed
      error_log($e->getMessage());
      return false;
    }
  }

  public function updateData($filter, $update)
  {
      try {
          // Log the filter and update data
          error_log("Updating data with filter: " . json_encode($filter));
          error_log("Update data: " . json_encode($update));
  
          $updateResult = $this->collection->updateOne($filter, $update);
          
          if ($updateResult->getModifiedCount() === 0 && $updateResult->getUpsertedCount() === 0) {
              throw new Exception("No documents were updated. Filter: " . json_encode($filter));
          }
          return true;
      } catch (Exception $e) {
          // Log the error message
          error_log("Update failed: " . $e->getMessage());
          return false;
      }
  }
  

  public function deleteData($filter)
  {
    try {
      $result = $this->collection->deleteOne($filter);
      if (!$result) {
        throw new Exception("Failed to delete data");
      }
      return true;
    } catch (Exception $e) {
      // Log the error message or handle it as needed
      error_log($e->getMessage());
      return false;
    }
  }
  public function insertOrUpdateData($params)
  {
    try {
      $data = $params['data'];
      $existingCheckKeys = $params['existingCheckKeys'];
      $ids = array_map(function ($doc) use ($existingCheckKeys) {
        $keys = [];
        foreach ($existingCheckKeys as $key) {
          if (isset($doc[$key])) {
            $keys[$key] = $doc[$key];
          }
        }
        return $keys;
      }, $data);

      // Build the query for existing documents with matching key values
      $query = ['$or' => array_map(function ($keys) {
        $conditions = [];
        foreach ($keys as $key => $value) {
          $conditions[$key] = $value;
        }
        return $conditions;
      }, $ids)];

      $existingDocuments = $this->collection->find($query)->toArray();

      // Create arrays for documents to update and insert
      $documentsToUpdate = [];
      $documentsToInsert = [];

      // Create a map of existing documents for quick lookup
      $existingMap = [];
      foreach ($existingDocuments as $doc) {
        $keyValues = [];
        foreach ($existingCheckKeys as $key) {
          if (isset($doc[$key])) {
            $keyValues[$key] = $doc[$key];
          }
        }
        $existingMap[json_encode($keyValues)] = $doc;
      }

      // Separate documents into update and insert arrays
      foreach ($data as $doc) {
        $keyValues = [];
        foreach ($existingCheckKeys as $key) {
          if (isset($doc[$key])) {
            $keyValues[$key] = $doc[$key];
          }
        }
        $key = json_encode($keyValues);
        if (isset($existingMap[$key])) {
          $documentsToUpdate[] = $doc;
        } else {
          $documentsToInsert[] = $doc;
        }
      }

      echo "<pre> documentsToUpdate";
      print_r($documentsToUpdate);
      echo "</pre>";

      echo "<pre> documentsToInsert";
      print_r($documentsToInsert);
      echo "</pre>";

      // Perform bulk update operations
      foreach ($documentsToUpdate as $doc) {
        // Update the updatedDate field to the current date and time
        $doc['updatedDate'] = date('Y-m-d H:i:s');
        $doc['addedDate'] = $doc['addedDate'];
        $updateFilter = [];
        foreach ($existingCheckKeys as $key) {
          if (isset($doc[$key])) {
            $updateFilter[$key] = $doc[$key];
          }
        }
        $updateResult = $this->collection->updateOne(
          $updateFilter,
          ['$set' => $doc],
          ['upsert' => true]
        );

        if ($updateResult->getModifiedCount() === 0 && $updateResult->getUpsertedCount() === 0) {
          throw new Exception("Failed to update document with keys: " . json_encode($updateFilter));
        }
      }

      // Perform bulk insert operations
      if (!empty($documentsToInsert)) {
        $insertResult = $this->collection->insertMany($documentsToInsert);

        if ($insertResult->getInsertedCount() !== count($documentsToInsert)) {
          throw new Exception("Failed to insert some documents.");
        }
      }

      return true;
    } catch (Exception $e) {
      // Log the error message or handle it as needed
      error_log($e->getMessage());
      return false;
    }
  }
}
