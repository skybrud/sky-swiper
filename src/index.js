import SkySwiper from './SkySwiper.vue';

const defaults = {
	registerComponents: true,
};

export { SkySwiper };

export default function install(Vue, options) {
	if (install.installed === true) {
		return;
	}

	const { registerComponents } = Object.assign({}, defaults, options);

	if (registerComponents) {
		Vue.component(SkySwiper.name, SkySwiper);
	}
};
