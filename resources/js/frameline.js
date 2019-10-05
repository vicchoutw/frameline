const frameLine = (_config) => {
  const flGallery = document.getElementsByClassName('frameline')[0];
  flGallery.className = flGallery.className + ' frameline-js';

  //Default JS-Configs
  let _default = {
    width: flGallery.style.width,
    height: flGallery.style.height,
    reserved: true,
    barColor: '#000000',
    barPos: 'top'
  };

  //Images Source Data-arguments
  let sourceConfig = {
    startIndex: Number(flGallery.getAttribute('data-start')),
    endIndex: Number(flGallery.getAttribute('data-end')),
    srcPath: flGallery.getAttribute('data-src'),
    srcType: flGallery.getAttribute('data-type')
  };

  let newConfig = Object.assign({}, _default, _config);
  console.log(newConfig, sourceConfig);

  const progressBlock = document.createElement('div');
  const progressBar = document.createElement('div');
  const progressBtn = document.createElement('button');

  let imgClip;
  let imgClipIndex = sourceConfig.startIndex;
  let allImgClips;
  let totalIndex = (sourceConfig.endIndex - sourceConfig.startIndex) + 1;

  const createFrameLineElements = () => {
    function createImgClips() {
      for(let i = 0; i < totalIndex; i = i + 1) {
        imgClip = document.createElement('img');
        imgClip.src = `${sourceConfig.srcPath}${imgClipIndex}.${sourceConfig.srcType}`;
        flGallery.appendChild(imgClip);
        imgClipIndex = imgClipIndex + 1;
      }
    }
    function createProgressBar() {
      flGallery.appendChild(progressBlock);
      progressBlock.className = 'frameline-progress';
      progressBlock.appendChild(progressBar);
      progressBar.className = 'frameline-bar';
      progressBlock.appendChild(progressBtn);
      progressBtn.className = 'frameline-button';
    }
    // let allImgClips = flGallery.getElementsByTagName('img');
    createImgClips();
    createProgressBar();
  };

  allImgClips = flGallery.querySelectorAll('img');

  function changeImageClip(index) {
    allImgClips.style.opacity = 0;

    if (index > totalIndex) {
      index = 1;
    } else if (index <= 1) {
      index = 1;
    }
  }

  createFrameLineElements();

  const progressBarOnDrag = () => {
    let newX;
    let clipIndex = 1;
    let draggableOn = false;
    let pbOffsetX = progressBtn.offset().left;
    let ratio = Math.round(flGallery.style.width / totalIndex);

    console.log('Ratio: ', ratio);
    console.log('pbOffsetX', pbOffsetX);

    function changeBarStatus(index) {
      index = Math.round(newX / ratio);
      progressBtn.style.transform = `translateX(${newX}px) translateZ(0)`;
      console.log('clipIndex: ', index);
    }

    //Draggable Switch On
    progressBtn.addEventListener('mousedown', function () {
      draggableOn = true;
    });

    //Draggable Switch Off
    window.document.addEventListener('mouseup', function () {
      draggableOn = false;
    });

    //Dragging Button
    window.document.addEventListener('mousemove', function (event) {
      if (!draggableOn) {return;}
      newX = event.clientX - pbOffsetX;
      if (newX > flGallery.style.width) {
        newX = flGallery.style.width;
      }
      changeBarStatus(clipIndex);
      // console.log('clipIndex: ', clipIndex);
      // progressBtn.css('transform', 'translateX(0'+ newX +'px) translateZ(0)');
      changeImageClip(clipIndex);
    });

    // $window.mousemove(function (e) {
    //   if (!draggableOn) {return;}
    //   newX = e.clientX - pbOffsetX;
    //   // console.log('moveX: ', newX);
    //   if (newX > maxBarLength) {
    //     newX = maxBarLength;
    //   }
    //   clipIndex = Math.round(newX / ratio);
    //   // console.log('clipIndex: ', clipIndex);

    //   progressBarBtn.css('transform', 'translateX(0'+ newX +'px) translateZ(0)');
    //   changeImgClip(clipIndex);
    // });
  };
  progressBarOnDrag();
};

frameLine();
