<template>
	<div :class="['sky-swiper', `sky-swiper--${direction}`]">
		<slot
			:items="this.items"
			:touch="{
				start: this.onTouchstart,
				move: this.onTouchmove,
				end: this.onTouchend,
				cancel: this.onTouchend,
			}"
			:goto="{
				previous: this.goToPrevious,
				next: this.goToNext,
				index: this.goTo,
			}"
			:states="{
				currentIndex: this.currentIndex,
				direction: this.direction,
				touch: this.touch,
			}"
		>
			<figure class="sky-swiper__wrap">
				<div
					ref="content"
					@touchstart="onTouchstart"
					@touchmove="onTouchmove"
					@touchend="onTouchend"
					@touchcancel="onTouchend"
					class="sky-swiper__content"
				>
					<transition name="sky-swiper__animation">
						<div
							:key="currentIndex"
							keep-alive
							class="sky-swiper__item"
						>
							<div class="sky-swiper__item-inner">
								<slot
									name="display"
									:item="items[currentIndex]"
								/>
							</div>
						</div>
					</transition>
				</div>

				<button
					v-if="this.config.prev"
					@click="goToPrevious()"
					class="sky-swiper__control sky-swiper__control--previous"
				>
					<span class="sky-swiper__control-icon">
						<slot
							slot="prev"
							:next="goToPrevious"
						>
							<span v-text="'<'" />
						</slot>
					</span>
				</button>
				<button
					v-if="this.config.next"
					@click="goToNext()"
					class="sky-swiper__control sky-swiper__control--next"
				>
					<span class="sky-swiper__control-icon">
						<slot
							slot="next"
							:next="goToNext"
						>
							<span v-text="'>'" />
						</slot>
					</span>
				</button>
			</figure>

			<ul
				v-if="this.config.bullets"
				class="sky-swiper__bullets"
			>
				<li
					v-for="(item, index) in items"
					:key="index"
				>
					<button
						@click="goTo(index)"
						:class="[
							'sky-swiper__bullet-button',
							{
								'sky-swiper__bullet-button--active': index === currentIndex,
							}
						]"
					/>
				</li>
			</ul>
		</slot>
	</div>
</template>
<script src="./SkySwiper.js" />
<style lang="scss" src="./SkySwiper.scss" />
