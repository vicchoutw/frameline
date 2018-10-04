const frameLine = (cfg) => {

  let _default = {
    reverse: false,
    controller: true,
    startAt: '0%',
    lineBgColor: '#000'
  }

  _default = $.extend({}, _default, cfg);

  let currentClip;
  let $window = $(window);
  let flContainer = $('.frameline');
  let flFrames = $('.frameline > img');
  let totalFrames = flFrames.length || 0;

  this.initChildClassName = function() {
    flContainer.addClass('frameline-content');
    flFrames.each(function(i) {
      $(this).addClass('fl-clip' + i);
    })
  }

  this.frameClipExchange = function(index) {
    flFrames.css('opacity', 0);

    if (index > totalFrames) {
      index = 1;
    } else if (index <= 1) {
      index = 1;
    }

    currentClip = $('.fl-clip' + index);
    currentClip.css('opacity', 1);
  }

  this.progressBarDragMove = function() {
    let newPosX;
    let startIndex = 1;
    let draggableOn = false;
    // const progressBar = $('.progressBar');
    const progressBarBtn = $('.progressBar .pb__btn');
    let defaultOffsetX = progressBarBtn.offset().left;
    let ratio = Math.round(maxBarLength / totalClip);

    console.log('Ratio: ', ratio);
    console.log('defaultOffsetX', defaultOffsetX);

    //Draggable Switch On
    progressBarBtn.on('mousedown', function () {
      draggableOn = true;
    });
    //Draggable Switch Off
    $window.on('mouseup', function () {
      draggableOn = false;
    });
    //Dragging Button
    $window.mousemove(function (e) {
      if (!draggableOn) {return;}
      newX = e.clientX - defaultOffsetX;
      // console.log('moveX: ', newX);
      if (newX > maxBarLength) {
        newX = maxBarLength;
      }
      clipIndex = Math.round(newX / ratio);
      // console.log('clipIndex: ', clipIndex);

      progressBarBtn.css('transform', 'translateX(0'+ newX +'px) translateZ(0)');
      changeImgClip(clipIndex);
    });
  }
};

frameLine();