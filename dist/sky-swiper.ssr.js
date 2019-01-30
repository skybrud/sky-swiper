'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var defaultOptions = {
	next: true,
	previous: true,
	bullets: false,
};

var script = {
	name: 'SkySwiper',
	props: {
		items: {
			type: Array,
			required: true,
		},
		options: {
			type: Object,
			default: function () { return ({}); },
		},
	},
	data: function data() {
		return {
			config: Object.assign(defaultOptions, this.options),
			direction: 'forwards',
			currentIndex: 0,
			scroll: {
				x: 0,
				y: 0,
			},
			touch: {
				startX: 0,
				dragX: 0,
				active: false,
				touching: false,
			},
		};
	},
	mounted: function mounted() {
		this.addListeners();
	},
	beforeDestroy: function beforeDestroy() {
		this.removeListeners();
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
		onResize: function onResize() {
			this.onScroll();
		},
		onScroll: function onScroll() {
			this.scroll.y = window.pageYOffset;
			this.scroll.x = window.pageXOffset;
		},
		onTouchstart: function onTouchstart(event) {
			if (!this.touch.active) {
				this.touch.active = true;
			}
			this.touch.startX = event.touches[0].clientX;
		},
		onTouchmove: function onTouchmove(event) {
			this.touch.dragX = event.touches[0].clientX - this.touch.startX;
		},
		onTouchend: function onTouchend() {
			if (Math.abs(this.touch.dragX) > 30) {
				if (this.touch.dragX < 0) {
					this.goToNext();
				} else {
					this.goToPrevious();
				}
			}
			this.touch.dragX = 0;
		},
	},
};

/* script */
            var __vue_script__ = script;
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:['sky-swiper', ("sky-swiper--" + _vm.direction)]},[_vm._t("default",null,{items:_vm.items,touchStart:_vm.onTouchstart,touchMove:_vm.onTouchmove,touchEnd:_vm.onTouchend,touchCancel:_vm.onTouchend,gotoNext:_vm.goToNext,gotoPrevious:_vm.goToPrevious,gotoIndex:_vm.goTo,currentIndex:_vm.currentIndex,direction:_vm.direction,touch:_vm.touch})],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = "data-v-6d50224e";
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
  

  
  var SkySwiper = __vue_normalize__(
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
	registerComponents: true,
};

function install(Vue, options) {
	if (install.installed === true) {
		return;
	}

	var ref = Object.assign({}, defaults, options);
	var registerComponents = ref.registerComponents;

	if (registerComponents) {
		Vue.component(SkySwiper.name, SkySwiper);
	}
}

exports.default = install;
