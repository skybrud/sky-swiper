<template>
	<div :class="['sky-swiper', `sky-swiper--${direction}`]">
		<slot
			:items="items"
			:touchStart="onTouchstart"
			:touchMove="onTouchmove"
			:touchEnd="onTouchend"
			:touchCancel="onTouchend"
			:gotoNext="goToNext"
			:gotoPrevious="goToPrevious"
			:gotoIndex="goTo"
			:states="{
				currentIndex: currentIndex,
				direction: direction,
				touch: touch,
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
					v-if="config.prev"
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
					v-if="config.next"
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
				v-if="config.bullets"
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
