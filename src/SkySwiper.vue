<script>
const defaults = {
	controls: {
		next: true,
		previous: true,
		cursor: false,
	},
	navigation: {
		indicator: 'none', // can be either 'none', 'pagination' or 'bullets'
		next: false,
		previous: false,
	},
	animation: {
		content: 'default',
		caption: 'default',
	},
};

export default {
	name: 'SkySwiper',
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
				active: true,
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
	mounted() {
		this.addListeners();
	},
	beforeDestroy() {
		this.removeListeners();
	},
	computed: {
		config() {
			return {
				controls: Object.assign({}, defaults.controls, this.controls),
				navigation: Object.assign({}, defaults.navigation, this.navigation),
				animation: (typeof this.animation === 'object')
					? Object.assign({}, defaults.animation, this.animation)
					: { content: this.animation, caption: this.animation },
			};
		},
		cursorEnabled() {
			return this.config.controls.cursor;
		},
		cursorDirection() {
			if (this.cursorProps.pos.x
				< this.cursorProps.area.left + this.cursorProps.area.width * 0.5) {
				return 'previous';
			}
			return 'next';
		},
		cursorStyle() {
			if (!this.cursorProps.active) {
				return {
					visibility: 'hidden',
				};
			}
			const position = {
				x: this.cursorProps.pos.x - (this.cursorProps.area.left - this.scroll.x),
				y: this.cursorProps.pos.y - (this.cursorProps.area.top - this.scroll.y),
			};
			return {
				transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
			};
		},
		cursorAreaStyle() {
			if (!this.cursorProps.dimensions.width || !this.cursorProps.dimensions.height) {
				return {
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
				};
			}
			return {
				top: `${this.cursorProps.dimensions.height * 0.5}px`,
				left: `${this.cursorProps.dimensions.width * 0.5}px`,
				width: `${this.cursorProps.area.width}px`,
				height: `${this.cursorProps.area.height}px`,
			};
		},
		cursorAreaStylePadded() {
			if (!this.cursorProps.dimensions.width || !this.cursorProps.dimensions.height) {
				return {
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
				};
			}
			return {
				top: `${-this.cursorProps.dimensions.height * 0.5}px`,
				left: `${-this.cursorProps.dimensions.width * 0.5}px`,
				width: `${this.cursorProps.area.width + this.cursorProps.dimensions.width}px`,
				height: `${this.cursorProps.area.height + this.cursorProps.dimensions.height}px`,
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
			this.$nextTick(this.captionChangeSize);
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
		captionChangeSize() {
			if (this.$refs.caption) {
				const bounding = this.$refs.caption.getBoundingClientRect();
				this.$set(this.caption.style, 'height', `${bounding.height}px`);
			}
		},
		onResize() {
			this.onScroll();
			const elRect = this.$el.getBoundingClientRect();
			const contentRect = this.$refs.content.getBoundingClientRect();
			this.cursorProps.area.top = elRect.top + this.scroll.y;
			this.cursorProps.area.left = elRect.left + this.scroll.x;
			this.cursorProps.area.width = contentRect.width;
			this.cursorProps.area.height = contentRect.height;
			if (this.$refs.cursor && !this.cursorProps.touch.active) {
				const cursorRect = this.$refs.cursor.getBoundingClientRect();
				this.cursorProps.dimensions.width = cursorRect.width;
				this.cursorProps.dimensions.height = cursorRect.height;
			}
			this.$nextTick(this.captionChangeSize);
		},
		onScroll() {
			this.scroll.y = window.pageYOffset;
			this.scroll.x = window.pageXOffset;
		},
		onCursorClick() {
			if (this.cursorDirection === 'previous') {
				this.goToPrevious();
			} else {
				this.goToNext();
			}
		},
		onCursorDown() {
			this.cursorProps.pressed = true;
		},
		onCursorUp() {
			this.cursorProps.pressed = false;
		},
		onCursorEnter(event) {
			this.onCursorMove(event);
			this.cursorProps.active = true;
			this.cursorProps.pressed = false;
		},
		onCursorLeave(event) {
			this.onCursorMove(event);
			this.cursorProps.active = false;
			this.cursorProps.pressed = false;
		},
		onCursorMove(event) {
			this.cursorProps.pos.x = event.clientX;
			this.cursorProps.pos.y = event.clientY;
		},
		onTouchstart(event) {
			if (!this.cursorProps.touch.active) {
				this.cursorProps.touch.active = true;
				this.cursorProps.dimensions.width = 0;
				this.cursorProps.dimensions.height = 0;
			}
			this.cursorProps.touch.startX = event.touches[0].clientX;
		},
		onTouchmove(event) {
			this.cursorProps.touch.dragX = event.touches[0].clientX - this.cursorProps.touch.startX;
		},
		onTouchend() {
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
</script>

<template src="./SkySwiper.html" />
<style src="./SkySwiper.scss" />
