<template>
  <q-page>
    <p class="caption"> Encontre as informações a partir do seu CEP </p>

    <q-field :count="8">
      <q-input
        :maxlength="8"
        stack-label="Digite seu cep"
        v-model="cep"
        autofocus />
    </q-field>

    <q-btn
      icon="search"
      label="Pesquisar"
      color="primary"
      :disable="!isCepValid"
      @click="getApiInformations" />

    <div class="q-pa-sm">
      <vue-json-pretty :data="result" />
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { QField, QInput, QBtn } from 'quasar'
import VueJsonPretty from 'vue-json-pretty'
import { size } from 'lodash'
import { cepApi } from '../../support/http'

export default {
  name: 'PageIndex',
  components: { QField, QInput, QBtn, VueJsonPretty },
  data: () => ({
    cep: '',
    result: {}
  }),
  computed: {
    isCepValid () {
      return size(this.cep) === 8
    }
  },
  methods: {
    getApiInformations () {
      const cep = this.cep
      this.$q.loading.show()
      if (this.isCepValid) {
        return cepApi
          .get(`/${cep}/json`)
          .then(result => {
            this.$q.loading.hide()
            this.result = result.data || {}
          })
      }
    }
  }
}
</script>
