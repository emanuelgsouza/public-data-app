<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary">
        <q-toolbar-title>
          Public Data App
          <div slot="subtitle">Uma aplicação para consumo de dados públicos do IBGE</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-page-container>
      <q-tabs inverted align="justify">
        <q-route-tab
          default
          label="Consulta de CEP"
          :to="{ name: 'cep.consult' }"
          exact
          slot="title"
        />
        <q-route-tab
          label="Pesquisa de CEP"
          :to="{ name: 'cep.search' }"
          exact
          slot="title"
        />
      </q-tabs>

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { QTabs, QTab, QTabPane, QRouteTab } from 'quasar'

export default {
  name: 'LayoutDefault',
  components: { QTabs, QTab, QTabPane, QRouteTab },
  data () {
    return {
    }
  }
}
</script>

<style>
</style>
