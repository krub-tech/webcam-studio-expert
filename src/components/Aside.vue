<template>
    <aside class="studio--aside">
        <div class="studio--aside-header">
            <button class="btn-filter" @click="$router.push('/')">
                <img src="@/assets/svg/i-back_arrow.svg">
                К фильтру
            </button>
            <button
                class="btn-favorites"
                :class="{ btn_favorites_active: favoritesOpen }"
                @click="favoritesClickHandle"
            >
                Избранное
            </button>
        </div>
        <template v-if="studios">
            <article
                v-for="st in studios"
                :key="st.id"
                class="studio--aside-card"
                @click="toStudio($event, st.id)"
            >
                <div class="title">
                    <p class="name">
                        {{ st.name }}
                    </p>
                    <p class="percent">
                        {{ st.min_payout_percentage }}-{{ st.max_payout_percentage }}%
                    </p>
                </div>
                <div class="desc">
                    <p class="address">
                        {{ st.address }}
                    </p>
                    <Like :id="st.id" />
                </div>

                <div v-if="st.certified" class="certificate">
                    <a href="#">Сертифицирована</a>
                </div>
            </article>
        </template>
    </aside>
</template>

<script>
import Like from '@/components/buttons/Like';
    
export default {
  name: 'StudioAside',
  components: {
    Like,
  },
  computed: {
    studios() {
      if (this.favoritesOpen) {
        return this.$store.state.favorites.favoritesStudios;
      }
      return this.$store.getters.currentStudios;
    },
    favoritesOpen() {
      return this.$store.state.favorites.favoritesOpen;
    },
  },
  mounted() {
    if (this.$store.state.windowWidth < 420) {
      this.$store.commit('favoritesOpen');
    }
  },
  methods: {
    moveToPageHandle(id) {
      if (+this.$route.params.id !== +id) this.$router.push(`/studio/${id}`);
      else return false;
      this.$store.dispatch('studioById', id);
    },
    toStudio(e, id) {
      if (e.target.tagName !== 'BUTTON') this.moveToPageHandle(id);
    },
    favoritesClickHandle() {
      if (this.$store.state.favorites.favoritesOpen) this.$store.commit('favoritesClose');
      else this.$store.commit('favoritesOpen');
    },
  },
};
</script>

<style lang="scss">
    .studio--aside {
        display: block;
        min-width: 300px;
        margin: 0 var(--fr-l);
        margin-top: 70px;
        grid-area: studios-list;
        &-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: var(--fr-l);
            button {
                height: var(--fr-2);
                padding: 0.75rem;
                border-radius: 0.5rem;
            }
            .btn-filter {
                display: flex;
                align-items: center;
                background-color: #e5e5ef;
                img {
                    margin-right: var(--fr-m);
                }
            }
            .btn-favorites {
                background-color: var(--white);
                border: 1px solid #c4c4cd;
                &.btn_favorites_active {
                    border: 1px solid #ff93cd;
                }
            }
        }
        &-card {
            cursor: pointer;
            background-color: var(--white);
            color: #606074;
            border-radius: 0.5rem;
            padding: var(--fr);
            margin-bottom: 0.75rem;

            .title {
                display: flex;
                justify-content: space-between;
                margin-bottom: 0.75rem;
                .name {
                    font-weight: bold;
                }
            }
            .desc {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 1rem;
                .address {
                    font-size: 16px;
                }
            }
            .certificate {
                position: relative;
                margin-left: var(--fr-l);
                &::before {
                    content: "";
                    position: absolute;
                    width: var(--fr);
                    height: 22px;
                    left: -30px;
                    bottom: 0;
                    transform: translateY(12.5%);
                    background-image: url("~@/assets/svg/i-cert.svg");
                }
                a {
                    font-size: 16px;
                    text-decoration: none;
                    color: inherit;
                }
            }
        }
    }
    @media screen and (min-width: 420px) {
        .studio--aside {
            margin: 0;
        }
    }
</style>
