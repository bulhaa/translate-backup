var definitions;
var manager = angular.module('manager', [])
  .controller('managerController', function($scope) {
    definitions = this;
    definitions.definition = [
      /* {eText:'cat', dText:'ބުޅާ', type:12} */
	]
	
/*    $scope.testValue = 0;
   setInterval(function() {
        console.log($scope.testValue++);
			$('select').material_select();
        $scope.$apply() 
    }, 500); */
	


	
	$(document).delegate('form', 'submit', function(event) {
		var $form = $(this);
		var id = $form.attr('id');
		var data = $form.serialize();
		// eTextValue=$("#eText"+(a)).val();
		var data = $(id).serialize();
		eTextValue=$form[0][0].value;
		dTextValue=$form[0][1].value;
		typeValue=$form[0][3].value;
		$.post("http://localhost:8080/Translator/services/TranslatorS?wsdl/SetDefinitionO",
		{
			eText: eTextValue,
			dText: dTextValue,
			type: typeValue
		}
		,
		function(data){
			$("#feedback").html(data.childNodes[0].childNodes[0].data);
			$("#feedback").show();
		});
		return false;
	});
	
	$("#sentForm").submit(function(){
		if($('#sentForm .progress').is(':visible'))
			return false;
		
		eTextValue=$("#sent_eText").val();
		$('#sentForm .progress').show();
		$.post("http://localhost:8080/Translator/services/TranslatorS?wsdl/getDefinitionsO",
		{
			eText: eTextValue
		}
		,
		function(data){
			var dArr = data.childNodes[0];
				definitions.definition = [];
			for(var a=0; a<dArr.childElementCount; a++){
				var d = dArr.childNodes[a];
				var eText = d.childNodes[0].childNodes[0].data;
				var dText;
				var type = d.childNodes[2].childNodes[0].data;
				if(d.childNodes[1].childNodes[0]!=null)
					dText = d.childNodes[1].childNodes[0].data;
				else
					dText = "";
				// definitions.definition.push({eText:eText, dText:dText, type:type});
				definitions.addDefinition(eText, dText, type);
				// definitions.addDefinition();
				$scope.$apply() 
				$('select').material_select();
				// $('#form'+(a+1)).show();
				// $('#eText'+(a+1)).val(d.childNodes[0].childNodes[0].data);
				$('#eText'+(a)).addClass("valid");
				$('#eTextl'+(a)).addClass("active");
				if(d.childNodes[1].childNodes[0]!=null){
					$('#dTextl'+(a)).addClass("active");
					$('#dText'+(a)).addClass("valid");
				}else
					$('#dText'+(a)).addClass("invalid");
					
				$('#type'+(a)).val(d.childNodes[2].childNodes[0].data);
				if(d.childNodes[2].childNodes[0].data == 2147483647){
					$('#type'+(a)).addClass("invalid");
					$('#type'+(a)).val("");
				}
				$('#type'+(a)).material_select();
				
			$( ".word" ).draggable();
			$( ".position" ).droppable({
			  drop: function( event, ui ) {
				$( this )
				  .addClass( "ui-state-highlight" );
				  /* .find( "p" )
					.html( "Dropped!" ); */
			  }
			});
			
				$('#sentForm .progress').hide();
			}
		});

		return false;
	});
				
	// dictionary.$bindTo($scope, "data"); 
 
     definitions.addDefinition = function(e, d, t) {
      definitions.definition.push({eText:e, dText:d, type:t});
	  
		};

/* 
    todoList.remaining = function() {
      var count = 0;
      angular.forEach(todoList.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };
 
    todoList.archive = function() {
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) todoList.todos.push(todo);
      });
    }; */
  });
  
	manager.filter('reverse', function() {
		  return function(items) {
			return items.slice().reverse();
		  };  
	});
		 
		  
angular.module('staticSelect', [])
 .controller('ExampleController', ['$scope', function($scope) {
   $scope.data = {
    singleSelect: null,
    multipleSelect: [],
    option1: 'option-1',
   };

   $scope.forceUnknownOption = function() {
     $scope.data.singleSelect = 'nonsense';
   };
}]);