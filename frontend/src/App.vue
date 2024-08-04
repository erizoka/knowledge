<template>
	<div id="app" :class="{'hide-menu': !isMenuVisible || !user}">
		<HeaderVue title="Cod3r - Base de Conhecimento" 
			:hideToggle="!user"
			:hideUserDropdown="!user"/>
		<MenuVue v-if="user"/>
		<LoadingVue v-if="validatingToken"/>
		<ContentVue v-else/>
		<FooterVue />
	</div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, userKey } from '@/global'
import { mapState } from 'vuex'
import ContentVue from '@/components/template/Content.vue'
import FooterVue from '@/components/template/Footer.vue'
import HeaderVue from '@/components/template/Header.vue'
import MenuVue from '@/components/template/Menu.vue'
import LoadingVue from './components/template/Loading.vue'

export default {
	name: "App",
	components: { HeaderVue, MenuVue, ContentVue, FooterVue, LoadingVue },
	computed: mapState(['isMenuVisible', 'user']),
	data(){
		return {
			validatingToken: true,
		}
	},
	methods: {
		async validateToken(){
			this.validatingToken = true

			const json = localStorage.getItem(userKey)
			const userData = JSON.parse(json)
			this.$store.commit('setUser', null)

			if(!userData){
				this.validatingToken = false
				this.$router.push({ name: 'auth' })
				return
			}
			
			const res = await axios.post(`${baseApiUrl}/validateToken`, userData)
			if(res.data){
				this.$store.commit('setUser', userData)
				if(this.$mq === 'xs' || this.$mq === 'sm'){
					this.$store.commit('toggleMenu', false)
				}
			} else {
				localStorage.removeItem(userKey)
				this.$router.push({ name: 'auth' })
			}

			this.validatingToken = false
		}
	},
	created() {
		this.validateToken()
	},
}
</script>

<style>
	* {
		font-family: "Lato", sans-serif;
	}

	body {
		margin: 0;
	}

	#app {
		--webkit-font-smoothing: antialised;
		--moz-osx-font0smoothing: grayscale;

		height: 100vh;
		display: grid;
		grid-template-rows: 60px 1fr 40px;
		grid-template-columns: 300px 1fr;
		grid-template-areas: 
			"header header"
			"menu content"
			"menu footer"
		;
	}

	#app.hide-menu{
		grid-template-areas: 
			"header header"
			"content content"
			"footer footer"
		;
	}
</style>