
function zooming()
{
alert("zoom");
}
var valore_ottimo = 0;

function proporziona(src , nome)
{
	$(".jwc_frame").remove();
	$("#croppable").append('<img id="target3" class="crop_me" alt="" src="' + src + '" name="' + nome + '" ondrop="drop(event)" ondragover="allowDrop(event)" onmousedown="opacita()" onmouseup="ricompari()" style="visibility:hidden;"/>');
	$("#target3").one("load",function()
	{
		var width_t = parseInt($("#target3").css("width"));
		var height_t = parseInt($("#target3").css("height"));
		var altezza_px = altezza/0.231;
		var lunghezza_px = (altezza_px*width_t)/height_t;//conversione
		var setta_barra = parseInt(lunghezza_px*0.231);
		if(setta_barra>=90)
		{
			valore_ottimo = setta_barra;
			settaBarra(setta_barra);
		}
		else
		{
			settaBarra(90);
		}
		$(".jwc_frame").remove();
		$("#croppable").append('<img id="target3" class="crop_me" alt="" src="' + src + '" name="' + nome + '" ondrop="drop(event)" ondragover="allowDrop(event)" onmousedown="opacita()" onmouseup="ricompari()" />');
		altezza = $( "#altezza option:selected" ).attr("formato");
		lunghezza = $(".tooltip-inner1").html();
		width_window = $(window).width();
		x = width_window*400/1949;
		rapporto = x/73.5;
		if(lunghezza < 160)
		{
			width +=11
		}
		if(lunghezza >= 160 && lunghezza < 200)
		{
			width +=7
		}
		WindowCrop2(width , height , 0);
		data = $("#target3").attr("src");
		nome = $("#target3").attr("name");
		resize(data , nome , 0);
	});
}


function opacita()
{
	$(".jwc_frame").css("overflow" , "visible");
	$("#target3").css("opacity" , "0.5");
}

function ricompari()
{
	$(".jwc_frame").css("overflow" , "hidden");
	$("#target3").css("opacity" , "1");
}

var vera_lunghezza = 0;


function WindowCrop2(width , height , option)
{
	$('.crop_me').jWindowCrop(
	{
		targetWidth: width,
		targetHeight: height,
		loadingText: '',
		onChange: function(result) 
		{
			$('#crop_x').text(result.cropX);
			$('#crop_y').text(result.cropY);
			$('#crop_w').text(result.cropW);
			$('#crop_h').text(result.cropH);
			if(option == 1)
			{
				$('#target3').unbind('mousewheel');	
				$('#target3').bind('mousewheel', function(e)
				{
					if(!$("#target3").is(".ui-draggable") )
					{
						$('#target3').draggable();
					}
					$('#target3').attr("draggable" , "yes");
					var evt = window.event || e //equalize event object     
					evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible               
					var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta //check for detail first, because it is used by Opera and FF
					valore = $("#operazioni0").attr("disabled");
					if(delta > 0) 
					{
						if(valore == "disabled")
						{
							width = $('#target3').width();
							width = width + 10
							$('#target3').css('width' , width);
						}
						else
						{
							angolo = getRotationDegrees($("#target3"))
							angolo = angolo + 1
							$("#target3").css("transform" , "rotate("+angolo+"deg)");
							$("#angolazione").val(angolo);
						}
					//scroll up
					}
					else
					{
						if(valore == "disabled")
						{
							width = $('#target3').width();
							if(width > 150)
							{
								width = width - 10
							}
						$('#target3').css('width' , width);
						}
						else
						{
							angolo = getRotationDegrees($("#target3"))
							angolo = angolo - 1
							$("#target3").css("transform" , "rotate("+angolo+"deg)");
							$("#angolazione").val(angolo);
						}
					//scroll down
					}  

				});
			}
		}
	});
}

function resize(src , nome ,ridimensiona) //jWindowCrop-master/images/dock.jpg
{
	$("#target3").removeAttr('draggable');
	$("#target3").css("transform" , "rotate(0deg)");
	var width_t = parseInt($("#target3").css("width"));
	var height_t = parseInt($("#target3").css("height"));
	var altezza_px = altezza/0.231;
	var lunghezza_px = (altezza_px*width_t)/height_t;//conversione
	var setta_barra = parseInt(lunghezza_px*0.231);
	valore_ottimo = setta_barra;
	isDraggable = $("#target3").is(".ui-draggable") ;
	if(isDraggable)
	{
		$("#target3").draggable('destroy');
	}
	width_window = $(window).width();
	x = width_window*400/1949;
	rapporto = x/73.5;
	altezza = $( "#altezza option:selected" ).attr("formato");
	lunghezza = $(".tooltip-inner1").html();
	height = altezza*rapporto;
	width = lunghezza*rapporto;
	if(lunghezza < 160)
	{
		width +=11
	}
	if(lunghezza >= 160 && lunghezza < 200)
	{
		width +=7
	}
	$(".tipologia_formato").html(altezza + "cm");
	altezza = parseInt(altezza);
	if(altezza == 40)
	{
		valore = 140;
	}
	else
	{
		valore = altezza*3.1;
	}
	$(".tipologia_formato").css("top" , valore);
	$("#b").html(lunghezza);
	$("#h").html(altezza);
	$("#formato_scelta").val(lunghezza + "X" + altezza );
	$("#carta_scelta").val($("#tipo_di_carta option:selected").val());
	current_src = $("#target3").attr("src");
	if(current_src == src)
	{
		$("#croppable").append($("#target3"));
		$(".jwc_frame").remove();
	}
	else
	{
		proporziona(src,nome);
	}
	$("#target3").css("visibility","visible");
	WindowCrop2(width , height , 1);
}

//SliderBar

function settaBarra(value)
{
	var tooltip = '<div class="tooltip1"><div class="tooltip-inner1">' + value + '</div></div>';
	$('#slider-range').slider('value', value , true);
	$('.ui-slider-handle').html(tooltip);

	for(i=0;i<=250;i++)
	{
		$(".tooltip-inner1").css("background-color","white");
		$(".tooltip-inner1").css("color","black");
	}

	if(value > 90)
	{
		$(".tooltip-inner1").css("background-color","green");
		$(".tooltip-inner1").css("color","white");
	}
}


$("#slider-range").ready(function()
{
	var initialValue = 90;
	var sliderTooltip = function(event, ui) 
	{
		var curValue = ui.value || initialValue;
		var tooltip = '<div class="tooltip1"><div class="tooltip-inner1">' + curValue + '</div></div>';
		if(curValue >= 90)
			$('.ui-slider-handle').html(tooltip);
		else
			return false;
		if(curValue == valore_ottimo)
		{
			$(".tooltip-inner1").css("background-color","green");
			$(".tooltip-inner1").css("color","white");
		}
		data = $("#target3").attr("src");
		current_width = $(".jwc_frame").css("width");
		nome = $("#target3").attr("name");
		resize(data , nome , 0);
	}

	$("#slider-range").slider(
	{
		value: initialValue,
		min: 0,
		max: 250,
		step: 1,
		//values: [90 , 110],
		create: sliderTooltip,
		slide: sliderTooltip
	});
	$("#slider-range").slider( "option", "disabled", true );
});

//SliderBar

function allowDrop(ev) {
	ev.preventDefault();
}

var globa = 0;

function drag(ev) {
ev.dataTransfer.setData("src", ev.target.src);
ev.dataTransfer.setData("title", ev.target.title);
}

function drop(ev) {
	ev.preventDefault();
	$("[check='check']").removeAttr("check");
	var data = ev.dataTransfer.getData("src");
	var title =  ev.dataTransfer.getData("title");
	var idpreview = $('[src="' + data + '"]').parent().attr("id");
	$("#" + idpreview + " .file-thumbnail-footer").attr("check","check");
	$("#ordinazione").removeAttr("disabled");
	$("#slider-range").slider( "option", "disabled", false );
	var url =$('[blob="' + data + '"]').attr("url");
	resize(url , title , 0);
	ev.target.appendChild(document.getElementById(data));
}

var GlobalWidth=0;
var GlobalHeight=0;
$(function() 
{
	$('.selectpicker').selectpicker(
	{
		style: 'btn-info',
		size: 4
	});
});

function doppioclick(blob)
{
	$("[check='check']").removeAttr("check");
	var url = $('[blob="' + blob + '"]').attr("url");
	var name = $('[blob="' + blob + '"]').attr("name");
	var idpreview = $('[src="' + blob + '"]').parent().attr("id");
	$("#" + idpreview + " .file-thumbnail-footer").attr("check","check");
	$("#ordinazione").removeAttr("disabled")
	$("#slider-range").slider( "option", "disabled", false );
	resize(url,name , 0);
}

function getRotationDegrees(obj) 
{
	var matrix = obj.css("-webkit-transform") ||
	obj.css("-moz-transform")    ||
	obj.css("-ms-transform")     ||
	obj.css("-o-transform")      ||
	obj.css("transform");
	if(matrix !== 'none') 
	{
		var values = matrix.split('(')[1].split(')')[0].split(',');
		var a = values[0];
		var b = values[1];
		var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
	} 
	else 
	{ 
		var angle = 0; 
	}
	return (angle < 0) ? angle + 360 : angle;
}


function rotatedSize(angle_in_degrees , width , height)
{
	var angle = angle_in_degrees * Math.PI / 180,
	sin   = Math.sin(angle),
	cos   = Math.cos(angle);
	var x1 = cos * width,
	y1 = sin * width;
	var x2 = -sin * height,
	y2 = cos * height;
	var x3 = cos * width - sin * height,
	y3 = sin * width + cos * height;
	var minX = Math.min(0, x1, x2, x3),
	maxX = Math.max(0, x1, x2, x3),
	minY = Math.min(0, y1, y2, y3),
	maxY = Math.max(0, y1, y2, y3);
	var rotatedWidth  = maxX - minX,
	rotatedHeight = maxY - minY;
	var array = {width: rotatedWidth , height: rotatedHeight};
	return array;
}

function validate(evt) 
{
	var theEvent = evt || window.event;
	var key = theEvent.keyCode || theEvent.which;
	key = String.fromCharCode( key );
	var regex = /[0-9]|\./;
	var numero = $("#angolazione").val();
	numero = numero + key;
	var integernumber = parseInt(numero);
	if( !regex.test(key) || integernumber > 359 ) 
	{
		theEvent.returnValue = false;
		if(theEvent.preventDefault) 
			theEvent.preventDefault();
	}
}

function metti_tipi_carta()
{
	formato = $("#altezza option:selected").attr("formato");
	$.getJSON( "ajax/test.json", function( data ) 
	{
		$('#tipo_di_carta')
		.find('option')
		.remove()
		.end()
		$.each( data, function( key, val ) 
		{
			if(val.formato == formato)
			{
				for (i = 0 ; i<val.carta.length;i++)
				{
					$('#tipo_di_carta')
					.append($("<option></option>")
					.attr("formato",key)
					.text(val.carta[i])); 
					$('#tipo_di_carta').selectpicker('refresh');
				}
			}
		});
	});
}

$(document).ready(function()
{
	$.getJSON( "ajax/test.json", function( data ) 
	{
		var items = [];
		$('#altezza')
		.find('option')
		.remove()
		.end()
		$.each( data, function( key, val ) 
		{
			$('#altezza').append($("<option></option>")
			.attr("formato",val.formato)
			.text(val.text)); 
			$('#altezza').selectpicker('refresh');
		});
		metti_tipi_carta();
	});

	$("#input-dim-1").click(function()
	{
		$(".file-drop-zone").css("overflow-y" , "auto");
		$(".file-drop-zone").css("height" , "200px");
	});

	$(window).resize(function()
	{
		data = $("#target3").attr("src");
		nome = $("#target3").attr("name");
		resize(data , nome , 1);
	});

	$('.crop_me').change(function()
	{
		alert("ciao");
	})

	$("[name='operazioni']").click(function()
	{
		num = $(this).attr("id")[10];
		num = parseInt(num);
		$(this).attr("disabled","true");
		num = 1 - num
		$("#operazioni" + num).removeAttr("disabled");
	});

	$("#ordinazione").click(function()
	{
		$("#carta_scelta").val($("#tipo_di_carta option:selected").val());
	});

	$("#decrementa").click(function()
	{
		var valore = $("#quantita").val();
		valore ++;
		$("#quantita").val(valore);
	});

	$("#incrementa").click(function()
	{
		var valore = $("#quantita").val();
		if(valore != 1)
		{
			valore --;
		}
		$("#quantita").val(valore);
	});

	$("#decrementa2").click(function()
	{
		var valore = $("#angolazione").val();
		if(valore != 359)
		{
			valore ++;
		}
		else
		{
			valore = 0;
		}
		$("#angolazione").val(valore);
		$("#target3").css("transform" , "rotate("+$("#angolazione").val()+"deg)");
	});

	$("#incrementa2").click(function()
	{
		var valore = $("#angolazione").val();
		if(valore != 0)
		{
			valore --;
		}
		else
		{
			valore = 359;
		}
		$("#angolazione").val(valore);
		$("#target3").css("transform" , "rotate("+$("#angolazione").val()+"deg)");
	});

	$(".fine").click(function()
	{
		source = $("#target3").attr("src");
		name2 = $("#target3").attr("name");
		left2 = parseInt($("#target3").position().left);
		top2 = parseInt($("#target3").position().top);
		base_riquadro2 = parseInt($(".jwc_frame").width());
		altezza_riquadro2 = parseInt($(".jwc_frame").height());
		width2 = $("#target3").width();
		height2 = $("#target3").height();
		tipo_carta2 = $("#tipo_di_carta option:selected").val();
		altezza2 = parseInt($("#h").html());
		base2 = parseInt($("#b").html());
		quantita2 = $("#quantita").val();
		nome_cliente2 = $("#nome_cliente").val();
		cognome_cliente2 = $("#cognome_cliente").val();
		indirizzo_cliente2 = $("#indirizzo_cliente").val();
		telefono_cliente2 = $("#telefono_cliente").val();
		nota_cliente2 = $("#nota_cliente").val();
		angolo2 = getRotationDegrees($("#target3"))
		$("#target3").css("transform" , "rotate(0deg)");
		$("#target3").css("transform" , "rotate("+angolo2+"deg)");
		if(angolo2 != 0)
		{
			var array = rotatedSize(angolo2 , width2 , height2);
			width2 = parseInt(array['width']);
			height2 = parseInt(array['height']);
		}
		$("#loading").removeAttr("class");
		$("#progress_bar").removeAttr("class");
		$("#caricamento").css("background-image","url("+ source +")");
		$("#caricamento").css("background-size", "auto 340px");
		$("#caricamento").css("background-repeat", "no-repeat");
		$("#caricamento").css("background-position", "center");

		$.ajax(
		{
			xhr: function()
			{
				var xhr = new window.XMLHttpRequest();
				xhr.upload.addEventListener("progress", function(evt)
				{
					if (evt.lengthComputable) 
					{
						var percentComplete = evt.loaded / evt.total;
						console.log(percentComplete);
						if(percentComplete == 1 && $("#progress_bar2").html() != "99")
						{
						$("#progress_bar2").css("width", "99%");
						$("#progress_bar2").html("99%");
						}
						else
						{
						$("#progress_bar2").css("width", (percentComplete*100) + "%");
						$("#progress_bar2").html(percentComplete*100 + "%");
						}
					}
				}, false);
				xhr.addEventListener("progress", function(evt)
				{
					if (evt.lengthComputable) 
					{
						var percentComplete = evt.loaded / evt.total;
						console.log(percentComplete);
					}
				}, false);
				return xhr;
			},
			url: "/cgi-bin3/p.py",
			type: "POST",
			data: {name: name2 ,
			nome_cliente: nome_cliente2 ,
			cognome_cliente: cognome_cliente2 ,
			indirizzo_cliente: indirizzo_cliente2 ,
			telefono_cliente: telefono_cliente2 ,
			nota_cliente: nota_cliente2 ,
			quantita: quantita2 ,
			tipo_carta: tipo_carta2 ,
			base: base2 ,
			altezza: altezza2 ,
			top: top2 ,
			left: left2 ,
			width: width2 ,
			height: height2 ,
			base_riquadro: base_riquadro2 , 
			altezza_riquadro: altezza_riquadro2 ,
			angolo: angolo2, 
			src: source},
			success: function(response)
			{
				$("#progress_bar2").css("width","0%");
				$("#progress_bar2").html("0%");
				$("#loading").attr("class" , "hidden");
				$("#progress_bar").attr("class" , "hidden");
				$("#send_btn2").click();
				alert("Inviato con successo!");
			},
			error: function (xhr, ajaxOptions, thrownError) 
			{
				$("#loading").attr("class" , "hidden");
				alert("Errore status: " + xhr.status + " thrownError: " + thrownError + " ajaxOptions: " + ajaxOptions)
			}
		});	
	});


	$("#angolazione").on("change paste keyup", function() 
	{
		$("#target3").css("transform" , "rotate("+$("#angolazione").val()+"deg)");
	});

	$("#altezza").change(function()
	{
		metti_tipi_carta();
		$("#target3").css("visibility" , "hidden");
		data = $("#target3").attr("src");
		nome = $("#target3").attr("name");
		proporziona(data,nome);
		resize(data , nome , 0);
		$("#target3").css("visibility" , "visible");
	})


	function handleFileSelect(evt) 
	{
		var files = evt.target.files; // FileList object
		$('.thumb').remove();

		for (var i = 0, f; f = files[i]; i++) 
		{
			if (!f.type.match('image.*')) 
			{
				continue;
			}    
			formdata = new FormData("img" , f);      
			$.ajax(
			{
				url: '/cgi-bin3/reduce.py',
				type: 'POST',
				data: formdata,
				async: false,
				success: function(data) 
				{
					alert(data);
				},
				cache: false,
				contentType: false,
				processData: false
			});

			var reader = new FileReader();
			// Closure to capture the file information.
			reader.onload = (function(theFile) 
			{
				return function(e) 
				{
					// Render thumbnail.
					var span = document.createElement('span');
					var src = e.target.result;
					$("#casella").val(src);
					span.innerHTML = ['<img id="'+ escape(theFile.name) +'"draggable="true" ondragstart="drag(event)" class="thumb" src="', e.target.result,
					'" title="', escape(theFile.name), '" width="75px"/><span class="nodisplay" style="width:70px;">' + escape(theFile.name) + '</span>'].join('');
					document.getElementById('list2').insertBefore(span, null);
				};
			})(f);
			// Read in the image file as a data URL.
			reader.readAsDataURL(f);
		}
	}

	document.getElementById('fileURL').addEventListener('change', handleFileSelect, false);

});


function selezionaImg()
{
("div > [title='12.JPG']").css("color" , "grey");
}