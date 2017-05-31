/*
	SVG Library
	Parts Copyright 2016 (Bryan) svgility.com
	Copyright 2017 Daniel Mulholland dan.mulholland@gmail.com

	Licensed under the Apache License, Refer LICENSE.txt for details
 */
var svgility = (function(){

	"use strict";

	var svgInfrastructure = {
		// DataRouting
		dataRouting: function(elementLink,custSet){

			custSet = custSet || {};

			// Check for type of parent conversion
			if(elementLink == '#svgility-box' || elementLink == '.svgility-box' || elementLink == '' || elementLink == undefined) {
				// check if user tries to use svgility-box class selector or nothing
				elementLink = document;
			} else if(elementLink.charAt(0) == '#') {
				// check if user has set a parent ID container
				elementLink = document.getElementById(elementLink.slice(1));
			} else if (elementLink.charAt(0) == '.') {
				// check if user has set a parent Class container
				elementLink = document.getElementsByClassName(elementLink.slice(1))[0];
			} else {
				// check if user tries to use anything else
				elementLink = document;
			};

			// Initiates and removes default CSS
			svgInfrastructure.defaultBreak(elementLink);
			// Original Layout Data Grab
			svgInfrastructure.dataGrab(elementLink);
			var svgDataAcquire = svgInfrastructure.dataGrab(elementLink),
			loadOff = elementLink.getElementsByClassName('svgility-set')[0];

			// Initially set parent div's opacity to 0
			loadOff.style.opacity = "0";

			// Default Controls Options
			var defaultSettings = {
				lyteBox: true, // true or false. default false.
				text: true,
				columns:6,
				verticalTrim:0, // pixel
				padding: '0',
				evenOdd: false, // true or false. default false.
				invert: {
					active: false,
					direction:'normal'
				},
				breakpoints: {
					targetThis: '',
					breakHere: [{
						setWidth: 800,
						column: 3,
					},
					{
						setWidth: 480,
						column: 2,
					}]}
			};
			// Check if custSet exists
			if (Object.getOwnPropertyNames(custSet).length === 0 || custSet == undefined || custSet == null) {
				custSet = defaultSettings;
			};
			// Check if lyteBox exists
			if (custSet.hasOwnProperty('lyteBox') == false) {
				custSet.lyteBox = defaultSettings.lyteBox;
			};
			// Check if columns exists
			if (custSet.hasOwnProperty('columns') == false || custSet.hasOwnProperty('columns') == true && isNaN(custSet.columns) == true) {
				custSet.columns = defaultSettings.columns;
			};
			// Check if verticalTrim exists
			if (custSet.hasOwnProperty('verticalTrim') == false || custSet.hasOwnProperty('verticalTrim') == true && isNaN(custSet.verticalTrim) == true) {
				custSet.verticalTrim = defaultSettings.verticalTrim;
			};
			// Check if text exists
			if (custSet.hasOwnProperty('text') == false) {
				custSet.text = defaultSettings.text;
			};
			// Check if invert exists
			if (custSet.hasOwnProperty('invert') == false) {
				custSet.invert = defaultSettings.invert;
			};
			// Check if breakpoints exists
			if (custSet.hasOwnProperty('breakpoints') == false) {
				custSet.breakpoints = defaultSettings.breakpoints;
			};

			// svgInfrastructure Calls
			// Initiates HTML syntax conversion to HTML SVG
			svgInfrastructure.svgProcess(
				svgInfrastructure.svgShape(custSet,svgInfrastructure.svgbreakPoints(custSet)),
				custSet,
				svgDataAcquire,
				svgInfrastructure.svgbreakPoints(custSet),
				elementLink
			);
			// Initiates HTML SVG padding control
			svgInfrastructure.svgPadding(
				custSet,
				svgInfrastructure.svgbreakPoints(custSet)[5],
				elementLink
			);
			// Initiates Modal Block
			svgInfrastructure.dataModal(custSet,elementLink);

			// svgInfrastructure Calls Doulbe-fire
			var jumpOn = 0,
			trigger = setInterval(function(){

				jumpOn++;
				// Initiates HTML SVG positioning
				svgInfrastructure.placementBlock(
					svgInfrastructure.svgShape(custSet,svgInfrastructure.svgbreakPoints(custSet)),
					custSet,
					svgInfrastructure.svgbreakPoints(custSet),
					elementLink
				);

				if(jumpOn == 2) {
					loadOff.style.opacity = "1";
					clearInterval(trigger);
				};

			},200);

			// Window Resize Triggers
			window.addEventListener("resize", function delayResize() {
				// svgInfrastructure Delay Recall
				setTimeout(function(){
					// Initiates HTML syntax conversion to HTML SVG
					svgInfrastructure.svgProcess(
						svgInfrastructure.svgShape(custSet,svgInfrastructure.svgbreakPoints(custSet)),
						custSet,
						svgDataAcquire,
						svgInfrastructure.svgbreakPoints(custSet),
						elementLink
					);
					// Initiates HTML SVG padding control
					svgInfrastructure.svgPadding(
						custSet,
						svgInfrastructure.svgbreakPoints(custSet)[5],
						elementLink
					);
					// Initiates HTML SVG positioning
					svgInfrastructure.placementBlock(
						svgInfrastructure.svgShape(custSet,svgInfrastructure.svgbreakPoints(custSet)),
						custSet,
						svgInfrastructure.svgbreakPoints(custSet),
						elementLink
					);
					// Initiates Modal Block
					svgInfrastructure.dataModal(custSet,elementLink);
				},200);
			}, false);

		},
		// CSS Default Remover
		defaultBreak: function(elementKey){
			var iDGrab = elementKey.getElementsByClassName('svgility-box')[0],
			classGrab = ['fallset'],
			regenx;
			for (var i = 0, j = classGrab.length; i < j; i++) {
				if((' ' + iDGrab.className + ' ').indexOf(' ' + classGrab[i] + ' ') > -1 == true || (' ' + iDGrab.className + ' ').indexOf(' ' + classGrab[i] + ' ') > -1 == true) {
					regenx = new RegExp(classGrab[i],"g");
					iDGrab.className = iDGrab.className.replace(regenx, "svgengage");
				};
			};
		},
		// DataGrab
		dataGrab: function(elementKey){
			////////// (DO NOT TOUCH!!) //////////
			var	galBlock = elementKey.getElementsByClassName('svgility-block'),
			svgURL = [],
			svgURLImg = [],
			svgSpanText = [],
			i,
			j;
			for (i = 0, j = galBlock.length; i < j; i++) {
				svgURL.push(galBlock[i].getElementsByTagName('a')[0].getAttribute('href'));
				svgURLImg.push(galBlock[i].getElementsByTagName('img')[0].getAttribute('src'));
				svgSpanText.push(galBlock[i].getElementsByTagName('span')[0].innerHTML);

			}
			return [svgURL,svgURLImg,svgSpanText];
		},
		// SVGProcess
		svgProcess: function(svgShape, svgSettings, svgData, svgBreaks, elementKey){
			////////// (DO NOT TOUCH!!) //////////
			var svgViewBoxWidth,
			svgViewBoxHeight,
			svgClipathId,
			pathPointPoly,
			svgURL,
			svgURLImg,
			svgSpanText,
			galBlock = elementKey.getElementsByClassName('svgility-block'),
			randoSig = Math.floor(Math.random() * (100000 - 50 + 1)) + 50,
			k=0,
			rowLock = true,
			i,
			j,
			inversionBlock,
			parityBlock;

			// Check invert settings
			if(svgBreaks[7].direction == 'all') {
				parityBlock = 2;
			} else if (svgBreaks[7].direction == 'reverse') {
				parityBlock = 1;
			} else {
				parityBlock = 0;
			};

			// HTML to SVG HTML conversion block
			for (i = 0, j = galBlock.length; i < j; i++) {
				// Get and set data from SVG shape library
				svgViewBoxWidth = svgShape.shapeWidth;
				svgViewBoxHeight = svgShape.shapeHeight;
				pathPointPoly = svgShape.pathPoints;
				svgClipathId = svgShape.clipId + ("-" + i + 1);
				// invert block
				// invert all
				if (parityBlock == 2) {
					if (svgBreaks[7].active == true && rowLock == true && k < svgBreaks[0]) {
						inversionBlock =
						'transform="translate('+
						svgViewBoxWidth+
						','+
						svgViewBoxHeight+
						') scale(1) rotate(180)"';
					} else if (rowLock == true) {
						k=0;
						rowLock = false;
					};
				} else if (svgBreaks[4] == true ){
					// when evenOdd is true invert per row
					if (parityBlock == 1) {
						// reverse
						if (svgBreaks[7].active == true && rowLock == true && k < svgBreaks[0]) {
							inversionBlock =
							'transform="translate('+
							svgViewBoxWidth+
							','+
							svgViewBoxHeight+
							') scale(1) rotate(180)"';
						} else if (rowLock == true) {
							k=0;
							rowLock = false;
						};

						if (svgBreaks[7].active == true && rowLock == false && k < svgBreaks[0] - 1) {
							inversionBlock = '';
						} else if (rowLock == false) {
							k=0;
							inversionBlock =
							'transform="translate('+
							svgViewBoxWidth+
							','+
							svgViewBoxHeight+
							') scale(1) rotate(180)"';
							rowLock = true;
						};
					} else {
						// normal
						if (svgBreaks[7].active == true && rowLock == true && k < svgBreaks[0]) {
							inversionBlock = '';
						} else if (rowLock == true) {
							k=0;
							rowLock = false;
						};

						if (svgBreaks[7].active == true && rowLock == false && k < svgBreaks[0] - 1) {
							inversionBlock =
							'transform="translate('+
							svgViewBoxWidth+
							','+
							svgViewBoxHeight+
							') scale(1) rotate(180)"';

						} else if (rowLock == false) {
							k=0;
							inversionBlock = '';
							rowLock = true;
						};
					};
					k++;
				} else {
					// when evenOdd is false invert per block
					k++;
					if (svgBreaks[0] % 2 == 1) {
						// reverse
						if (k < svgBreaks[0]){
							if(svgBreaks[7].active == true && k % 2 == parityBlock){
								inversionBlock =
								'transform="translate('+
								svgViewBoxWidth+
								','+
								svgViewBoxHeight+
								') scale(1) rotate(180)"';
							} else {
								inversionBlock = "";
							};
						} else {
							if(svgBreaks[7].active == true && k % 2 == parityBlock){
								inversionBlock =
								'transform="translate('+
								svgViewBoxWidth+
								','+
								svgViewBoxHeight+
								') scale(1) rotate(180)"';
								k = 0;
							} else {
								k = 0;
								inversionBlock = "";
							};
						};
					} else {
						// normal
						if(svgBreaks[7].active == true && k % 2 == parityBlock){
							inversionBlock =
							'transform="translate('+
							svgViewBoxWidth+
							','+
							svgViewBoxHeight+
							') scale(1) rotate(180)"';
						} else {
							inversionBlock = "";
						};
					};
				};

				// Get and set data from dataGrab
				svgURL = svgData[0][i];
				svgURLImg = svgData[1][i];
				svgSpanText = svgData[2][i];
				galBlock[i].innerHTML =
					// svg syntax constructor
					'<svg '+
					'class="svgElement-block"'+
					'version="1.1" '+
					'xmlns="http://www.w3.org/2000/svg" '+
					'xmlns:xlink="http://www.w3.org/1999/xlink" '+
					'xmlns:ev="http://www.w3.org/2001/xml-events" '+
					'viewBox="0 0 '+
					svgViewBoxWidth+
					' '+
					svgViewBoxHeight+
					'">'+

					// shape definer
					'<defs>'+
					'<clipPath '+
					'id="'+
					svgClipathId+
					'-'+
					randoSig+
					'"'+
					'>'+

					'<path '+
					// invert settings
					inversionBlock+
					' d="'+
					pathPointPoly+
					'" />'+
					'</clipPath>'+
					'</defs>'+

					// anchor container
					'<a '+
					'transform="translate(0,0) scale(1)" '+
					'xlink:href="'+
					svgURL+ '"'+
					'target="_blank" '+
					'clip-path="url(#'+
					svgClipathId+
					'-'+
					randoSig+
					')" '+
					'>'+

					// image
					'<image width="100%" height="100%" '+
					'xlink:href="'+
					svgURLImg+
					'" preserveAspectRatio="xMidYMid slice"/>'+

					// shader
					'<path '+

					// invert settings
					inversionBlock+

					' d="'+
					pathPointPoly+
					'" />'+

					// tooltip title
					'<title>'+
					svgSpanText+
					'</title>'+
					'</a>'+
					'</svg>';
			};

		},
		// SVGPadding Controls
		svgPadding: function(paddingProc, svgBreaks, elementKey){
			////////// (DO NOT TOUCH!!) //////////
			// Padding Controls
			var svgParentBox = elementKey.getElementsByClassName('svgility-box')[0],
			svgContainer = elementKey.getElementsByClassName('svgility-block'),
			j = svgContainer.length,
			i = 0,
			svgBreakPadding;

			if (svgBreaks != null) {
				svgBreakPadding = svgBreaks;
			} else {
				svgBreakPadding = paddingProc.padding;
			};

			// Set padding for parent container
			svgParentBox.style.paddingRight = svgBreakPadding;
			svgParentBox.style.paddingTop = svgBreakPadding;
			// Set padding for child blocks
			for (i; i < j; i +=1){
				svgContainer[i].style.paddingBottom = svgBreakPadding;
				svgContainer[i].style.paddingLeft = svgBreakPadding;
			};
		},
		// SVGPlacement
		placementBlock: function(svgShape, svgSettings, svgBreaks, elementKey){
			////////// (DO NOT TOUCH!!) //////////
			var parentClass = elementKey.getElementsByClassName('svgility-box')[0],
			mainWrap = elementKey.getElementsByClassName('svgility-set')[0],
			svgBlock = elementKey.getElementsByClassName('svgility-block'),
			svgBlockColumns = svgBreaks[0],
			svgVerticalTrim = svgBreaks[1],
			svgBlockPosX = 0,
			svgBlockPosY = 0,
			parentHeightAdjust = 0,
			blockStructure = ((mainWrap.clientWidth * ((100 / svgBlockColumns) / 100)) * (svgShape.shapeHeight / svgShape.shapeWidth)),
			svgArray = Array.prototype.slice.call(svgBlock),
			colBloc = svgBlockColumns,
			variableBloc = colBloc,
			svgLastPos = [],
			svgEvenOdd,
			svgCenterBottom,
			svgBlockArray,
			parentHeight,
			svgUnit,
			bottomGrab,
			i,
			j,
			k;

			// Check if evenOdd exist
			if (svgBreaks[4] != null) {
				svgEvenOdd = svgBreaks[4];
			} else {
				svgEvenOdd = svgSettings.evenOdd;
			};
			// Check if centerBottom exist
			if (svgBreaks[6] != null) {
				svgCenterBottom = svgBreaks[6];
			} else {
				svgCenterBottom = svgSettings.centerBottom;
			};

			// SVG positioning block
			while(svgArray.length > 0) {
				if(variableBloc == colBloc) {
					svgUnit = svgArray.slice(0, variableBloc);
					svgArray.splice(0, variableBloc);
					// prevent empty arrays
					if (colBloc - 1 != 0 && svgEvenOdd == true){
						variableBloc = colBloc - 1;
					};

					/////////////
					for (i = 0, j = svgUnit.length; i < j; i++ ){
						svgUnit[i].style.position = 'absolute';
						svgUnit[i].style.zIndex="20";
						svgUnit[i].style.top = 0 + '%';
						svgUnit[i].style.left = 0 + '%';
						svgUnit[i].style.height = blockStructure + 'px';
						// Width
						svgUnit[i].style.width = (((mainWrap.clientWidth / svgBlockColumns) / mainWrap.clientWidth) * 100) + "%";

						// svgUnit x and y positioning
						svgBlockPosX += (100 / svgBlockColumns);
						svgUnit[i].style.top = svgBlockPosY + 'px';
						svgUnit[i].style.left = (svgBlockPosX - (100 / svgBlockColumns)) + '%';
						// mainWrap height annex
						mainWrap.style.height = (svgBlockPosY + svgUnit[0].clientHeight) + 'px';
					};
					/////////////
					// Width Reset
					svgBlockPosX = 0;
					// prevent empty arrays
					if (colBloc - 1 != 0 && svgEvenOdd == true){
						svgBlockPosX += (svgBlockPosX + (100 / svgBlockColumns)) / 2;
					};
					// General height annex
					svgBlockPosY += svgBlock[0].clientHeight * (((1 - (svgVerticalTrim/svgShape.shapeHeight)) * 100) / 100);
					/////////////
					// Reset i
					i=0;
				} else if(variableBloc == colBloc - 1){
					svgUnit = svgArray.slice(0, variableBloc);
					svgArray.splice(0, variableBloc);
					variableBloc = colBloc;

					/////////////
					for (i = 0, j = svgUnit.length; i < j; i++ ){
						svgUnit[i].style.position = 'absolute';
						svgUnit[i].style.zIndex="20";
						svgUnit[i].style.top = 0 + '%';
						svgUnit[i].style.left = 0 + '%';
						svgUnit[i].style.height = blockStructure + 'px';
						// Width
						svgUnit[i].style.width = (((mainWrap.clientWidth / svgBlockColumns) / mainWrap.clientWidth) * 100) + "%";

						// svgUnit x and y positioning
						svgBlockPosX += (100 / svgBlockColumns);
						svgUnit[i].style.top = svgBlockPosY + 'px';
						svgUnit[i].style.left = (svgBlockPosX - (100 / svgBlockColumns)) + '%';
						// mainWrap height annex
						mainWrap.style.height = (svgBlockPosY + svgUnit[0].clientHeight) + 'px';
					};
					/////////////
					// Width Reset
					svgBlockPosX = 0;
					// General height annex
					svgBlockPosY += svgBlock[0].clientHeight * (((1 - (svgVerticalTrim/svgShape.shapeHeight)) * 100) / 100);
					/////////////
					// Reset i
					i=0;
				};

			};

			// Grab all elements in the last row
			svgLastPos.push(svgUnit[i].style.top);
			for (k = 0, j = svgUnit.length; k < j; k++ ){
				if(svgUnit[i].style.top == svgLastPos){
					bottomGrab = k + 1;
				};
			};
			// Center bottom row when active
			if(svgUnit[i].style.top == svgLastPos && svgBlockColumns != 1 && svgCenterBottom == true){
				if (svgEvenOdd == true) {
					svgUnit[i].style.left = 0 + '%';
					svgBlockPosX = 0;
				};
				svgBlockPosX += ((svgBlockPosX + (100 / svgBlockColumns))) * ((svgBlockColumns - bottomGrab) / 2);
				/////////////
				for (i = 0, j = svgUnit.length; i < j; i++ ){
					svgUnit[i].style.width = (((mainWrap.clientWidth / svgBlockColumns) / mainWrap.clientWidth) * 100) + "%";
					svgBlockPosX += (100 / svgBlockColumns);
					svgUnit[i].style.left = (svgBlockPosX - (100 / svgBlockColumns)) + '%';
				};
				/////////////
			};

		},
		// Responsive Breakpoint Controls
		svgbreakPoints: function(custSet){
			////////// (DO NOT TOUCH!!) //////////
			var targetEl,
			resBreaks,
			nearestMax,
			newColumn,
			newTrim,
			newPolyShape,
			newCustomPolyShape,
			newEvenOdd,
			newPadding,
			newCenterBottom,
			newInvert,
			breaksArray = [],
			breakHereIndex,
			parentTarget,
			i,
			j;

			// check if breakpoints object exists
			if(custSet.breakpoints != undefined){
				targetEl = custSet.breakpoints.targetThis;
				resBreaks = custSet.breakpoints.breakHere;
			} else {
				// default to initial setting when higher than the largest breakpoint
				newColumn = custSet.columns;
				newTrim = custSet.verticalTrim;
				newPolyShape = null;
				newCustomPolyShape = null;
				newEvenOdd = custSet.evenOdd;
				newPadding = null;
				newCenterBottom = null;
				newInvert = custSet.invert;
			};

			// check if targetThis is in default mode or a specific ID or Class Element
			if(targetEl == 'window' || targetEl == 'html' || targetEl == 'body' || targetEl == ''){
				parentTarget = window.innerWidth;
			} else if(targetEl.charAt(0) == '#' || targetEl.charAt(0) == '.'){
				// Check for type of parent conversion
				if(targetEl.charAt(0) == '#') {
					// check if user has set a parent ID container
					parentTarget = document.getElementById(targetEl.slice(1)).clientWidth;
				} else if (targetEl.charAt(0) == '.') {
					// check if user has set a parent Class container
					parentTarget = document.getElementsByClassName(targetEl.slice(1))[0].clientWidth;
				};
			} else {
				// default to initial setting when higher than the largest breakpoint
				newColumn = custSet.columns;
				newTrim = custSet.verticalTrim;
				newPolyShape = null;
				newCustomPolyShape = null;
				newEvenOdd = custSet.evenOdd;
				newPadding = null;
				newCenterBottom = null;
				newInvert = custSet.invert;
			};

			for(i = 0, j = resBreaks.length; i < j; i++){
				breaksArray.push(resBreaks[i].setWidth);
			};
			nearestMax = Math.max.apply(null, breaksArray);
			for(i = 0, j = breaksArray.length; i < j; i++){
				if(breaksArray[i] >= parentTarget && breaksArray[i] < nearestMax) {
					nearestMax = breaksArray[i];
					breakHereIndex = breaksArray.indexOf(nearestMax);
					// column check
					if(resBreaks[breakHereIndex].hasOwnProperty('column') == true && isNaN(resBreaks[breakHereIndex].column) == false){
						newColumn = resBreaks[breakHereIndex].column;
					} else {
						newColumn = custSet.columns;
					};
					// verticaltrim check
					if(resBreaks[breakHereIndex].hasOwnProperty('verticalTrim') == true && isNaN(resBreaks[breakHereIndex].verticalTrim) == false){
						newTrim = resBreaks[breakHereIndex].verticalTrim;
					} else {
						newTrim = custSet.verticalTrim;
					};
					// polyshape check
					if(resBreaks[breakHereIndex].hasOwnProperty('polyShape') == true){
						newPolyShape = resBreaks[breakHereIndex].polyShape;
					} else {
						newPolyShape = null;
					};
					// custom shape check
					if(resBreaks[breakHereIndex].hasOwnProperty('customPolyShape') == true){
						newCustomPolyShape = resBreaks[breakHereIndex].customPolyShape;
					} else {
						newCustomPolyShape = null;
					};
					// evenodd check
					if(resBreaks[breakHereIndex].hasOwnProperty('evenOdd') == true){
						newEvenOdd = resBreaks[breakHereIndex].evenOdd;
					} else {
						newEvenOdd = custSet.evenOdd;
					};
					// padding check
					if(resBreaks[breakHereIndex].hasOwnProperty('padding') == true){
						newPadding = resBreaks[breakHereIndex].padding;
					} else {
						newPadding = null;
					};
					// center bottom check
					if(resBreaks[breakHereIndex].hasOwnProperty('centerBottom') == true){
						newCenterBottom = resBreaks[breakHereIndex].centerBottom;
					} else {
						newCenterBottom = null;
					};
					// invert check
					if(resBreaks[breakHereIndex].hasOwnProperty('invert') == true){
						newInvert = resBreaks[breakHereIndex].invert;
					} else {
						newInvert = custSet.invert;
					};
				} else if(parentTarget > nearestMax){
					// default to initial setting when higher than the largest breakpoint
					newColumn = custSet.columns;
					newTrim = custSet.verticalTrim;
					newPolyShape = null;
					newCustomPolyShape = null;
					newEvenOdd = custSet.evenOdd;
					newPadding = null;
					newCenterBottom = null;
					newInvert = custSet.invert;
				} else {
					breakHereIndex = breaksArray.indexOf(nearestMax);
					// column check
					if(resBreaks[breakHereIndex].hasOwnProperty('column') == true && isNaN(resBreaks[breakHereIndex].column) == false){
						newColumn = resBreaks[breakHereIndex].column;
					} else {
						newColumn = custSet.columns;
					};
					// verticaltrim check
					if(resBreaks[breakHereIndex].hasOwnProperty('verticalTrim') == true && isNaN(resBreaks[breakHereIndex].verticalTrim) == false){
						newTrim = resBreaks[breakHereIndex].verticalTrim;
					} else {
						newTrim = custSet.verticalTrim;
					};
					// polyshape check
					if(resBreaks[breakHereIndex].hasOwnProperty('polyShape') == true){
						newPolyShape = resBreaks[breakHereIndex].polyShape;
					} else {
						newPolyShape = null;
					};
					// custom shape check
					if(resBreaks[breakHereIndex].hasOwnProperty('customPolyShape') == true){
						newCustomPolyShape = resBreaks[breakHereIndex].customPolyShape;
					} else {
						newCustomPolyShape = null;
					};
					// evenodd check
					if(resBreaks[breakHereIndex].hasOwnProperty('evenOdd') == true){
						newEvenOdd = resBreaks[breakHereIndex].evenOdd;
					} else {
						newEvenOdd = custSet.evenOdd;
					};
					// padding check
					if(resBreaks[breakHereIndex].hasOwnProperty('padding') == true){
						newPadding = resBreaks[breakHereIndex].padding;
					} else {
						newPadding = null;
					};
					// center bottom check
					if(resBreaks[breakHereIndex].hasOwnProperty('centerBottom') == true){
						newCenterBottom = resBreaks[breakHereIndex].centerBottom;
					} else {
						newCenterBottom = null;
					};
					// invert check
					if(resBreaks[breakHereIndex].hasOwnProperty('invert') == true){
						newInvert = resBreaks[breakHereIndex].invert;
					} else {
						newInvert = custSet.invert;
					};
				};
			};
			// empty breaksArray
			breaksArray = [];

			return [newColumn,newTrim,newPolyShape,newCustomPolyShape,newEvenOdd,newPadding,newCenterBottom,newInvert];
		},
		// Polygon Controls
		svgShape: function(custSet, svgBreaks){

			var pVolume,
			shapeCall;
			// Check which polyShape is active
			if (svgBreaks[2] != null) {
				shapeCall = svgBreaks[2];
			} else {
				shapeCall = custSet.polyShape;
			};
			// Chech if customPolyShape is set otherwise ignore to go to library
			if (svgBreaks[3] != null){
				pVolume = svgBreaks[3];
			} else if (custSet.hasOwnProperty('customPolyShape') && svgBreaks[2] == null) {
				pVolume = custSet.customPolyShape;
			} else {
				// Polygon Library
				switch (shapeCall){
					case "chevrondown":
						pVolume = {
							clipId: "chevrondown",
							shapeWidth: 150,
							shapeHeight: 200,
							pathPoints: "M0,0l75,36.667L150,0v163.333L75,200L0,163.333V0z"
						}
					break;
					case "circleBase":
						pVolume = {
							clipId: "circleBase",
							shapeWidth: 200,
							shapeHeight: 200,
							pathPoints: "M200,100c0,55.228-44.772,100-100,100C44.77,200,0,155.228,0,100C0,44.771,44.77,0,100,0C155.228,0,200,44.771,200,100z"
						}
					break;
					case "triangleBase":
						pVolume = {
							clipId: "triangleBase",
							shapeWidth: 200,
							shapeHeight: 173.225,
							pathPoints: "M0,173.225L100,0l100,173.225H0z"
						}
					break;
					case "triangleRound":
						pVolume = {
							clipId: "triangleRound",
							shapeWidth: 198,
							shapeHeight: 188.75,
							pathPoints: "M6.1,160.908C-21.821,123.786,52.549,0,99,0c46.45,0,120.82,123.786,92.901,160.908C163.979,198.03,34.021,198.03,6.1,160.908z"
						}
					break;
					case "pentagonBase":
						pVolume = {
							clipId: "pentagonBase",
							shapeWidth: 200,
							shapeHeight: 190.213,
							pathPoints: "M38.197,190.272L0,72.713L100,0.059l100,72.654l-38.197,117.559H38.197z"
						}
					break;
					case "hexagonBase":
						pVolume = {
							clipId: "hexagonBase",
							shapeWidth: 200,
							shapeHeight: 173.203,
							pathPoints: "M50,173.203L0,86.602L50,0h100l50,86.602l-50,86.602H50z"
						}
					break;
					case "hexagonFlat":
						pVolume = {
							clipId: "hexagonFlat",
							shapeWidth: 200,
							shapeHeight: 100,
							pathPoints: "M200,50.001L171.132,100H28.867L0,50.001L28.868,0h142.263L200,50.001z"
						}
					break;
					case "heptagonBase":
						pVolume = {
							clipId: "heptagonBase",
							shapeWidth: 200,
							shapeHeight: 194.984,
							pathPoints: "M55.495,194.984L0,125.396l19.806-86.777L100,0l80.193,38.619L200,125.396l-55.495,69.589H55.495z"
						}
					break;
					case "octagonBase":
						pVolume = {
							clipId: "octagonBase",
							shapeWidth: 200,
							shapeHeight: 200,
							pathPoints: "M58.579,200L0,141.423V58.578L58.579,0h82.844l58.576,58.578v82.845L141.423,200H58.579z"
						}
					break;
					case "fourStar":
						pVolume = {
							clipId: "fourStar",
							shapeWidth: 200,
							shapeHeight: 200,
							pathPoints: "M100,0l35.355,64.645L200,100l-64.645,35.355L100,200l-35.355-64.645L0,100l64.645-35.355L100,0z"
						}
					break;
					case "fiveStar":
						pVolume = {
							clipId: "fiveStar",
							shapeWidth: 200,
							shapeHeight: 190.209,
							pathPoints: "M100,0l23.607,72.651L200,72.654l-61.804,44.901l23.613,72.654L100,145.313l-61.801,44.896l23.601-72.654	L0,72.654l76.393-0.003L100,0z"
						}
					break;
					case "twentyStar":
						pVolume = {
							clipId: "twentyStar",
							shapeWidth: 200,
							shapeHeight: 200,
							pathPoints: "M100,19.003L115.839,0l9.191,22.967l20.936-13.178l1.644,24.683l23.982-6.064l-6.063,23.984l24.683,1.644l-13.178,20.936L200,84.162L180.999,100L200,115.839l-22.966,9.191l13.178,20.936l-24.683,1.644l6.063,23.982l-23.982-6.063l-1.644,24.683l-20.936-13.178L115.839,200L100,180.997L84.162,200l-9.191-22.966l-20.936,13.178l-1.644-24.683l-23.984,6.063l6.064-23.982l-24.683-1.644l13.178-20.936L0,115.839L19.003,100L0,84.162l22.967-9.191L9.789,54.035l24.683-1.644l-6.064-23.984l23.984,6.064l1.644-24.683l20.936,13.178L84.162,0L100,19.003z"
						}
					break;
					case "diamondBase":
						pVolume = {
							clipId: "diamondBase",
							shapeWidth: 200,
							shapeHeight: 200,
							pathPoints: "M100,200L0,100L100,0l100,100L100,200z"
						}
					break;
					case "diamondTall":
						pVolume = {
							clipId: "diamondTall",
							shapeWidth: 150,
							shapeHeight: 200,
							pathPoints: "M75,200L0,100L75,0l75,100L75,200z"
						}
					break;
					case "shardPat1":
						pVolume = {
							clipId: "shardPat1",
							shapeWidth: 110.529,
							shapeHeight: 200,
							pathPoints: "M55.265,69.473L18.554,96.146L55.265,0l36.712,96.146L55.265,69.473z M98.781,113.967l-2.556-6.691	l-0.712-1.866L55.265,76.166l-40.248,29.243l-0.713,1.866l-2.556,6.691L0,144.735L55.265,200l55.265-55.265L98.781,113.967z"
						}


					break;
					case "squareBox":
						pVolume = {
							clipId: "squareBox",
							shapeWidth: 200,
							shapeHeight: 200,
							pathPoints: "M0,0L200,0L200,200L0,200,L0,0z"
						}
					break;
					default:
						pVolume = {
							clipId: "chevrondown",
							shapeWidth: 150,
							shapeHeight: 200,
							pathPoints: "M0,0l75,36.667L150,0v163.333L75,200L0,163.333V0z"
						}
				};
				// Polygon Library end marker
			};
			return pVolume;
		},
		// DataModal
		dataModal: function(svgSettings, elementKey){

			// Modal Block
			var galBlockIndex,
			parentBlock = elementKey.getElementsByClassName("svgility-box")[0],
			siblingBlock = elementKey.getElementsByClassName('svgility-set')[0],
			galBlock = elementKey.getElementsByClassName('svgility-block'),
			modalBlock = document.createElement('div'),
			fireModal,
			closeDelay,
			i,
			j;

			// Check if svg-media class tag is set to svgility-block to enable modal window
			if(svgSettings.lyteBox == true){
				for(i = 0, j = galBlock.length; i < j; i++){
					if ((' ' + galBlock[i].className + ' ').indexOf(' ' + "svg-media" + ' ') > -1 == true) {
						fireModal = galBlock[i].getElementsByTagName('svg')[0].getElementsByTagName('a')[0];
						fireModal.addEventListener("click", svgAnchorBreaker, false);
					};
				};
			};

			// Modal internal structure
			function svgAnchorBreaker(e){

				e.preventDefault();
				// Create and set div Id for modal container
				modalBlock.setAttribute("id", "svg-imgdisplay");

				// Media filter
				var mediaLink,
				mediaTrim,
				mediaElement;
				if (this.getAttribute('xlink:href').indexOf('youtu.be') > -1 == true) {
					mediaLink = this.getAttribute('xlink:href');
					mediaTrim = mediaLink.substr(mediaLink.indexOf("tu.be/") + 6);
					mediaElement =
					'<iframe '+
					'src="'+
					'https://www.youtube.com/embed/'+
					mediaTrim+
					'"'+
					' frameborder="0" allowfullscreen></iframe>';
				} else if (this.getAttribute('xlink:href').indexOf('youtube.com') > -1 == true && this.getAttribute('xlink:href').indexOf('watch?v=') > -1 == true){
					mediaLink = this.getAttribute('xlink:href');
					mediaTrim = mediaLink.substr(mediaLink.indexOf("watch?v=") + 8);
					mediaElement =
					'<iframe '+
					'src="'+
					'https://www.youtube.com/embed/'+
					mediaTrim+
					'"'+
					' frameborder="0" allowfullscreen></iframe>';
				} else if (this.getAttribute('xlink:href').indexOf('youtube.com') > -1 == true && this.getAttribute('xlink:href').indexOf('embed/') > -1 == true){
					mediaLink = this.getAttribute('xlink:href');
					mediaTrim = mediaLink.substr(mediaLink.indexOf("embed/") + 6);
					mediaElement =
					'<iframe '+
					'src="'+
					'https://www.youtube.com/embed/'+
					mediaTrim+
					'"'+
					' frameborder="0" allowfullscreen></iframe>';
				} else if (this.getAttribute('xlink:href').indexOf('vimeo.com') > -1 == true && this.getAttribute('xlink:href').indexOf('video/') > -1 == true){
					mediaLink = this.getAttribute('xlink:href');
					mediaTrim = mediaLink.substr(mediaLink.indexOf("video/") + 6);
					mediaElement =
					'<iframe '+
					'src="'+
					'https://player.vimeo.com/video/'+
					mediaTrim+
					'"'+
					' frameborder="0" allowfullscreen></iframe>';
				} else if (this.getAttribute('xlink:href').indexOf('vimeo.com') > -1 == true){
					mediaLink = this.getAttribute('xlink:href');
					mediaTrim = mediaLink.substr(mediaLink.indexOf("vimeo.com/") + 10);
					mediaElement =
					'<iframe '+
					'src="'+
					'https://player.vimeo.com/video/'+
					mediaTrim+
					'"'+
					' frameborder="0" allowfullscreen></iframe>';
				} else {
					mediaElement =
					'<img '+
					'src="'+
					this.getAttribute('xlink:href')+
					'" />';
				};

				// Fill modal container with structure
				modalBlock.innerHTML =
				'<button>'+
				'&times;'+
				'</button>'+
				'<div class="modal-media">'+
					mediaElement+
				'</div>'+
				// span text
				(svgSettings.text == true ?
				'<div class="modal-info">'+
				'<span title="'+
				this.getElementsByTagName('title')[0].innerHTML+
				'">'+
				this.getElementsByTagName('title')[0].innerHTML+
				'</span></div><p>xxx <button class="modal-info js-textareacopybtn">Copy Textarea</button> </p>': "");

				// Insert modal container before svgility-set block
				parentBlock.insertBefore(modalBlock, siblingBlock);
				// Delay create and set div Class for modal container
				if (modalBlock.hasAttribute("id","svg-imgdisplay") == true) {
					setTimeout(function(){
						// Give class to modal container for opacity transition
						modalBlock.className = "svgModal-in";
					},100);
				};

				// Modal Container button triggers
				if(document.getElementById('svg-imgdisplay').getElementsByTagName('img')[0]){
					document.getElementById('svg-imgdisplay').getElementsByTagName('img')[0].addEventListener("click", modalCancel, false);
				} else if(document.getElementById('svg-imgdisplay').getElementsByTagName('iframe')[0]){
					document.getElementById('svg-imgdisplay').getElementsByTagName('iframe')[0].addEventListener("click", modalCancel, false);
				};

				document.getElementById('svg-imgdisplay').addEventListener("click", modalClose, false);

			};

			// Closes and removes modal after opacity transition
			function modalClose(){
				modalBlock.removeAttribute("class");

				if(window.getComputedStyle(modalBlock, null).getPropertyValue("opacity") === "1") {
					document.getElementById('svg-imgdisplay').removeEventListener("click", modalClose, false);

					if (closeDelay) {
					  clearTimeout(closeDelay);
					};

					if (modalBlock.parentNode != null) {
						closeDelay = setTimeout(function() {
							//modalBlock.removeAttribute("class");
							modalBlock.parentNode.removeChild(modalBlock);
						}, 1000);
					};
				};
			};

			// Prevent button clicks on modal image
			function modalCancel(e){
				e.stopPropagation();
			};
		}

	}, // svgInfrastructure end marker
	// Igniter Block Object
	svgPower = {
		// ignition
		ignite: function(elementLink,custSet){
			// Turn on routing system
			svgInfrastructure.dataRouting(elementLink,custSet);

		} // ignition end marker

	};
	return svgPower;

})();
