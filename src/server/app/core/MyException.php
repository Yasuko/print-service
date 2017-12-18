<?php

/**
 * 
 * Exception
 * 
 */

class MyException extends exception
{
	
	public function MyException($error,$message){
		
		try {
			
	
			if($error === "DBGET"){
				
				echo "DBデータ取得時にエラーが発生しました\n".$message;
				
			}elseif($error === "DBSET"){
				
				echo "DBデータ登録時にエラーが発生しました\n".$message;
				
			}elseif($error === "DBUPDATE"){
				
				echo "DBデータ更新時にエラーが発生しました\n".$message;
				
			}elseif($error === "DBDELETE"){
				
				echo "DBデータ削除時にエラーが発生しました\n".$message;
				
			}elseif($error === "FILEOPEN"){
				
				echo "ファイルオープン時にエラーが発生しました\n".$message;
				
			}elseif($error === "FILEREADE"){
				
				echo "ファイル読み込み時にエラーが発生しました\n".$message;
				
			}elseif($error === "FILEDELETE"){
				
				echo "ファイル削除時にエラーが発生しました\n".$message;
				
			}elseif($error === ""){
				
				echo "時にエラーが発生しました\n".$message;
				
			}elseif($error === "DBINSERT"){
				
				echo "時にエラーが発生しました\n".$message;
				
			}elseif($error === "DBINSERT"){
				
				echo "時にエラーが発生しました\n".$message;
				
			}elseif($error === "DBINSERT"){
				
				echo "時にエラーが発生しました\n".$message;
				
			}elseif($error === "DBINSERT"){
				
				echo "時にエラーが発生しました\n".$message;
				
			}else{
				throw new Exception("不明なエラーが発生しました");
			}
		}
		catch (Exception $e) {
			var_dump($e);
		}
	}
	
}
