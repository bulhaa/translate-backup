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
				
				// thaanaKeyboard.setHandlerById('dText'+(a),"enable");
					
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
			$('#Arrange-banner').show();
			//$('.dText').thaana();
			
            $('.dText').bind('input', function() {
			// $('.dText').on('input', function() {
					//$(this).change();
				  // $(this)[0].value = 'test';
				  var c = $(this).caret().start;
				  var s = $(this)[0].value;
				  var o = s;
				  
				  s = s.replace('q', 'ް');
				  s = s.replace('w', 'އ');
				  s = s.replace('e', 'ެ');
				  s = s.replace('r', 'ރ');
				  s = s.replace('t', 'ތ');
				  s = s.replace('y', 'ޔ');
				  s = s.replace('u', 'ު');
				  s = s.replace('i', 'ި');
				  s = s.replace('o', 'ޮ');
				  s = s.replace('p', 'ޕ');
				  s = s.replace('a', 'ަ');
				  s = s.replace('s', 'ސ');
				  s = s.replace('d', 'ދ');
				  s = s.replace('f', 'ފ');
				  s = s.replace('g', 'ގ');
				  s = s.replace('h', 'ހ');
				  s = s.replace('j', 'ޖ');
				  s = s.replace('k', 'ކ');
				  s = s.replace('l', 'ލ');
				  s = s.replace('z', 'ޒ');
				  s = s.replace('x', '×');
				  s = s.replace('c', 'ޗ');
				  s = s.replace('v', 'ވ');
				  s = s.replace('b', 'ބ');
				  s = s.replace('n', 'ނ');
				  s = s.replace('m', 'މ');
				  s = s.replace('Q', 'ޤ');
				  s = s.replace('W', 'ޢ');
				  s = s.replace('E', 'ޭ');
				  s = s.replace('R', 'ޜ');
				  s = s.replace('T', 'ޓ');
				  s = s.replace('Y', 'ޠ');
				  s = s.replace('U', 'ޫ');
				  s = s.replace('I', 'ީ');
				  s = s.replace('O', 'ޯ');
				  s = s.replace('P', '÷');
				  s = s.replace('A', 'ާ');
				  s = s.replace('S', 'ށ');
				  s = s.replace('D', 'ޑ');
				  s = s.replace('F', 'ﷲ');
				  s = s.replace('G', 'ޣ');
				  s = s.replace('H', 'ޙ');
				  s = s.replace('J', 'ޛ');
				  s = s.replace('K', 'ޚ');
				  s = s.replace('L', 'ޅ');
				  s = s.replace('Z', 'ޡ');
				  s = s.replace('X', 'ޘ');
				  s = s.replace('C', 'ޝ');
				  s = s.replace('V', 'ޥ');
				  s = s.replace('B', 'ޞ');
				  s = s.replace('N', 'ޏ');
				  s = s.replace('M', 'ޟ');
  
				  if(o!=s){
					$(this)[0].value = s;
					$(this).change();
					$(this).caret(c,c);
				  }

			});
			// $(".dText").change(function() {
				  // alert( "Handler for .change() called.".concat($(this)[0].value) );
				  
				// });	
// $('input[name=myInput]').change(function() {
	  // alert( "Handler for .change() called." );
// });


	// $(".dText").bind("change", function() {    
		// $(this).value = $(this).value;
	// });

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
	
(function($) {
    $.fn.thaana = function(options) {
        var settings = {
            keyboard: 'phonetic'
        };
        return this.each(function() {
            if (options) {
                $.extend(settings, options);
            }
            var keyboards = {
                'phonetic': {
                    33: '!',
                    34: '"',
                    35: '#',
                    36: '$',
                    37: '%',
                    38: '&',
                    39: '\'',
                    40: ')',
                    41: '(',
                    42: '*',
                    43: '+',
                    44: '،',
                    45: '-',
                    46: '.',
                    47: '/',
                    58: ':',
                    59: '؛',
                    60: '>',
                    61: '=',
                    62: '<',
                    63: '؟',
                    64: '@',
                    65: 'ާ',
                    66: 'ޞ',
                    67: 'ޝ',
                    68: 'ޑ',
                    69: 'ޭ',
                    70: 'ﷲ',
                    71: 'ޣ',
                    72: 'ޙ',
                    73: 'ީ',
                    74: 'ޛ',
                    75: 'ޚ',
                    76: 'ޅ',
                    77: 'ޟ',
                    78: 'ޏ',
                    79: 'ޯ',
                    80: '÷',
                    81: 'ޤ',
                    82: 'ޜ',
                    83: 'ށ',
                    84: 'ޓ',
                    85: 'ޫ',
                    86: 'ޥ',
                    87: 'ޢ',
                    88: 'ޘ',
                    89: 'ޠ',
                    90: 'ޡ',
                    91: ']',
                    92: '\\',
                    93: '[',
                    94: '^',
                    95: '_',
                    96: '`',
                    97: 'ަ',
                    98: 'ބ',
                    99: 'ޗ',
                    100: 'ދ',
                    101: 'ެ',
                    102: 'ފ',
                    103: 'ގ',
                    104: 'ހ',
                    105: 'ި',
                    106: 'ޖ',
                    107: 'ކ',
                    108: 'ލ',
                    109: 'މ',
                    110: 'ނ',
                    111: 'ޮ',
                    112: 'ޕ',
                    113: 'ް',
                    114: 'ރ',
                    115: 'ސ',
                    116: 'ތ',
                    117: 'ު',
                    118: 'ވ',
                    119: 'އ',
                    120: '×',
                    121: 'ޔ',
                    122: 'ޒ',
                    123: '}',
                    124: '|',
                    125: '{',
                    126: '~'
                },
                'typewriter': {
                    33: '!',
                    34: '؛',
                    35: '#',
                    36: '$',
                    37: '%',
                    38: '&',
                    39: 'ﷲ',
                    40: ')',
                    41: '(',
                    42: '*',
                    43: '+',
                    44: 'ށ',
                    45: '-',
                    46: 'ޓ',
                    47: 'ޯ',
                    58: 'ޡ',
                    59: 'ފ',
                    60: '\\',
                    61: '=',
                    62: 'ޞ',
                    63: '؟',
                    64: '@',
                    65: '<',
                    66: 'ޟ',
                    67: 'ޏ',
                    68: '.',
                    69: '“',
                    70: '،',
                    71: '"',
                    72: 'ޥ',
                    73: 'ޣ',
                    74: 'ޢ',
                    75: 'ޘ',
                    76: 'ޚ',
                    77: 'ޝ',
                    78: 'ޛ',
                    79: 'ޠ',
                    80: 'ޙ',
                    81: '×',
                    82: '/',
                    83: '>',
                    84: ':',
                    85: 'ޜ',
                    86: 'ޗ',
                    87: '’',
                    88: 'ޕ',
                    89: 'ޤ',
                    90: 'ޖ',
                    91: 'ލ',
                    92: ']',
                    93: '[',
                    94: '^',
                    95: '_',
                    96: '`',
                    97: 'ި',
                    98: 'ޅ',
                    99: 'ސ',
                    100: 'ް',
                    101: 'ާ',
                    102: 'ަ',
                    103: 'ެ',
                    104: 'ވ',
                    105: 'މ',
                    106: 'އ',
                    107: 'ނ',
                    108: 'ކ',
                    109: 'ބ',
                    110: 'ދ',
                    111: 'ތ',
                    112: 'ހ',
                    113: 'ޫ',
                    114: 'ީ',
                    115: 'ު',
                    116: 'ޭ',
                    117: 'ރ',
                    118: 'ޔ',
                    119: 'ޮ',
                    120: 'ޑ',
                    121: 'ގ',
                    122: 'ޒ',
                    123: '÷',
                    124: '}',
                    125: '{',
                    126: '~'
                }
            };
            $(this).bind('input', function() {
                var str = $(this).val(),
                    key = str.substring(str.length - 1),
                    k = key.charCodeAt(0),
                    lastLength = $(this).attr('data-length') ? $(this).attr('data-length') : 0,
                    diff = str.length - lastLength;
                if (keyboards[settings.keyboard][k] && diff == 1) {
                    current = $(this).val().substr(0, str.length - 1);
                    current += keyboards[settings.keyboard][k];
                    $(this).val(current);
                } else {
                    return true;
                }
            });
            $(this).keydown(function() {
                $(this).attr('data-length', $(this).val().length);
            }).keyup(function() {
                $(this).attr('data-length', $(this).val().length);
            });
        });
    };
})(jQuery);;
		 
		  
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