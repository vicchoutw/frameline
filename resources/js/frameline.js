const frameLine = (cfg) => {
  'use strict';

  let _default = {
    element: '.frameline',
    index: 0,
    reverse: false,
    controller: true,
    startImgIndex: 0,
    lineBgColor: '#000'
  };

  if (cfg) {
    _default = Object.assign(cfg, _default);
  }


  let globalConfig = {
    clips: {
      width: null,
      height: null,
      length: null
    },
    controller: {
      width: 930,
      height: 20,
      bgColor: '#a7a7a7',
      currPercent: 0,
      currClipIndex: 0
    }
  };

  let currentClipElement;

  // let windows = document.defaultView;
  // console.log('window: ', windows);

  const frameElement = document.querySelector(_default.element);
  const newFrameClipGroup = document.createElement('div');
  const newFrameController = document.createElement('div');
  const newControllerBar = document.createElement('div');
  const newControllerBarActive = document.createElement('div');
  const newControllerButton = document.createElement('div');


  frameElement.classList.add('frameline-container');

  frameElement.style.cssText = `
    width: 960px;
  `;

  let frameElementChild = frameElement.children;
  let totalClip = frameElement.children.length;

  globalConfig.clips.length = totalClip;

  console.log('Get FrameLiner <div>', frameElement);
  console.log('Get FrameLiner <img>', totalClip);


  // Append Base Elements
  const initFrameLineElement = (mainContent, clipGroup, clipImg, controller, controllerBar, controllerBarActive, controllerButton) => {

    function _eachImgAddClassName() {
      for (let i = 0; i < totalClip; i = i + 1) {

        if (i === 0) {
          globalConfig.clips.width = clipImg[i].clientWidth;
          globalConfig.clips.height = clipImg[i].clientHeight;
        }

        clipImg[i].classList.add('frameline-clip', `clip-${i}`);
        clipImg[i].style.cssText = `
          width: 960px;
          height: 540px;
        `;
      }
    }


    function _appendParentElementForAllImg() {
      clipGroup.classList.add('frameline-clip-group');
      while (frameElement.hasChildNodes()) {
        clipGroup.appendChild(mainContent.firstChild);
      }
      mainContent.appendChild(clipGroup);

      // controller style
      clipGroup.style.cssText = `
        width: 960px;
        height: 540px;
      `;
    }

    _eachImgAddClassName();
    _appendParentElementForAllImg();


    if (!_default.controller) { return; }


    function _appendControllerInterface() {
      controller.classList.add('frameline-controller');
      controllerBar.classList.add('frameline-controller-bar');
      controllerBarActive.classList.add('frameline-bar-active');
      controllerButton.classList.add('frameline-controller-button');

      mainContent.appendChild(controller);
      controllerBar.appendChild(controllerBarActive);
      controllerBar.appendChild(controllerButton);

      controller.appendChild(controllerBar);

      globalConfig.clips.width = controller.clientWidth;

      // controller bar style
      controllerBarActive.style.cssText = `
        width: ${globalConfig.controller.currPercent}%;
      `;
      // `;
    }

    _appendControllerInterface();
  };


  const frameClipExchange = (eachImgClip, currIndex) => {

    for (let i = 0; i < eachImgClip.length; i = i + 1) {
      eachImgClip[i].style.opacity = 0;
    }

    if (currIndex >= globalConfig.clips.length) {
      currIndex = globalConfig.clips.length;
    } else if (currIndex <= 1) {
      currIndex = 1;
    }

    currentClipElement = document.querySelector(`.clip-${currIndex}`);
    currentClipElement.style.opacity = 1;
  };

  const handleFrameLineInterAction = (mainContent, controllerBar, controllerBarActive, dragButton) => {
    let newX;
    let isDraggable = false;

    let defaultOffsetX = mainContent.offsetLeft + controllerBar.offsetLeft;

    let ratio = Math.round(globalConfig.controller.width / globalConfig.clips.length);

    //Draggable Switch On
    function _onMouseDown() {
      // console.log('Mouse Down!!');
      isDraggable = true;
    }

    //Draggable Switch Off
    function _onMouseUpOut() {
      // console.log('Mouse Up!!');
      isDraggable = false;
    }

    function _onMouseMove(e) {
      // console.log('Mouse Dragging!!');
      if (!isDraggable) { return; }
      console.log('Ratio: ', ratio);

      // e.preventDefault();
      newX = e.pageX - defaultOffsetX;
      // console.log('Mouse Dragging: ', event.pageX, newX);
      if (newX >= globalConfig.controller.width - 20) {
        newX = globalConfig.controller.width - 20;
      } else if (newX <= 10) {
        newX = 10;
      }

      globalConfig.controller.currClipIndex = Math.round(newX / ratio);

      console.log('currClipIndex: ', globalConfig.controller.currClipIndex);

      dragButton.style.transform = `translate3d(${newX}px, 0px, 0px) translateZ(0px)`;
      controllerBarActive.style.width = `${newX}px`;

      frameClipExchange(newFrameClipGroup.children, globalConfig.controller.currClipIndex);
    }

    dragButton.addEventListener('mousedown', _onMouseDown);
    window.addEventListener('mouseup', _onMouseUpOut);
    // dragButton.addEventListener('mouseleave', _onMouseUpOut);
    window.addEventListener('mousemove', _onMouseMove);
    //Dragging Button
  };

  initFrameLineElement(
    frameElement,
    newFrameClipGroup,
    frameElementChild,
    newFrameController,
    newControllerBar,
    newControllerBarActive,
    newControllerButton
  );

  handleFrameLineInterAction(
    frameElement,
    newControllerBar,
    newControllerBarActive,
    newControllerButton
  );
};

module.exports = frameLine;
