<template>
  <section
    @mousedown="mouseDown"
    @mousemove="mouseMove"
    @mouseup="isMousePush=false"
    @wheel="zoom"
    id="map-controller"
    class="map-container"
  >
    <canvas id="map"></canvas>
  </section>
</template>

<script>
import { fabric } from 'fabric'
export default {
  data(){
    return {
      isMousePush: false,
      mouseCoords: {
        x: 0,
        y: 0
      },
      map: null,
      mapImg: '../assets/img/test.jpg',
      mapOptions: {
        baseWidth : 0, // начальная ширина
      	baseHeight: 0, // начальная высота
      	baseScale : 1, // начальный масштаб

      	width:  0, // текущая ширина
      	height: 0, // текущая высота
      	transX: 0, // текущее смещение по оси x
      	transY: 0, // текущее смещение по оси y
      	scale:  1 // текущий масштаб в целом
      }
    }
  },
  computed: {
    width() {
      return (100 * this.$parent.$el.clientWidth) / 100;
    },

  },
  methods: {
    mouseMove(e){
      if(this.isMousePush){
        // Рассчитываем смещение с учётом масштаба
        //console.log(this.mapOptions.transX + ':' + this.mapOptions.transY)
  			this.mapOptions.transX -= (this.mouseCoords.x - e.pageX) / this.mapOptions.scale;
  			this.mapOptions.transY -= (this.mouseCoords.y - e.pageY) / this.mapOptions.scale;
        //console.log(this.mapOptions.transX + ':' + this.mapOptions.transY)

  			this.applyTransform();
        this.map.renderAll();

        this.mouseCoords.x = e.pageX;
  		  this.mouseCoords.y = e.pageY;
        //console.log(`мыш кродется: [${this.mouseCoords.x}:${this.mouseCoords.x}]`)
        //console.log(this.mapOptions)
      }
    },

    mouseDown(e){
      this.isMousePush = true;
      this.mouseCoords.x = e.pageX;
		  this.mouseCoords.y = e.pageY;
      //console.log(`мыш тащит: [${this.mouseCoords.x}:${this.mouseCoords.x}]`)
      //console.log(this.mapOptions)
    },

    zoom(e){
      //console.log(e)
      let element = document.getElementById('map'),
        offset = element.getBoundingClientRect(), // положение холста на странице
  			centerX = e.clientX - offset.left, // координата x центра масштабирования
  			centerY = e.clientY - offset.top, // координата y центра масштабирования
  			zoomStep = Math.pow(1.04, e.deltaY); // шаг масштабирования, удобный для пользователя.

  		this.setScale(this.mapOptions.scale * zoomStep, centerX, centerY);

  		// Отключим скроллирование страницы
  		e.preventDefault();
    },

    mapInit(){
      this.map = new fabric.Canvas('map', {
        width: 1000,
        height: 500,
    		selection: false, // отключим возможность выбора группы
    		scale: 1, // установим масштаб по умолчанию
    		renderOnAddRemove: false, // отключим авто-отрисовку, чтобы увеличить скорость для большого числа меток
    		moveCursor: 'default', // сбросим курсоры, чтобы не отвлекали
    		hoverCursor: 'default'
    	});

      fabric.Image.fromURL(this.mapImg, (img) => {
        var curBaseScale;

        // Установим начальные и текущие размеры
      	this.mapOptions.baseWidth = img.width;
      	this.mapOptions.baseHeight = img.height;
      	this.mapOptions.width = 1000;
      	this.mapOptions.height = 500;

        // Отключим любую возможность редактирования и выбора карты как объекта на холсте
      	img.set({
      		hasRotatingPoint: false,
      		hasBorders: false,
      		hasControls: false,
      		lockScalingY: true,
      		lockScalingX: true,
      		selectable: false,
      		left: img.width / 2,
      		top: img.height / 2,
      		originX: 'center',
      		originY: 'center'
      	});
      	this.map.add(img);
        this.map.sendToBack(img);
        this.map.renderAll();
      });

      this.addMarker({x: 550, y: 390}, '0', '#1048a7');
    	this.addMarker({x: 460, y: 120}, '1', '#aa2222');

      this.map.renderAll();
      //console.log(this.map)
    },

    applyTransform() {
      let maxTransX,
    		maxTransY,
    		minTransX,
    		minTransY,
    		group;

        // Рассчитаем пороговые значения для смещения по оси x
      	if (this.mapOptions.baseWidth * this.mapOptions.scale <= this.mapOptions.width) {
      		// Карта целиком помещается на холст
      		maxTransX = (this.mapOptions.width - this.mapOptions.baseWidth * this.mapOptions.scale) / (2 * this.mapOptions.scale);
      		minTransX = (this.mapOptions.width - this.mapOptions.baseWidth * this.mapOptions.scale) / (2 * this.mapOptions.scale);
      	} else {
      		// Не влазит
      		maxTransX = 0;
      		minTransX = (this.mapOptions.width - this.mapOptions.baseWidth * this.mapOptions.scale) / this.mapOptions.scale;
      	}

        // Ограничим смещение пороговыми значениями
      	if (this.mapOptions.transX > maxTransX) {
      		this.mapOptions.transX = maxTransX;
      	} else if (this.mapOptions.transX < minTransX) {
      		this.mapOptions.transX = minTransX;
      	}

      	// То же самое для оси y
      	if (this.mapOptions.baseHeight * this.mapOptions.scale <= this.mapOptions.height) {
      		maxTransY = (this.mapOptions.height - this.mapOptions.baseHeight * this.mapOptions.scale) / (2 * this.mapOptions.scale);
      		minTransY = (this.mapOptions.height - this.mapOptions.baseHeight * this.mapOptions.scale) / (2 * this.mapOptions.scale);
      	} else {
      		maxTransY = 0;
      		minTransY = (this.mapOptions.height - this.mapOptions.baseHeight * this.mapOptions.scale) / this.mapOptions.scale;
      	}
      	if (this.mapOptions.transY > maxTransY) {
      		this.mapOptions.transY = maxTransY;
      	} else if (this.mapOptions.transY < minTransY) {
      		this.mapOptions.transY = minTransY;
      	}

      	// Сгруппируем все объекты на холсте и применим трансформацию
      	group = new fabric.Group(this.map.getObjects());
      	group.scaleX = this.mapOptions.scale / this.map.scale;
      	group.scaleY = this.mapOptions.scale / this.map.scale;
      	group.left = this.mapOptions.transX * this.mapOptions.scale;
      	group.top =  this.mapOptions.transY * this.mapOptions.scale;
      	group.destroy();

      	// Обновим глобальный масштаб на холсте
      	this.map.scale = this.mapOptions.scale;

      	// Отрисуем холст с изменёнными объектами
      	this.map.renderAll();
    },

    setScale(scaleToSet, anchorX, anchorY) {
    	var zoomMax = 5, // максимально 5-ти кратное увеличение
    		zoomMin =  -1, // минимальное увеличение - реальный размер картинки
    		zoomStep; // необходимое изменение масштаба

    	// Ограничим масштаб, если нужно
    	if (scaleToSet > zoomMax * this.mapOptions.baseScale) {
    		scaleToSet = zoomMax * this.mapOptions.baseScale;
    	} else if (scaleToSet < zoomMin * this.mapOptions.baseScale) {
    		scaleToSet = zoomMin * this.mapOptions.baseScale;
    	}

    	// Центр масштабирования - точка, которая должна остаться на месте.
    	// Задаётся параметрами anchorX и anchorY.
    	// По сути это позиция курсора в момент масштабирования.
    	if (typeof anchorX != 'undefined' && typeof anchorY != 'undefined') {
    		zoomStep = scaleToSet / this.mapOptions.scale;
    		// Рассчитаем, на сколько нужно сместить все объекты,
    		// чтобы центр масштабирования остался на месте.
    		this.mapOptions.transX -= (zoomStep - 1) / scaleToSet * anchorX;
    		this.mapOptions.transY -= (zoomStep - 1) / scaleToSet * anchorY;
    	}

    	this.mapOptions.scale = scaleToSet;
    	this.applyTransform();
    },

    addMarker(point, text, markerColor){
      let marker = new fabric.Path("M356.208,107.051c-1.531-5.738-4.64-11.852-6.94-17.205C321.746,23.704,261.611,0,213.055,0C148.054,0,76.463,43.586,66.905,133.427v18.355c0,0.766,0.264,7.647,0.639,11.089c5.358,42.816,39.143,88.32,64.375,131.136c27.146,45.873,55.314,90.999,83.221,136.106c17.208-29.436,34.354-59.259,51.17-87.933c4.583-8.415,9.903-16.825,14.491-24.857c3.058-5.348,8.9-10.696,11.569-15.672c27.145-49.699,70.838-99.782,70.838-149.104v-20.262C363.209,126.938,356.581,108.204,356.208,107.051z M214.245,199.193c-19.107,0-40.021-9.554-50.344-35.939c-1.538-4.2-1.414-12.617-1.414-13.388v-11.852c0-33.636,28.56-48.932,53.406-48.932c30.588,0,54.245,24.472,54.245,55.06C270.138,174.729,244.833,199.193,214.245,199.193z"
        , {
          //width: 10,
      		//height: 5,
      		scaleX: this.mapOptions.scale/5,
      		scaleY: this.mapOptions.scale/5,
      		left: point.x,
      		top: point.y,
          opacity: 0.7,
      		originX: 'center',
      		originY: 'bottom',
      		fill: markerColor,
      		stroke: 'black',
      		text: text
      }),
      // Текст
    	textObject = new fabric.Text(text, {
    		fontSize: 14,
    		originX: 'center',
    		fill: markerColor,
    		originY: 'center'
    	}),
      // Обёртка вокруг текста
    	background = new fabric.Circle({
    		radius: 11,
    		originX: 'center',
    		originY: 'center',
    		fill: 'white',
    		stroke: markerColor
    	}),
      // Сгруппируем их для правильного позиционирования
    	textGroup = new fabric.Group([background, textObject], {
    		scaleX: this.mapOptions.scale,
    		scaleY: this.mapOptions.scale,
        opacity: .8,
    		left: point.x - 12 * this.mapOptions.scale, // необходимо учитывать масштаб
    		top: point.y - 69 * this.mapOptions.scale // необходимо учитывать масштаб
    	});

    	this.map.add(marker);
      this.map.bringToFront(marker);
    	this.map.add(textGroup);
      this.map.bringToFront(textGroup);
    }
  },
  mounted() {
    this.mapInit();
  },

}
</script>

<style lang="scss" scoped>
  #map{
    border: 1px dotted #ccc;
    background-color: #bde4b0;
  }
</style>
