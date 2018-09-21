<?php
/***
 * 
 * CS_JS_Loader
 * 
 * 
 ***/



class Twig_Myextension_Linker extends Twig_Extension
{
	
	protected $Path;
	
	public function __construct($pass){
		$this->Path = $pass;
	}
	
	public function getFunctions()
	{
		return array(
			'path'=> new Twig_Function_Method($this,'path')
		);
	}
	
	public function path($path,$propati="")
	{
		
		return $this->Path.$path.$this->propati_pars($propati);
	}
	
	public function getName()
	{
		return 'pathFilter';
	}
	
	private function propati_pars($prop){
		
		if(empty($prop)){
			return "";
		}
		
		return "?".$prop;
	}
	
}