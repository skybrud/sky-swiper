var script = {
	name: 'SkySwiperNavigation',
};

/* script */
            const __vue_script__ = script;
            
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sky-swiper-navigation"},[(_vm.$parent.config.navigation.previous)?_c('button',{staticClass:"sky-swiper-navigation-btn previous",on:{"click":function($event){_vm.$parent.goToPrevious();}}},[_c('span',{staticClass:"sky-swiper-navigation-btn-icon"},[_vm._t("previous",[_vm._v("\n\t\t\t\t<\n\t\t\t")])],2)]):_vm._e(),_vm._v(" "),(_vm.$parent.config.navigation.indicator === 'bullets')?_c('ul',{staticClass:"sky-swiper-bullets"},_vm._l((_vm.$parent.items),function(item,index){return _c('li',[_c('button',{class:{
					active: index === _vm.$parent.currentIndex,
				},on:{"click":function($event){_vm.$parent.goTo(index);}}},[_vm._t("bullet",null,{index:index,active:index === _vm.$parent.currentIndex})],2)])})):_vm._e(),_vm._v(" "),(_vm.$parent.config.navigation.indicator === 'pagination')?_c('div',{staticClass:"sky-swiper-pagination"},[_vm._v("\n\t\t"+_vm._s(_vm.$parent.currentIndex + 1)+" / "+_vm._s(_vm.$parent.items.length)+"\n\t")]):_vm._e(),_vm._v(" "),(_vm.$parent.config.navigation.next)?_c('button',{staticClass:"sky-swiper-navigation-btn next",on:{"click":function($event){_vm.$parent.goToNext();}}},[_c('span',{staticClass:"sky-swiper-navigation-btn-icon"},[_vm._t("next",[_vm._v("\n\t\t\t\t>\n\t\t\t")])],2)]):_vm._e()])};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-00c7f6ea_0", { source: "\n.sky-swiper-navigation{position:relative;z-index:10;display:flex;align-items:center\n}\n.sky-swiper-navigation-btn{border:none;background-color:transparent\n}\n.sky-swiper-bullets{list-style:none;margin:0;padding:0;display:flex;margin:0\n}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script$$1,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "SkySwiperNavigation.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      let hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
    const isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;

        style.ids.push(id);

        if (css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          code +=
            '\n/*# sourceMappingURL=data:application/json;base64,' +
            btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
            ' */';
        }

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          const el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var SkySwiperNavigation = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    __vue_create_injector__,
    undefined
  );

const defaults = {
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
		SkySwiperNavigation,
	},
	props: {
		items: {
			type: Array,
			required: true,
		},
		controls: {
			type: Object,
			default: () => defaults.controls,
		},
		navigation: {
			type: Object,
			default: () => defaults.navigation,
		},
		animation: {
			type: [String, Object],
			default: () => defaults.animation,
		},
	},
	data() {
		return {
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
	mounted() {
		this.addListeners();
	},
	beforeDestroy() {
		this.removeListeners();
	},
	computed: {
		api() {
			return {
				touch: {
					start: this.onTouchstart,
					move: this.onTouchmove,
					end: this.onTouchend,
					cancel: this.onTouchend,
				},
				goto: {
					previous: this.goToPrevious,
					next: this.goToNext,
					index: this.goTo,
				},
				states: {
					currentIndex: this.currentIndex,
					direction: this.direction,
					touch: this.touch,
				},
			}
		},
		config() {
			return {
				controls: Object.assign({}, defaults.controls, this.controls),
				navigation: Object.assign({}, defaults.navigation, this.navigation),
				animation: (typeof this.animation === 'object')
					? Object.assign({}, defaults.animation, this.animation)
					: { content: this.animation, caption: this.animation },
			};
		},
	},
	methods: {
		addListeners() {
			window.addEventListener('resize', this.onResize);
			window.addEventListener('scroll', this.onScroll);

			this.$nextTick(this.onResize);
		},
		removeListeners() {
			window.removeEventListener('resize', this.onResize);
			window.removeEventListener('scroll', this.onScroll);
		},
		goTo(index) {
			const itemsLength = this.items.length;
			const to = (itemsLength + index) % itemsLength;
			const distanceForwards = (to - this.currentIndex + itemsLength) % itemsLength;
			const distanceBackwards = Math.abs(distanceForwards - itemsLength);
			this.direction = (distanceBackwards < distanceForwards) ? 'backwards' : 'forwards';
			this.currentIndex = to;

			this.$emit('change', index);
		},
		goToNext() {
			this.goTo(this.currentIndex + 1);
			this.$emit('next', this.currentIndex + 1);
		},
		goToPrevious() {
			this.goTo(this.currentIndex - 1);
			this.$emit('previous', this.currentIndex - 1);
		},
		onResize() {
			this.onScroll();
		},
		onScroll() {
			this.scroll.y = window.pageYOffset;
			this.scroll.x = window.pageXOffset;
		},
		onTouchstart(event) {
			if (!this.touch.active) {
				this.touch.active = true;
			}
			this.touch.startX = event.touches[0].clientX;
		},
		onTouchmove(event) {
			this.touch.dragX = event.touches[0].clientX - this.touch.startX;
		},
		onTouchend() {
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
            const __vue_script__$1 = script$1;
            
/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:['sky-swiper', ("sky-swiper--" + _vm.direction)]},[_vm._t("default",[_c('figure',{staticClass:"sky-swiper__wrap"},[_c('div',{ref:"content",staticClass:"sky-swiper__content",on:{"touchstart":_vm.onTouchstart,"touchmove":_vm.onTouchmove,"touchend":_vm.onTouchend,"touchcancel":_vm.onTouchend}},[_c('transition',{attrs:{"name":"sky-swiper__animation"}},[_c('div',{key:_vm.currentIndex,staticClass:"sky-swiper__item",attrs:{"keep-alive":""}},[_c('div',{staticClass:"sky-swiper__item-inner"},[_vm._t("display",null,{item:_vm.items[_vm.currentIndex],goto:_vm.api.goto,states:_vm.api.states})],2)])])],1),_vm._v(" "),_vm._t("withDisplay",[_c('button',{staticClass:"sky-swiper__control sky-swiper__control--previous",on:{"click":function($event){_vm.goToPrevious();}}},[_c('span',{staticClass:"sky-swiper__control-icon"},[_c('span',{domProps:{"textContent":_vm._s('<')}})])]),_vm._v(" "),_c('button',{staticClass:"sky-swiper__control sky-swiper__control--next",on:{"click":function($event){_vm.goToNext();}}},[_c('span',{staticClass:"sky-swiper__control-icon"},[_c('span',{domProps:{"textContent":_vm._s('>')}})])])],{items:_vm.items,states:_vm.api.states,goto:_vm.api.goto})],2),_vm._v(" "),_vm._t("bullets",[_c('ul',{staticClass:"sky-swiper__bullets"},_vm._l((_vm.items),function(item,index){return _c('li',{key:index},[_c('button',{class:[
							'sky-swiper__bullet-button',
							{
								'sky-swiper__bullet-button--active': index === _vm.currentIndex,
							}
						],on:{"click":function($event){_vm.goTo(index);}}})])}))],{item:_vm.items,states:_vm.api.states,goto:_vm.api.goto.index})],{items:_vm.items,touch:_vm.api.touch,goto:_vm.api.goto,states:_vm.api.states})],2)};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-4604ac73_0", { source: "\n.sky-swiper__wrap{position:relative\n}\n.sky-swiper__content{position:relative;overflow:hidden;z-index:1\n}\n&-enter,.sky-swiper--backwards &-leave-to{transform:translateX(100%)\n}\n.sky-swiper--backwards &-enter{transform:translateX(-100%)\n}\n.sky-swiper__item-inner{width:100%;height:100%;transition:transform .2s\n}\n.sky-swiper__control{position:absolute;top:0;bottom:0;width:15%;margin:0;padding:0;border:none;z-index:5;background-color:transparent;color:#fff;transform:translateX(0);transition:all .3s\n}\n&--previous{left:0\n}\n.sky-swiper__bullets{display:flex;margin:0;padding:0;margin:0;list-style:none\n}\n&--active{background-color:#ccc\n}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* component normalizer */
  function __vue_normalize__$1(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "SkySwiper.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      let hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$1() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__$1.styles || (__vue_create_injector__$1.styles = {});
    const isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;

        style.ids.push(id);

        if (css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          code +=
            '\n/*# sourceMappingURL=data:application/json;base64,' +
            btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
            ' */';
        }

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          const el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var SkySwiper = __vue_normalize__$1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    __vue_create_injector__$1,
    undefined
  );

const defaults$1 = {
	registerComponents: true,
};

function install(Vue, options) {
	if (install.installed === true) {
		return;
	}

	const { registerComponents } = Object.assign({}, defaults$1, options);

	if (registerComponents) {
		Vue.component(SkySwiper.name, SkySwiper);
	}
}

export default install;
