webpackHotUpdate("frameline",{

/***/ "./resources/js/frameline.js":
/*!***********************************!*\
  !*** ./resources/js/frameline.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var frameLine = function frameLine(cfg) {\n  'use strict';\n\n  var _default = {\n    element: '.frameline',\n    index: 0,\n    reverse: false,\n    controller: true,\n    startImgIndex: 0,\n    lineBgColor: '#000'\n  };\n\n  if (cfg) {\n    _default = Object.assign(cfg, _default);\n  }\n\n  var globalConfig = {\n    clips: {\n      width: null,\n      height: null,\n      length: null\n    },\n    controller: {\n      width: 930,\n      height: 20,\n      bgColor: '#a7a7a7',\n      currPercent: 0,\n      currClipIndex: 0\n    }\n  };\n  var currentClipElement; // let windows = document.defaultView;\n  // console.log('window: ', windows);\n\n  var frameElement = document.querySelector(_default.element);\n  var newFrameClipGroup = document.createElement('div');\n  var newFrameController = document.createElement('div');\n  var newControllerBar = document.createElement('div');\n  var newControllerBarActive = document.createElement('div');\n  var newControllerButton = document.createElement('div');\n  frameElement.classList.add('frameline-container');\n  frameElement.style.cssText = \"\\n    width: 960px;\\n  \";\n  var frameElementChild = frameElement.children;\n  var totalClip = frameElement.children.length;\n  globalConfig.clips.length = totalClip;\n  console.log('Get FrameLiner <div>', frameElement);\n  console.log('Get FrameLiner <img>', totalClip); // Append Base Elements\n\n  var initFrameLineElement = function initFrameLineElement(mainContent, clipGroup, clipImg, controller, controllerBar, controllerBarActive, controllerButton) {\n    function _eachImgAddClassName() {\n      for (var i = 0; i < totalClip; i = i + 1) {\n        if (i === 0) {\n          globalConfig.clips.width = clipImg[i].clientWidth;\n          globalConfig.clips.height = clipImg[i].clientHeight;\n        }\n\n        clipImg[i].classList.add('frameline-clip', \"clip-\".concat(i));\n        clipImg[i].style.cssText = \"\\n          width: 960px;\\n          height: 540px;\\n        \";\n      }\n    }\n\n    function _appendParentElementForAllImg() {\n      clipGroup.classList.add('frameline-clip-group');\n\n      while (frameElement.hasChildNodes()) {\n        clipGroup.appendChild(mainContent.firstChild);\n      }\n\n      mainContent.appendChild(clipGroup); // controller style\n\n      clipGroup.style.cssText = \"\\n        width: 960px;\\n        height: 540px;\\n      \";\n    }\n\n    _eachImgAddClassName();\n\n    _appendParentElementForAllImg();\n\n    if (!_default.controller) {\n      return;\n    }\n\n    function _appendControllerInterface() {\n      controller.classList.add('frameline-controller');\n      controllerBar.classList.add('frameline-controller-bar');\n      controllerBarActive.classList.add('frameline-bar-active');\n      controllerButton.classList.add('frameline-controller-button');\n      mainContent.appendChild(controller);\n      controllerBar.appendChild(controllerBarActive);\n      controllerBar.appendChild(controllerButton);\n      controller.appendChild(controllerBar);\n      globalConfig.clips.width = controller.clientWidth; // controller bar style\n\n      controllerBarActive.style.cssText = \"\\n        width: \".concat(globalConfig.controller.currPercent, \"%;\\n      \"); // `;\n    }\n\n    _appendControllerInterface();\n  };\n\n  var frameClipExchange = function frameClipExchange(eachImgClip, currIndex) {\n    for (var i = 0; i < eachImgClip.length; i = i + 1) {\n      eachImgClip[i].style.opacity = 0;\n    }\n\n    if (currIndex >= globalConfig.clips.length) {\n      currIndex = globalConfig.clips.length;\n    } else if (currIndex <= 1) {\n      currIndex = 1;\n    }\n\n    currentClipElement = document.querySelector(\".clip-\".concat(currIndex));\n    currentClipElement.style.opacity = 1;\n  };\n\n  var handleFrameLineInterAction = function handleFrameLineInterAction(mainContent, controllerBar, controllerBarActive, dragButton) {\n    var newX;\n    var isDraggable = false;\n    var defaultOffsetX = mainContent.offsetLeft + controllerBar.offsetLeft;\n    var ratio = Math.round(globalConfig.controller.width / globalConfig.clips.length); //Draggable Switch On\n\n    function _onMouseDown() {\n      // console.log('Mouse Down!!');\n      isDraggable = true;\n    } //Draggable Switch Off\n\n\n    function _onMouseUpOut() {\n      // console.log('Mouse Up!!');\n      isDraggable = false;\n    }\n\n    function _onMouseMove(e) {\n      // console.log('Mouse Dragging!!');\n      if (!isDraggable) {\n        return;\n      }\n\n      console.log('Ratio: ', ratio); // e.preventDefault();\n\n      newX = e.pageX - defaultOffsetX; // console.log('Mouse Dragging: ', event.pageX, newX);\n\n      if (newX >= globalConfig.controller.width - 20) {\n        newX = globalConfig.controller.width - 20;\n      } else if (newX <= 10) {\n        newX = 10;\n      }\n\n      globalConfig.controller.currClipIndex = Math.round(newX / ratio);\n      console.log('currClipIndex: ', globalConfig.controller.currClipIndex);\n      dragButton.style.transform = \"translate3d(\".concat(newX, \"px, 0px, 0px) translateZ(0px)\");\n      controllerBarActive.style.width = \"\".concat(newX, \"px\");\n      frameClipExchange(newFrameClipGroup.children, globalConfig.controller.currClipIndex);\n    }\n\n    dragButton.addEventListener('mousedown', _onMouseDown);\n    window.addEventListener('mouseup', _onMouseUpOut); // dragButton.addEventListener('mouseleave', _onMouseUpOut);\n\n    window.addEventListener('mousemove', _onMouseMove); //Dragging Button\n  };\n\n  initFrameLineElement(frameElement, newFrameClipGroup, frameElementChild, newFrameController, newControllerBar, newControllerBarActive, newControllerButton);\n  handleFrameLineInterAction(frameElement, newControllerBar, newControllerBarActive, newControllerButton);\n};\n\nmodule.exports = frameLine;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvZnJhbWVsaW5lLmpzPzBhZWEiXSwibmFtZXMiOlsiZnJhbWVMaW5lIiwiY2ZnIiwiX2RlZmF1bHQiLCJlbGVtZW50IiwiaW5kZXgiLCJyZXZlcnNlIiwiY29udHJvbGxlciIsInN0YXJ0SW1nSW5kZXgiLCJsaW5lQmdDb2xvciIsIk9iamVjdCIsImFzc2lnbiIsImdsb2JhbENvbmZpZyIsImNsaXBzIiwid2lkdGgiLCJoZWlnaHQiLCJsZW5ndGgiLCJiZ0NvbG9yIiwiY3VyclBlcmNlbnQiLCJjdXJyQ2xpcEluZGV4IiwiY3VycmVudENsaXBFbGVtZW50IiwiZnJhbWVFbGVtZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibmV3RnJhbWVDbGlwR3JvdXAiLCJjcmVhdGVFbGVtZW50IiwibmV3RnJhbWVDb250cm9sbGVyIiwibmV3Q29udHJvbGxlckJhciIsIm5ld0NvbnRyb2xsZXJCYXJBY3RpdmUiLCJuZXdDb250cm9sbGVyQnV0dG9uIiwiY2xhc3NMaXN0IiwiYWRkIiwic3R5bGUiLCJjc3NUZXh0IiwiZnJhbWVFbGVtZW50Q2hpbGQiLCJjaGlsZHJlbiIsInRvdGFsQ2xpcCIsImNvbnNvbGUiLCJsb2ciLCJpbml0RnJhbWVMaW5lRWxlbWVudCIsIm1haW5Db250ZW50IiwiY2xpcEdyb3VwIiwiY2xpcEltZyIsImNvbnRyb2xsZXJCYXIiLCJjb250cm9sbGVyQmFyQWN0aXZlIiwiY29udHJvbGxlckJ1dHRvbiIsIl9lYWNoSW1nQWRkQ2xhc3NOYW1lIiwiaSIsImNsaWVudFdpZHRoIiwiY2xpZW50SGVpZ2h0IiwiX2FwcGVuZFBhcmVudEVsZW1lbnRGb3JBbGxJbWciLCJoYXNDaGlsZE5vZGVzIiwiYXBwZW5kQ2hpbGQiLCJmaXJzdENoaWxkIiwiX2FwcGVuZENvbnRyb2xsZXJJbnRlcmZhY2UiLCJmcmFtZUNsaXBFeGNoYW5nZSIsImVhY2hJbWdDbGlwIiwiY3VyckluZGV4Iiwib3BhY2l0eSIsImhhbmRsZUZyYW1lTGluZUludGVyQWN0aW9uIiwiZHJhZ0J1dHRvbiIsIm5ld1giLCJpc0RyYWdnYWJsZSIsImRlZmF1bHRPZmZzZXRYIiwib2Zmc2V0TGVmdCIsInJhdGlvIiwiTWF0aCIsInJvdW5kIiwiX29uTW91c2VEb3duIiwiX29uTW91c2VVcE91dCIsIl9vbk1vdXNlTW92ZSIsImUiLCJwYWdlWCIsInRyYW5zZm9ybSIsImFkZEV2ZW50TGlzdGVuZXIiLCJ3aW5kb3ciLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFNQSxTQUFTLEdBQUcsU0FBWkEsU0FBWSxDQUFDQyxHQUFELEVBQVM7QUFDekI7O0FBRUEsTUFBSUMsUUFBUSxHQUFHO0FBQ2JDLFdBQU8sRUFBRSxZQURJO0FBRWJDLFNBQUssRUFBRSxDQUZNO0FBR2JDLFdBQU8sRUFBRSxLQUhJO0FBSWJDLGNBQVUsRUFBRSxJQUpDO0FBS2JDLGlCQUFhLEVBQUUsQ0FMRjtBQU1iQyxlQUFXLEVBQUU7QUFOQSxHQUFmOztBQVNBLE1BQUlQLEdBQUosRUFBUztBQUNQQyxZQUFRLEdBQUdPLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjVCxHQUFkLEVBQW1CQyxRQUFuQixDQUFYO0FBQ0Q7O0FBR0QsTUFBSVMsWUFBWSxHQUFHO0FBQ2pCQyxTQUFLLEVBQUU7QUFDTEMsV0FBSyxFQUFFLElBREY7QUFFTEMsWUFBTSxFQUFFLElBRkg7QUFHTEMsWUFBTSxFQUFFO0FBSEgsS0FEVTtBQU1qQlQsY0FBVSxFQUFFO0FBQ1ZPLFdBQUssRUFBRSxHQURHO0FBRVZDLFlBQU0sRUFBRSxFQUZFO0FBR1ZFLGFBQU8sRUFBRSxTQUhDO0FBSVZDLGlCQUFXLEVBQUUsQ0FKSDtBQUtWQyxtQkFBYSxFQUFFO0FBTEw7QUFOSyxHQUFuQjtBQWVBLE1BQUlDLGtCQUFKLENBaEN5QixDQWtDekI7QUFDQTs7QUFFQSxNQUFNQyxZQUFZLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QnBCLFFBQVEsQ0FBQ0MsT0FBaEMsQ0FBckI7QUFDQSxNQUFN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LEtBQWxCLENBQXhDO0FBRUE1QixhQUFPLENBQUNDLEdBQVIsQ0FBWSxpQkFBWixFQUErQjFCLFlBQVksQ0FBQ0wsVUFBYixDQUF3QlksYUFBdkQ7QUFFQXlDLGdCQUFVLENBQUM1QixLQUFYLENBQWlCeUMsU0FBakIseUJBQTRDWixJQUE1QztBQUNBakIseUJBQW1CLENBQUNaLEtBQXBCLENBQTBCbEIsS0FBMUIsYUFBcUMrQyxJQUFyQztBQUVBTix1QkFBaUIsQ0FBQy9CLGlCQUFpQixDQUFDVyxRQUFuQixFQUE2QnZCLFlBQVksQ0FBQ0wsVUFBYixDQUF3QlksYUFBckQsQ0FBakI7QUFDRDs7QUFFRHlDLGNBQVUsQ0FBQ2MsZ0JBQVgsQ0FBNEIsV0FBNUIsRUFBeUNOLFlBQXpDO0FBQ0FPLFVBQU0sQ0FBQ0QsZ0JBQVAsQ0FBd0IsU0FBeEIsRUFBbUNMLGFBQW5DLEVBN0NrRyxDQThDbEc7O0FBQ0FNLFVBQU0sQ0FBQ0QsZ0JBQVAsQ0FBd0IsV0FBeEIsRUFBcUNKLFlBQXJDLEVBL0NrRyxDQWdEbEc7QUFDRCxHQWpERDs7QUFtREEvQixzQkFBb0IsQ0FDbEJsQixZQURrQixFQUVsQkcsaUJBRmtCLEVBR2xCVSxpQkFIa0IsRUFJbEJSLGtCQUprQixFQUtsQkMsZ0JBTGtCLEVBTWxCQyxzQkFOa0IsRUFPbEJDLG1CQVBrQixDQUFwQjtBQVVBOEIsNEJBQTBCLENBQ3hCdEMsWUFEd0IsRUFFeEJNLGdCQUZ3QixFQUd4QkMsc0JBSHdCLEVBSXhCQyxtQkFKd0IsQ0FBMUI7QUFNRCxDQWpORDs7QUFtTkErQyxNQUFNLENBQUNDLE9BQVAsR0FBaUI1RSxTQUFqQiIsImZpbGUiOiIuL3Jlc291cmNlcy9qcy9mcmFtZWxpbmUuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBmcmFtZUxpbmUgPSAoY2ZnKSA9PiB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBsZXQgX2RlZmF1bHQgPSB7XG4gICAgZWxlbWVudDogJy5mcmFtZWxpbmUnLFxuICAgIGluZGV4OiAwLFxuICAgIHJldmVyc2U6IGZhbHNlLFxuICAgIGNvbnRyb2xsZXI6IHRydWUsXG4gICAgc3RhcnRJbWdJbmRleDogMCxcbiAgICBsaW5lQmdDb2xvcjogJyMwMDAnXG4gIH07XG5cbiAgaWYgKGNmZykge1xuICAgIF9kZWZhdWx0ID0gT2JqZWN0LmFzc2lnbihjZmcsIF9kZWZhdWx0KTtcbiAgfVxuXG5cbiAgbGV0IGdsb2JhbENvbmZpZyA9IHtcbiAgICBjbGlwczoge1xuICAgICAgd2lkdGg6IG51bGwsXG4gICAgICBoZWlnaHQ6IG51bGwsXG4gICAgICBsZW5ndGg6IG51bGxcbiAgICB9LFxuICAgIGNvbnRyb2xsZXI6IHtcbiAgICAgIHdpZHRoOiA5MzAsXG4gICAgICBoZWlnaHQ6IDIwLFxuICAgICAgYmdDb2xvcjogJyNhN2E3YTcnLFxuICAgICAgY3VyclBlcmNlbnQ6IDAsXG4gICAgICBjdXJyQ2xpcEluZGV4OiAwXG4gICAgfVxuICB9O1xuXG4gIGxldCBjdXJyZW50Q2xpcEVsZW1lbnQ7XG5cbiAgLy8gbGV0IHdpbmRvd3MgPSBkb2N1bWVudC5kZWZhdWx0VmlldztcbiAgLy8gY29uc29sZS5sb2coJ3dpbmRvdzogJywgd2luZG93cyk7XG5cbiAgY29uc3QgZnJhbWVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihfZGVmYXVsdC5lbGVtZW50KTtcbiAgY29uc3QgbmV3RnJhbWVDbGlwR3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3QgbmV3RnJhbWVDb250cm9sbGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IG5ld0NvbnRyb2xsZXJCYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3QgbmV3Q29udHJvbGxlckJhckFjdGl2ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBuZXdDb250cm9sbGVyQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cblxuICBmcmFtZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZnJhbWVsaW5lLWNvbnRhaW5lcicpO1xuXG4gIGZyYW1lRWxlbWVudC5zdHlsZS5jc3NUZXh0ID0gYFxuICAgIHdpZHRoOiA5NjBweDtcbiAgYDtcblxuICBsZXQgZnJhbWVFbGVtZW50Q2hpbGQgPSBmcmFtZUVsZW1lbnQuY2hpbGRyZW47XG4gIGxldCB0b3RhbENsaXAgPSBmcmFtZUVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoO1xuXG4gIGdsb2JhbENvbmZpZy5jbGlwcy5sZW5ndGggPSB0b3RhbENsaXA7XG5cbiAgY29uc29sZS5sb2coJ0dldCBGcmFtZUxpbmVyIDxkaXY+JywgZnJhbWVFbGVtZW50KTtcbiAgY29uc29sZS5sb2coJ0dldCBGcmFtZUxpbmVyIDxpbWc+JywgdG90YWxDbGlwKTtcblxuXG4gIC8vIEFwcGVuZCBCYXNlIEVsZW1lbnRzXG4gIGNvbnN0IGluaXRGcmFtZUxpbmVFbGVtZW50ID0gKG1haW5Db250ZW50LCBjbGlwR3JvdXAsIGNsaXBJbWcsIGNvbnRyb2xsZXIsIGNvbnRyb2xsZXJCYXIsIGNvbnRyb2xsZXJCYXJBY3RpdmUsIGNvbnRyb2xsZXJCdXR0b24pID0+IHtcblxuICAgIGZ1bmN0aW9uIF9lYWNoSW1nQWRkQ2xhc3NOYW1lKCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3RhbENsaXA7IGkgPSBpICsgMSkge1xuXG4gICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgZ2xvYmFsQ29uZmlnLmNsaXBzLndpZHRoID0gY2xpcEltZ1tpXS5jbGllbnRXaWR0aDtcbiAgICAgICAgICBnbG9iYWxDb25maWcuY2xpcHMuaGVpZ2h0ID0gY2xpcEltZ1tpXS5jbGllbnRIZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBjbGlwSW1nW2ldLmNsYXNzTGlzdC5hZGQoJ2ZyYW1lbGluZS1jbGlwJywgYGNsaXAtJHtpfWApO1xuICAgICAgICBjbGlwSW1nW2ldLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgICAgICAgd2lkdGg6IDk2MHB4O1xuICAgICAgICAgIGhlaWdodDogNTQwcHg7XG4gICAgICAgIGA7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBfYXBwZW5kUGFyZW50RWxlbWVudEZvckFsbEltZygpIHtcbiAgICAgIGNsaXBHcm91cC5jbGFzc0xpc3QuYWRkKCdmcmFtZWxpbmUtY2xpcC1ncm91cCcpO1xuICAgICAgd2hpbGUgKGZyYW1lRWxlbWVudC5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgICAgY2xpcEdyb3VwLmFwcGVuZENoaWxkKG1haW5Db250ZW50LmZpcnN0Q2hpbGQpO1xuICAgICAgfVxuICAgICAgbWFpbkNvbnRlbnQuYXBwZW5kQ2hpbGQoY2xpcEdyb3VwKTtcblxuICAgICAgLy8gY29udHJvbGxlciBzdHlsZVxuICAgICAgY2xpcEdyb3VwLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgICAgIHdpZHRoOiA5NjBweDtcbiAgICAgICAgaGVpZ2h0OiA1NDBweDtcbiAgICAgIGA7XG4gICAgfVxuXG4gICAgX2VhY2hJbWdBZGRDbGFzc05hbWUoKTtcbiAgICBfYXBwZW5kUGFyZW50RWxlbWVudEZvckFsbEltZygpO1xuXG5cbiAgICBpZiAoIV9kZWZhdWx0LmNvbnRyb2xsZXIpIHsgcmV0dXJuOyB9XG5cblxuICAgIGZ1bmN0aW9uIF9hcHBlbmRDb250cm9sbGVySW50ZXJmYWNlKCkge1xuICAgICAgY29udHJvbGxlci5jbGFzc0xpc3QuYWRkKCdmcmFtZWxpbmUtY29udHJvbGxlcicpO1xuICAgICAgY29udHJvbGxlckJhci5jbGFzc0xpc3QuYWRkKCdmcmFtZWxpbmUtY29udHJvbGxlci1iYXInKTtcbiAgICAgIGNvbnRyb2xsZXJCYXJBY3RpdmUuY2xhc3NMaXN0LmFkZCgnZnJhbWVsaW5lLWJhci1hY3RpdmUnKTtcbiAgICAgIGNvbnRyb2xsZXJCdXR0b24uY2xhc3NMaXN0LmFkZCgnZnJhbWVsaW5lLWNvbnRyb2xsZXItYnV0dG9uJyk7XG5cbiAgICAgIG1haW5Db250ZW50LmFwcGVuZENoaWxkKGNvbnRyb2xsZXIpO1xuICAgICAgY29udHJvbGxlckJhci5hcHBlbmRDaGlsZChjb250cm9sbGVyQmFyQWN0aXZlKTtcbiAgICAgIGNvbnRyb2xsZXJCYXIuYXBwZW5kQ2hpbGQoY29udHJvbGxlckJ1dHRvbik7XG5cbiAgICAgIGNvbnRyb2xsZXIuYXBwZW5kQ2hpbGQoY29udHJvbGxlckJhcik7XG5cbiAgICAgIGdsb2JhbENvbmZpZy5jbGlwcy53aWR0aCA9IGNvbnRyb2xsZXIuY2xpZW50V2lkdGg7XG5cbiAgICAgIC8vIGNvbnRyb2xsZXIgYmFyIHN0eWxlXG4gICAgICBjb250cm9sbGVyQmFyQWN0aXZlLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgICAgIHdpZHRoOiAke2dsb2JhbENvbmZpZy5jb250cm9sbGVyLmN1cnJQZXJjZW50fSU7XG4gICAgICBgO1xuICAgICAgLy8gYDtcbiAgICB9XG5cbiAgICBfYXBwZW5kQ29udHJvbGxlckludGVyZmFjZSgpO1xuICB9O1xuXG5cbiAgY29uc3QgZnJhbWVDbGlwRXhjaGFuZ2UgPSAoZWFjaEltZ0NsaXAsIGN1cnJJbmRleCkgPT4ge1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlYWNoSW1nQ2xpcC5sZW5ndGg7IGkgPSBpICsgMSkge1xuICAgICAgZWFjaEltZ0NsaXBbaV0uc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgfVxuXG4gICAgaWYgKGN1cnJJbmRleCA+PSBnbG9iYWxDb25maWcuY2xpcHMubGVuZ3RoKSB7XG4gICAgICBjdXJySW5kZXggPSBnbG9iYWxDb25maWcuY2xpcHMubGVuZ3RoO1xuICAgIH0gZWxzZSBpZiAoY3VyckluZGV4IDw9IDEpIHtcbiAgICAgIGN1cnJJbmRleCA9IDE7XG4gICAgfVxuXG4gICAgY3VycmVudENsaXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNsaXAtJHtjdXJySW5kZXh9YCk7XG4gICAgY3VycmVudENsaXBFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAxO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUZyYW1lTGluZUludGVyQWN0aW9uID0gKG1haW5Db250ZW50LCBjb250cm9sbGVyQmFyLCBjb250cm9sbGVyQmFyQWN0aXZlLCBkcmFnQnV0dG9uKSA9PiB7XG4gICAgbGV0IG5ld1g7XG4gICAgbGV0IGlzRHJhZ2dhYmxlID0gZmFsc2U7XG5cbiAgICBsZXQgZGVmYXVsdE9mZnNldFggPSBtYWluQ29udGVudC5vZmZzZXRMZWZ0ICsgY29udHJvbGxlckJhci5vZmZzZXRMZWZ0O1xuXG4gICAgbGV0IHJhdGlvID0gTWF0aC5yb3VuZChnbG9iYWxDb25maWcuY29udHJvbGxlci53aWR0aCAvIGdsb2JhbENvbmZpZy5jbGlwcy5sZW5ndGgpO1xuXG4gICAgLy9EcmFnZ2FibGUgU3dpdGNoIE9uXG4gICAgZnVuY3Rpb24gX29uTW91c2VEb3duKCkge1xuICAgICAgLy8gY29uc29sZS5sb2coJ01vdXNlIERvd24hIScpO1xuICAgICAgaXNEcmFnZ2FibGUgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vRHJhZ2dhYmxlIFN3aXRjaCBPZmZcbiAgICBmdW5jdGlvbiBfb25Nb3VzZVVwT3V0KCkge1xuICAgICAgLy8gY29uc29sZS5sb2coJ01vdXNlIFVwISEnKTtcbiAgICAgIGlzRHJhZ2dhYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX29uTW91c2VNb3ZlKGUpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdNb3VzZSBEcmFnZ2luZyEhJyk7XG4gICAgICBpZiAoIWlzRHJhZ2dhYmxlKSB7IHJldHVybjsgfVxuICAgICAgY29uc29sZS5sb2coJ1JhdGlvOiAnLCByYXRpbyk7XG5cbiAgICAgIC8vIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG5ld1ggPSBlLnBhZ2VYIC0gZGVmYXVsdE9mZnNldFg7XG4gICAgICAvLyBjb25zb2xlLmxvZygnTW91c2UgRHJhZ2dpbmc6ICcsIGV2ZW50LnBhZ2VYLCBuZXdYKTtcbiAgICAgIGlmIChuZXdYID49IGdsb2JhbENvbmZpZy5jb250cm9sbGVyLndpZHRoIC0gMjApIHtcbiAgICAgICAgbmV3WCA9IGdsb2JhbENvbmZpZy5jb250cm9sbGVyLndpZHRoIC0gMjA7XG4gICAgICB9IGVsc2UgaWYgKG5ld1ggPD0gMTApIHtcbiAgICAgICAgbmV3WCA9IDEwO1xuICAgICAgfVxuXG4gICAgICBnbG9iYWxDb25maWcuY29udHJvbGxlci5jdXJyQ2xpcEluZGV4ID0gTWF0aC5yb3VuZChuZXdYIC8gcmF0aW8pO1xuXG4gICAgICBjb25zb2xlLmxvZygnY3VyckNsaXBJbmRleDogJywgZ2xvYmFsQ29uZmlnLmNvbnRyb2xsZXIuY3VyckNsaXBJbmRleCk7XG5cbiAgICAgIGRyYWdCdXR0b24uc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCR7bmV3WH1weCwgMHB4LCAwcHgpIHRyYW5zbGF0ZVooMHB4KWA7XG4gICAgICBjb250cm9sbGVyQmFyQWN0aXZlLnN0eWxlLndpZHRoID0gYCR7bmV3WH1weGA7XG5cbiAgICAgIGZyYW1lQ2xpcEV4Y2hhbmdlKG5ld0ZyYW1lQ2xpcEdyb3VwLmNoaWxkcmVuLCBnbG9iYWxDb25maWcuY29udHJvbGxlci5jdXJyQ2xpcEluZGV4KTtcbiAgICB9XG5cbiAgICBkcmFnQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIF9vbk1vdXNlRG93bik7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBfb25Nb3VzZVVwT3V0KTtcbiAgICAvLyBkcmFnQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBfb25Nb3VzZVVwT3V0KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgX29uTW91c2VNb3ZlKTtcbiAgICAvL0RyYWdnaW5nIEJ1dHRvblxuICB9O1xuXG4gIGluaXRGcmFtZUxpbmVFbGVtZW50KFxuICAgIGZyYW1lRWxlbWVudCxcbiAgICBuZXdGcmFtZUNsaXBHcm91cCxcbiAgICBmcmFtZUVsZW1lbnRDaGlsZCxcbiAgICBuZXdGcmFtZUNvbnRyb2xsZXIsXG4gICAgbmV3Q29udHJvbGxlckJhcixcbiAgICBuZXdDb250cm9sbGVyQmFyQWN0aXZlLFxuICAgIG5ld0NvbnRyb2xsZXJCdXR0b25cbiAgKTtcblxuICBoYW5kbGVGcmFtZUxpbmVJbnRlckFjdGlvbihcbiAgICBmcmFtZUVsZW1lbnQsXG4gICAgbmV3Q29udHJvbGxlckJhcixcbiAgICBuZXdDb250cm9sbGVyQmFyQWN0aXZlLFxuICAgIG5ld0NvbnRyb2xsZXJCdXR0b25cbiAgKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnJhbWVMaW5lO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./resources/js/frameline.js\n");

/***/ })

})