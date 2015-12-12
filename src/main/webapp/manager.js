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
		$.post("http://translate-dhivehi.rhcloud.com/Translator/services/TranslatorS?wsdl/SetDefinitionO",
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

	$("#getRule").click(function(){
		positions = $('.position');
		var Order = "";
		var Pattern = "";
		// for(var a=positions.length-1; a>-1; a--){
		for(var a=0; a<positions.length; a++){
			// var d = 
			Pattern += ''.concat(definitions.definition[a].type, ' ');
			if($(positions[positions.length-a-1]).find('.draggable').length>0){
				var i = $(positions[positions.length-a-1]).find('.draggable')[0].id;
				i = i.replace('word', '');
				i = positions.length-i;
				//((int)i)+1
				Order += ''.concat(i, ' ');
			}
			

		}
		
		var ruleValue = Pattern.concat('0 ', Order);
		$.post("http://translate-dhivehi.rhcloud.com/Translator/services/TranslatorS?wsdl/setRuleO",
		{
			eText: ruleValue
		}
		,
		function(data){
			$("#feedback").html(data.childNodes[0].childNodes[0].data);
			$("#feedback").show();
		});
	});

	$("#sentForm").submit(function(){
		if($('#sentForm .progress').is(':visible'))
			return false;
		
		eTextValue=$("#sent_eText").val();
		$('#sentForm .progress').show();
		$.post("http://translate-dhivehi.rhcloud.com/Translator/services/TranslatorS?wsdl/getDefinitionsO",
		{
			eText: eTextValue
		}
		,
		function(data){
			$( ".draggable" ).remove();
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
				
				$('#dText'+(a)).addClass("dv");
				thaanaKeyboard.setHandlerById('dText'+(a),"enable");
					
				$('#type'+(a)).val(d.childNodes[2].childNodes[0].data);
				if(d.childNodes[2].childNodes[0].data == 2147483647){
					$('#type'+(a)).addClass("invalid");
					$('#type'+(a)).val("");
				}
				$('#type'+(a)).material_select();
				$('#form'+(a)).show();
			}
			$('.droppable').show();
			$('#getRule').show();
			$( ".draggable" ).draggable({
			  appendTo: "body",
			  helper: "clone"
			});
			$( ".droppable" ).droppable({
			  activeClass: "ui-state-default",
			  hoverClass: "ui-state-hover",
			  accept: ":not(.ui-sortable-helper)",
			  drop: function( event, ui ) {
				// $( this ).find( ".placeholder" ).remove();
				// $( "<li></li>" ).text( ui.draggable.text() ).appendTo( this );
				$( ui.draggable).appendTo( this );
			  },
/* 			  out: function( event, ui ) {
				$( this )
				  .remove
			  } */
			}).sortable({
			  items: "li:not(.placeholder)",
			  sort: function() {
				// gets added unintentionally by droppable interacting with sortable
				// using connectWithSortable fixes this, but doesn't allow you to customize active/hoverClass options
				$( this ).removeClass( "ui-state-default" );
			  }
			});
			/* 		$( ".position" ).droppable({
 			  drop: function( event, ui ) {
				$( this )
				  .addClass( "ui-state-highlight" );
			  },
			  out: function( event, ui ) {
				$( this )
				  .removeClass( "ui-state-highlight" );
			  }
			}); */
			$('#sentForm .progress').hide();
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