const defaultOptions = {
	next: true,
	previous: true,
	bullets: false,
};

export default {
	name: 'SkySwiper',
	props: {
		items: {
			type: Array,
			required: true,
		},
		options: {
			type: Object,
			default: () => ({}),
		},
	},
	data() {
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
	mounted() {
		this.addListeners();
	},
	beforeDestroy() {
		this.removeListeners();
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
