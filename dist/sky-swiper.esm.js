var script = {
	name: 'SkySwiperNavigation',
};

/* script */
            var __vue_script__ = script;
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sky-swiper-navigation"},[(_vm.$parent.config.navigation.previous)?_c('button',{staticClass:"sky-swiper-navigation-btn previous",on:{"click":function($event){_vm.$parent.goToPrevious();}}},[_c('span',{staticClass:"sky-swiper-navigation-btn-icon"},[_vm._t("previous",[_vm._v("\n\t\t\t\t<\n\t\t\t")])],2)]):_vm._e(),_vm._v(" "),(_vm.$parent.config.navigation.indicator === 'bullets')?_c('ul',{staticClass:"sky-swiper-bullets"},_vm._l((_vm.$parent.items),function(item,index){return _c('li',[_c('button',{class:{
					active: index === _vm.$parent.currentIndex,
				},on:{"click":function($event){_vm.$parent.goTo(index);}}},[_vm._t("bullet",null,{index:index,active:index === _vm.$parent.currentIndex})],2)])})):_vm._e(),_vm._v(" "),(_vm.$parent.config.navigation.indicator === 'pagination')?_c('div',{staticClass:"sky-swiper-pagination"},[_vm._v("\n\t\t"+_vm._s(_vm.$parent.currentIndex + 1)+" / "+_vm._s(_vm.$parent.items.length)+"\n\t")]):_vm._e(),_vm._v(" "),(_vm.$parent.config.navigation.next)?_c('button',{staticClass:"sky-swiper-navigation-btn next",on:{"click":function($event){_vm.$parent.goToNext();}}},[_c('span',{staticClass:"sky-swiper-navigation-btn-icon"},[_vm._t("next",[_vm._v("\n\t\t\t\t>\n\t\t\t")])],2)]):_vm._e()])};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script$$1,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "SkySwiperNavigation.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var SkySwiperNavigation = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

var defaults = {
	controls: {
		next: true,
		previous: true,
		cursor: false,
	},
	navigation: {
		location: 'before-caption', // can be either 'before-caption' or 'after-caption'
		indicator: 'none', // can be either 'none', 'pagination' or 'bullets'
		next: false,
		previous: false,
	},
	animation: {
		content: 'default',
		caption: 'default',
	},
};

var script$1 = {
	name: 'SkySwiper',
	components: {
		SkySwiperNavigation: SkySwiperNavigation,
	},
	props: {
		items: {
			type: Array,
			required: true,
		},
		controls: {
			type: Object,
			default: function () { return defaults.controls; },
		},
		navigation: {
			type: Object,
			default: function () { return defaults.navigation; },
		},
		animation: {
			type: [String, Object],
			default: function () { return defaults.animation; },
		},
	},
	data: function data() {
		return {
			direction: 'forwards',
			currentIndex: 0,
			scroll: {
				x: 0,
				y: 0,
			},
			cursorProps: {
				pos: {
					x: 0,
					y: 0,
				},
				dimensions: {
					width: 0,
					height: 0,
				},
				area: {
					top: 0,
					left: 0,
					width: 0,
					height: 0,
				},
				pressed: false,
				active: false,
				touch: {
					startX: 0,
					dragX: 0,
					active: false,
					touching: false,
				},
			},
			caption: {
				dimensions: null,
				style: {},
				animation: null,
			},
		};
	},
	mounted: function mounted() {
		this.addListeners();
	},
	beforeDestroy: function beforeDestroy() {
		this.removeListeners();
	},
	computed: {
		config: function config() {
			return {
				controls: Object.assign({}, defaults.controls, this.controls),
				navigation: Object.assign({}, defaults.navigation, this.navigation),
				animation: (typeof this.animation === 'object')
					? Object.assign({}, defaults.animation, this.animation)
					: { content: this.animation, caption: this.animation },
			};
		},
		cursorEnabled: function cursorEnabled() {
			return this.config.controls.cursor;
		},
		cursorDirection: function cursorDirection() {
			if (this.cursorProps.pos.x
				< this.cursorProps.area.left + this.cursorProps.area.width * 0.5) {
				return 'previous';
			}
			return 'next';
		},
		cursorStyle: function cursorStyle() {
			if (!this.cursorProps.active) {
				return {
					visibility: 'hidden',
				};
			}
			var position = {
				x: this.cursorProps.pos.x - (this.cursorProps.area.left - this.scroll.x),
				y: this.cursorProps.pos.y - (this.cursorProps.area.top - this.scroll.y),
			};
			return {
				transform: ("translate(" + (position.x) + "px, " + (position.y) + "px) translate(-50%, -50%)"),
			};
		},
		cursorAreaStyle: function cursorAreaStyle() {
			if (!this.cursorProps.dimensions.width || !this.cursorProps.dimensions.height) {
				return {
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
				};
			}
			return {
				top: ((this.cursorProps.dimensions.height * 0.5) + "px"),
				left: ((this.cursorProps.dimensions.width * 0.5) + "px"),
				width: ((this.cursorProps.area.width) + "px"),
				height: ((this.cursorProps.area.height) + "px"),
			};
		},
		cursorAreaStylePadded: function cursorAreaStylePadded() {
			if (!this.cursorProps.dimensions.width || !this.cursorProps.dimensions.height) {
				return {
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
				};
			}
			return {
				top: ((-this.cursorProps.dimensions.height * 0.5) + "px"),
				left: ((-this.cursorProps.dimensions.width * 0.5) + "px"),
				width: ((this.cursorProps.area.width + this.cursorProps.dimensions.width) + "px"),
				height: ((this.cursorProps.area.height + this.cursorProps.dimensions.height) + "px"),
			};
		},
	},
	methods: {
		addListeners: function addListeners() {
			window.addEventListener('resize', this.onResize);
			window.addEventListener('scroll', this.onScroll);
			this.$nextTick(this.onResize);
		},
		removeListeners: function removeListeners() {
			window.removeEventListener('resize', this.onResize);
			window.removeEventListener('scroll', this.onScroll);
		},
		goTo: function goTo(index) {
			var itemsLength = this.items.length;
			var to = (itemsLength + index) % itemsLength;
			var distanceForwards = (to - this.currentIndex + itemsLength) % itemsLength;
			var distanceBackwards = Math.abs(distanceForwards - itemsLength);
			this.direction = (distanceBackwards < distanceForwards) ? 'backwards' : 'forwards';
			this.currentIndex = to;
			this.$nextTick(this.captionChangeSize);
			this.$emit('change', index);
		},
		goToNext: function goToNext() {
			this.goTo(this.currentIndex + 1);
			this.$emit('next', this.currentIndex + 1);
		},
		goToPrevious: function goToPrevious() {
			this.goTo(this.currentIndex - 1);
			this.$emit('previous', this.currentIndex - 1);
		},
		captionChangeSize: function captionChangeSize() {
			if (this.$refs.caption) {
				var bounding = this.$refs.caption.getBoundingClientRect();
				this.$set(this.caption.style, 'height', ((bounding.height) + "px"));
			}
		},
		onResize: function onResize() {
			this.onScroll();
			var elRect = this.$el.getBoundingClientRect();
			var contentRect = this.$refs.content.getBoundingClientRect();
			this.cursorProps.area.top = elRect.top + this.scroll.y;
			this.cursorProps.area.left = elRect.left + this.scroll.x;
			this.cursorProps.area.width = contentRect.width;
			this.cursorProps.area.height = contentRect.height;
			if (this.$refs.cursor && !this.cursorProps.touch.active) {
				var cursorRect = this.$refs.cursor.getBoundingClientRect();
				this.cursorProps.dimensions.width = cursorRect.width;
				this.cursorProps.dimensions.height = cursorRect.height;
			}
			this.$nextTick(this.captionChangeSize);
		},
		onScroll: function onScroll() {
			this.scroll.y = window.pageYOffset;
			this.scroll.x = window.pageXOffset;
		},
		onCursorClick: function onCursorClick() {
			if (this.cursorDirection === 'previous') {
				this.goToPrevious();
			} else {
				this.goToNext();
			}
		},
		onCursorDown: function onCursorDown() {
			this.cursorProps.pressed = true;
		},
		onCursorUp: function onCursorUp() {
			this.cursorProps.pressed = false;
		},
		onCursorEnter: function onCursorEnter(event) {
			this.onCursorMove(event);
			this.cursorProps.active = true;
			this.cursorProps.pressed = false;
		},
		onCursorLeave: function onCursorLeave(event) {
			this.onCursorMove(event);
			this.cursorProps.active = false;
			this.cursorProps.pressed = false;
		},
		onCursorMove: function onCursorMove(event) {
			this.cursorProps.pos.x = event.clientX;
			this.cursorProps.pos.y = event.clientY;
		},
		onTouchstart: function onTouchstart(event) {
			if (!this.cursorProps.touch.active) {
				this.cursorProps.touch.active = true;
				this.cursorProps.dimensions.width = 0;
				this.cursorProps.dimensions.height = 0;
			}
			this.cursorProps.touch.startX = event.touches[0].clientX;
		},
		onTouchmove: function onTouchmove(event) {
			this.cursorProps.touch.dragX = event.touches[0].clientX - this.cursorProps.touch.startX;
		},
		onTouchend: function onTouchend() {
			if (Math.abs(this.cursorProps.touch.dragX) > 30) {
				if (this.cursorProps.touch.dragX < 0) {
					this.goToNext();
				} else {
					this.goToPrevious();
				}
			}
			this.cursorProps.touch.dragX = 0;
		},
	},
};

/* script */
            var __vue_script__$1 = script$1;
/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:['sky-swiper', _vm.direction, ("slide-" + _vm.currentIndex), {
	'cursor-active': _vm.cursorProps.active
}]},[_c('figure',{staticClass:"sky-swiper-wrap"},[_c('div',{ref:"content",class:['sky-swiper-content', _vm.direction],on:{"touchstart":_vm.onTouchstart,"touchmove":_vm.onTouchmove,"touchend":_vm.onTouchend,"touchcancel":_vm.onTouchend}},[_c('transition',{attrs:{"name":_vm.config.animation.content}},[_c('div',{key:_vm.currentIndex,staticClass:"sky-swiper-content-item",attrs:{"keep-alive":""}},[_c('div',{staticClass:"sky-swiper-content-item-inner"},[_vm._t("content",null,{item:_vm.items[_vm.currentIndex],index:_vm.currentIndex})],2)])]),_vm._v(" "),(_vm.config.controls.previous)?_c('button',{staticClass:"sky-swiper-control previous",on:{"click":function($event){_vm.goToPrevious();}}},[_c('span',{staticClass:"sky-swiper-control-icon"},[_vm._t("controls-previous",[_c('span',{domProps:{"textContent":_vm._s('<')}})])],2)]):_vm._e(),_vm._v(" "),(_vm.config.controls.next)?_c('button',{staticClass:"sky-swiper-control next",on:{"click":function($event){_vm.goToNext();}}},[_c('span',{staticClass:"sky-swiper-control-icon"},[_vm._t("controls-next",[_c('span',{domProps:{"textContent":_vm._s('>')}})])],2)]):_vm._e()],1),_vm._v(" "),(_vm.config.navigation.location === 'before-caption')?_c('SkySwiperNavigation',{scopedSlots:_vm._u([{key:"bullet",fn:function(ref){
var active = ref.active;
var index = ref.index;
return _c('div',{},[_vm._t("bullets",null,{active:active,index:index})],2)}}])},[_c('div',{attrs:{"slot":"previous"},slot:"previous"},[_vm._t("navigation-previous")],2),_vm._v(" "),_c('div',{attrs:{"slot":"next"},slot:"next"},[_vm._t("navigation-next")],2)]):_vm._e(),_vm._v(" "),(_vm.$scopedSlots.caption)?_c('figcaption',{ref:"captionWrap",staticClass:"sky-swiper-caption-wrap",style:(_vm.caption.style)},[_c('div',{ref:"caption",staticClass:"sky-swiper-caption"},[_c('transition',{attrs:{"name":_vm.config.animation.caption}},_vm._l((_vm.items),function(item,index){return (index === _vm.currentIndex)?_c('div',{key:index,staticClass:"sky-swiper-caption-item"},[_c('div',{staticClass:"sky-swiper-caption-item-inner"},[_vm._t("caption",null,{item:item,index:index})],2)]):_vm._e()}))],1)]):_vm._e()],1),_vm._v(" "),(_vm.config.controls.cursor && !_vm.cursorProps.touch.active)?_c('div',{staticClass:"sky-swiper-cursor-area",style:(_vm.cursorAreaStylePadded),on:{"mouseenter":_vm.onCursorEnter,"mouseleave":_vm.onCursorLeave,"mousemove":_vm.onCursorMove,"mousedown":_vm.onCursorDown,"mouseup":_vm.onCursorUp}},[_c('div',{staticClass:"cursor-area-content",style:(_vm.cursorAreaStyle),on:{"click":_vm.onCursorClick}},[_c('div',{staticClass:"sky-swiper-cursor-container",style:(_vm.cursorStyle)},[_c('div',{ref:"cursor",class:['sky-swiper-cursor', _vm.cursorDirection, {
						pressed: _vm.cursorProps.pressed
					}]},[_vm._t("cursor",null,{direction:_vm.cursorDirection,active:_vm.cursorProps.active,pressed:_vm.cursorProps.pressed})],2)])])]):_vm._e(),_vm._v(" "),(_vm.config.navigation.location === 'after-caption')?_c('SkySwiperNavigation',[_vm._t("navigation-previous",null,{slot:"previous"}),_vm._v(" "),_vm._t("navigation-next",null,{slot:"next"})],2):_vm._e()],1)};
var __vue_staticRenderFns__$1 = [];

  /* style */
  var __vue_inject_styles__$1 = undefined;
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* component normalizer */
  function __vue_normalize__$1(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "SkySwiper.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var SkySwiper = __vue_normalize__$1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );

var defaults$1 = {
	registerComponents: true,
};

function install(Vue, options) {
	if (install.installed === true) {
		return;
	}

	var ref = Object.assign({}, defaults$1, options);
	var registerComponents = ref.registerComponents;

	if (registerComponents) {
		Vue.component(SkySwiper.name, SkySwiper);
	}
}

export default install;
