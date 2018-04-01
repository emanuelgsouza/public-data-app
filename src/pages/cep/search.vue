<template>
  <q-page>
    <p class="caption"> Encontre um CEP a partir de um logradouro </p>

    <div class="row gutter-sm">
      <div class="col-md-4">
        <q-select
          filter
          autofocus-filter
          v-model="uf"
          stack-label="Selecione um estado"
          :options="statesSiglaOptions" />
      </div>
      <div class="col-md-4">
        <q-select
          filter
          autofocus-filter
          v-model="city"
          stack-label="Selecione um municipio"
          :options="cityOptions" />
      </div>
      <div class="col-md-4">
        <q-field>
          <q-input
            stack-label="Digite um logradouro"
            v-model="logradouro"
            :disable="isDisable" />
        </q-field>
      </div>
    </div>

    <br />

    <q-btn
      icon="search"
      label="Pesquisar"
      color="primary"
      :disable="!isValid"
      @click="getApiInformations" />

    <br />

    <div class="row gutter-sm">
      <div class="col-md-6">
        <p class="caption"> Informações preenchidas </p>

        <div class="q-pa-sm">
          <vue-json-pretty :data="informations" />
        </div>
      </div>

      <div class="col-md-6">
        <p class="caption"> Resultado </p>

        <div class="q-pa-sm">
          <vue-json-pretty :data="result" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { QField, QInput, QBtn, QSelect } from 'quasar'
import VueJsonPretty from 'vue-json-pretty'
import { mapGetters, mapMutations, mapState } from 'vuex'
import { isEmpty } from 'lodash'
import * as types from '../../store/mutation-types'
import { cepApi, ibgeApi } from '../../support/http'

export default {
  name: 'PageIndex',
  components: { QField, QInput, QBtn, QSelect, VueJsonPretty },
  data: () => ({
    uf: '',
    logradouro: '',
    city: '',
    cities: [],
    result: {}
  }),
  computed: {
    ...mapState(['stateSelected']),
    ...mapGetters(['statesSiglaOptions', 'hasStateSelected']),
    informations () {
      return {
        uf: this.uf,
        city: this.city,
        logradouro: this.logradouro,
        stateSelected: this.stateSelected,
        hasStateSelected: this.hasStateSelected
      }
    },
    isDisable () {
      return isEmpty(this.uf) || isEmpty(this.city)
    },
    isValid () {
      return !this.isDisable && !isEmpty(this.logradouro)
    },
    cityOptions () {
      return this.cities.map(city => {
        return {
          value: city.nome,
          label: city.nome
        }
      })
    }
  },
  watch: {
    uf (value) {
      this.setState(value)
    },
    hasStateSelected (value) {
      if (value) {
        this.$q.loading.show()
        return ibgeApi
          .get(`/v1/localidades/estados/${this.stateSelected.id}/municipios`)
          .then(result => {
            this.cities = result.data || []
          })
          .catch(err => {
            console.error(err)
            this.$q.notify({
              type: 'negative',
              message: err.message
            })
          })
          .then(() => {
            this.$q.loading.hide()
          })
      }
    }
  },
  methods: {
    ...mapMutations({
      setState: types.SELECTED_STATE
    }),
    getApiInformations () {
      if (this.isDisable) {
        return
      }

      this.$q.loading.show()
      const { logradouro, uf, city } = this
      return cepApi
        .get(`/${uf}/${city}/${logradouro}/json`)
        .then(result => {
          this.result = result.data || {}
        })
        .catch(err => {
          console.error(err)
          this.$q.notify({
            type: 'negative',
            message: err.message
          })
        })
        .then(() => {
          this.$q.loading.hide()
        })
    }
  }
}
</script>
